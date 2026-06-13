import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart, ArrowUp, MapPin, Phone } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const Footer = () => {
  const { t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#portfolio' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.contact'), href: '#contact' },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/daren046', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/daren-tagnan-0536201b1', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:tagnandaren@gmail.com', label: 'Email' },
  ]

  return (
    <footer className="relative border-t border-white/[0.08] bg-black">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-900/10 to-transparent" />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400/35 to-transparent" />
      
      <div className="container-custom section-padding relative z-10">
        <div className="py-16 grid md:grid-cols-3 gap-12">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold font-mono tracking-wider text-white mb-4"
            >
              DAREN<span className="text-primary-400">.</span>DEV
            </motion.h3>
            <p className="text-white/60 font-mono text-sm leading-relaxed mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm font-mono">
              <MapPin className="w-4 h-4 text-primary-400" />
              <span>{t('contact.locationValue')}</span>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold font-mono tracking-wider text-white mb-6">
              {t('footer.navigation')}
            </h4>
            <ul className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-primary-400 transition-colors duration-300 font-mono text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold font-mono tracking-wider text-white mb-6">
              {t('footer.contact')}
            </h4>
            <div className="space-y-4 mb-6">
              <a 
                href="mailto:tagnandaren@gmail.com"
                className="flex items-center gap-3 text-white/60 hover:text-primary-400 transition-colors font-mono text-sm"
              >
                <Mail className="w-4 h-4" />
                tagnandaren@gmail.com
              </a>
              <a 
                href="tel:+33658419230"
                className="flex items-center gap-3 text-white/60 hover:text-primary-400 transition-colors font-mono text-sm"
              >
                <Phone className="w-4 h-4" />
                +33 6 58 41 92 30
              </a>
            </div>
            
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.04] text-white/60 transition-all duration-300 hover:border-primary-400/40 hover:text-primary-400"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] py-6 md:flex-row">
          <p className="text-white/40 text-sm font-mono flex items-center gap-2">
            © {currentYear} Daren Tagnan. {t('footer.madeWith')}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.span>
            {t('footer.andCoffee')}
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-white/60 hover:text-primary-400 transition-colors font-mono text-sm group"
          >
            <span>{t('footer.backToTop')}</span>
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-8 h-8 rounded-full border border-white/20 group-hover:border-primary-400/50 flex items-center justify-center transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.div>
          </motion.button>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-primary-500/70 to-transparent" />
    </footer>
  )
}

export default Footer
