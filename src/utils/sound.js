const STORAGE_KEY = 'portfolio-sound'

export function isSoundEnabled() {
  return localStorage.getItem(STORAGE_KEY) === 'true'
}

export function setSoundEnabled(enabled) {
  localStorage.setItem(STORAGE_KEY, enabled ? 'true' : 'false')
}

export function playClickSound() {
  if (!isSoundEnabled()) return

  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(920, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(640, ctx.currentTime + 0.04)

    gain.gain.setValueAtTime(0.0001, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 0.008)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06)

    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.07)
    setTimeout(() => ctx.close(), 120)
  } catch {
    // Audio non disponible — silencieux
  }
}
