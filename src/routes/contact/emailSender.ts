import { Resend } from 'resend';
import { type RequestBody } from './schema';
import { RESEND_API_KEY } from '$env/static/private';

export async function sendEmail(content: RequestBody) {
	const resend = new Resend(RESEND_API_KEY);
	await resend.emails.send({
		from: 'お問い合わせフォーム <webadmin@orch-canvas.tokyo>',
		to: [content.email],
		cc: 'contact@example.com',
		replyTo: 'contact@example.com',
		subject: 'お問い合わせを承りました',
		text: generateBody(content)
	});
}

function generateBody(content: RequestBody): string {
	let body: string = `ホームページより、お問い合わせを承りました。
必要に応じてメールにてご返答いたします。
なお、メールアドレスが正しく入力されていない場合、返答いたしかねます。ご了承ください。
* * * 
分類：${content.category}
本分：
${content.body}`;

	// 名前が送信されている場合、宛名と適当な改行を挿入
	if (content.name)
		body =
			`${content.name}さま
` + body;

	return body;
}
