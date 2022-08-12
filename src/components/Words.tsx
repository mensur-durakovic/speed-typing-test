import React from 'react'

interface WordsProps {
  words: string
}

const Words: React.FC<WordsProps> = ({ words }) => {
  return <div className='text-slate-500'>{words}</div>
}

export default Words
