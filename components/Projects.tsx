'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import SectionHeading from './ui/SectionHeading'
import TiltCard from './fx/TiltCard'
import ProjectArtwork from './ui/ProjectArtwork'
import { projects, projectCategories, type Project } from '@/lib/content'

/** A link counts as "provided" only when it isn't a placeholder. */
const hasRealLink = (l?: string | null) => !!l && !l.trim().startsWith('[')

/**
 * Card cover: shows the project image (with the unifying veil + cyan tint),
 * and gracefully falls back to the decorative artwork if there's no image yet
 * or the file is missing — so a reserved image path never shows broken.
 */
function ProjectCover({
  src,
  alt,
  fallbackId,
  fallbackLabel,
}: {
  src?: string
  alt: string
  fallbackId: string
  fallbackLabel: string
}) {
  const [err, setErr] = useState(false)
  if (!src || err) return <ProjectArtwork id={fallbackId} label={fallbackLabel} />
  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setErr(true)}
        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-bg/70 via-bg/10 to-transparent" />
      <span aria-hidden="true" className="absolute inset-0 bg-accent/10 mix-blend-soft-light" />
    </>
  )
}

export default function Projects() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()
  const [activeCat, setActiveCat] = useState('all')
  const [active, setActive] = useState<Project | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // short label per category id → used for the card eyebrow ("Robotique · IA")
  const shortById = useMemo(() => {
    const m = new Map<string, string>()
    projectCategories.forEach((c) => m.set(c.id, c.short[language]))
    return m
  }, [language])

  const filtered = activeCat === 'all' ? projects : projects.filter((p) => p.categories.includes(activeCat))

  // modal: escape-to-close, scroll lock, focus mgmt
  useEffect(() => {
    if (!active) return
    const prevFocused = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const tid = window.setTimeout(() => dialogRef.current?.focus(), 30)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      window.clearTimeout(tid)
      prevFocused?.focus?.()
    }
  }, [active])

  return (
    <section id="projects" className="section">
      <div className="container-px">
        <SectionHeading kicker={t('projects.kicker')} title={t('projects.title')} />

        {/* FILTER PILLS */}
        <div role="group" aria-label={t('projects.filter')} className="mt-8 flex flex-wrap gap-2">
          {projectCategories.map((c) => {
            const isActive = activeCat === c.id
            return (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                aria-pressed={isActive}
                className={`rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors ${
                  isActive
                    ? 'border-accent bg-accent text-bg'
                    : 'border-hairline text-ink-soft hover:border-accent hover:text-accent'
                }`}
              >
                {c.label[language]}
              </button>
            )
          })}
        </div>

        {/* GRID (FLIP layout on filter) */}
        <motion.ul layout={!reduce} className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => {
              const cover = project.images?.[0]
              const eyebrow = project.categories.map((id) => shortById.get(id)).filter(Boolean).join(' · ')
              return (
                <motion.li
                  key={project.id}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full"
                >
                  <TiltCard className="h-full">
                    <article className="card group relative flex h-full flex-col overflow-hidden hover:border-accent/40">
                      {/* MEDIA */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
                        <ProjectCover
                          src={cover}
                          alt={project.title[language]}
                          fallbackId={project.id}
                          fallbackLabel={eyebrow || project.type[language]}
                        />

                        {/* type badge */}
                        <span className="absolute left-3 top-3 rounded-full border border-hairline bg-bg/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink backdrop-blur">
                          {project.type[language]}
                        </span>
                        {/* status badge */}
                        {project.status && (
                          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-bg">
                            <span className={`h-1.5 w-1.5 rounded-full bg-bg ${reduce ? '' : 'animate-pulse'}`} aria-hidden="true" />
                            {project.status[language]}
                          </span>
                        )}
                      </div>

                      {/* BODY */}
                      <div className="flex flex-1 flex-col p-6">
                        {eyebrow && (
                          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{eyebrow}</span>
                        )}
                        <h3 className="display mt-2 text-xl text-ink">{project.title[language]}</h3>
                        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft text-pretty">
                          {project.description[language]}
                        </p>

                        <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('projects.tech')}>
                          {project.tech.slice(0, 4).map((tech) => (
                            <li key={tech} className="chip">{tech}</li>
                          ))}
                          {project.tech.length > 4 && (
                            <li className="chip border-accent/30 text-accent">+{project.tech.length - 4}</li>
                          )}
                        </ul>

                        {hasRealLink(project.link) && (
                          <a
                            href={project.link as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="relative z-20 mt-5 inline-flex items-center gap-1.5 self-start font-mono text-sm text-accent link-underline"
                          >
                            {t('projects.view')}
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      {/* full-card click target → opens the detail modal (accessible, no nested buttons) */}
                      <button
                        type="button"
                        onClick={() => setActive(project)}
                        aria-label={project.title[language]}
                        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
                      />
                    </article>
                  </TiltCard>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/70 p-4 backdrop-blur-md sm:p-6 md:items-center"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={active.title[language]}
              ref={dialogRef}
              tabIndex={-1}
              className="card relative my-auto flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden focus:outline-none"
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* sticky header */}
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-hairline bg-surface/95 px-6 py-4 backdrop-blur">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip">{active.type[language]}</span>
                  {active.status && (
                    <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-bg">
                      {active.status[language]}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label={`${t('projects.close')} — ${active.title[language]}`}
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-hairline text-ink-soft transition-colors hover:border-accent hover:text-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="overflow-y-auto px-6 py-7">
                <h3 className="display text-2xl text-ink sm:text-3xl">{active.title[language]}</h3>
                {active.details ? (
                  <div className="mt-4 space-y-4">
                    {active.details[language].map((para, i) => (
                      <p key={i} className="text-pretty leading-relaxed text-ink-soft">{para}</p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-pretty leading-relaxed text-ink-soft">{active.description[language]}</p>
                )}

                {/* media */}
                {active.videos && active.videos.length > 0 && (
                  <div className="mt-7 space-y-4">
                    {active.videos.map((src) => (
                      <video
                        key={src}
                        src={src}
                        aria-label={active.title[language]}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full rounded-xl border border-hairline bg-surface-2"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ))}
                  </div>
                )}
                {active.images && active.images.length > 0 && (
                  <div className="mt-7">
                    <span className="kicker">{t('projects.gallery')}</span>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {active.images.map((src) => (
                        <img
                          key={src}
                          src={src}
                          alt={active.title[language]}
                          loading="lazy"
                          className="w-full rounded-xl border border-hairline bg-surface-2 object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* selling fields: role / learned / result */}
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <span className="kicker">{t('projects.role')}</span>
                    <p className="mt-2 leading-relaxed text-ink-soft">{active.role[language]}</p>
                  </div>
                  <div>
                    <span className="kicker">{t('projects.learned')}</span>
                    <p className="mt-2 leading-relaxed text-ink-soft">{active.learned[language]}</p>
                  </div>
                  {active.result && (
                    <div>
                      <span className="kicker">{t('projects.result')}</span>
                      <p className="mt-2 leading-relaxed text-ink-soft">{active.result[language]}</p>
                    </div>
                  )}
                </div>

                {/* tech */}
                <div className="mt-7 border-t border-hairline pt-6">
                  <span className="kicker">{t('projects.tech')}</span>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {active.tech.map((tech) => (
                      <li key={tech} className="chip">{tech}</li>
                    ))}
                  </ul>
                </div>

                {hasRealLink(active.link) && (
                  <a
                    href={active.link as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-7 inline-flex"
                  >
                    {t('projects.view')}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
