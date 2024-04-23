import type { TeamColor } from './colors';

export type User = {
	id: string;
	displayName: string;
	teamColor?: TeamColor;
	role?: 'guesser' | 'spymaster';
};

export type DiscordUser = {
	id: string;
	username: string;
	global_name?: string;
	avatar?: string;
};
