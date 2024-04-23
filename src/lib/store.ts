import type { Game } from '$lib/types/game';
import { onAuthStateChanged, type User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { derived, readonly, writable } from 'svelte/store';
import { auth, db } from './firebase';
import type { DiscordUser } from './types/user';

export const writableGameState = writable<Game>();
export const gameState = readonly(writableGameState);

function userStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn('Auth is not initialized or not in browser');
		const { subscribe } = writable<FirebaseUser | null>(null);
		return {
			subscribe
		};
	}
	const { subscribe } = writable<FirebaseUser | null>(auth.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, async (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}

export const user = userStore();

export const discordUser = derived<typeof user, DiscordUser | null>(user, ($user, set) => {
	if (!$user) {
		set(null);
		return;
	}
	getUserFromFirebaseUser($user).then((newUser) => {
		set(newUser);
	});
});

async function getUserFromFirebaseUser(User: FirebaseUser): Promise<DiscordUser> {
	const userDoc = await getDoc(doc(db, 'users', User.uid));
	const data = userDoc.data() as Omit<DiscordUser, 'id'>;
	return {
		id: User.uid,
		username: data.username,
		global_name: data.global_name,
		avatar: data.avatar
	};
}
