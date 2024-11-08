import type { Actions, PageServerLoad } from './$types';
import { verifyCaptcha } from './reCapthaVerifier';
import {
	NAME_MAX_LENGTH,
	EMAIL_MAX_LENGTH,
	CATEGORY_OPTIONS,
	BODY_MAX_LENGTH,
	requestBodySchema
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
	default: async ({ locals, request }) => {
		const { session } = locals;
		const rawRequestBody = convertToObject(await request.formData());

		// バリデーションをかける
		const validationResult = requestBodySchema.safeParse(rawRequestBody);
		if (!validationResult.success) {
			return { success: false, message: 'Invalid request body' };
		}
		const requestBody = validationResult.data;

		// CSRFトークンを検証
		const csrfResult = requestBody.csrfToken === session.data.csrfToken;
		if (!csrfResult) {
			return { success: false, message: 'Invalid CSRF token' };
		}

		// reCAPTCHAを検証
		const captchaResult = verifyCaptcha(requestBody.reCaptchaToken);
		if (!captchaResult) {
			return { success: false, message: 'Invalid CAPTCHA token' };
		}

		return { success: true };
	}
} satisfies Actions;
