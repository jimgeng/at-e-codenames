import { readonly, writable } from 'svelte/store';
import type { Game } from 'types/game';

export const writableGameState = writable<Game>();
export const gameState = readonly(writableGameState);
export const userState = writable();
