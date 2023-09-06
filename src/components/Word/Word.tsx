"use client";

import { useState, useCallback, FunctionComponent } from 'react';
import styles from './word.module.css'


interface Props {
	wordsArr: any;
	numberWord: number;
 }

export const Word: FunctionComponent<Props> = ({
	wordsArr, 
	numberWord, 
}) => {	
	
	return (
		<div>
			<h1 className={styles.word}>{wordsArr[numberWord] ? wordsArr[numberWord].title : ''}</h1>
			<div id='id-word-value'>{wordsArr[numberWord] ? wordsArr[numberWord].id : 0}</div>
			<div id='answer'>{wordsArr[numberWord] ? wordsArr[numberWord].right : 0}</div>
		</div>
	)
}