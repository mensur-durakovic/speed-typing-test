import React from 'react'
import { motion } from 'framer-motion'
import { formatPercentage } from '../utils'
import { State } from '../hooks/useEngine'

interface ResultsProps {
  errorsCount: number
  accuracyPercentage: number
  totalCharactersTyped: number
  state: State
  className?: string
  resultMessage: string
  wordsPerMinute: number
}

const Results: React.FC<ResultsProps> = ({
  errorsCount,
  accuracyPercentage,
  totalCharactersTyped,
  className,
  state,
  wordsPerMinute,
  resultMessage,
}) => {
  if (state !== 'finish') {
    return null
  }

  const initial = { opacity: 0 }
  const animate = { opacity: 1 }
  const duration = { duration: 0.3 }

  return (
    <motion.ul className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 0 }}
        className='text-xl font-semibold'
      >
        Results
      </motion.li>
      <motion.li initial={initial} animate={animate} transition={{ ...duration, delay: 0.5 }}>
        Accuracy: {formatPercentage(accuracyPercentage)}
      </motion.li>
      <motion.li
        initial={initial}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
        className='text-red-500'
      >
        Errors: {errorsCount}
      </motion.li>
      <motion.li initial={initial} animate={animate} transition={{ ...duration, delay: 1.4 }}>
        Typed characters: {totalCharactersTyped}
      </motion.li>
      <motion.li initial={initial} animate={animate} transition={{ ...duration, delay: 1.8 }}>
        Words per minute: {wordsPerMinute}
      </motion.li>
      <motion.li initial={initial} animate={animate} transition={{ ...duration, delay: 2.2 }}>
        {resultMessage}
      </motion.li>
    </motion.ul>
  )
}

export default Results
