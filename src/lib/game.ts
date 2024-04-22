import {
	serverTimestamp,
	doc,
	onSnapshot,
	setDoc,
	FieldValue,
	updateDoc
} from 'firebase/firestore';
import { db } from './firebase';
import type { Card, Game } from 'types/game';
import { shuffle } from '$lib/shuffle';
import { gameState, writableGameState } from '$lib/store';
import { v4 as uuidv4 } from 'uuid';
import { get } from 'svelte/store';

type GameWithTimestampOverride = Omit<Game, 'created_at' | 'updated_at'> & {
	created_at: FieldValue;
	updated_at: FieldValue;
};

export async function createGame(words: string[]) {
	const startingTeam = Math.random() < 0.5 ? 'red' : 'blue';
	const newGame: GameWithTimestampOverride = {
		id: uuidv4(),
		status: 'waiting',
		created_at: serverTimestamp(),
		updated_at: serverTimestamp(),
		teams: {
			red: {
				cardsLeft: startingTeam === 'red' ? 9 : 8,
				guesser: [],
				spymaster: null
			},
			blue: {
				cardsLeft: startingTeam === 'blue' ? 9 : 8,
				guesser: [],
				spymaster: null
			}
		},
		board: generateBoard(words, startingTeam),
		turnState: 'red'
	};

	try {
		await setDoc(doc(db, 'games', newGame.id), newGame);
		console.log('Game created with ID: ', newGame.id);
		return newGame.id; // Use this ID for game routing or referencing
	} catch (e) {
		console.error('Error adding document: ', e);
	}
}

export function revealCard(index: number) {
	// TODO: add decrement to card count and change turn state.
	updateGameState((game) => {
		game.board[index].revealed = true;
		return game;
	});
}

export function resetRevealStatus() {
	updateGameState((game) => {
		game.board.forEach((card) => (card.revealed = false));
		return game;
	});
}

export async function updateGameState(callback: (game: Game) => Game) {
	const gameStateSnapshot = structuredClone(get(gameState));
	const newGameState = callback(gameStateSnapshot);
	const gameRef = doc(db, 'games', newGameState.id);
	try {
		await updateDoc(gameRef, {
			...newGameState,
			updated_at: serverTimestamp()
		});
	} catch (e) {
		console.error('Error updating game state: ', e);
	}
}

export function generateBoard(words: string[], startingTeam: 'red' | 'blue' = 'red') {
	const shuffledWords = shuffle<string>(words);
	const cards: Card[] = shuffledWords.slice(0, 25).map((word, index) => {
		let color: Card['color'] = 'neutral';
		if (index === 0) color = 'black';
		else if (index < 10) color = startingTeam;
		else if (index < 18) color = startingTeam === 'red' ? 'blue' : 'red';
		return { word, color, revealed: false };
	});
	const board = shuffle<Card>(cards);
	return board;
}

// STORE FUNCTIONS

export function subscribeStoreToGameState(gameId: string) {
	console.log('running subscribe function...');
	const gameRef = doc(db, 'games', gameId);
	const unsubscribe = onSnapshot(gameRef, (doc) => {
		if (!doc.exists()) {
			console.log(`Game with ID ${gameId} does not exist, unsubscribing...`);
			unsubscribe();
			return;
		}
		// This will run twice; once for client and once for server update.
		console.log('Updating game state...');
		const game = doc.data() as Game;
		writableGameState.set(game);
	});
	return unsubscribe;
}
