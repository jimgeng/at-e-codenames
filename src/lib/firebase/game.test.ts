import { expect, test } from 'vitest';
import { createGame, generateBoard } from './game';
import type { Board } from 'types/game';

export const testWords = [
	'apple',
	'banana',
	'carrot',
	'donut',
	'eggplant',
	'fries',
	'grapes',
	'hamburger',
	'ice cream',
	'juice',
	'kiwi',
	'lemon',
	'mango',
	'noodles',
	'orange',
	'peach',
	'quinoa',
	'raspberry',
	'strawberry',
	'taco',
	'udon',
	'vegetables',
	'watermelon',
	'xigua',
	'yogurt',
	'zucchini',
	'avocado',
	'broccoli',
	'chocolate',
	'doughnut',
	'enchilada',
	'fajita',
	'grapefruit',
	'honeydew',
	'icecream',
	'jalapeno',
	'kale',
	'lobster',
	'mushroom',
	'nachos',
	'onion',
	'peanut',
	'quesadilla',
	'radish',
	'salad',
	'tangerine',
	'udon',
	'vanilla',
	'watercress',
	'xmas ham',
	'yam',
	'ziti'
];

test('generateBoard to properly generate a board', () => {
	const board = generateBoard(testWords);
	console.log(board);
	expect(board).toHaveLength(25);

	const { redCount, blueCount, blackCount, neutralCount } = countColors(board);
	expect(redCount).toBe(9);
	expect(blueCount).toBe(8);
	expect(blackCount).toBe(1);
	expect(neutralCount).toBe(7);
});

test('generateBoard to properly generate a board with blue starting team', () => {
	const board = generateBoard(testWords, 'blue');
	console.log(board);
	expect(board).toHaveLength(25);
	const { redCount, blueCount, blackCount, neutralCount } = countColors(board);
	expect(redCount).toBe(8);
	expect(blueCount).toBe(9);
	expect(blackCount).toBe(1);
	expect(neutralCount).toBe(7);
});

function countColors(board: Board) {
	let [redCount, blueCount, blackCount, neutralCount] = [0, 0, 0, 0];
	for (const cell of board) {
		if (cell.color === 'red') {
			redCount++;
		} else if (cell.color === 'blue') {
			blueCount++;
		} else if (cell.color === 'black') {
			blackCount++;
		} else if (cell.color === 'neutral') {
			neutralCount++;
		}
	}
	return { redCount, blueCount, blackCount, neutralCount };
}

test('createGame uploads a new game to firestore', async () => {
	const gameId = await createGame();
	expect(gameId).toBeDefined();
});
