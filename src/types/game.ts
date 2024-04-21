export type Game = {
	status: 'waiting' | 'active' | 'complete';
	created_at: any;
	updated_at: any;
	teams: {
		red: Team;
		blue: Team;
	};
	board: Board;
	turnState: 'red' | 'blue'; // only matters when status is 'active'
};

export type Team = {
	cardsLeft: number; // score
	guesser: Player[];
	spymaster: Player; // only one spymaster per team
};

export type Player = {
	uid: string;
	displayName: string;
};

export type Board = Card[]; // 5x5 grid, represented as a 25-element 1D array because firebase is trash

export type Card = {
	word: string;
	color: 'red' | 'blue' | 'neutral' | 'black';
	revealed: boolean;
};
