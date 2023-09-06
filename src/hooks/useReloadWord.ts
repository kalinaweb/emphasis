import { useState, useCallback, useRef, useEffect } from "react";
import { Random } from "random-js";
import { wordsBD } from '../data/words';

const getCurrentState = () => {
	try {
		const currentState = (JSON.parse(window.localStorage.getItem('words') || '[]'));
		return currentState;
	}
	catch (err) {
		return [];
	}
	return [];
}

const getCurrentLearnedWordState = () => {
	try {
		const currentState = (JSON.parse(window.localStorage.getItem('learnedWords') || '[]'));
		return currentState;
	}
	catch (err) {

	}
	return [];
}

const getNoLearnedValue = (store, wordsArr) => {
	const filterStore = store.filter(word => word.right >= 3);

	let results = [];
	for (let i = 0; i < wordsArr.length; i++) {
		let toSearch = wordsArr[i].id;

		for (let i = 0; i < filterStore.length; i++) {
			for (let id in filterStore[i]) {
				if (filterStore[i][id] < 10) {
					if ("0" + filterStore[i][id].toString() == toSearch) {
						(results as number[]).push(filterStore[i].id);
					}
				}
				else {
					if (filterStore[i][id].toString() == toSearch) {
						(results as number[]).push(filterStore[i].id);
					}
				}

			}
		}
	}

	wordsArr = wordsArr.filter((word) => {

		return (results as number[]).indexOf(parseFloat(word.id)) < 0;
	});

	return wordsArr;
}

export function useReloadWord(initialValue: number = 0) {
	let wordsArr = [];
	let size = Object.keys(wordsBD).length;
	let arrIndex:number[] = [];
	let lengthWordsArr = 0;
	const currentLearned = getCurrentLearnedWordState();
	const store = getCurrentState();
	const wordsArrNew = {};

	if (currentLearned.length != 0) {

		for (let i = 0; i < size; i++) {
			if (currentLearned.indexOf(i) < 0) {
				if (arrIndex.length < 5) {
					arrIndex.push(i);
				}
			}
		}

		for (let i = 0; i < arrIndex.length; i++) {
			for (let value in wordsBD[arrIndex[i]].value) {
				(wordsArr as string[]).push(wordsBD[arrIndex[i]].value[value]);
			}
		}

		wordsArr = getNoLearnedValue(store, wordsArr);

	}
	else {

		for (let i = 0; i < 5; i++) {
			for (let value in wordsBD[i].value) {
				(wordsArr as string[]).push(wordsBD[i].value[value]);
			}
		}

		wordsArr = getNoLearnedValue(store, wordsArr);

	}

	lengthWordsArr = wordsArr.length - 1;

	function shuffle(numPool: number[]) {
		for (let j:number, x:number, i:number = numPool.length; i; j = Math.round(Math.random() * i), x = numPool[--i], numPool[i] = numPool[j], numPool[j] = x);
		return numPool;
	};

	const getRandom = (max: number) => {
		const arrNum:number[] = [];
		for (let index = 0; index < max; index++) {
			arrNum.push(index);
		}

		let randomResult = shuffle(arrNum)[Math.floor(Math.random() * max)];

		return randomResult;
	}

	let [numberWord, setNumberWord] = useState(getRandom(lengthWordsArr));
	const previousValue = useRef(0);

	useEffect(() => {
		previousValue.current = numberWord;
	}, [numberWord]);

	const update = useCallback(() => {
		setNumberWord(() => {
			let rand = getRandom(lengthWordsArr);
			if (rand != previousValue.current) {
				return rand;
			}
			else return getRandom(lengthWordsArr);
		})
	}, []);

	if (numberWord < wordsArr.length) {
		return { numberWord, update, wordsArr }
	}
	else {
		update();
		return { numberWord, update, wordsArr }
	}

}