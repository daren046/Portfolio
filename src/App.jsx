import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Stats from './components/Stats'
import Experience from './components/Experience'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import SectionMarquee from './components/effects/SectionMarquee'
import EnhancedEffects from './components/EnhancedEffects'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="App">
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen bg-black relative"
      >
        {/* Effets visuels globaux */}
        <EnhancedEffects enabled={!isLoading} />
        
        <Header />
        <main>
          <Hero />
          <About />
          <SectionMarquee />
          <Skills />
          <Stats />
          <Portfolio />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </div>
  )
}

export default App
