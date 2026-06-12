import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Eye, Filter } from 'lucide-react'
import Card3D from './Card3D'
import CinematicSectionHeader from './CinematicSectionHeader'

const Portfolio = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [activeFilter, setActiveFilter] = useState('all')

  const filters = [
    { id: 'all', label: 'ALL' },
    { id: 'web', label: 'WEB' },
    { id: 'mobile', label: 'MOBILE' },
    { id: 'backend', label: 'BACKEND' },
    { id: 'automation', label: 'AUTOMATION' },
    { id: 'academic', label: 'ACADEMIC' }
  ]

  const projects = [
    {
      id: 1,
      title: 'Portfolio Personnel',
      category: 'web',
      description: 'Ce portfolio moderne avec React, Tailwind CSS et Framer Motion. Design responsive et animations fluides.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Vite'],
      liveUrl: null,
      githubUrl: 'https://github.com/daren046',
      featured: true
    },
    {
      id: 2,
      title: 'Scripts d\'Automatisation',
      category: 'automation',
      description: 'Suite de scripts pour l\'automatisation de collecte de données et web scraping avec gestion d\'APIs.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop',
      technologies: ['Python', 'JavaScript', 'Selenium', 'API REST'],
      liveUrl: null,
      githubUrl: 'https://github.com/daren046',
      featured: true
    },
    {
      id: 3,
      title: 'Application Web FullStack',
      category: 'web',
      description: 'Application web complète développée chez Cash Flow Positif avec Laravel, React et TypeScript.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      technologies: ['React', 'TypeScript', 'Laravel', 'PostgreSQL'],
      liveUrl: null,
      githubUrl: null,
      featured: true
    },
    {
      id: 4,
      title: 'API Backend Spring Boot',
      category: 'backend',
      description: 'API RESTful développée avec Spring Boot, sécurisée avec JWT et documentée avec Swagger.',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=400&fit=crop',
      technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
      liveUrl: null,
      githubUrl: 'https://github.com/daren046',
      featured: false
    },
    {
      id: 5,
      title: 'Dashboard Analytics',
      category: 'web',
      description: 'Tableau de bord interactif pour la visualisation de données avec graphiques dynamiques.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      technologies: ['React', 'Chart.js', 'Tailwind', 'FastAPI'],
      liveUrl: null,
      githubUrl: 'https://github.com/daren046',
      featured: false
    },
    {
      id: 6,
      title: 'Projets Universitaires',
      category: 'academic',
      description: 'Collection de projets réalisés durant mon Master : compilateurs, systèmes distribués, IA.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
      technologies: ['Java', 'C++', 'Python', 'Git'],
      liveUrl: null,
      githubUrl: 'https://github.com/daren046',
      featured: false
    }
  ]

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)

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
            subtitle="Aperçu de projets récents — web, backend, automation et travaux académiques."
            inView={inView}
          />

          {/* Filter Buttons */}
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
                className={`rounded-full px-5 py-2 text-xs font-mono tracking-wider transition-all duration-300 ${
                  activeFilter === filter.id
                    ? 'border border-primary-400/40 bg-gradient-to-r from-primary-500/90 to-purple-600/90 text-white shadow-lg shadow-primary-500/25 ring-1 ring-white/10'
                    : 'border border-white/[0.12] text-white/70 hover:border-primary-400/40 hover:text-primary-400'
                }`}
              >
                {filter.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Mosaic Grid */}
          <motion.div
            layout
            className="grid grid-cols-12 gap-4 auto-rows-[200px]"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => {
                // Définir différentes tailles pour créer un effet mosaïque
                const sizes = [
                  'col-span-12 md:col-span-8 row-span-2', // Large horizontal
                  'col-span-12 md:col-span-4 row-span-1', // Small
                  'col-span-12 md:col-span-6 row-span-1', // Medium
                  'col-span-12 md:col-span-4 row-span-2', // Tall
                  'col-span-12 md:col-span-8 row-span-1', // Wide
                  'col-span-12 md:col-span-6 row-span-2', // Medium tall
                ]
                const sizeClass = sizes[index % sizes.length]
                
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ 
                      duration: 0.3,
                      delay: index * 0.05
                    }}
                    className={`${sizeClass}`}
                  >
                    <Card3D
                      intensity={0.45}
                      glowColor="rgba(99, 102, 241, 0.28)"
                      className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-black/20 shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
                      onHoverStart={() => {
                        if (navigator.vibrate) navigator.vibrate(40)
                      }}
                    >
                    {/* Project Image */}
                    <div className="relative h-full w-full overflow-hidden rounded-2xl">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                      
                      {/* Scan Line Effect */}
                      <motion.div
                        initial={{ y: "-100%" }}
                        whileHover={{ y: "100%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent opacity-0 group-hover:opacity-100"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
                        <div className="text-center">
                          <h3 className="text-white font-mono tracking-wider text-lg mb-2">
                            {project.title}
                          </h3>
                          <p className="text-white/70 text-sm font-mono mb-4 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex space-x-3 justify-center">
                            {project.liveUrl && (
                              <motion.a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 text-white transition-all duration-150 hover:bg-white hover:text-black"
                                title="Voir le projet"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </motion.a>
                            )}
                            {project.githubUrl && (
                              <motion.a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/80 text-white transition-all duration-150 hover:bg-white hover:text-black"
                                title="Voir sur GitHub"
                              >
                                <Github className="w-4 h-4" />
                              </motion.a>
                            )}
                            {!project.liveUrl && !project.githubUrl && (
                              <span className="text-white/50 text-xs font-mono">Projet privé</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Project Number */}
                      <div className="absolute top-4 left-4 text-white font-mono text-sm tracking-wider">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      {/* Featured Indicator */}
                      {project.featured && (
                        <div className="absolute top-4 right-4 w-2 h-2 bg-primary-400"></div>
                      )}
                    </div>
                    </Card3D>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </motion.div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-center mt-12"
          >
            <motion.a
              href="https://github.com/daren046"
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
    </section>
  )
}

export default Portfolio
