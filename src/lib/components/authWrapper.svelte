<script lang="ts">
	import { discordUser } from '$lib/store';
	import Button from './ui/button/button.svelte';
</script>

{#if $discordUser}
	<slot />
{:else}
	<div class="flex flex-col justify-center items-center h-full gap-4">
		<p class="text-xl">You must be signed in to view this page.</p>
		<Button variant="secondary" href="/">Back to Main Page</Button>
	</div>
{/if}
