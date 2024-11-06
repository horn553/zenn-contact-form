import type { Actions, PageServerLoad } from './$types';
import { verifyCaptcha } from './reCapthaVerifier';
import {
	NAME_MAX_LENGTH,
	EMAIL_MAX_LENGTH,
	CATEGORY_OPTIONS,
	BODY_MAX_LENGTH,
	requestBodySchema
} from './schema';

export const load: PageServerLoad = async () => {
	return {
		NAME_MAX_LENGTH,
		EMAIL_MAX_LENGTH,
		CATEGORY_OPTIONS,
		BODY_MAX_LENGTH
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
	default: async ({ request }) => {
		const rawRequestBody = convertToObject(await request.formData());

		// バリデーションをかける
		const validationResult = requestBodySchema.safeParse(rawRequestBody);
		if (!validationResult.success) {
			return { success: false, message: 'Invalid request body' };
		}
		const requestBody = validationResult.data;

		// reCAPTCHAを検証
		const captchaResult = verifyCaptcha(requestBody.reCaptchaToken);
		if (!captchaResult) {
			return { success: false, message: 'Invalid CAPTCHA token' };
		}

		return { success: true };
	}
} satisfies Actions;
