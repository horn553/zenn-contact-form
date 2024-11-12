import type { Actions, PageServerLoad } from './$types';
import { sendEmail } from './emailSender';
import { log } from './logger';
import { verifyCaptcha } from './reCapthaVerifier';
import {
	NAME_MAX_LENGTH,
	EMAIL_MAX_LENGTH,
	CATEGORY_OPTIONS,
	BODY_MAX_LENGTH,
	requestBodySchema,
	type ContactLog,
	statusScheme,
	statuses
} from './schema';

export const load: PageServerLoad = async ({ locals }) => {
	const { session } = locals;
	if (session.data.csrfToken === undefined) {
		await session.setData({
			csrfToken: crypto.randomUUID()
		});
		await session.save();
	}

	return {
		NAME_MAX_LENGTH,
		EMAIL_MAX_LENGTH,
		CATEGORY_OPTIONS,
		BODY_MAX_LENGTH,
		csrfToken: session.data.csrfToken
	};
};

/**
 * FormDataからObjectに変換する
 * @param d 変換元のFormData
 * @returns 変換後のObject
 */
function convertToObject(d: FormData): Record<string, FormDataEntryValue> {
	const result: Record<string, FormDataEntryValue> = {};
	d.forEach((value, key) => {
		result[key] = value;
	});
	return result;
}

export const actions = {
	default: async ({ locals, platform, request }) => {
		const { session } = locals;
		const rawRequestBody = convertToObject(await request.formData());

		// バリデーションをかける
		const validationResult = requestBodySchema.safeParse(rawRequestBody);
		if (!validationResult.success) {
			return { success: false, message: 'Invalid request body' };
		}
		const requestBody = validationResult.data;

		// id採番、受信日時取得
		let currentStatus: (typeof statuses)[number] = 'have sent email';
		const contactLog: ContactLog = {
			id: crypto.randomUUID(),
			status: statusScheme.parse(currentStatus),
			receivedAt: new Date().toISOString(),
			...requestBody
		};

		// CSRFトークンを検証
		const csrfResult = requestBody.csrfToken === session.data.csrfToken;
		if (!csrfResult) {
			currentStatus = 'invalid csrf';
			contactLog.status = statusScheme.parse(currentStatus);
			log(platform?.env.DB, contactLog);

			return { success: false, message: 'Invalid CSRF token' };
		}

		// reCAPTCHAを検証
		const captchaResult = verifyCaptcha(requestBody.reCaptchaToken);
		if (!captchaResult) {
			currentStatus = 'invalid captcha';
			contactLog.status = statusScheme.parse(currentStatus);
			log(platform?.env.DB, contactLog);

			return { success: false, message: 'Invalid CAPTCHA token' };
		}

		// TODO: メールを送信
		sendEmail(requestBody);

		currentStatus = 'have sent email';
		contactLog.status = statusScheme.parse(currentStatus);
		log(platform?.env.DB, contactLog);

		return { success: true };
	}
} satisfies Actions;
