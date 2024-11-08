<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import type { ActionData, PageServerData } from './$types';
	import { invalidateAll } from '$app/navigation';

	let { data, form }: { data: PageServerData; form: ActionData } = $props();

	const RECAPTCHA_SITE_KEY = '6LcrCHcqAAAAAGwoYDnJR4xmIUNSfzCdgYZowBpX';
	let isSubmitting = $state(false);
	async function handleSubmit(event: { currentTarget: EventTarget & HTMLFormElement }) {
		isSubmitting = true;
		const data = new FormData(event.currentTarget);

		// reCAPTCHAトークンを発行
		// eslint-disable-next-line no-undef
		const reCaptchaToken = await grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'submit' });
		data.append('reCaptchaToken', reCaptchaToken);

		// サーバーサイドに送信
		const response = await fetch('/contact', {
			method: 'POST',
			body: data
		});
		const result: ActionResult = deserialize(await response.text());

		// リクエストが成功した場合の一連のおまじない
		if (result.type === 'success') {
			await invalidateAll();
		}
		applyAction(result);
		isSubmitting = false;
	}

	$effect(() => {
		if (form?.success) {
			// フォームを初期化する
			(document.querySelector('[name=name]') as HTMLInputElement).value = '';
			(document.querySelector('[name=email]') as HTMLInputElement).value = '';
			(document.querySelector('[name=category]') as HTMLSelectElement).selectedIndex = 0;
			(document.querySelector('[name=body]') as HTMLTextAreaElement).value = '';
		}
	});
</script>

<svelte:head>
	<script src="https://www.google.com/recaptcha/api.js?render={RECAPTCHA_SITE_KEY}" async></script>
</svelte:head>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<label>
		お名前
		<input name="name" type="text" maxLength={data.NAME_MAX_LENGTH} disabled={isSubmitting} />
	</label>
	<label>
		メールアドレス
		<input
			name="email"
			type="email"
			maxLength={data.EMAIL_MAX_LENGTH}
			required
			disabled={isSubmitting}
		/>
	</label>
	<label>
		カテゴリー
		<select name="category" required disabled={isSubmitting}>
			<option value="" hidden selected></option>
			{#each Object.entries(data.CATEGORY_OPTIONS) as [key, description]}
				<option value={key}>{description}</option>
			{/each}
		</select>
	</label>
	<label>
		本文
		<textarea name="body" maxLength={data.BODY_MAX_LENGTH} disabled={isSubmitting}></textarea>
	</label>
	<input name="csrfToken" type="hidden" value={data.csrfToken} />
	<button type="submit" disabled={isSubmitting}>送信</button>

	<!-- ref: https://developers.google.com/recaptcha/docs/faq?hl=ja#id-like-to-hide-the-recaptcha-badge.-what-is-allowed https://developers.google.com/recaptcha/docs/faq?hl=ja#id-like-to-hide-the-recaptcha-badge.-what-is-allowed-->
	<p class="recaptcha-description">
		このサイトはreCAPTCHAによって保護されており、Googleの
		<a href="https://policies.google.com/privacy">プライバシーポリシー</a>
		と
		<a href="https://policies.google.com/terms">利用規約</a>
		が適用されます。
	</p>
</form>

<style>
	:global(.grecaptcha-badge) {
		visibility: hidden;
	}
</style>
