import { useCallback, useEffect, useRef, useState } from 'react'

const useCountdownTimer = (seconds: number) => {
  const [timeLeft, setTimeLeft] = useState<number>(seconds)
  const intervalRef = useRef<NodeJS.Timer | null>(null)

  const startCountdown = useCallback(() => {
    console.log('startCountdown')

    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1)
    }, 1000)
  }, [setTimeLeft])

  const resetCountdown = useCallback(() => {
    console.log('resetCountdown')
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setTimeLeft(seconds)
  }, [seconds])

  //clear interval when time runs out
  useEffect(() => {
    if (!timeLeft && intervalRef.current) {
      console.log('useEffect clear timer!')
      clearInterval(intervalRef.current)
    }
  }, [timeLeft, intervalRef])

  return { timeLeft, startCountdown, resetCountdown }
}

export default useCountdownTimer
