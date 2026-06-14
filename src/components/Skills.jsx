import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import CinematicSectionHeader from './CinematicSectionHeader'
import { useLanguage } from '../i18n/LanguageContext'
import { skillCategories } from '../i18n/translations'
import { resolveAssetUrl } from '../utils/resolveAssetUrl'
import RestApiIcon from './skill-icons/RestApiIcon'

const SKILL_ICON_COMPONENTS = {
  'REST API': RestApiIcon,
}

function SkillIcon({ name, icon, className }) {
  const CustomIcon = SKILL_ICON_COMPONENTS[name]
  if (CustomIcon) {
    return <CustomIcon className={className} />
  }
  return <img src={resolveAssetUrl(icon)} alt="" className={className} loading="lazy" />
}

function DeckBlock({ category, categoryLabel, inView, reduceMotion, catIndex, showCategoryLabel, chapterNumber, totalChapters, t, blurbs }) {
  const [index, setIndex] = useState(0)
  const skill = category.skills[index] ?? category.skills[0]
  const color = category.color
  const totalSkills = category.skills.length
  const progressPercent = totalSkills > 0 ? ((index + 1) / totalSkills) * 100 : 0
  const blurbFor = (name) => blurbs[name] || t('skills.defaultBlurb')

  useEffect(() => {
    setIndex(0)
  }, [category.id])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.55 + catIndex * 0.08 }}
      className="relative"
    >
      {showCategoryLabel && (
        <h3 className="sr-only">{categoryLabel}</h3>
      )}

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
        {/* Colonne cinéma : barre mobile en haut, puis chapitre + barre verticale desktop */}
        <div className="flex flex-col items-center gap-3 shrink-0 lg:w-[4.5rem]">
          {/* Mobile : barre de progression en premier (au-dessus du numéro de chapitre) */}
          <div className="lg:hidden w-full max-w-xs h-[4px] rounded-full bg-white/[0.07] overflow-hidden relative shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <motion.div
              className="absolute left-0 top-0 bottom-0 rounded-full"
              style={{ background: `linear-gradient(to right, ${color}, ${color}aa, ${color}66)` }}
              initial={false}
              animate={{ width: `${progressPercent}%` }}
              transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 32 }}
            />
          </div>

          <div className="flex flex-col items-center text-center">
            <span
              className="text-3xl sm:text-4xl font-light font-serif tabular-nums text-white/95 tracking-tight"
              aria-hidden
            >
              {chapterNumber}
            </span>
            <span className="text-[9px] font-mono tracking-[0.35em] text-white/35 uppercase mt-1">
              {t('skills.chapter')} {chapterNumber}/{String(totalChapters).padStart(2, '0')}
            </span>
          </div>

          <div className="hidden lg:flex flex-col items-center flex-1 min-h-0 w-full py-4">
            <div
              className="relative w-[3px] flex-1 min-h-[12rem] max-h-[28rem] rounded-full bg-white/[0.08] overflow-hidden"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={totalSkills}
              aria-valuenow={index + 1}
              aria-label={t('skills.techProgress').replace('{current}', index + 1).replace('{total}', totalSkills)}
            >
              <motion.div
                className="absolute bottom-0 left-0 right-0 rounded-full"
                style={{
                  background: `linear-gradient(to top, ${color}, ${color}99, ${color}44)`
                }}
                initial={false}
                animate={{ height: `${progressPercent}%` }}
                transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 280, damping: 32 }}
              />
            </div>
            <span className="text-[10px] font-mono text-white/45 mt-3 tabular-nums">
              {index + 1}/{totalSkills}
            </span>
          </div>
        </div>

        {/* Libellé vertical + ligne (style galerie) */}
        <div className="flex lg:flex-col items-center justify-center gap-4 lg:pt-4 shrink-0">
          <span
            className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-white/50 uppercase lg:[writing-mode:vertical-rl] lg:rotate-180 select-none"
            aria-hidden
          >
            {categoryLabel.replace(' & ', ' / ')}
          </span>
          <div
            className="hidden lg:block w-px h-40 bg-gradient-to-b from-transparent via-primary-400/40 to-transparent"
            style={{ boxShadow: `0 0 20px ${color}40` }}
          />
          <div className="lg:hidden w-full max-w-xs h-px bg-gradient-to-r from-transparent via-primary-400/30 to-transparent" />
        </div>

        {/* Zone deck : carte principale + miniatures */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-8 items-start">
            {/* Carte verticale principale */}
            <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px]" style={{ perspective: '1200px' }}>
              {/* Empilement type deck */}
              <div
                className="absolute -inset-1 rounded-[1.35rem] bg-gradient-to-br opacity-60 blur-xl pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${color}33, transparent 60%)` }}
              />
              <div className="absolute -right-2 top-6 bottom-6 w-full max-w-[280px] rounded-[1.25rem] border border-white/5 bg-white/[0.02] -z-10 translate-x-3 rotate-1" />
              <div className="absolute -right-1 top-3 bottom-3 w-full max-w-[280px] rounded-[1.25rem] border border-white/5 bg-white/[0.03] -z-10 translate-x-1.5 rotate-[0.5deg]" />

              <motion.div
                className="relative min-h-[360px] sm:min-h-[380px] rounded-[1.25rem] overflow-hidden border border-white/10 bg-black/40 shadow-2xl"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={reduceMotion ? {} : { rotateY: -6, rotateX: 4, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 220, damping: 22 }}
              >
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 50% at 50% 0%, ${color}55, transparent 70%)`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="relative flex h-full min-h-[360px] sm:min-h-[380px] flex-col p-5 sm:p-6"
                  >
                    <p className="shrink-0 text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
                      {categoryLabel}
                    </p>
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-4">
                      <div
                        className="rounded-2xl border border-white/10 bg-black/50 p-4 shadow-inner sm:p-5"
                        style={{ boxShadow: `0 0 40px ${color}22` }}
                      >
                        <SkillIcon name={skill.name} icon={skill.icon} className="h-14 w-14 sm:h-16 sm:w-16 object-contain" />
                      </div>
                      <h4 className="max-w-[220px] text-center font-mono text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
                        {skill.name}
                      </h4>
                    </div>
                    <div className="shrink-0 border-t border-white/10 pt-4">
                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2.5 text-xs font-mono tracking-[0.2em] text-white/70 transition-colors hover:border-primary-400/40 hover:text-primary-300 group/detail"
                        onClick={() => {
                          const el = document.querySelector('#portfolio')
                          el?.scrollIntoView({ behavior: 'instant', block: 'start' })
                        }}
                      >
                        {t('skills.viewProjects')}
                        <ArrowRight className="h-3.5 w-3.5 group-hover/detail:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="flex flex-col justify-center gap-4 min-h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${category.id}-${skill.name}`}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 backdrop-blur-sm"
                >
                  <p className="text-xs font-mono text-primary-400 tracking-widest mb-2">{t('skills.details')}</p>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    {blurbFor(skill.name)}
                  </p>
                </motion.div>
              </AnimatePresence>
              <p className="text-xs text-white/35 font-mono">
                {t('skills.deckHint')}
              </p>
            </div>
          </div>

          {/* Bandeau miniatures (deck) */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
            <div className="flex gap-2 overflow-x-auto pb-2 pt-1 px-1 [scrollbar-width:thin]">
              {category.skills.map((s, i) => {
                const active = i === index
                return (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`
                      relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl border overflow-hidden transition-all duration-300
                      ${active
                        ? 'border-primary-400 ring-2 ring-primary-500/30 scale-105 z-20'
                        : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/25'
                      }
                    `}
                    style={active ? { boxShadow: `0 8px 24px ${color}35` } : undefined}
                    aria-label={t('skills.showSkill').replace('{name}', s.name)}
                    aria-pressed={active}
                  >
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{ background: `radial-gradient(circle at 30% 20%, ${color}, transparent 70%)` }}
                    />
                    <SkillIcon name={s.name} icon={s.icon} className="relative w-full h-full object-contain p-2" />
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const Skills = () => {
  const { t, dict } = useLanguage()
  const blurbs = dict.skills.blurbs
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeCategory, setActiveCategory] = useState('all')
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mq) return

    const update = () => setReduceMotion(Boolean(mq.matches))
    update()

    if (mq.addEventListener) {
      mq.addEventListener('change', update)
      return () => mq.removeEventListener('change', update)
    }

    mq.addListener(update)
    return () => mq.removeListener(update)
  }, [])

  const filteredCategories = useMemo(
    () =>
      activeCategory === 'all'
        ? skillCategories
        : skillCategories.filter((cat) => cat.id === activeCategory),
    [activeCategory]
  )

  return (
    <section id="skills" className="relative overflow-hidden border-t border-white/[0.08] py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.1),transparent_50%)]" />
      <div className="container-custom section-padding relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <CinematicSectionHeader
            eyebrow={t('skills.eyebrow')}
            title={<span className="text-white">{t('skills.title')}</span>}
            subtitle={t('skills.subtitle')}
            inView={inView}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mb-14"
          >
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
                className={`rounded-full px-6 py-2 font-mono text-sm tracking-wider transition-all duration-300 ${
                activeCategory === 'all' ? 'btn-filter-active' : 'btn-filter-inactive'
              }`}
            >
              {t('skills.all')}
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-6 py-2 font-mono text-sm tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id ? 'btn-filter-active' : 'btn-filter-inactive'
                }`}
              >
                {t(`skills.categories.${cat.id}`).toUpperCase()}
              </button>
            ))}
          </motion.div>

          <div className="space-y-20">
            {filteredCategories.map((category, catIndex) => (
              <DeckBlock
                key={category.id}
                category={category}
                categoryLabel={t(`skills.categories.${category.id}`)}
                inView={inView}
                reduceMotion={reduceMotion}
                catIndex={catIndex}
                showCategoryLabel={activeCategory === 'all'}
                chapterNumber={String(catIndex + 1).padStart(2, '0')}
                totalChapters={filteredCategories.length}
                t={t}
                blurbs={blurbs}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
