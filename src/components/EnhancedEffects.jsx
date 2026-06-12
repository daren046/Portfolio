import ScrollProgress from './effects/ScrollProgress'
import EasterEgg from './effects/EasterEgg'

const EnhancedEffects = ({ enabled = true }) => {
  if (!enabled) return null

  return (
    <>
      <ScrollProgress />
      <EasterEgg />
    </>
  )
}

export default EnhancedEffects
