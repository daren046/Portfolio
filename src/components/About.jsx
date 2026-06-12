import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Download, ArrowRight } from 'lucide-react'
import profilePic from '../assets/pfp.jpg'
import CinematicSectionHeader from './CinematicSectionHeader'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const highlights = [
    { label: 'Spécialité', value: 'Java / Spring Boot' },
    { label: 'Frontend', value: 'React / TypeScript' },
    { label: 'Formation', value: 'Master Gustave Eiffel' },
    { label: 'Localisation', value: 'Île-de-France' },
  ]

  return (
    <section
      id="about"
      className="py-20 border-t border-white/[0.08] relative overflow-hidden"
    >
      {/* Ambient background (subtle polish, no 3D) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(168,85,247,0.14),transparent_40%),radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
      <div className="container-custom section-padding">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <CinematicSectionHeader
            eyebrow="Qui suis-je ?"
            title={<span className="text-white">ABOUT ME</span>}
            subtitle="Java & écosystème web — de l’API aux interfaces, avec une approche produit."
            inView={inView}
          />

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Image/Visual */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <div className="relative max-w-md mx-auto">
                {/* Decorative elements (static, no rotating square / no 3D) */}
                <div className="absolute -inset-6 bg-gradient-to-br from-primary-500/15 via-purple-500/10 to-transparent rounded-3xl blur-2xl" />
                <div className="absolute -inset-4 rounded-3xl border border-primary-400/20" />
                <div className="absolute -inset-2 bg-gradient-to-br from-primary-500/20 to-purple-500/10 rounded-3xl blur-xl" />

                {/* Profile Image */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="relative rounded-3xl overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <img 
                    src={profilePic} 
                    alt="Daren Tagnan"
                    className="relative w-full aspect-square object-cover rounded-3xl border-2 border-white/10 shadow-2xl"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl" />
                </motion.div>

                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.8 }}
                  className="absolute -top-3 -right-3 bg-primary-500 text-white px-4 py-2 rounded-full font-mono text-sm shadow-lg shadow-primary-500/25"
                >
                  5+ ans XP
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 1 }}
                  className="absolute -bottom-3 -left-3 bg-black/80 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full font-mono text-sm shadow-lg"
                >
                  FullStack Dev
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white font-mono tracking-wider">
                Développeur Java FullStack
                <span className="text-primary-400">.</span>
              </h3>
              
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  Passionné par le développement depuis plus de 5 ans, je me spécialise 
                  dans la création d'applications web robustes et performantes avec 
                  l'écosystème <span className="text-primary-400">Java/Spring Boot</span>.
                </p>
                <p>
                  Mon expertise s'étend également au frontend moderne avec 
                  <span className="text-primary-400"> React</span>, 
                  <span className="text-primary-400"> TypeScript</span> et 
                  <span className="text-primary-400"> Tailwind CSS</span>, me permettant de 
                  livrer des solutions complètes de bout en bout.
                </p>
                <p>
                  Diplômé d'un Master à l'Université Gustave Eiffel, je suis constamment 
                  à la recherche de nouveaux défis techniques et d'opportunités 
                  d'apprentissage.
                </p>
              </div>

              {/* Quick info grid */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="group cine-surface relative overflow-hidden p-4"
                    whileHover={{ y: -6 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-400/15 via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <p className="text-white/50 text-xs font-mono tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-white font-mono font-medium">
                      {item.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <a
                  href="#contact"
                  className="btn-primary group inline-flex items-center gap-2"
                >
                  Me contacter
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="/CV_DAREN_TAGNAN_FR.pdf"
                  download="CV_Daren_Tagnan.pdf"
                  className="btn-secondary group inline-flex items-center gap-2"
                >
                  <Download className="w-4 h-4 group-hover:animate-bounce" />
                  Télécharger CV
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
