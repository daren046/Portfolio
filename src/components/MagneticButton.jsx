import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const MagneticButton = ({
  children,
  className = '',
  onClick,
  strength = 0.3,
  ...props
}) => {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={buttonRef}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden ring-1 ring-white/5 ${className}`}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${50 + position.x * 0.15}% ${50 + position.y * 0.15}%, rgba(56, 189, 248, 0.12) 0%, transparent 70%)`,
        }}
      />
      {children}
    </motion.button>
  )
}

export default MagneticButton
