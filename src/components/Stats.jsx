import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
import { Code, Briefcase, Coffee, Award } from 'lucide-react'
import CinematicSectionHeader from './CinematicSectionHeader'

const AnimatedCounter = ({ value, duration = 2 }) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 })

  useEffect(() => {
    if (inView) {
      const controls = animate(count, parseInt(value), { duration })
      return controls.stop
    }
  }, [inView, value, count, duration])

  return <motion.span ref={ref}>{rounded}</motion.span>
}

const Stats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  })

  const stats = [
    {
      icon: Briefcase,
      value: '3',
      suffix: '+',
      label: "Années d'expérience",
      color: '#6366F1'
    },
    {
      icon: Code,
      value: '15',
      suffix: '+',
      label: 'Technologies maîtrisées',
      color: '#8B5CF6'
    },
    {
      icon: Award,
      value: '10',
      suffix: '+',
      label: 'Projets réalisés',
      color: '#EC4899'
    },
    {
      icon: Coffee,
      value: '1000',
      suffix: '+',
      label: 'Cafés consommés',
      color: '#F59E0B'
    }
  ]

  return (
    <section id="stats" className="relative overflow-hidden border-t border-white/[0.08] py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-900/10 via-transparent to-purple-900/10" />
      <div className="container-custom section-padding relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <CinematicSectionHeader
            eyebrow="Repères"
            title={<span className="text-white">CHIFFRES</span>}
            subtitle="Quelques indicateurs — expérience, stack, projets et carburant."
            inView={inView}
          />

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.15 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative"
              >
                <div className="cine-surface relative overflow-hidden p-5 text-center transition-all duration-300 hover:border-white/[0.14] sm:p-6">
                  <div
                    className="pointer-events-none absolute inset-0 -z-0 rounded-2xl opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: stat.color }}
                  />
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ delay: 0.3 + index * 0.15, type: 'spring' }}
                      className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${stat.color}22` }}
                    >
                      <stat.icon className="h-7 w-7" style={{ color: stat.color }} />
                    </motion.div>

                    <div className="mb-2 font-mono text-4xl font-bold text-white md:text-5xl">
                      <AnimatedCounter value={stat.value} />
                      <span style={{ color: stat.color }}>{stat.suffix}</span>
                    </div>

                    <p className="font-mono text-sm tracking-wider text-white/60">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Stats
