import type { TeamColor } from './colors';

export type User = {
	uid: string;
	displayName: string;
	teamColor?: TeamColor;
	role?: 'guesser' | 'spymaster';
};
