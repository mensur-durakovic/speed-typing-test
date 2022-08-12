import { useState, useCallback } from 'react'
import { faker } from '@faker-js/faker'

const generateWords = (count: number) => {
  return faker.random.words(count).toLowerCase()
}

const useWords = (count: number) => {
  const startingWords = generateWords(count)
  const [words, setWords] = useState<string>(startingWords)
  const [allGeneratedWords, setAllGeneratedWords] = useState<string>(startingWords)

  const updateWords = useCallback(() => {
    const newWords = generateWords(count)

    setWords(newWords)
    setAllGeneratedWords((curr) => curr + ' ' + newWords)
  }, [count])

  const clearAllGeneratedWords = useCallback(() => {
    setAllGeneratedWords('')
  }, [])

  return { words, allGeneratedWords, updateWords, clearAllGeneratedWords }
}

export default useWords
