<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import '../app.pcss';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
</script>

<ModeWatcher />
<Button class="absolute top-4 right-4" on:click={toggleMode} variant="secondary" size="icon">
	<Sun
		class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
	/>
	<Moon
		class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
	/>
	<span class="sr-only">Toggle theme</span>
</Button>
<div class="p-4 min-h-screen h-screen">
	<slot />
</div>
