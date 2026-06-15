import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
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

function CategoryHeader({ label, color }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span
        className="h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}55` }}
        aria-hidden
      />
      <h3 className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-white/50 sm:text-xs">
        {label}
      </h3>
      <div className="h-px flex-1 bg-white/[0.08]" aria-hidden />
    </div>
  )
}

function SkillChip({ skill, index, inView }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.04 + index * 0.025, duration: 0.35 }}
    >
      <div className="flex h-full min-h-[52px] items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2.5 transition-colors duration-200 hover:border-white/[0.12] hover:bg-white/[0.045]">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/[0.05] bg-black/50 p-1.5">
          <SkillIcon name={skill.name} icon={skill.icon} className="h-full w-full object-contain" />
        </div>
        <span className="font-mono text-xs leading-tight text-white/80 sm:text-[13px]">{skill.name}</span>
      </div>
    </motion.li>
  )
}

const Skills = () => {
  const { t } = useLanguage()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.06,
  })

  return (
    <section id="skills" className="relative border-t border-white/[0.08] py-20">
      <div className="container-custom section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-5xl"
        >
          <CinematicSectionHeader
            eyebrow={t('skills.eyebrow')}
            title={<span className="text-white">{t('skills.title')}</span>}
            subtitle={t('skills.subtitle')}
            inView={inView}
          />

          <div className="space-y-10 md:space-y-12">
            {skillCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 14 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + catIndex * 0.07, duration: 0.45 }}
              >
                <CategoryHeader
                  label={t(`skills.categories.${category.id}`).toUpperCase()}
                  color={category.color}
                />
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-2.5">
                  {category.skills.map((skill, index) => (
                    <SkillChip
                      key={skill.name}
                      skill={skill}
                      index={catIndex * 12 + index}
                      inView={inView}
                    />
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
