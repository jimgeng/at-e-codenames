<script lang="ts">
	import { resetRevealStatus } from '$lib/game';
	import { gameState } from '$lib/store';
	import { Button } from './button';
	import Card from './card.svelte';

	function reset() {
		resetRevealStatus();
	}
</script>

<div class="text-center mx-auto">
	<div
		class="grid gap-2 max-w-screen-lg grid-cols-2 p-2 rounded-2xl border-2 border-dashed tracking-normal md:grid-cols-5 md:grid-rows-5 md:text-base md:gap-4 md:p-4"
	>
		{#each $gameState.board as card, index}
			<Card {index} {card} />
		{/each}
	</div>
	<br />
	<Button on:click={reset}>reset flip status</Button>
</div>
