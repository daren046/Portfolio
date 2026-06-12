import { motion } from 'framer-motion'

/**
 * Titre de section aligné sur la DA « cinéma » (header / Skills) :
 * eyebrow optionnel, titre, sous-titre, puis barre lumineuse.
 */
export default function CinematicSectionHeader({
  eyebrow,
  title,
  subtitle,
  inView,
  delay = 0.08
}) {
  return (
    <>
      <div className="text-center mb-8">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay }}
            className="text-primary-400/90 font-mono text-xs tracking-[0.3em] uppercase mb-4 block"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: delay + 0.08 }}
          className="text-4xl md:text-5xl font-bold mb-4 font-mono tracking-wider text-white"
        >
          {title}
        </motion.div>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: delay + 0.16 }}
            className="text-lg text-white/65 max-w-3xl mx-auto font-mono tracking-wide leading-relaxed px-2"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scaleX: 0.92 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ delay: delay + 0.22, duration: 0.55 }}
        className="mb-12 flex items-center justify-center gap-3 px-4"
        aria-hidden
      >
        <div className="h-px flex-1 max-w-[min(180px,28vw)] bg-gradient-to-r from-transparent via-white/25 to-white/10" />
        <div className="flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary-400/90 shadow-[0_0_12px_rgba(56,189,248,0.5)]" />
          <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-primary-500/80 to-purple-500/50" />
          <div className="h-1 w-1 rounded-full bg-purple-400/70 shadow-[0_0_12px_rgba(168,85,247,0.35)]" />
        </div>
        <div className="h-px flex-1 max-w-[min(180px,28vw)] bg-gradient-to-l from-transparent via-white/25 to-white/10" />
      </motion.div>
    </>
  )
}
