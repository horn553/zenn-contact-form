import { z } from 'zod';

export const NAME_MAX_LENGTH = 99;
export const EMAIL_MAX_LENGTH = 254;
export const BODY_MAX_LENGTH = 999;

const categoryKeys = ['concert', 'others'] as const;
export const CATEGORY_OPTIONS: Record<(typeof categoryKeys)[number], string> = {
	concert: '演奏会について',
	others: 'その他'
} as const;

export const requestBodySchema = z.object({
	name: z.string().max(NAME_MAX_LENGTH),
	email: z.string().email().max(EMAIL_MAX_LENGTH),
	category: z.enum(categoryKeys),
	body: z.string().max(BODY_MAX_LENGTH),
	csrfToken: z.string(),
	reCaptchaToken: z.string()
});

export type RequestBody = z.infer<typeof requestBodySchema>;
