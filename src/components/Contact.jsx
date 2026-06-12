import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react'
import CinematicSectionHeader from './CinematicSectionHeader'
import { sendContactEmail } from '../utils/sendContactEmail'

const CONTACT_EMAIL = 'tagnandaren@gmail.com'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    setSubmitStatus(null)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await sendContactEmail(formData)
      setSubmitStatus({
        type: 'success',
        message: 'Message envoyé avec succès ! Je vous répondrai rapidement.',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch {
      setSubmitStatus({
        type: 'error',
        message: `Impossible d'envoyer le message. Écrivez-moi directement à ${CONTACT_EMAIL} ou réessayez dans quelques instants.`,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'tagnandaren@gmail.com',
      href: 'mailto:tagnandaren@gmail.com'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+33 6 58 41 92 30',
      href: 'tel:+33658419230'
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'Île-de-France, France',
      href: null
    }
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/daren046', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/daren-tagnan-0536201b1', label: 'LinkedIn' },
  ]

  return (
    <section id="contact" className="relative overflow-hidden py-20 border-t border-white/[0.08]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(99,102,241,0.08),transparent_55%)]" />
      <div className="container-custom section-padding relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <CinematicSectionHeader
            eyebrow="Disponibilité"
            title={<span className="text-white">CONTACT</span>}
            subtitle="Un projet, une mission ou une simple question — écris-moi, je réponds vite."
            inView={inView}
          />

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="cine-surface flex flex-col p-6 sm:p-8"
            >
              <h3 className="mb-6 text-sm font-mono font-bold uppercase tracking-[0.25em] text-primary-400/90">
                Contact direct
              </h3>

              <div className="mb-8 space-y-4">
                {contactInfo.map((info, index) => {
                  const rowClass =
                    'flex items-center gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-colors duration-300 group'
                  const inner = (
                    <>
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-500/15 ring-1 ring-primary-400/20 transition-colors group-hover:bg-primary-500/25">
                        <info.icon className="h-6 w-6 text-primary-400" />
                      </div>
                      <div>
                        <div className="font-mono text-sm tracking-wider text-white/80">{info.label}</div>
                        <div className="font-mono font-medium text-white">{info.value}</div>
                      </div>
                    </>
                  )
                  return info.href ? (
                    <motion.a
                      key={info.label}
                      href={info.href}
                      initial={{ opacity: 0, x: -30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`${rowClass} hover:border-primary-400/35`}
                    >
                      {inner}
                    </motion.a>
                  ) : (
                    <motion.div
                      key={info.label}
                      initial={{ opacity: 0, x: -30 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={rowClass}
                    >
                      {inner}
                    </motion.div>
                  )
                })}
              </div>

              {/* Social Links */}
              <div className="mt-auto border-t border-white/[0.08] pt-6">
                <h4 className="mb-4 text-sm font-mono font-bold uppercase tracking-[0.25em] text-white/45">
                  Réseaux
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-xl border border-white/[0.12] bg-white/[0.03] flex items-center justify-center text-white/80 hover:text-primary-400 hover:border-primary-400/40 hover:bg-primary-400/5 transition-colors duration-300"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="cine-surface p-6 sm:p-8 lg:p-10"
            >
              <h3 className="text-sm font-mono font-bold tracking-[0.25em] text-primary-400/90 uppercase mb-6">
                Envoyer un message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1 }}
                  >
                    <label htmlFor="name" className="block text-xs font-mono text-white/55 mb-2 tracking-wider uppercase">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="cine-input"
                      placeholder="Votre nom"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.1 }}
                  >
                    <label htmlFor="email" className="block text-xs font-mono text-white/55 mb-2 tracking-wider uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="cine-input"
                      placeholder="vous@email.com"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 }}
                >
                  <label htmlFor="subject" className="block text-xs font-mono text-white/55 mb-2 tracking-wider uppercase">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="cine-input"
                    placeholder="Sujet de votre message"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.3 }}
                >
                  <label htmlFor="message" className="block text-xs font-mono text-white/55 mb-2 tracking-wider uppercase">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="cine-input resize-none min-h-[140px]"
                    placeholder="Décrivez votre projet ou votre besoin…"
                  />
                </motion.div>

                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${
                      submitStatus.type === 'success'
                        ? 'border-green-500/30 bg-green-500/10 text-green-300'
                        : 'border-red-500/30 bg-red-500/10 text-red-300'
                    }`}
                  >
                    {submitStatus.type === 'success' ? (
                      <CheckCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    )}
                    <span>{submitStatus.message}</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Contact
