'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap, Award, Calendar, Download, Users } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import SectionHeader from './draft/SectionHeader'

interface EducationItem {
  key: string
  degree: string
  institution: string
  period: string
  status: string
  description?: string
}

const eduRef = (i: number) => `EDU-${String(i + 1).padStart(2, '0')}`

export default function Education() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  const education: EducationItem[] = [
    {
      key: 'esprit',
      degree: t('education.esprit.degree'),
      institution: t('education.esprit.institution'),
      period: t('education.esprit.period'),
      status: t('education.esprit.status'),
      description: t('education.esprit.description'),
    },
    {
      key: 'istic',
      degree: t('education.istic.degree'),
      institution: t('education.istic.institution'),
      period: t('education.istic.period'),
      status: t('education.istic.status'),
      description: t('education.istic.description'),
    },
    {
      key: 'isetn',
      degree: t('education.isetn.degree'),
      institution: t('education.isetn.institution'),
      period: t('education.isetn.period'),
      status: t('education.isetn.status'),
      description: t('education.isetn.description'),
    },
  ]

  // "En cours" / "In progress" is the distinguished (accent) status
  const inProgressStatus = t('education.esprit.status')

  return (
    <section id="education" className="section-pad">
      <div className="sheet">
        <SectionHeader
          number="03"
          marker="D—D"
          label={t('education.subtitle')}
          title={t('education.title')}
        />

        {/* ===== DEGREES — drafting revision table ===== */}
        <div className="space-y-px border border-hairline bg-hairline">
          {education.map((item, index) => {
            const isInProgress = item.status === inProgressStatus
            return (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: reduce ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : index * 0.08 }}
                className="group relative bg-paper p-6 transition-colors hover:bg-paper-2/50 md:p-8"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                  {/* icon + reference */}
                  <div className="flex flex-none items-center gap-3 md:flex-col md:items-start">
                    <span
                      className="flex h-11 w-11 flex-none items-center justify-center border border-ink text-ink transition-colors group-hover:border-accent group-hover:text-accent"
                      aria-hidden="true"
                    >
                      <GraduationCap className="h-5 w-5" />
                    </span>
                    <span className="label text-ink-soft md:mt-1">{eduRef(index)}</span>
                  </div>

                  {/* body */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-6">
                      <h3 className="font-display text-xl font-semibold leading-tight text-ink transition-colors group-hover:text-accent">
                        {item.degree}
                      </h3>

                      {/* status drafting badge */}
                      <span
                        className={`spec-chip flex flex-none items-center gap-1.5 self-start uppercase ${
                          isInProgress
                            ? 'border-accent text-accent'
                            : 'border-hairline-2 text-ink-soft'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 flex-none rounded-full ${
                            isInProgress ? 'bg-accent' : 'bg-ink-soft'
                          }`}
                          aria-hidden="true"
                        />
                        {item.status}
                      </span>
                    </div>

                    <p className="mt-2 font-mono text-sm text-accent">{item.institution}</p>

                    <div className="mt-3 flex items-center gap-2 text-ink-soft">
                      <Calendar className="h-4 w-4 flex-none" aria-hidden="true" />
                      <span className="font-mono text-xs tracking-wide">{item.period}</span>
                    </div>

                    {item.description && (
                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-soft">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>

        {/* ===== ASSOCIATIVE LIFE ===== */}
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: reduce ? 0 : 0.55 }}
          className="mt-16"
        >
          <div className="mb-8 flex items-center gap-3 border-b border-hairline pb-4">
            <Award className="h-6 w-6 flex-none text-accent" aria-hidden="true" />
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
              {t('education.associative')}
            </h3>
          </div>

          <div className="space-y-6">
            {/* member line */}
            <div className="draft-surface flex items-start gap-3 p-5">
              <Users className="mt-0.5 h-5 w-5 flex-none text-accent" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-ink-soft">
                <strong className="text-ink">{t('education.associative.member')}</strong>
                {' : '}
                {t('education.associative.memberDesc')}
              </p>
            </div>

            {/* AIESEC */}
            <div className="draft-surface p-6">
              <div className="label mb-3 text-ink-soft">REF — AIESEC</div>
              <h4 className="font-display text-lg font-semibold leading-snug text-ink">
                {t('education.aiesec.title')}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {t('education.aiesec.description')}
              </p>
              <a
                href="/Certification.pdf"
                download
                className="btn-ghost mt-5"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t('education.aiesec.download')}
              </a>
            </div>

            {/* Bal des Projets */}
            <div className="draft-surface p-6">
              <div className="label mb-3 text-ink-soft">REF — BAL DES PROJETS</div>
              <h4 className="font-display text-lg font-semibold leading-snug text-ink">
                {t('education.bal.title')}
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {t('education.bal.description')}
              </p>
              <a
                href="/ESE_attestation_Ghada_Turki dit Gara ali.pdf"
                download
                className="btn-ghost mt-5"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {t('education.bal.download')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
