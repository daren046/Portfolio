import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, BookOpen } from 'lucide-react'
import CinematicSectionHeader from './CinematicSectionHeader'
import ProjectCaseStudyModal from './ProjectCaseStudyModal'
import { GITHUB_USERNAME, buildProjectFromRepo, categoryFallbackImages, GRID_SIZES, sortProjects } from '../data/projects'

function ProjectActions({ project, onOpenCaseStudy, compact = false }) {
  const btnClass = compact
    ? 'flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 text-white transition-all duration-150 hover:bg-white hover:text-black'
    : 'inline-flex items-center gap-2 rounded-xl border border-white/25 px-4 py-2 font-mono text-xs tracking-wider text-white transition-all hover:border-primary-400/50 hover:bg-primary-500/10 hover:text-primary-200'

  return (
    <div className={`flex ${compact ? 'justify-center gap-3' : 'flex-wrap justify-center gap-2'}`}>
      {project.liveUrl && (
        <motion.a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={btnClass}
          title="Voir le projet en live"
          onClick={(e) => e.stopPropagation()}
        >
          {compact ? <ExternalLink className="w-4 h-4" /> : (
            <>
              <ExternalLink className="w-3.5 h-3.5" />
              Live
            </>
          )}
        </motion.a>
      )}
      {project.caseStudy && (
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={compact ? btnClass : `${btnClass} border-primary-400/40 bg-primary-500/10`}
          title="Lire la case study"
          onClick={(e) => {
            e.stopPropagation()
            onOpenCaseStudy(project)
          }}
        >
          {compact ? <BookOpen className="w-4 h-4" /> : (
            <>
              <BookOpen className="w-3.5 h-3.5" />
              Case study
            </>
          )}
        </motion.button>
      )}
      {project.githubUrl && (
        <motion.a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={btnClass}
          title="Voir sur GitHub"
          onClick={(e) => e.stopPropagation()}
        >
          {compact ? <Github className="w-4 h-4" /> : (
            <>
              <Github className="w-3.5 h-3.5" />
              GitHub
            </>
          )}
        </motion.a>
      )}
    </div>
  )
}

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeFilter, setActiveFilter] = useState('all')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [caseStudyProject, setCaseStudyProject] = useState(null)

  const filters = [
    { id: 'all', label: 'ALL' },
    { id: 'web', label: 'WEB' },
    { id: 'backend', label: 'BACKEND' },
    { id: 'academic', label: 'ACADEMIC' }
  ]

  useEffect(() => {
    let cancelled = false

    async function loadProjects() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`
        )
        if (!response.ok) throw new Error('GitHub API indisponible')

        const repos = await response.json()
        const publicRepos = sortProjects(
          repos
            .filter((repo) => !repo.fork && !repo.private)
            .map(buildProjectFromRepo)
        )

        if (!cancelled) setProjects(publicRepos)
      } catch {
        if (!cancelled) setProjects([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadProjects()
    return () => { cancelled = true }
  }, [])

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="portfolio" className="relative overflow-hidden py-20 border-t border-white/[0.08]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(168,85,247,0.06),transparent_50%)]" />
      <div className="container-custom section-padding relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="max-w-7xl mx-auto"
        >
          <CinematicSectionHeader
            eyebrow="Sélection"
            title={<span className="text-white">PROJECTS</span>}
            subtitle="Projets open source — demos live, code GitHub et case studies."
            inView={inView}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
          >
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                type="button"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveFilter(filter.id)}
                className={activeFilter === filter.id ? 'btn-filter-active' : 'btn-filter-inactive'}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>

          {loading && (
            <p className="text-center text-white/50 font-mono text-sm mb-8">Chargement des projets GitHub…</p>
          )}

          {!loading && filteredProjects.length === 0 && (
            <p className="text-center text-white/50 font-mono text-sm mb-8">Aucun projet dans cette catégorie.</p>
          )}

          <div className="grid grid-cols-12 gap-4 auto-rows-[220px] md:auto-rows-[240px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project, index) => {
                const sizeClass = GRID_SIZES[project.gridSize] ?? GRID_SIZES.medium
                const isLargeTile = project.gridSize === 'large' || project.gridSize === 'tall'

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{
                      duration: 0.15,
                      delay: index * 0.02,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`${sizeClass}`}
                  >
                    <div className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 h-full w-full object-cover object-center filter grayscale transition-[filter] duration-150 ease-out group-hover:grayscale-0"
                        style={{ objectPosition: project.imagePosition ?? 'center center' }}
                        onError={(e) => {
                          e.currentTarget.src = categoryFallbackImages[project.category] ?? categoryFallbackImages.web
                        }}
                      />

                      <div className="absolute inset-0 flex items-center justify-center overflow-y-auto bg-black/85 p-3 opacity-0 transition-opacity duration-150 group-hover:opacity-100 sm:p-5">
                        <div
                          className={`w-full rounded-2xl border border-white/15 bg-black/95 px-5 py-6 text-center shadow-2xl backdrop-blur-md sm:px-7 sm:py-8 ${
                            isLargeTile ? 'max-w-2xl' : 'max-w-md'
                          }`}
                        >
                          <h3 className="mb-3 font-mono text-xl tracking-wider text-white sm:text-2xl">
                            {project.title}
                          </h3>
                          <p className="mx-auto mb-4 font-mono text-sm leading-relaxed text-white/75 sm:text-base">
                            {project.shortDescription ?? project.description}
                          </p>
                          {project.technologies.length > 0 && (
                            <div className="mb-5 flex flex-wrap justify-center gap-2">
                              {project.technologies.map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-full border border-white/20 px-2.5 py-1 font-mono text-[11px] text-white/70"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                          <ProjectActions
                            project={project}
                            onOpenCaseStudy={setCaseStudyProject}
                            compact={!isLargeTile}
                          />
                        </div>
                      </div>

                      <div className="absolute top-4 left-4 font-mono text-sm tracking-wider text-white">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      {project.featured && (
                        <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-primary-400" />
                      )}
                    </div>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary inline-flex items-center gap-2 px-8 py-3"
            >
              <Github className="w-4 h-4" />
              <span>VOIR PLUS SUR GITHUB</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <ProjectCaseStudyModal
        project={caseStudyProject}
        onClose={() => setCaseStudyProject(null)}
      />
    </section>
  )
}

export default Portfolio
