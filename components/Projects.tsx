'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import ProjectArtwork from './ui/ProjectArtwork'
import { projects, type Project } from '@/lib/content'

export default function Projects() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()
  const [active, setActive] = useState<Project | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Escape-to-close, body-scroll lock, and focus management while modal open.
  useEffect(() => {
    if (!active) return
    const prevFocused = document.activeElement as HTMLElement | null
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 30)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      window.clearTimeout(focusTimer)
      prevFocused?.focus?.()
    }
  }, [active])

  return (
    <section id="projects" className="section">
      <div className="container-px">
        <SectionHeading kicker={t('projects.kicker')} title={t('projects.title')} />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-7">
          {projects.map((project, i) => {
            const cover = project.images?.[0]
            const isFeatured = project.featured
            return (
              <Reveal
                key={project.id}
                as="article"
                delay={Math.min(i * 0.06, 0.3)}
                className={isFeatured ? 'md:col-span-2' : ''}
              >
                <button
                  type="button"
                  onClick={() => setActive(project)}
                  aria-label={project.title[language]}
                  className="card group flex h-full w-full flex-col overflow-hidden text-left hover:-translate-y-1 hover:border-accent/40"
                >
                  {/* MEDIA */}
                  <div
                    className={`relative w-full shrink-0 overflow-hidden bg-surface-2 ${
                      isFeatured ? 'aspect-[16/9] md:aspect-[21/9]' : 'aspect-[16/10]'
                    }`}
                  >
                    {cover ? (
                      <img
                        src={cover}
                        alt={project.title[language]}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                      />
                    ) : (
                      <ProjectArtwork id={project.id} label={project.category[language]} />
                    )}
                    {project.status && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-bg">
                        <span
                          className={`h-1.5 w-1.5 rounded-full bg-bg ${reduce ? '' : 'animate-pulse'}`}
                          aria-hidden="true"
                        />
                        {project.status[language]}
                      </span>
                    )}
                  </div>

                  {/* BODY */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="chip">{project.category[language]}</span>
                    </div>

                    <h3
                      className={`display mt-4 text-ink ${
                        isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'
                      }`}
                    >
                      {project.title[language]}
                    </h3>

                    <p className="mt-3 text-pretty leading-relaxed text-ink-soft">
                      {project.summary[language]}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('projects.tech')}>
                      {project.tech.slice(0, 3).map((tech) => (
                        <li key={tech} className="chip">
                          {tech}
                        </li>
                      ))}
                      {project.tech.length > 3 && (
                        <li className="chip border-accent/30 text-accent">
                          +{project.tech.length - 3}
                        </li>
                      )}
                    </ul>

                    <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-accent">
                      {t('projects.view')}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </Reveal>
            )
          })}
        </div>
      </div>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm sm:p-6 md:items-center"
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
              {/* Sticky header */}
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-hairline bg-surface/95 px-6 py-4 backdrop-blur">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip">{active.category[language]}</span>
                  {active.status && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-bg">
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

              {/* Body */}
              <div className="overflow-y-auto px-6 py-7">
                <h3 className="display text-2xl text-ink sm:text-3xl">{active.title[language]}</h3>

                <div className="mt-5 space-y-4">
                  {active.description[language].map((para, idx) => (
                    <p key={idx} className="text-pretty leading-relaxed text-ink-soft">
                      {para}
                    </p>
                  ))}
                </div>

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

                <div className="mt-7 border-t border-hairline pt-6">
                  <span className="kicker">{t('projects.tech')}</span>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {active.tech.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
