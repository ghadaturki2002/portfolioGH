'use client'

/**
 * 06 · THE SEAL WALL — certifications as proof seals.
 * Each card stamps in (scale 1.15 → 1, like a seal being pressed),
 * then answers hover with a gentle press-tilt + channel glow.
 * Channel per issuer: SOLIDWORKS → mech, NVIDIA → soft.
 */
import { motion, useReducedMotion } from 'framer-motion'
import { Download } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { certifications, type Certification } from '@/lib/content'
import type { Channel } from '@/lib/channels'
import { Chip, SectionHeader, EASE, SPRING_TILT, GLOW_CH } from './ui/primitives'

const ISSUER_CHANNEL: Record<Certification['issuer'], Channel> = {
  SOLIDWORKS: 'mech',
  NVIDIA: 'soft',
}

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
            const channel = ISSUER_CHANNEL[cert.issuer]
            return (
              <li key={`${cert.issuer}-${cert.name}`} className="h-full">
                <motion.article
                  className={[
                    'flex h-full flex-col rounded-[14px] border border-hairline bg-surface p-5',
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
                  {/* issuer — registry voice with its channel chip */}
                  <p className="sys flex items-center gap-2 text-ink-soft">
                    <Chip channel={channel} className="h-2 w-2" />
                    {cert.issuer}
                  </p>

                  <h3 className="mt-3 flex-1 font-display text-lg font-semibold leading-snug text-ink">
                    {cert.name}
                  </h3>

                  {cert.file && (
                    <a
                      href={cert.file}
                      download
                      className="btn-glass mt-5 self-start px-4 py-2 text-[13px]"
                      aria-label={`${t('certifications.download')} — ${cert.name}`}
                    >
                      <Download className="h-4 w-4" aria-hidden="true" />
                      {t('certifications.download')}
                    </a>
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
