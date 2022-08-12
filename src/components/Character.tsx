import React from 'react'
import cn from 'classnames'

interface CharacterProps {
  actual: string
  expected: string
}

const Character: React.FC<CharacterProps> = ({ actual, expected }) => {
  const isCorrect = actual === expected
  const isWhiteSpace = expected === ' '

  return (
    <span
      className={cn({
        'text-red-500': !isCorrect && !isWhiteSpace,
        'text-primary-400': isCorrect && !isWhiteSpace,
        'bg-red-500/50': !isCorrect && isWhiteSpace,
      })}
    >
      {expected}
    </span>
  )
}

export default Character
