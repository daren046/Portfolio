import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SEQUENCES = ['daren', 'dev']

const EasterEgg = () => {
  const [buffer, setBuffer] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      const key = e.key.length === 1 ? e.key.toLowerCase() : ''
      if (!key) return

      setBuffer((prev) => {
        const next = (prev + key).slice(-8)
        if (SEQUENCES.some((seq) => next.endsWith(seq))) {
          setMessage('Mode cinéma activé — bon visionnage.')
          setTimeout(() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }, 600)
          setTimeout(() => setMessage(null), 3200)
        }
        return next
      })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8 }}
          className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-xl border border-primary-400/30 bg-black/90 px-5 py-3 font-mono text-xs tracking-wider text-primary-200 shadow-[0_0_24px_rgba(14,165,233,0.12)] backdrop-blur-md"
          role="status"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default EasterEgg
