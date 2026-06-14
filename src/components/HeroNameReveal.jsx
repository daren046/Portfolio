import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const FULL_NAME = 'DAREN TAGNAN'

export default function HeroNameReveal({ reduceMotion = false, onComplete }) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [nameComplete, setNameComplete] = useState(false)
  const [hitFlash, setHitFlash] = useState(false)
  const completedRef = useRef(false)

  useEffect(() => {
    if (reduceMotion) {
      setDisplayedText(FULL_NAME)
      setNameComplete(true)
      setShowCursor(false)
      onComplete?.()
      return
    }

    let i = 0
    const timers = []
    const schedule = (fn, ms) => {
      const id = setTimeout(fn, ms)
      timers.push(id)
    }

    const finish = () => {
      setNameComplete(true)
      setHitFlash(true)
      schedule(() => setHitFlash(false), 420)
      schedule(() => setShowCursor(false), 900)
      if (!completedRef.current) {
        completedRef.current = true
        schedule(() => onComplete?.(), 320)
      }
    }

    const typeWriter = () => {
      if (i < FULL_NAME.length) {
        setDisplayedText(FULL_NAME.slice(0, i + 1))
        i++
        const char = FULL_NAME[i - 1]
        const delay = char === ' ' ? 220 : 105
        schedule(typeWriter, delay)
      } else {
        finish()
      }
    }

    schedule(typeWriter, 650)

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 480)

    return () => {
      timers.forEach(clearTimeout)
      clearInterval(cursorInterval)
    }
  }, [reduceMotion, onComplete])

  return (
    <motion.h1
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: nameComplete && hitFlash ? [1, 1.035, 1] : 1,
      }}
      transition={{
        delay: 0.2,
        scale: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
      className="relative mb-8 min-h-[120px] font-mono text-6xl font-bold tracking-wider md:min-h-[160px] md:text-8xl"
      aria-label="Daren Tagnan"
    >
      {/* Impact visuel quand le nom est complet */}
      <AnimatePresence>
        {hitFlash && (
          <motion.span
            key="hit-flash"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: [0, 0.55, 0], scale: [0.85, 1.2, 1.45] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="pointer-events-none absolute -inset-x-10 -inset-y-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(80,104,224,0.5)_0%,transparent_70%)]"
            aria-hidden
          />
        )}
      </AnimatePresence>

      <span className="relative text-white">
        {displayedText}

        {/* Curseur clignotant */}
        <motion.span
          animate={{ opacity: showCursor ? [1, 0, 1] : 0 }}
          transition={{ duration: 0.45, repeat: showCursor ? Infinity : 0 }}
          className="ml-1 text-primary-400"
          aria-hidden
        >
          |
        </motion.span>

        {/* Glow qui suit le texte */}
        <motion.span
          animate={{
            opacity: nameComplete ? [0.45, 0.9, 0.45] : [0.3, 0.65, 0.3],
          }}
          transition={{
            duration: nameComplete ? 2 : 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 -z-10 text-primary-400/50 blur-sm md:blur-md"
          aria-hidden
        >
          {displayedText}
        </motion.span>

        {/* Halo arrière plus fort à la fin */}
        {nameComplete && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.55, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 -z-20 text-primary-400/30 blur-xl"
            aria-hidden
          >
            {displayedText}
          </motion.span>
        )}

        {/* Glitch périodique — burst au moment du pop */}
        <motion.span
          animate={{
            x: nameComplete && hitFlash ? [0, -3, 3, -2, 0] : [0, -1, 1, 0],
            opacity: nameComplete && hitFlash ? [0, 0.65, 0.35, 0.5, 0] : [0, 0.4, 0],
          }}
          transition={{
            duration: nameComplete && hitFlash ? 0.2 : 0.1,
            repeat: nameComplete && hitFlash ? 0 : Infinity,
            repeatDelay: nameComplete ? 5 : 8,
          }}
          className="absolute inset-0 text-primary-400"
          style={{
            textShadow: '2px 0 #ff0040, -2px 0 #6b7fd7',
            filter: 'blur(0.3px)',
          }}
          aria-hidden
        >
          {displayedText}
        </motion.span>
      </span>
    </motion.h1>
  )
}
