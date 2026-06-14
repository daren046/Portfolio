import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import MagneticButton from './MagneticButton'
import { useLanguage } from '../i18n/LanguageContext'
import { resolveAssetUrl } from '../utils/resolveAssetUrl'

const CV_PDF = resolveAssetUrl('CV_DAREN_TAGNAN_FR.pdf')

const Hero = () => {
  const { t } = useLanguage()
  const highlightWord = t('hero.highlightWord')
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const fullName = "DAREN TAGNAN"

  const cardRef = useRef(null)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, px: 0, py: 0 })
  const tiltRafRef = useRef(null)
  const tiltLastRef = useRef(tilt)

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return

    const update = () => setReduceMotion(Boolean(mq.matches))
    update()

    // Support older browsers.
    if (mq.addEventListener) {
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    }

    mq.addListener(update)
    return () => mq.removeListener(update)
  }, [])

  const handleCardMouseMove = (e) => {
    if (reduceMotion) return
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const dx = (e.clientX - rect.left) / rect.width - 0.5
    const dy = (e.clientY - rect.top) / rect.height - 0.5

    const next = {
      rx: dy * -8,
      ry: dx * 8,
      px: dx,
      py: dy
    }

    tiltLastRef.current = next
    if (tiltRafRef.current) return

    tiltRafRef.current = requestAnimationFrame(() => {
      setTilt(tiltLastRef.current)
      tiltRafRef.current = null
    })
  }

  const handleCardMouseLeave = () => {
    if (reduceMotion) return
    setTilt({ rx: 0, ry: 0, px: 0, py: 0 })
  }

  useEffect(() => {
    let i = 0
    const typeWriter = () => {
      if (i < fullName.length) {
        setDisplayedText(fullName.slice(0, i + 1))
        i++
        setTimeout(typeWriter, 150) // Vitesse de frappe
      } else {
        // Faire clignoter le curseur quelques fois puis l'enlever
        setTimeout(() => setShowCursor(false), 2000)
      }
    }
    
    // Démarrer le typewriter après 1 seconde
    setTimeout(typeWriter, 1000)
    
    // Faire clignoter le curseur
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    
    return () => clearInterval(cursorInterval)
  }, [])
  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_20%,rgba(14,165,233,0.14),transparent_55%),radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.9)_100%)]"
        />
        {/* Animated Grid */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            x: reduceMotion ? 0 : tilt.px * 7,
            y: reduceMotion ? 0 : tilt.py * 6
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`grid-v-${i}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.3, 0],
                scaleY: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: i * 0.5,
                ease: "easeInOut"
              }}
              className="absolute w-px h-full bg-primary-400/30"
              style={{ left: `${i * 10}%` }}
            />
          ))}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`grid-h-${i}`}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.2, 0],
                scaleX: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity, 
                delay: i * 0.8,
                ease: "easeInOut"
              }}
              className="absolute h-px w-full bg-primary-400/20"
              style={{ top: `${i * 16.66}%` }}
            />
          ))}
        </motion.div>
        
        {/* Floating Elements (kept from your base, softened) */}
        <motion.div
          className="absolute inset-0"
          animate={{
            x: reduceMotion ? 0 : tilt.px * 10,
            y: reduceMotion ? 0 : tilt.py * 8
          }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`float-${i}`}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0
              }}
              animate={{
                y: [null, -50, null],
                opacity: [0, 0.4, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 1.2,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 border border-primary-400/40"
            />
          ))}
        </motion.div>
      </div>

      <div className="container-custom section-padding text-center relative z-10">
        <motion.div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          initial={{ opacity: 0, y: 50, rotateX: 0, rotateY: 0 }}
          animate={{
            opacity: 1,
            y: 0,
            rotateX: reduceMotion ? 0 : tilt.rx,
            rotateY: reduceMotion ? 0 : tilt.ry
          }}
          transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="max-w-4xl mx-auto"
        >
          {/* Name avec effet Typewriter */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-8 font-mono tracking-wider relative min-h-[120px] md:min-h-[160px]"
          >
            <span className="text-white relative">
              {displayedText}
              
              {/* Curseur clignotant */}
              <motion.span
                animate={{ opacity: showCursor ? [1, 0, 1] : 0 }}
                transition={{ duration: 0.5, repeat: showCursor ? Infinity : 0 }}
                className="text-primary-400 ml-1"
              >
                |
              </motion.span>
              
              {/* Text Glow qui suit le texte (adoucit légèrement) */}
              <motion.span
                animate={{ 
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 text-primary-400/40 blur-sm"
              >
                {displayedText}
              </motion.span>
              
              {/* Glitch Effect périodique (plus subtil) */}
              <motion.span
                animate={{ 
                  x: [0, -1, 1, 0],
                  opacity: [0, 0.4, 0]
                }}
                transition={{ 
                  duration: 0.1,
                  repeat: Infinity,
                  repeatDelay: 8
                }}
                className="absolute inset-0 text-primary-400"
                style={{ 
                  textShadow: '1px 0 #ff0040, -1px 0 #00ffff',
                  filter: 'blur(0.3px)'
                }}
              >
                {displayedText}
              </motion.span>
            </span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white mb-12 font-mono tracking-widest"
            style={{ perspective: '900px' }}
          >
            {t('hero.rolePrefix') && (
              <span className="text-white">{t('hero.rolePrefix')} </span>
            )}
            <motion.span
              className="relative inline-block"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{
                rotateY: reduceMotion ? 0 : tilt.ry * 0.6,
                rotateX: reduceMotion ? 0 : tilt.rx * -0.6
              }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            >
              <span
                className="absolute left-0 top-0 text-primary-400/25 blur-[0.2px]"
                style={{ transform: 'translate3d(2px, 2px, -14px)' }}
                aria-hidden
              >
                {highlightWord}
              </span>
              <span
                className="absolute left-0 top-0 text-primary-400/15"
                style={{ transform: 'translate3d(4px, 4px, -26px)' }}
                aria-hidden
              >
                {highlightWord}
              </span>
              <span
                className="relative text-white text-shadow-glow"
                style={{ transform: reduceMotion ? 'translateZ(0px)' : 'translateZ(10px)' }}
              >
                {highlightWord}
              </span>
            </motion.span>{' '}
            <span className="text-white">{t('hero.roleSuffix')}</span>
          </motion.h2>

          {/* CTA Buttons Magnétiques */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <MagneticButton
              onClick={() => document.querySelector('#portfolio')?.scrollIntoView({ behavior: 'smooth' })}
              strength={0.4}
              className="group relative rounded-xl border-2 border-white text-white transition-all duration-500 hover:bg-white hover:text-black px-8 py-4 font-mono tracking-wider ring-1 ring-white/10"
            >
              <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-white"
              />
              <span className="relative z-10 flex items-center gap-2">
                {t('hero.viewProjects')}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-lg"
                >
                  →
                </motion.span>
              </span>
            </MagneticButton>
            
            <a href={CV_PDF} download="CV_Daren_Tagnan.pdf" target="_blank" rel="noopener noreferrer">
              <MagneticButton
                strength={0.4}
                className="group relative rounded-xl border-2 border-white/40 text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-black px-8 py-4 font-mono tracking-wider ring-1 ring-white/10"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-white"
                />
                <span className="relative z-10 flex items-center gap-2">
                  {t('hero.downloadCv')}
                  <motion.span
                    whileHover={{ y: [0, -2, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="text-lg"
                  >
                    ↓
                  </motion.span>
                </span>
              </MagneticButton>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-colors duration-300"
          aria-label={t('hero.scrollDown')}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  )
}

export default Hero
