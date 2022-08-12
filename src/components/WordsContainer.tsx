import React from 'react'

interface WordsContainerProps {
  children: React.ReactNode
}

const WordsContainer: React.FC<WordsContainerProps> = ({ children }) => {
  return <div className='relative max-w-xl mt-3 text-3xl leading-relaxed break-all'>{children}</div>
}

export default WordsContainer
