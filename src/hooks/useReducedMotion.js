import { useEffect, useState } from 'react'

export default function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return

    const update = () => setReduceMotion(Boolean(mq.matches))
    update()

    if (mq.addEventListener) {
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    }

    mq.addListener(update)
    return () => mq.removeListener(update)
  }, [])

  return reduceMotion
}
