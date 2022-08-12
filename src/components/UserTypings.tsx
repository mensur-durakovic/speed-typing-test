import React from 'react'
import Character from './Character'
import Caret from './Caret'

interface UserTypingsProps {
  userInput: string
  className?: string
  words: string
}

const UserTypings: React.FC<UserTypingsProps> = ({ userInput, className, words }) => {
  const typedCharacters = userInput.split('')
  return (
    <div className={className}>
      {typedCharacters.map((char, index) => (
        <Character key={`${char}-${index}`} actual={char} expected={words[index]} />
      ))}
      <Caret />
    </div>
  )
}

export default UserTypings
