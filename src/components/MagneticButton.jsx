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
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={buttonRef}
      animate={{
        x: position.x,
        y: position.y
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`relative overflow-hidden ring-1 ring-white/5 ${className}`}
      {...props}
    >
      {/* Effet de brillance qui suit la souris */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${position.x + 50}% ${position.y + 50}%, rgba(99, 102, 241, 0.1) 0%, transparent 70%)`
        }}
      />
      
      {children}
    </motion.button>
  )
}

export default MagneticButton
