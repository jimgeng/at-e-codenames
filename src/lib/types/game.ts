import type { Timestamp } from 'firebase/firestore';
import type { CardColor, TeamColor } from './colors';

export type Game = {
	id: string;
	status: 'waiting' | 'active' | 'complete';
	created_at: Timestamp;
	updated_at: Timestamp;
	teams: {
		red: Team;
		blue: Team;
	};
	board: Board;
	turnState: TeamColor; // only matters when status is 'active'
};

export type Team = {
	cardsLeft: number; // score
	guesser: Player[];
	spymaster: Player | null; // only one spymaster per team
};

export type Player = {
	uid: string;
	displayName: string;
};

export type Board = Card[]; // 5x5 grid, represented as a 25-element 1D array because firebase is trash

export type Card = {
	word: string;
	color: CardColor;
	revealed: boolean;
};
