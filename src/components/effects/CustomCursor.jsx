import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import useReducedMotion from '../../hooks/useReducedMotion'

const CustomCursor = () => {
  const reduceMotion = useReducedMotion()
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const narrow = window.innerWidth < 768
    setEnabled(finePointer && !narrow && !reduceMotion)
  }, [reduceMotion])

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add('custom-cursor-active')

    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })

    const onOver = (e) => {
      const target = e.target
      if (!(target instanceof Element)) return
      const interactive = target.closest('a, button, [role="button"], input, textarea, label')
      setHovering(Boolean(interactive))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[70] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400 mix-blend-difference"
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 500, damping: 32, mass: 0.2 }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none fixed z-[69] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
        animate={{
          x: pos.x,
          y: pos.y,
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          opacity: hovering ? 0.9 : 0.45,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        aria-hidden
      />
    </>
  )
}

export default CustomCursor
