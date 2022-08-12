import React from 'react'

import Words from './components/Words'
import Timer from './components/Timer'
import RestartButton from './components/RestartButton'
import Results from './components/Results'
import UserTypings from './components/UserTypings'
import WordsContainer from './components/WordsContainer'

import useEngine from './hooks/useEngine'
import { calculateAccuracyPercentage } from './utils'

function App() {
  const { state, words, timeLeft, typed, totalTyped, errors, restart, wpm, generateResultMessage } =
    useEngine()

  return (
    <>
      <Timer timeLeft={timeLeft} />
      <WordsContainer>
        <Words words={words} />
        <UserTypings className='absolute inset-0' userInput={typed} words={words} />
      </WordsContainer>
      <RestartButton className='mx-auto mt-10 text-slate-500' onRestart={restart} />
      <Results
        className='mt-10'
        state={state}
        errorsCount={errors}
        totalCharactersTyped={totalTyped}
        accuracyPercentage={calculateAccuracyPercentage(errors, totalTyped)}
        wordsPerMinute={wpm}
        resultMessage={generateResultMessage()}
      />
    </>
  )
}

export default App
