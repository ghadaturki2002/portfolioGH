'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle, ArrowUpRight } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { identity } from '@/lib/content'

export default function Contact() {
  const { language, t } = useLanguage()

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // No backend: open the visitor's mail client with the message pre-filled,
    // so it actually reaches Ghada instead of being lost.
    const subject = encodeURIComponent(formData.subject || `Contact — ${formData.name}`)
    const body = encodeURIComponent(`${formData.message}\n\n— ${formData.name} (${formData.email})`)
    window.location.href = `mailto:${identity.email}?subject=${subject}&body=${body}`
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const details = [
    {
      icon: Mail,
      label: t('contact.emailLabel'),
      value: identity.email,
      href: `mailto:${identity.email}`,
      external: false,
    },
    {
      icon: Phone,
      label: t('contact.phoneLabel'),
      value: identity.phone,
      href: `tel:${identity.phone.replace(/\s+/g, '')}`,
      external: false,
    },
    {
      icon: MapPin,
      label: t('contact.locationLabel'),
      value: identity.location[language],
      href: null,
      external: false,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/ghada-turki',
      href: identity.linkedin,
      external: true,
    },
  ]

  const fieldClass =
    'w-full rounded-xl border border-hairline bg-surface px-4 py-3 text-ink placeholder:text-ink-soft/60 transition-colors focus:border-accent focus:outline-none'

  return (
    <section id="contact" className="section">
      <div className="container-px">
        <SectionHeading
          kicker={t('contact.kicker')}
          title={t('contact.title')}
          lead={t('contact.intro')}
        />

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-2 lg:gap-12">
          {/* LEFT — contact details */}
          <div>
            <ul className="space-y-4">
              {details.map((item, i) => {
                const Icon = item.icon
                const inner = (
                  <span className="flex items-start gap-4">
                    <span
                      className="flex h-11 w-11 flex-none items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent"
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
                        {item.label}
                      </span>
                      <span className="mt-1 flex items-center gap-1.5 break-words text-base text-ink">
                        {item.value}
                        {item.external && (
                          <ArrowUpRight className="h-4 w-4 flex-none text-ink-soft transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                        )}
                      </span>
                    </span>
                  </span>
                )

                return (
                  <Reveal as="li" key={item.label} delay={i * 0.06}>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="card group block p-4 hover:border-accent/40"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="card group p-4">{inner}</div>
                    )}
                  </Reveal>
                )
              })}
            </ul>
          </div>

          {/* RIGHT — contact form */}
          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
              <div className="grid gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-ink-soft"
                  >
                    {t('contact.name')}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.namePlaceholder')}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-ink-soft"
                  >
                    {t('contact.email')}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.emailPlaceholder')}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-ink-soft"
                  >
                    {t('contact.subject')}
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('contact.subjectPlaceholder')}
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block font-mono text-xs uppercase tracking-[0.18em] text-ink-soft"
                  >
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.messagePlaceholder')}
                    className={`${fieldClass} resize-y`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="btn-primary group mt-1 w-full disabled:cursor-not-allowed disabled:opacity-90"
                >
                  {isSubmitted ? (
                    <>
                      {t('contact.sent')}
                      <CheckCircle className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      {t('contact.send')}
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
