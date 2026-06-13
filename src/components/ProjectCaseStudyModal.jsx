import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink } from 'lucide-react'
import { useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function ProjectCaseStudyModal({ project, onClose }) {
  const { t, dict } = useLanguage()
  const sectionLabels = dict.caseStudy.sections

  useEffect(() => {
    if (!project) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project?.caseStudy && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            aria-label={t('caseStudy.close')}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-white/10 bg-[#0a0a0c] shadow-2xl sm:rounded-2xl"
          >
            <div className="shrink-0 border-b border-white/[0.08] px-5 py-4 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="mb-1 font-mono text-[10px] tracking-[0.35em] text-primary-400 uppercase">
                    {t('caseStudy.label')}
                  </p>
                  <h2 id="case-study-title" className="font-mono text-xl font-bold tracking-wider text-white sm:text-2xl">
                    {project.title}
                  </h2>
                  {project.caseStudy.subtitle && (
                    <p className="mt-1 font-mono text-sm text-white/55">{project.caseStudy.subtitle}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 text-white/70 transition-colors hover:border-white/30 hover:text-white"
                  aria-label={t('caseStudy.close')}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              <div className="space-y-6">
                {Object.entries(project.caseStudy.sections).map(([key, text], index) => (
                  <div key={key} className="cine-surface p-4 sm:p-5">
                    <p className="mb-2 font-mono text-[10px] tracking-[0.3em] text-primary-400/90 uppercase">
                      {String(index + 1).padStart(2, '0')} — {sectionLabels[key] ?? key}
                    </p>
                    <p className="text-sm leading-relaxed text-white/75 sm:text-base">{text}</p>
                  </div>
                ))}
              </div>

              {project.technologies?.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-primary-400/25 bg-primary-500/10 px-2.5 py-1 font-mono text-[11px] text-primary-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="shrink-0 flex flex-wrap gap-3 border-t border-white/[0.08] p-4 sm:p-5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex flex-1 items-center justify-center gap-2 sm:flex-none"
                >
                  <ExternalLink className="h-4 w-4" />
                  {t('caseStudy.viewLive')}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex flex-1 items-center justify-center gap-2 sm:flex-none"
                >
                  <Github className="h-4 w-4" />
                  {t('caseStudy.github')}
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
