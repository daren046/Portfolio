import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const Card3D = ({ 
  children, 
  className = '', 
  intensity = 0.5,
  glowColor = 'rgba(99, 102, 241, 0.4)',
  ...props 
}) => {
  const cardRef = useRef(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calcul de la rotation basée sur la position de la souris
    const rotateY = ((e.clientX - centerX) / rect.width) * 30 * intensity
    const rotateX = ((centerY - e.clientY) / rect.height) * 30 * intensity
    
    // Position pour l'effet de brillance
    const glowX = ((e.clientX - rect.left) / rect.width) * 100
    const glowY = ((e.clientY - rect.top) / rect.height) * 100
    
    setRotation({ x: rotateX, y: rotateY })
    setGlowPosition({ x: glowX, y: glowY })
  }

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 })
    setGlowPosition({ x: 50, y: 50 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotation.x,
        rotateY: rotation.y
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      {...props}
    >
      {/* Carte principale */}
      <div 
        className="relative w-full h-full"
        style={{ transform: 'translateZ(50px)' }}
      >
        {/* Effet de brillance qui suit la souris */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor} 0%, transparent 50%)`
          }}
        />
        
        {/* Bordure brillante */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background: `linear-gradient(145deg, transparent 30%, rgba(99, 102, 241, 0.2) 50%, transparent 70%)`,
            transform: 'translateZ(1px)'
          }}
        />
        
        {children}
      </div>
      
      {/* Ombre projetée */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-black/20 blur-lg"
        style={{
          transform: `translateZ(-50px) translateX(${rotation.y * 0.5}px) translateY(${-rotation.x * 0.5}px)`,
          zIndex: -1
        }}
        animate={{
          opacity: Math.abs(rotation.x) + Math.abs(rotation.y) > 0 ? 0.6 : 0
        }}
      />
    </motion.div>
  )
}

export default Card3D
