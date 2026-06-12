import { useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isSoundEnabled, setSoundEnabled, playClickSound } from '../../utils/sound'

const SoundToggle = () => {
  const [on, setOn] = useState(false)

  useEffect(() => {
    setOn(isSoundEnabled())
  }, [])

  const toggle = () => {
    const next = !on
    setOn(next)
    setSoundEnabled(next)
    if (next) playClickSound()
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-5 right-5 z-[60] flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white/70 backdrop-blur-md transition-colors hover:border-amber-400/50 hover:text-amber-300"
      aria-label={on ? 'Désactiver les sons' : 'Activer les sons'}
      title={on ? 'Sons activés' : 'Activer les sons'}
    >
      {on ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
    </button>
  )
}

export default SoundToggle
