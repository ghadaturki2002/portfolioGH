'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import SectionHeading from './ui/SectionHeading'
import TiltCard from './fx/TiltCard'
import ProjectArtwork from './ui/ProjectArtwork'
import { projects, type Project } from '@/lib/content'

export default function Projects() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()
  const [active, setActive] = useState<Project | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

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

  const scrollByCards = (dir: 1 | -1) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 460), behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section id="projects" className="section overflow-hidden">
      <div className="container-px">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading kicker={t('projects.kicker')} title={t('projects.title')} />
          {/* strip controls (desktop) */}
          <div className="hidden flex-none gap-2 md:flex">
            <button
              onClick={() => scrollByCards(-1)}
              aria-label={language === 'fr' ? 'Projet précédent' : 'Previous project'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scrollByCards(1)}
              aria-label={language === 'fr' ? 'Projet suivant' : 'Next project'}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* horizontal scroll-snap gallery */}
      <div
        ref={trackRef}
        className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-6 sm:px-8 lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
        aria-label={t('projects.title')}
      >
        {projects.map((project) => {
          const cover = project.images?.[0]
          const featured = project.featured
          return (
            <div
              key={project.id}
              role="listitem"
              className={`snap-start ${featured ? 'w-[88vw] sm:w-[34rem]' : 'w-[82vw] sm:w-[22rem]'} flex-none`}
            >
              <TiltCard className="h-full">
                <button
                  type="button"
                  onClick={() => setActive(project)}
                  aria-label={project.title[language]}
                  className="card group flex h-full w-full flex-col overflow-hidden text-left hover:border-accent/40"
                >
                  <div className={`relative w-full overflow-hidden bg-surface-2 ${featured ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
                    {cover ? (
                      <img
                        src={cover}
                        alt={project.title[language]}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                      />
                    ) : (
                      <ProjectArtwork id={project.id} label={project.category[language]} />
                    )}
                    {project.status && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-bg">
                        <span className={`h-1.5 w-1.5 rounded-full bg-bg ${reduce ? '' : 'animate-pulse'}`} aria-hidden="true" />
                        {project.status[language]}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <span className="chip self-start">{project.category[language]}</span>
                    <h3 className={`display mt-4 text-ink ${featured ? 'text-2xl' : 'text-xl'}`}>{project.title[language]}</h3>
                    <p className="mt-3 flex-1 text-pretty leading-relaxed text-ink-soft">{project.summary[language]}</p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label={t('projects.tech')}>
                      {project.tech.slice(0, 3).map((tech) => (
                        <li key={tech} className="chip">{tech}</li>
                      ))}
                      {project.tech.length > 3 && <li className="chip border-accent/30 text-accent">+{project.tech.length - 3}</li>}
                    </ul>
                    <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-accent">
                      {t('projects.view')}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </button>
              </TiltCard>
            </div>
          )
        })}
        {/* trailing spacer for nice end padding */}
        <div className="w-1 flex-none" aria-hidden="true" />
      </div>

      <p className="container-px mt-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-soft">
        {language === 'fr' ? '← faites défiler horizontalement →' : '← scroll horizontally →'}
      </p>

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
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-hairline bg-surface/95 px-6 py-4 backdrop-blur">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip">{active.category[language]}</span>
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
                <div className="mt-5 space-y-4">
                  {active.description[language].map((para, idx) => (
                    <p key={idx} className="text-pretty leading-relaxed text-ink-soft">{para}</p>
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
                      <li key={tech} className="chip">{tech}</li>
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
