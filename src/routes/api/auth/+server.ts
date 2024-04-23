import type { RequestEvent } from './$types';
import { env } from '$env/dynamic/private';
import { adminAuth, adminDb } from '$lib/server/firebaseAdmin';
import type { DiscordUser } from '$lib/types/user';

type DiscordTokenRes = {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	scope: string;
};

export async function GET(reqEvent: RequestEvent) {
	const code = reqEvent.url.searchParams.get('code');
	if (!code) {
		return {
			status: 400,
			body: {
				error: 'No code provided'
			}
		};
	}
	try {
		const token = await getDiscordToken(code);
		const discordUserResponse = await getDiscordUser(token);
		const uid = `discord:${discordUserResponse.id}`;
		const firebaseToken = await adminAuth.createCustomToken(uid);
		updateUserCollection(discordUserResponse);
		const headers = {
			'Set-Cookie': `FirebaseToken=${firebaseToken}; HttpOnly; Secure; SameSite=Lax; Path=/;`,
			Location: '/'
		};
		return new Response(null, { status: 302, headers });
	} catch (e) {
		return {
			status: 500,
			body: {
				error: (e as Error).message
			}
		};
	}
}

async function getDiscordToken(code: string): Promise<DiscordTokenRes> {
	if (env.DISCORD_CLIENT_ID === undefined || env.DISCORD_AUTH_SECRET === undefined) {
		throw new Error('envs undefined');
	}
	const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			client_id: env.DISCORD_CLIENT_ID,
			client_secret: env.DISCORD_AUTH_SECRET,
			grant_type: 'authorization_code',
			code,
			redirect_uri: 'http://localhost:5173/api/auth',
			scope: 'identify'
		})
	});
	return await tokenResponse.json();
}

async function getDiscordUser(token: DiscordTokenRes): Promise<DiscordUser> {
	const userResponse = await fetch('https://discord.com/api/users/@me', {
		method: 'GET',
		headers: {
			authorization: `${token.token_type} ${token.access_token}`
		}
	});
	return await userResponse.json();
}

async function updateUserCollection(user: DiscordUser) {
	const uid = `discord:${user.id}`;
	adminDb.doc(`users/${uid}`).set({
		...user
	});
}
