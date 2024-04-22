<script lang="ts">
	import Board from '$lib/components/ui/board.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { createGame, subscribeStoreToGameState } from '$lib/game';
	import { gameState } from '$lib/store';
	import type { Unsubscribe } from 'firebase/firestore';
	import { onDestroy } from 'svelte';

	const testWords = [
		'apple',
		'banana',
		'cherry',
		'date',
		'elderberry',
		'fig',
		'grape',
		'honeydew',
		'imbe',
		'jackfruit',
		'kiwi',
		'lemon',
		'mango',
		'nectarine',
		'orange',
		'papaya',
		'quince',
		'raspberry',
		'strawberry',
		'tangerine',
		'ugli',
		'vanilla',
		'watermelon',
		'ximenia',
		'yellow',
		'zucchini'
	];

	let cleanUp: Unsubscribe | null;

	async function createGameButton() {
		const gameId = await createGame(testWords);
		if (gameId) {
			cleanUp = subscribeStoreToGameState(gameId);
		}
	}

	async function fetchGameButton() {
		const gameId = '8e9c31b8-3666-4811-b7c5-92aa56229b35';
		cleanUp = subscribeStoreToGameState(gameId);
	}

	onDestroy(() => {
		if (cleanUp) {
			cleanUp();
		}
	});
</script>

<div>
	{#if $gameState}
		<div class="flex min-h-screen min-w-screen items-center">
			<!-- <Team team={$gameState.teams.red} /> -->
			<Board />
			<!-- <Team team={$gameState.teams.blue} /> -->
		</div>
	{:else}
		<p>Game not found</p>
		<Button on:click={createGameButton}>CLick To Create</Button>
		<Button on:click={fetchGameButton}>Click to fetch a game</Button>
	{/if}
</div>
