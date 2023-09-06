"use client";

import { useState, useEffect, FunctionComponent } from 'react';
import { wordsBD } from '../../data/words';
import styles from './header.module.css'

const getCurrentLearnedWordState = () => {
	try {
		const currentState = (JSON.parse(window.localStorage.getItem('learnedWords') || '[]'));
		return currentState;
	}
	catch(err) {
		
	}
	return [];
}

const cleanAll = () => {
	if (confirm("Вы уверены что хотите очистить всю историю выученных слов?")) {
		window.localStorage.setItem('words', '[]');
		window.localStorage.setItem('learnedWords', '[]');
		location.reload()
	} 	
}

export const Header: FunctionComponent = () => {	
	let [currentLearnedLength, setСurrentLearnedLength] = useState(getCurrentLearnedWordState().length);	
	const wordsLength = Object.keys(wordsBD).length;	

	useEffect(() => {
		document.getElementById('leandedWord')!.innerHTML = getCurrentLearnedWordState().length;		
	}, [getCurrentLearnedWordState().length])
	
	return (
		<>
			<div>Всего слов: {wordsLength}</div>
			<div>Выучено слов: 
				<span id="leandedWord">
				{currentLearnedLength}
				</span>
				</div>
			<div>
				<button className={styles.btn} onClick={cleanAll}>Начать сначала</button>
			</div>
		</>
		
	)
}