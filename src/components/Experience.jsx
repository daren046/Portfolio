import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Briefcase, GraduationCap, ChevronDown, Globe, Code } from 'lucide-react'
import CinematicSectionHeader from './CinematicSectionHeader'
import { useLanguage } from '../i18n/LanguageContext'

const AccordionItem = ({ item, isOpen, onToggle, type, index, statusOngoingLabel }) => {
  const isWork = type === 'work'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-all duration-300 backdrop-blur-sm ${
        isOpen ? 'border-primary-400/35 bg-white/[0.04]' : 'hover:border-white/[0.14]'
      }`}
    >
      {/* Header - Always visible */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${
              isWork ? 'bg-primary-500/20' : 'bg-purple-500/20'
            }`}
          >
            {isWork ? (
              <Briefcase className="h-5 w-5 text-primary-400" />
            ) : (
              <GraduationCap className="h-5 w-5 text-purple-400" />
            )}
          </div>
          
          {/* Title & Company/School */}
          <div>
            <h4 className="text-white font-mono font-bold text-sm md:text-base">
              {isWork ? item.position : item.degree}
            </h4>
            <p className={`text-sm font-mono ${isWork ? 'text-primary-400' : 'text-purple-400'}`}>
              {isWork ? item.company : item.school}
            </p>
          </div>
        </div>

        {/* Right side - Period & Chevron */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-white/50 text-xs font-mono">
            {item.period}
          </span>
          {isWork && item.contract && (
            <span className="hidden md:block px-2 py-1 bg-primary-500/20 text-primary-400 text-xs font-mono rounded">
              {item.contract}
            </span>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-white/50" />
          </motion.div>
        </div>
      </button>

      {/* Content - Expandable */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0 border-t border-white/10">
              <div className="pt-4 space-y-4">
                {/* Meta info */}
                <div className="flex flex-wrap gap-4 text-sm text-white/60 font-mono">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                  {!isWork && item.status && (
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      item.status === statusOngoingLabel
                        ? 'bg-yellow-500/20 text-yellow-400' 
                        : 'bg-green-500/20 text-green-400'
                    }`}>
                      {item.status}
                    </span>
                  )}
                </div>

                {/* Description (work only) */}
                {isWork && item.description && (
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Responsibilities (work only) */}
                {isWork && item.responsibilities && (
                  <ul className="text-white/60 text-sm space-y-2">
                    {item.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary-400 mt-0.5">▹</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Technologies (work only) */}
                {isWork && item.technologies && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-white/5 border border-white/10 text-white/70 text-xs rounded font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const Experience = () => {
  const { t, dict } = useLanguage()
  const experiences = dict.experience.work
  const formations = dict.experience.education
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [openItems, setOpenItems] = useState({})

  const toggleItem = (id) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section id="experience" className="relative overflow-hidden py-20 border-t border-white/[0.08]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(99,102,241,0.06),transparent_55%)]" />
      <div className="container-custom section-padding relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <CinematicSectionHeader
            eyebrow={t('experience.eyebrow')}
            title={<span className="text-white">{t('experience.title')}</span>}
            subtitle={t('experience.subtitle')}
            inView={inView}
          />

          <div className="mb-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-sm font-bold text-primary-400 font-mono tracking-wider mb-4 flex items-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              {t('experience.workTitle')}
            </motion.h3>

            <div className="space-y-3">
              {experiences.map((exp, index) => (
                <AccordionItem
                  key={exp.id}
                  item={exp}
                  isOpen={openItems[exp.id]}
                  onToggle={() => toggleItem(exp.id)}
                  type="work"
                  index={index}
                  statusOngoingLabel={t('experience.statusOngoing')}
                />
              ))}
            </div>
          </div>

          <div className="mb-8">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="mb-4 flex items-center gap-2 text-sm font-bold font-mono tracking-wider text-purple-300"
            >
              <GraduationCap className="h-4 w-4" />
              {t('experience.educationTitle')}
            </motion.h3>

            <div className="space-y-3">
              {formations.map((formation, index) => (
                <AccordionItem
                  key={formation.id}
                  item={formation}
                  isOpen={openItems[formation.id]}
                  onToggle={() => toggleItem(formation.id)}
                  type="education"
                  index={index}
                  statusOngoingLabel={t('experience.statusOngoing')}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            <div className="cine-surface p-4 sm:p-5">
              <h4 className="mb-3 flex items-center gap-2 font-mono text-sm font-bold text-white">
                <Globe className="h-4 w-4 text-primary-400" />
                {t('experience.languages')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {dict.experience.languageList.map((lang) => (
                  <span
                    key={lang}
                    className="rounded-lg border border-primary-500/25 bg-primary-500/10 px-3 py-1.5 font-mono text-xs text-primary-200"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="cine-surface p-4 sm:p-5">
              <h4 className="mb-3 flex items-center gap-2 font-mono text-sm font-bold text-white">
                <Code className="h-4 w-4 text-primary-400" />
                {t('experience.interests')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {dict.experience.interestList.map((interest) => (
                  <span
                    key={interest}
                    className="rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/75"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
