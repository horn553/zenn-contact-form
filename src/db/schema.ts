import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const contacts = sqliteTable('contacts', {
	id: text('id').primaryKey(),
	status: text('status').notNull(),
	receivedAt: text('receivedAt').notNull(),
	name: text('name').notNull(),
	email: text('email').notNull(),
	category: text('category').notNull(),
	body: text('body').notNull(),
	csrfToken: text('csrfToken').notNull(),
	reCaptchaToken: text('reCaptchaToken').notNull()
});
