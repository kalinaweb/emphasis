"use client";

import {FunctionComponent } from 'react';
import { wordsBD } from '../../data/words';
import styles from './buttons.module.css';

interface Props {
	update: any;
 }

const getCurrentState = () => {
	try {
		const currentState = (JSON.parse(window.localStorage.getItem('words') || '[]'));
		return currentState;
	}
	catch(err) {
		window.localStorage.setItem('words', '[]');
	}
	return [];
}

const getCurrentLearnedWordState = () => {
	//console.log("work");
	
	try {
		const currentState = (JSON.parse(window.localStorage.getItem('learnedWords') || '[]'));
		return currentState;
	}
	catch(err) {
		window.localStorage.setItem('learnedWords', '[]');
	}
	return [];
}

interface A {
	(store: any, id: number): void
}

const answerRight:A = (store: any, id: number) => {
	
	const findId = store.filter( word => word.id == id);	

	if(findId.length == 0) {		
		const newStore = {
			id: id,
			right: 1
		};
		window.localStorage.setItem('words',  JSON.stringify([newStore].concat(store)));
	}
	else {
		const lists = store.filter(word => {
			return word.id !== id;
		});						
		
		const newStore = {
			id: id,
			right: findId[0].right + 1,
		};
		window.localStorage.setItem('words',  JSON.stringify([newStore].concat(lists)));

		let idLearnedWord = 0;		
		if (id >= 10) {
			idLearnedWord = parseFloat(id.toString().slice(0, -1));
		}		
		
		
		if (findId[0].right + 1 >= 3) {
			const words = wordsBD;
			const newStoreWords = getCurrentState();		// localstorage	answers
			const learedWordVies = words[idLearnedWord].value.length; // count vies default
			const learnedWords = getCurrentLearnedWordState(); // localstorage learned
			
			
			const countWordVies = newStoreWords.filter(word => {
				if (idLearnedWord == 0 && word.right > 2) {
					return word.id < 10;
				}	
				else if (idLearnedWord > 0 && word.id >= 10  && word.right > 2) {
					return word.id.toString().slice(0, -1) == idLearnedWord;
				} 				
			});
				
			//console.log(countWordVies.length);
			//console.log(learedWordVies);
			
			
			if (learedWordVies == countWordVies.length) {
				learnedWords.push(idLearnedWord);
				//console.log(learnedWords);
				window.localStorage.setItem('learnedWords',  JSON.stringify(learnedWords));
			}
		}
	}
}

const aswerNoRight:A = (store: any, id: number) => {
	const findId = store.filter( word => word.id == id);

	if(findId.length == 0) {		
		const newStore = {
			id: id,
			right: 0
		};
		window.localStorage.setItem('words',  JSON.stringify([newStore].concat(store)));
	}
	else {
		const lists = store.filter(word => {
			return word.id !== id;
		});						
		
		const newStore = {
			id: id,
			right: 0,
		};
		window.localStorage.setItem('words',  JSON.stringify([newStore].concat(lists)));
	}
}


export const Buttons: FunctionComponent<Props> = ({
	update, 
}) => {	

	const checkAnswer = (e) => {
		const store = getCurrentState();
		const id:number = parseFloat(document.getElementById('id-word-value')?.innerHTML ?? '');
		const right:number = parseFloat(document.getElementById('answer')?.innerHTML ?? '');
		const btn = e.target.getAttribute('class').indexOf("yes") >= 0 ? 1 : 0;		

		if(right == 0) {
			btn == 0 ? 
			document.getElementsByTagName('main')[0].style.background= "#83c784" : 
			document.getElementsByTagName('main')[0].style.background= "#7d2222";

			btn == 0 ? answerRight(store, id) : aswerNoRight(store, id);
			
			
			
		}
		else {
			btn == 0 ? 
			document.getElementsByTagName('main')[0].style.background= "#7d2222" : 
			document.getElementsByTagName('main')[0].style.background= "#83c784";
			
			btn == 0 ? aswerNoRight(store, id) : answerRight(store, id);
		}
		setTimeout(() => {
			document.getElementsByTagName('main')[0].style.background= "blanchedalmond";
			update();
		}, 2000);		
		
	}

	return (
		<div className={styles.wrap}>
			<button className={styles.yes} onClick={checkAnswer}>Да</button>
			<button className={styles.no} onClick={checkAnswer}>Нет</button>
		</div>
	)
}