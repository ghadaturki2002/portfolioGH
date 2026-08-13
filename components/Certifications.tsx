'use client'

/**
 * 06 · THE SEAL WALL — certifications as proof seals.
 * Each card stamps in (scale 1.15 → 1, like a seal being pressed),
 * then answers hover with a gentle press-tilt + channel glow.
 * The WHOLE card is the download: a stretched link over the seal pulls the
 * certificate PDF. Channel comes from what the certificate certifies
 * (see certificationChannel), not from who issued it.
 */
import { motion, useReducedMotion } from 'framer-motion'
import { Download } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { certifications } from '@/lib/content'
import { certificationChannel, type Channel } from '@/lib/channels'
import { Chip, SectionHeader, EASE, SPRING_TILT, GLOW_CH } from './ui/primitives'

/* keyboard path: focus-within ring (no tilt) — literal classes for JIT */
const FOCUS_RING: Record<Channel, string> = {
  mech: 'focus-within:ring-1 focus-within:ring-mech/40',
  elec: 'focus-within:ring-1 focus-within:ring-elec/40',
  soft: 'focus-within:ring-1 focus-within:ring-soft/40',
}

const STAMP = { duration: 0.2, ease: EASE }
const TILT_SPRING = { type: 'spring' as const, ...SPRING_TILT }

export default function Certifications() {
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  return (
    <section id="certifications" className="section">
      <div className="container-px">
        <SectionHeader
          index="06"
          kicker={t('certifications.kicker')}
          title={t('certifications.title')}
          count={`${certifications.length}`}
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
          {certifications.map((cert, i) => {
            const channel = certificationChannel(cert)
            return (
              <li key={`${cert.issuer}-${cert.name}`} className="h-full">
                <motion.article
                  className={[
                    'relative flex h-full flex-col rounded-[14px] border border-hairline bg-surface p-5',
                    'card-lift',
                    GLOW_CH[channel],
                    FOCUS_RING[channel],
                  ].join(' ')}
                  style={reduce ? undefined : { transformPerspective: 800 }}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.15 }}
                  whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  whileHover={reduce ? undefined : { rotateX: 4, rotateY: -4, y: -2 }}
                  transition={{
                    opacity: { ...STAMP, delay: i * 0.08 },
                    scale: { ...STAMP, delay: i * 0.08 },
                    rotateX: TILT_SPRING,
                    rotateY: TILT_SPRING,
                    y: TILT_SPRING,
                  }}
                >
                  {/* issuer + issue date — registry voice with its channel chip */}
                  <p className="sys flex items-center justify-between gap-3 text-ink-soft">
                    <span className="flex items-center gap-2">
                      <Chip channel={channel} className="h-2 w-2" />
                      {cert.issuer}
                    </span>
                    {cert.date && <span className="tabular-nums">{cert.date}</span>}
                  </p>

                  <h3 className="mt-3 flex-1 font-display text-lg font-semibold leading-snug text-ink">
                    {cert.name}
                  </h3>

                  {cert.file && (
                    <>
                      {/* affordance only — the stretched link below does the work */}
                      <span
                        className="btn-glass pointer-events-none mt-5 self-start px-4 py-2 text-[13px]"
                        aria-hidden="true"
                      >
                        <Download className="h-4 w-4" />
                        {t('certifications.download')}
                      </span>
                      {/* the whole seal is clickable */}
                      <a
                        href={cert.file}
                        download
                        className="absolute inset-0 rounded-[14px] focus-visible:outline-none"
                        aria-label={`${t('certifications.download')} — ${cert.name}, ${cert.issuer}`}
                      />
                    </>
                  )}
                </motion.article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
