import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '.';
import type { Card, Game } from 'types/game';
import { testWords } from './game.test';

export async function createGame() {
	const gamesCollectionRef = collection(db, 'games');
	const startingTeam = Math.random() < 0.5 ? 'red' : 'blue';
	const newGame: Game = {
		status: 'waiting',
		created_at: serverTimestamp(),
		updated_at: serverTimestamp(),
		teams: {
			red: {
				cardsLeft: startingTeam === 'red' ? 9 : 8,
				guesser: [],
				spymaster: { uid: '', displayName: '' }
			},
			blue: {
				cardsLeft: startingTeam === 'blue' ? 9 : 8,
				guesser: [],
				spymaster: { uid: '', displayName: '' }
			}
		},
		board: generateBoard(testWords),
		turnState: 'red'
	};

	try {
		const docRef = await addDoc(gamesCollectionRef, newGame);
		console.log('Game created with ID: ', docRef.id);
		return docRef.id; // Use this ID for game routing or referencing
	} catch (e) {
		console.error('Error adding document: ', e);
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

function shuffle<T>(array: T[]) {
	const newArray = array.slice(0);
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}
