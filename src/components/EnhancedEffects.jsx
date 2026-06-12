import { useEffect } from 'react'

const EnhancedEffects = () => {
  useEffect(() => {
    // Effets hover très simples et performants
    const addSimpleHoverEffects = () => {
      // Boutons seulement - plus simple
      const buttons = document.querySelectorAll('button, [role="button"]')
      buttons.forEach(button => {
        if (!button.hasEnhancedEffects) {
          button.addEventListener('mouseenter', (e) => {
            e.target.style.transform = 'translateY(-1px)'
            e.target.style.transition = 'transform 0.2s ease'
          })
          
          button.addEventListener('mouseleave', (e) => {
            e.target.style.transform = 'translateY(0)'
          })
          
          button.hasEnhancedEffects = true
        }
      })
    }

    // Observer pour détecter les nouveaux éléments (simplifié)
    const observer = new MutationObserver(addSimpleHoverEffects)
    observer.observe(document.body, { childList: true, subtree: true })

    // Appliquer les effets immédiatement
    addSimpleHoverEffects()

    // Scrollbar personnalisée seulement
    const style = document.createElement('style')
    style.textContent = `
      /* Scrollbar personnalisée */
      ::-webkit-scrollbar {
        width: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.3);
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(99, 102, 241, 0.5);
        border-radius: 4px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(99, 102, 241, 0.7);
      }
      
      /* Sélection de texte */
      ::selection {
        background: rgba(99, 102, 241, 0.3);
        color: white;
      }
    `
    document.head.appendChild(style)

    return () => {
      observer.disconnect()
      if (style.parentNode) {
        style.parentNode.removeChild(style)
      }
    }
  }, [])

  return null // Ce composant n'a pas de rendu visuel
}

export default EnhancedEffects
