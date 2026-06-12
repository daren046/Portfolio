import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState, useEffect } from 'react'

const SkillBar = ({ 
  skill, 
  percentage, 
  delay = 0,
  color = 'primary',
  showGlow = true 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  })

  const [currentPercentage, setCurrentPercentage] = useState(0)

  useEffect(() => {
    if (inView) {
      // Animation du compteur
      let start = 0
      const increment = percentage / 60 // 60 frames for smooth animation
      const timer = setInterval(() => {
        start += increment
        if (start >= percentage) {
          setCurrentPercentage(percentage)
          clearInterval(timer)
        } else {
          setCurrentPercentage(Math.floor(start))
        }
      }, 16) // 60fps

      return () => clearInterval(timer)
    }
  }, [inView, percentage])

  const colorClasses = {
    primary: {
      bg: 'from-blue-500 to-purple-600',
      glow: 'shadow-blue-500/50',
      text: 'text-blue-400'
    },
    green: {
      bg: 'from-green-500 to-emerald-600',
      glow: 'shadow-green-500/50',
      text: 'text-green-400'
    },
    orange: {
      bg: 'from-orange-500 to-red-600',
      glow: 'shadow-orange-500/50',
      text: 'text-orange-400'
    },
    purple: {
      bg: 'from-purple-500 to-pink-600',
      glow: 'shadow-purple-500/50',
      text: 'text-purple-400'
    }
  }

  const colorTheme = colorClasses[color] || colorClasses.primary

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="mb-6"
    >
      {/* Skill Name and Percentage */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-white font-mono text-sm tracking-wider">
          {skill}
        </span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: delay + 0.5 }}
          className={`font-mono text-sm font-bold ${colorTheme.text}`}
        >
          {currentPercentage}%
        </motion.span>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
        {/* Background Glow */}
        {showGlow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.5 } : {}}
            transition={{ delay: delay + 0.3 }}
            className={`absolute inset-0 bg-gradient-to-r ${colorTheme.bg} blur-sm`}
            style={{ width: `${percentage}%` }}
          />
        )}

        {/* Main Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : {}}
          transition={{ 
            delay: delay + 0.2, 
            duration: 1.5, 
            ease: "easeOut" 
          }}
          className={`relative h-full bg-gradient-to-r ${colorTheme.bg} rounded-full ${showGlow ? `shadow-lg ${colorTheme.glow}` : ''}`}
        >
          {/* Shine Effect */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={inView ? { x: '200%' } : {}}
            transition={{ 
              delay: delay + 1.5, 
              duration: 0.8, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-1/3 skew-x-12"
          />

          {/* Animated Dots */}
          <div className="absolute inset-0 flex items-center justify-end pr-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { 
                  scale: [0, 1, 0], 
                  opacity: [0, 1, 0] 
                } : {}}
                transition={{
                  delay: delay + 2 + i * 0.1,
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
                className="w-1 h-1 bg-white rounded-full mx-0.5"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Skill Level Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: delay + 1.8 }}
        className="flex justify-end mt-1"
      >
        <span className={`text-xs font-mono ${colorTheme.text} opacity-70`}>
          {percentage >= 90 ? 'Expert' : 
           percentage >= 70 ? 'Avancé' : 
           percentage >= 50 ? 'Intermédiaire' : 'Débutant'}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default SkillBar

