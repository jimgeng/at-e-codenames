<script>
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="container my-48 flex max-w-screen-md flex-col gap-4">
	<h1 class="text-4xl font-bold">Jim's Shitty Codenames Clone</h1>
	<p>
		So instead of having random words we can have whatever word we want by choosing wordlists in the
		lobby of the game.
	</p>
	<p>This is also how I intend to learn SvelteKit.</p>
	<div>
		<Button href="/login">Log In with Google</Button>
	</div>
	<p>
		I wanted to integrate discord login but its too hard so maybe for something else in the future
		I'll try it.
	</p>
	<!-- <div class="h-16"></div>
	<div>
		Currently Logged In:
		<ul></ul>
	</div> -->
</div>
