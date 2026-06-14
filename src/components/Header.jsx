import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Mail } from 'lucide-react'
import profilePic from '../assets/pfp.jpg'
import { useLanguage } from '../i18n/LanguageContext'

function LangSwitch({ className = '' }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className={`inline-flex items-center rounded-lg border border-white/10 bg-white/[0.03] p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {['fr', 'en'].map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className={`rounded-md px-2.5 py-1 text-[11px] font-mono font-semibold tracking-wider transition-colors ${
            lang === code
              ? 'bg-primary-500/20 text-primary-300'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

const Header = () => {
  const { t } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = ['home', 'about', 'skills', 'portfolio', 'experience', 'stats', 'contact']
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: t('nav.home'), href: '#home', id: 'home' },
    { name: t('nav.about'), href: '#about', id: 'about' },
    { name: t('nav.skills'), href: '#skills', id: 'skills' },
    { name: t('nav.projects'), href: '#portfolio', id: 'portfolio' },
    { name: t('nav.experience'), href: '#experience', id: 'experience' },
    { name: t('nav.stats'), href: '#stats', id: 'stats' },
    { name: t('nav.contact'), href: '#contact', id: 'contact' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45 }}
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3 sm:py-4"
    >
      <div
        className={`max-w-6xl mx-auto relative overflow-hidden rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-black/75 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.04)_inset]'
            : 'bg-transparent border border-transparent'
        }`}
      >
        {isScrolled && (
          <div
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400/45 to-transparent pointer-events-none"
            aria-hidden
          />
        )}

        <div className="relative px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#home')
              }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 group shrink-0"
            >
              <div className="h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-primary-400/30 ring-1 ring-primary-400/20 sm:h-10 sm:w-10">
                <img
                  src={profilePic}
                  alt="Daren Tagnan"
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span className="hidden sm:flex flex-col leading-tight">
                <span className="text-[15px] font-semibold text-white tracking-wide font-mono">
                  Daren
                </span>
                <span className="text-[15px] font-semibold text-primary-400 tracking-wide font-mono">
                  Tagnan
                </span>
              </span>
            </motion.a>

            <nav className="hidden md:flex items-center justify-center gap-0.5 flex-1 min-w-0 mx-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-3 py-2 text-xs font-mono tracking-wide whitespace-nowrap transition-colors duration-300 rounded-lg ${
                    activeSection === item.id
                      ? 'text-primary-300'
                      : 'text-white/65 hover:text-white'
                  }`}
                >
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-lg border border-primary-400/30 bg-primary-500/10 shadow-[0_0_16px_rgba(80,104,224,0.14)]"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.45 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </motion.button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2 shrink-0">
              <LangSwitch />
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35 }}
                onClick={() => scrollToSection('#contact')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center gap-2 !px-4 !py-2 text-xs"
              >
                <Mail className="w-4 h-4 opacity-90" strokeWidth={2} />
                <span>{t('nav.contactCta')}</span>
              </motion.button>
            </div>

            <div className="flex md:hidden items-center gap-2">
              <LangSwitch />
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-white/80 transition-colors rounded-xl hover:bg-white/10"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              height: isMobileMenuOpen ? 'auto' : 0,
            }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 mt-3 space-y-1 border-t border-white/10">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-mono text-sm tracking-wide transition-colors ${
                    activeSection === item.id
                      ? 'bg-primary-500/15 text-primary-300 border border-primary-400/25'
                      : 'text-white/75 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollToSection('#contact')}
                className="btn-primary w-full mt-3 flex items-center justify-center gap-2 !py-3 text-sm"
              >
                <Mail className="w-4 h-4" />
                {t('nav.contactCta')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
