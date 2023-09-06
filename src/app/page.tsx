"use client";
import { Word } from '@/components/Word/Word'
import { Buttons } from '@/components/Buttons/Buttons'
import { useReloadWord } from "../hooks/useReloadWord";
import { Header } from '@/components/Header/Header';
import styles from './page.module.css';
import { Suspense } from 'react';


export default function Home() {
  let {numberWord, update, wordsArr } = useReloadWord(0);	
  return ( 
    <main className={styles.main}>  
      <header  className={styles.header}>
        <Header />
      </header>
      <h2>Верно ли выделена ударная буква в слове?</h2>    
      <div className={styles.center}>
        <Word wordsArr={wordsArr} numberWord={numberWord} />
        <Buttons update={update} />
      </div>     
    </main>    
  )
}
