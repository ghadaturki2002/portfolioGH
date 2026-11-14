'use client'

/**
 * 08 · CONTACT — disponibilité, e-mail (copie en un clic), téléphone, LinkedIn,
 * CV FR/EN. La constellation « GT » de l'intro revient en filigrane : le site
 * s'ouvre et se ferme sur le même ciel.
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { Check, Copy, Download, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { identity } from '@/lib/content'
import { Constellation } from './fx/Constellation'
import { Reveal } from './ui/kit'

export default function Contact() {
  const { language, t } = useLanguage()
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | null>(null)

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(identity.email)
      setCopied(true)
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2200)
    } catch {
      window.location.href = `mailto:${identity.email}`
    }
  }, [])
  useEffect(() => () => {
    if (timer.current) window.clearTimeout(timer.current)
  }, [])

  const row = 'flex items-center justify-between gap-4 border-t px-6 py-4'

  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative isolate overflow-hidden border-t">
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="bp-grid fade-edges absolute inset-0 opacity-70" />
      </div>

      <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-6">
          <p className="label flex items-center gap-3 text-accent">
            <span className="tabular">08</span>
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
            <span>{t('contact.kicker')}</span>
          </p>
          <h2 id="contact-title" className="display mt-5 text-[clamp(2.4rem,5.6vw,4.4rem)] text-ink">
            {t('contact.title')}
          </h2>
          <p className="mt-6 max-w-lg text-lg text-ink-soft">{t('contact.intro')}</p>
          <p className="mt-7 inline-flex items-center gap-2.5 rounded-full border bg-surface/60 px-3.5 py-1.5 text-[0.9rem]">
            <span aria-hidden="true" className="pulse relative h-2 w-2 rounded-full bg-elec-chip" />
            <strong className="font-semibold">{identity.availability[language]}</strong>
            <span className="text-ink-soft">· {identity.location[language]}</span>
          </p>
          <Constellation className="mt-14 hidden w-56 text-ink-faint/60 lg:block" nodeClassName="fill-accent" />
        </Reveal>

        <Reveal delay={80} className="lg:col-span-6">
          <div className="card overflow-hidden">
            <div className="px-6 pb-5 pt-6">
              <p className="label text-ink-faint">{t('contact.email')}</p>
              <p className="mono mt-2 break-all text-[clamp(1.05rem,2.2vw,1.35rem)] text-ink">{identity.email}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a href={`mailto:${identity.email}`} className="btn-primary">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {t('contact.write')}
                </a>
                <button type="button" onClick={copy} className="btn-secondary">
                  {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
                  {copied ? t('contact.copied') : t('contact.copy')}
                </button>
                <span className="sr-only" aria-live="polite">
                  {copied ? t('contact.copied') : ''}
                </span>
              </div>
            </div>
            <dl>
              <div className={row}>
                <dt className="label inline-flex items-center gap-2 text-ink-faint">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {t('contact.phone')}
                </dt>
                <dd>
                  <a href={identity.phoneHref} className="link mono tabular text-ink">
                    {identity.phone}
                  </a>
                </dd>
              </div>
              <div className={row}>
                <dt className="label inline-flex items-center gap-2 text-ink-faint">
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  {t('contact.linkedin')}
                </dt>
                <dd className="min-w-0">
                  <a href={identity.linkedin} target="_blank" rel="noopener noreferrer" className="link block truncate text-ink">
                    {identity.linkedinLabel}
                  </a>
                </dd>
              </div>
              <div className={row}>
                <dt className="label inline-flex items-center gap-2 text-ink-faint">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {t('contact.location')}
                </dt>
                <dd className="text-ink">{identity.location[language]}</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-3 border-t bg-surface-2/50 px-6 py-5">
              <a href={identity.cv.fr} download className="btn-secondary text-sm" hrefLang="fr">
                <Download className="h-4 w-4" aria-hidden="true" />
                {t('contact.cvFr')}
              </a>
              <a href={identity.cv.en} download className="btn-secondary text-sm" hrefLang="en">
                <Download className="h-4 w-4" aria-hidden="true" />
                {t('contact.cvEn')}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
