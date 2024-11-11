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

export const statuses = ['invalid csrf', 'invalid captcha', 'have sent email'] as const;
export const statusScheme = z.enum(statuses).brand<'Status'>();
export type Status = z.infer<typeof statusScheme>;

export const contactLogSchema = requestBodySchema.extend({
	id: z.string().uuid(),
	receivedAt: z.string().datetime(),
	status: statusScheme
});
export type ContactLog = z.infer<typeof contactLogSchema>;
