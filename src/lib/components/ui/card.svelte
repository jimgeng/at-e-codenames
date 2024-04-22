<script lang="ts">
	import type { Card } from 'types/game';
	import { Button } from '$lib/components/ui/button';
	import { Check, Plus } from 'lucide-svelte';
	import { revealCard } from '$lib/game';

	export let card: Card;
	export let index: number;

	function vote() {
		console.log('Voted for', card.word);
	}

	function reveal() {
		if (card.revealed) return;
		console.log('Revealing', card.word);
		revealCard(index);
	}

	function getCardColor(card: Card) {
		if (card.revealed) {
			// TODO: Change this later.
			switch (card.color) {
				case 'red':
					return 'bg-red-300';
				case 'blue':
					return 'bg-sky-300';
				case 'black':
					return 'bg-gray-700 text-gray-200';
				default:
					return 'bg-gray-200';
			}
		} else {
			return 'bg-gray-200';
		}
	}
</script>

<div class={`${getCardColor(card)} flex flex-col gap-1 rounded-lg p-2 lg:gap-4 lg:p-4`}>
	<p class="lg:text-xl">{card.word.toUpperCase()}</p>
	<div class="flex justify-between h-6">
		{#if !card.revealed}
			<Button size="icon" variant="secondary" class="size-6" on:click={vote}>
				<Plus size={16} />
			</Button>
			<Button
				size="icon"
				variant="secondary"
				class="size-6 bg-green-400 hover:bg-green-300"
				on:click={reveal}
			>
				<Check size={16} />
			</Button>
		{/if}
	</div>
</div>
