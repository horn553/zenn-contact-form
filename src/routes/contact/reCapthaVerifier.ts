import { RECAPTCHA_SECRET_KEY } from '$env/static/private';

export async function verifyCaptcha(token: string): Promise<boolean> {
	const body = new FormData();
	body.append('secret', RECAPTCHA_SECRET_KEY);
	body.append('response', token);
	const response = await (
		await fetch('https://www.google.com/recaptcha/api/siteverify', {
			body: body,
			method: 'POST'
		})
	).json();

	if (response?.success) return true;
	return false;
}
