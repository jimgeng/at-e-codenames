<script lang="ts">
	import AuthWrapper from '$lib/components/authWrapper.svelte';
	import { db } from '$lib/firebase';
	import { type QuerySnapshot, collection, getDocs } from 'firebase/firestore';
	import { onMount } from 'svelte';
	import { type Game } from '$lib/types/game';
	import { Button } from '$lib/components/ui/button';

	let games: QuerySnapshot;
	let loading = true;
	const gamesRef = collection(db, 'games');

	onMount(async () => {
		games = await getDocs(gamesRef);
		loading = false;
	});

	$: gameDocs = games && !games.empty ? games.docs.map((doc) => doc.data() as Game) : [];

	function prettyGameStatus(game: Game) {
		switch (game.status) {
			case 'waiting':
				return 'Waiting to start...';
			case 'active':
				return 'Game in progress...';
			case 'complete':
				return 'Game complete!';
		}
	}
</script>

<AuthWrapper>
	<div>
		<h1 class="text-center text-4xl uppercase font-bold py-16">Games</h1>
		<div class="max-w-screen-md m-auto flex flex-col gap-4">
			{#if loading}
				<div class="text-center animate-pulse">
					<span class="text-2xl bg-secondary w-min p-4 rounded-md">Loading...</span>
				</div>
			{:else if games.empty}
				<p>No games found 😢</p>
			{:else}
				{#each gameDocs as game}
					<div class="p-4 bg-secondary rounded-md">
						<div class="flex justify-between">
							<div>
								<p class="text-xs">{game.id}</p>
								<h1 class={`${game.status === 'waiting' && 'animate-pulse'}`}>
									{prettyGameStatus(game)}
								</h1>
							</div>
							<Button variant="outline" class="bg-transparent border-secondary-foreground"
								>Join</Button
							>
						</div>
						<div class="mt-4 flex w-full">
							<div class="flex-1 text-red-700 dark:text-red-300">
								<p>Spymaster: {game.teams.red.spymaster?.displayName ?? 'No one'}</p>
								<p>
									Operatives: {game.teams.red.guesser
										.map((player) => player.displayName)
										.join(', ')}
								</p>
							</div>
							<div class="flex-1 text-sky-700 dark:text-sky-300 text-right">
								<p>Spymaster: {game.teams.blue.spymaster?.displayName ?? 'No one'}</p>
								<p>
									Operatives: {game.teams.blue.guesser
										.map((player) => player.displayName)
										.join(', ')}
								</p>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
		<div class="text-center py-16">
			<Button href="/" variant="secondary">Back to Main Page</Button>
		</div>
	</div>
</AuthWrapper>
