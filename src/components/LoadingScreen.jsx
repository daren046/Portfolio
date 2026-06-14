import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { LOADING_DURATION_MS } from '../constants/loading'

const LoadingScreen = ({ duration = LOADING_DURATION_MS, onComplete }) => {
  const { t } = useLanguage()
  const [progress, setProgress] = useState(0)
  const completedRef = useRef(false)

  useEffect(() => {
    completedRef.current = false
    const start = performance.now()
    let frameId

    const tick = (now) => {
      const elapsed = now - start
      const pct = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(pct)

      if (pct >= 100) {
        if (!completedRef.current) {
          completedRef.current = true
          onComplete?.()
        }
        return
      }

      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [duration, onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center overflow-hidden bg-[#050508]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(255,255,255,0.06),transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_100%,rgba(0,0,0,0.85),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-6 text-[10px] font-mono tracking-[0.45em] text-white/40"
        >
          {t('loading.label')}
        </motion.p>

        <div className="relative tabular-nums">
          <span className="block text-center font-serif text-7xl font-light leading-none text-white sm:text-8xl md:text-9xl">
            {progress}
          </span>
          <span className="mt-2 block text-center text-xs font-mono tracking-[0.35em] text-white/35">
            {t('loading.status')}
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 px-10 pb-12 sm:px-16">
        <div className="mx-auto h-px max-w-md bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="mx-auto mt-4 h-[3px] max-w-xs overflow-hidden rounded-full bg-white/[0.08]">
          <motion.div
            className="h-full rounded-full bg-white"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default LoadingScreen
