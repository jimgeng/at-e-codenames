<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { auth } from '$lib/firebase';
	import { discordUser as user } from '$lib/store.js';
	import { getDiscordID } from '$lib/user.js';
	import { signInWithCustomToken } from 'firebase/auth';
	import { onMount } from 'svelte';

	export let data;

	// Firebase Auth
	async function userAuthProcess() {
		if (!data.firebaseAuth) {
			return;
		}
		await signInWithCustomToken(auth, data.firebaseAuth);
	}

	onMount(async () => {
		await userAuthProcess();
	});

	const discordLogin =
		'https://discord.com/oauth2/authorize?client_id=1211917808900902933&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fapi%2Fauth&scope=identify';

	function logout() {
		auth.signOut();
	}
</script>

<div class="container my-48 flex max-w-screen-md flex-col gap-4">
	<h1 class="text-4xl font-bold">Shitty Codenames Clone</h1>
	<p>
		So instead of having random words we can have whatever word we want by choosing wordlists in the
		lobby of the game.
	</p>
	<p>This is also how I intend to learn SvelteKit.</p>
	<div class="mt-72">
		{#if $user}
			<div class="flex items-center gap-2">
				<img
					src={`https://cdn.discordapp.com/avatars/${getDiscordID($user.id)}/${$user.avatar}.jpg?size=64`}
					alt="User Avatar"
					class="rounded-full p-1 size-12"
				/>
				<Button variant="outline" class="cursor-default hover:bg-inherit"
					>Logged in as {$user.global_name}</Button
				>
				<Button variant="secondary" class="bg-appblue" on:click={logout}>Log out</Button>
			</div>
		{:else}
			<Button href={discordLogin}>Log In with Discord</Button>
		{/if}
	</div>
	<!-- <div class="h-16"></div>
	<div>
		Currently Logged In:
		<ul></ul>
	</div> -->
</div>
