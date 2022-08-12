import React from 'react'

interface TimerProps {
  timeLeft: number
}

const Timer: React.FC<TimerProps> = ({ timeLeft }) => {
  return <h2 className='text-primary-400 text-medium'>Time: {timeLeft} sec</h2>
}

export default Timer
