'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import SectionHeader from './draft/SectionHeader'

export default function Contact() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to a backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Shared input styling — drafting sheet inputs: paper-2 fill, hairline border,
  // square corners, mono, accent focus ring.
  const fieldClasses =
    'w-full border border-hairline bg-paper-2 px-4 py-3 font-sans text-ink placeholder:text-ink-soft/70 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent'

  // Spec-row contact records (right-aligned reference tags, drawing-style)
  const records = [
    {
      ref: 'C—01',
      icon: Mail,
      label: t('contact.email'),
      value: 'ghada.turkiditgaraali@esprit.tn',
      href: 'mailto:ghada.turkiditgaraali@esprit.tn',
    },
    {
      ref: 'C—02',
      icon: Phone,
      label: t('contact.phone'),
      value: '216-26-016-352',
      href: 'tel:216-26-016-352',
    },
    {
      ref: 'C—03',
      icon: MapPin,
      label: t('contact.location'),
      value: 'Hammamet, Nabeul, Tunisia',
      href: null,
    },
  ]

  return (
    <section id="contact" className="section-pad">
      <div className="sheet">
        <SectionHeader number="06" marker="F—F" title={t('contact.title')} />

        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduce ? 0 : 0.5 }}
          className="max-w-2xl border-l-2 border-accent pl-4 text-base text-ink-soft md:text-lg"
        >
          {t('contact.subtitle')}
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-14 lg:grid-cols-2">
          {/* ---------- LEFT: CONTACT INFO ---------- */}
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: reduce ? 0 : 0.5 }}
          >
            <div className="label mb-3">CONTACT — INFO</div>
            <h3 className="font-display text-2xl font-bold leading-tight text-ink md:text-3xl">
              {t('contact.info')}
            </h3>
            <p className="mt-4 max-w-md text-ink-soft">{t('contact.infoDesc')}</p>

            {/* spec-row records */}
            <div className="mt-8 border-t border-hairline">
              {records.map((rec) => {
                const Icon = rec.icon
                const inner = (
                  <>
                    <span className="flex h-11 w-11 flex-none items-center justify-center border border-hairline bg-paper-2 transition-colors group-hover:border-accent">
                      <Icon className="h-5 w-5 text-accent" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="label block">{rec.label}</span>
                      <span className="mt-1 block break-words font-mono text-sm text-ink transition-colors group-hover:text-accent">
                        {rec.value}
                      </span>
                    </span>
                    <span className="ml-auto hidden self-start font-mono text-[11px] tracking-label text-ink-soft sm:block">
                      {rec.ref}
                    </span>
                  </>
                )

                if (rec.href) {
                  return (
                    <a
                      key={rec.ref}
                      href={rec.href}
                      className="group flex items-center gap-4 border-b border-hairline py-4 transition-colors hover:bg-paper-2/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    >
                      {inner}
                    </a>
                  )
                }
                return (
                  <div
                    key={rec.ref}
                    className="group flex items-center gap-4 border-b border-hairline py-4"
                  >
                    {inner}
                  </div>
                )
              })}
            </div>

            {/* social */}
            <div className="mt-8">
              <div className="label mb-3">{t('contact.social')}</div>
              <a
                href="https://www.linkedin.com/in/ghada-turki-20319b217"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center border border-hairline bg-paper-2 transition-colors hover:border-accent hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group/li"
              >
                <Linkedin className="h-5 w-5 text-accent transition-colors group-hover/li:text-paper" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* ---------- RIGHT: CONTACT FORM ---------- */}
          <motion.div
            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: reduce ? 0 : 0.5 }}
          >
            <div className="corner-ticks draft-surface bg-paper-2/30 p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between border-b border-hairline pb-4">
                <span className="label">CONTACT — FORM</span>
                <span className="font-mono text-[11px] tracking-label text-ink-soft">REV. A</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="label mb-2 block">
                    {t('contact.fullName')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={fieldClasses}
                    placeholder={t('contact.namePlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="label mb-2 block">
                    {t('contact.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={fieldClasses}
                    placeholder={t('contact.emailPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="label mb-2 block">
                    {t('contact.subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={fieldClasses}
                    placeholder={t('contact.subjectPlaceholder')}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="label mb-2 block">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`${fieldClasses} resize-none`}
                    placeholder={t('contact.messagePlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      {t('contact.sent')}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t('contact.send')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
