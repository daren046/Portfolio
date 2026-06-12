import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import CinematicSectionHeader from './CinematicSectionHeader'

const skillCategories = [
  {
    id: 'frontend',
    name: 'Frontend',
    color: '#61DAFB',
    skills: [
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
      { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
      { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    color: '#68BD45',
    skills: [
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
      { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
      { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg' },
    ]
  },
  {
    id: 'database',
    name: 'Databases',
    color: '#336791',
    skills: [
      { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
      { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
      { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
    ]
  },
  {
    id: 'tools',
    name: 'Tools & DevOps',
    color: '#2496ED',
    skills: [
      { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
      { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
      { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg' },
      { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
    ]
  }
]

const skillBlurbs = {
  React: 'Composants, hooks et écosystème moderne pour des interfaces réactives.',
  Angular: 'Applications structurées, RxJS et bonnes pratiques enterprise.',
  JavaScript: 'Base solide pour tout le front et l’écosystème web.',
  TypeScript: 'Typage pour fiabiliser le code à grande échelle.',
  HTML5: 'Sémantique et accessibilité au cœur du markup.',
  CSS3: 'Layouts, animations et design systems maintenables.',
  Tailwind: 'Rapidité de prototypage avec une cohérence visuelle forte.',
  Java: 'Backend robuste, orienté objet et écosystème mature.',
  Spring: 'API REST, sécurité et intégration dans le monde Java.',
  Python: 'Scripts, automation et services légers quand c’est le bon outil.',
  'Node.js': 'Services JavaScript côté serveur et intégration front/back.',
  PHP: 'Legacy et apps web classiques quand le contexte l’exige.',
  PostgreSQL: 'Données relationnelles, requêtes avancées et intégrité.',
  MySQL: 'Bases classiques pour apps web et reporting.',
  MongoDB: 'Documents et flexibilité pour certains cas d’usage.',
  Redis: 'Cache, sessions et perf là où la latence compte.',
  Docker: 'Environnements reproductibles et déploiements isolés.',
  Git: 'Versioning, branches et collaboration au quotidien.',
  GitHub: 'CI, revues et hébergement de code.',
  Linux: 'Serveurs, scripts et confort en ligne de commande.',
  'VS Code': 'IDE léger, extensions et productivité.',
}

function blurbFor(name) {
  return skillBlurbs[name] || `Technologie utilisée dans mes projets et mon environnement de travail.`
}

function DeckBlock({ category, inView, reduceMotion, catIndex, showCategoryLabel, chapterNumber, totalChapters }) {
  const [index, setIndex] = useState(0)
  const skill = category.skills[index] ?? category.skills[0]
  const color = category.color
  const totalSkills = category.skills.length
  const progressPercent = totalSkills > 0 ? ((index + 1) / totalSkills) * 100 : 0

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
        <h3 className="sr-only">{category.name}</h3>
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
              chap. {chapterNumber}/{String(totalChapters).padStart(2, '0')}
            </span>
          </div>

          <div className="hidden lg:flex flex-col items-center flex-1 min-h-0 w-full py-4">
            <div
              className="relative w-[3px] flex-1 min-h-[12rem] max-h-[28rem] rounded-full bg-white/[0.08] overflow-hidden"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={totalSkills}
              aria-valuenow={index + 1}
              aria-label={`Technologie ${index + 1} sur ${totalSkills}`}
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
            {category.name.replace(' & ', ' / ')}
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
                className="relative aspect-[3/4] rounded-[1.25rem] overflow-hidden border border-white/10 bg-black/40 shadow-2xl"
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
                    className="relative h-full flex flex-col p-6 sm:p-8"
                  >
                    <p className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase mb-6">
                      {category.name}
                    </p>
                    <div className="flex-1 flex flex-col items-center justify-center gap-5">
                      <div
                        className="rounded-2xl border border-white/10 bg-black/50 p-5 shadow-inner"
                        style={{ boxShadow: `0 0 40px ${color}22` }}
                      >
                        <img src={skill.icon} alt="" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-white text-center">
                        {skill.name}
                      </h4>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed mt-auto pt-6 border-t border-white/10">
                      {blurbFor(skill.name)}
                    </p>
                    <button
                      type="button"
                      className="mt-4 inline-flex items-center gap-2 self-end text-xs font-mono tracking-[0.2em] text-white/50 hover:text-primary-400 transition-colors group/detail"
                      onClick={() => {
                        const el = document.querySelector('#portfolio')
                        el?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      VOIR PROJETS
                      <ArrowRight className="w-3.5 h-3.5 group-hover/detail:translate-x-0.5 transition-transform" />
                    </button>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Panneau détails (portfolio) */}
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
                  <p className="text-xs font-mono text-primary-400 tracking-widest mb-2">DÉTAILS</p>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    J’utilise <span className="text-white font-medium">{skill.name}</span> dans mes livraisons : prototypes, features
                    métier et mise en production. La stack complète (front, API, données) est documentée dans la section projets.
                  </p>
                </motion.div>
              </AnimatePresence>
              <p className="text-xs text-white/35 font-mono">
                Sélectionne une miniature ci-dessous pour parcourir le deck.
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
                      relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl border overflow-hidden transition-all duration-200
                      ${active
                        ? 'border-primary-400 ring-2 ring-primary-500/30 scale-105 z-20'
                        : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/25'
                      }
                    `}
                    style={active ? { boxShadow: `0 8px 24px ${color}35` } : undefined}
                    aria-label={`Afficher ${s.name}`}
                    aria-pressed={active}
                  >
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{ background: `radial-gradient(circle at 30% 20%, ${color}, transparent 70%)` }}
                    />
                    <img src={s.icon} alt="" className="relative w-full h-full object-contain p-2" />
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
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <CinematicSectionHeader
            eyebrow="Stack"
            title={<span className="text-white">SKILLS</span>}
            subtitle="Technologies & outils — parcours en deck, une catégorie à la fois."
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
                activeCategory === 'all'
                  ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg shadow-primary-500/25 ring-1 ring-white/10'
                  : 'border border-white/[0.12] text-white/70 hover:border-primary-400/40 hover:text-primary-400'
              }`}
            >
              ALL
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-full px-6 py-2 font-mono text-sm tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-primary-500 to-purple-600 text-white shadow-lg shadow-primary-500/25 ring-1 ring-white/10'
                    : 'border border-white/[0.12] text-white/70 hover:border-primary-400/40 hover:text-primary-400'
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </motion.div>

          <div className="space-y-20">
            {filteredCategories.map((category, catIndex) => (
              <DeckBlock
                key={category.id}
                category={category}
                inView={inView}
                reduceMotion={reduceMotion}
                catIndex={catIndex}
                showCategoryLabel={activeCategory === 'all'}
                chapterNumber={String(catIndex + 1).padStart(2, '0')}
                totalChapters={filteredCategories.length}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
