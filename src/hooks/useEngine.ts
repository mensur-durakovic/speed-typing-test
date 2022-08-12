import { useState, useCallback, useEffect } from 'react'
import useWords from './useWords'
import useCountdownTimer from './useCountdownTimer'
import useTypings from './useTypings'
import { countErrors } from '../utils'

export type State = 'start' | 'run' | 'finish'
const NUMBER_OF_WORDS = 12
const COUNTDOWN_SECONDS = 60

const useEngine = () => {
  const [state, setState] = useState<State>('start')
  const [errors, setErrors] = useState<number>(0)
  const [wpm, setWpm] = useState<number>(0)

  const { words, updateWords, allGeneratedWords, clearAllGeneratedWords } =
    useWords(NUMBER_OF_WORDS)
  const { timeLeft, startCountdown, resetCountdown } = useCountdownTimer(COUNTDOWN_SECONDS)
  const { typed, totalTyped, cursor, clearTyped, clearAllTyped, resetTotalTyped, allTyped } =
    useTypings(state !== 'finish')

  const start = state === 'start' && cursor > 0
  const allWordsTyped = cursor === words.length

  const sumErrors = useCallback(() => {
    const wordsWritten = words.substring(0, cursor)
    setErrors((previousErrors) => previousErrors + countErrors(typed, wordsWritten))
  }, [typed, words, cursor])

  const countWordsPerMinute = useCallback(() => {
    const allWords = allGeneratedWords.split(' ')
    const typedWords = allTyped.split(' ')
    let wpm = 0
    typedWords.forEach((word) => {
      const isCorrectlyTyped = allWords.find((w) => w === word)
      if (isCorrectlyTyped) {
        wpm += 1
      }
    })
    setWpm(wpm)
  }, [allGeneratedWords, allTyped])

  //when user starts typing, timer starts
  useEffect(() => {
    if (start) {
      setState('run')
      startCountdown()
    }
  }, [start, startCountdown, cursor])

  //when time is up, we set state to finished
  useEffect(() => {
    if (!timeLeft) {
      setState('finish')
      sumErrors()
      countWordsPerMinute()
    }
  }, [timeLeft, sumErrors])

  //if user types all words, we generate new set
  useEffect(() => {
    if (allWordsTyped) {
      sumErrors()
      updateWords()
      clearTyped()
    }
  }, [cursor, words, clearTyped, typed, allWordsTyped, updateWords, sumErrors])

  const restart = useCallback(() => {
    resetCountdown()
    resetTotalTyped()
    setState('start')
    setErrors(0)
    updateWords()
    clearTyped()
    clearAllTyped()
    clearAllGeneratedWords()
  }, [clearTyped, updateWords, resetCountdown, resetTotalTyped])

  const generateResultMessage = useCallback(() => {
    if (wpm < 25) {
      return 'You are SLOW typist! Practice more!'
    } else if (wpm > 25 && wpm < 45) {
      return 'You are AVERAGE typist! You can do better!'
    } else if (wpm > 45 && wpm < 65) {
      return 'You are FLUENT typist! Good job!'
    } else if (wpm > 65 && wpm < 85) {
      return 'You are FAST typist! Amazing typing skills!'
    } else if (wpm > 85) {
      return 'You are PRO typist! Are you human?'
    }
    return ''
  }, [wpm])

  return { state, words, timeLeft, typed, errors, totalTyped, restart, wpm, generateResultMessage }
}

export default useEngine
