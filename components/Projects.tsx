'use client'

/**
 * 03 · THE CATALOGUE — the showpiece.
 * A filterable, channel-coded grid of every engineering project, with
 * flagship cards spanning wide and a full-detail modal (keyboard-driven,
 * prev/next within the filtered list). Channel hue appears only as chips,
 * a 1.5px recolor underline, /10 tint fields, hover glow and delayed-hover
 * borders — never as type color or gradient. All copy from content.ts.
 */
import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { projects, projectCategories, type Project } from '@/lib/content'
import {
  projectChannel,
  categoryChannel,
  projectIndex,
  type Channel,
} from '@/lib/channels'
import {
  Chip,
  ChipTriplet,
  IndexCode,
  ProofTag,
  SectionHeader,
  EASE_SHEET,
  CHIP_BG,
  TEXT_CH,
  GLOW_CH,
  TINT_CH,
} from './ui/primitives'

/* delayed-hover border recolor — literal classes (Tailwind JIT needs them whole) */
const HOVER_BORDER_CH: Record<Channel, string> = {
  mech: 'hover:border-mech-chip focus-within:border-mech-chip',
  elec: 'hover:border-elec-chip focus-within:border-elec-chip',
  soft: 'hover:border-soft-chip focus-within:border-soft-chip',
}

/* Flagships span 8/12 columns; everyone else spans 4/12. */
const FLAGSHIP_IDS = new Set(['robot-fissures', 'mes'])
function isFlagship(p: Project): boolean {
  return p.featured === true || FLAGSHIP_IDS.has(p.id)
}

/* Short, verifiable proof shown on the card face (numbers only from content.ts). */
const CARD_PROOF: Record<string, string> = {
  'robot-fissures': '96%',
  mes: '19/20',
}

/* A link counts as real only if it exists and isn't a "[…]" placeholder. */
function hasRealLink(link: Project['link']): link is string {
  return typeof link === 'string' && link.trim() !== '' && !link.trim().startsWith('[')
}

export default function Projects() {
  const { language, t } = useLanguage()
  const reduce = useReducedMotion()

  const [activeCat, setActiveCat] = useState<string>('all')
  const [openId, setOpenId] = useState<string | null>(null)

  const dialogRef = useRef<HTMLDivElement>(null)
  const lastFocusedRef = useRef<HTMLElement | null>(null)

  /* filtered list — drives the grid AND modal prev/next navigation */
  const filtered = useMemo(
    () =>
      activeCat === 'all'
        ? projects
        : projects.filter((p) => p.categories.includes(activeCat)),
    [activeCat]
  )

  const activeChannel = categoryChannel(activeCat) // null for 'all'
  const active = useMemo(
    () => (openId ? projects.find((p) => p.id === openId) ?? null : null),
    [openId]
  )

  /* index of the open project within the CURRENTLY FILTERED list */
  const openIndex = useMemo(
    () => (openId ? filtered.findIndex((p) => p.id === openId) : -1),
    [openId, filtered]
  )

  const close = useCallback(() => setOpenId(null), [])

  const navigate = useCallback(
    (dir: 1 | -1) => {
      setOpenId((cur) => {
        if (!cur) return cur
        const i = filtered.findIndex((p) => p.id === cur)
        if (i === -1) return cur
        const len = filtered.length
        if (len === 0) return cur
        const next = (i + dir + len) % len
        return filtered[next].id
      })
    },
    [filtered]
  )

  /* If the active project leaves the filtered set (filter changed), close. */
  useEffect(() => {
    if (openId && !filtered.some((p) => p.id === openId)) setOpenId(null)
  }, [filtered, openId])

  /* Modal lifecycle: focus management, body scroll lock, keyboard. */
  useEffect(() => {
    if (!active) return

    lastFocusedRef.current = document.activeElement as HTMLElement | null

    const { body } = document
    const prevOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    // move focus into the dialog
    const raf = requestAnimationFrame(() => dialogRef.current?.focus())

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        navigate(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        navigate(-1)
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('keydown', onKeyDown)
      body.style.overflow = prevOverflow
      lastFocusedRef.current?.focus?.()
    }
  }, [active, close, navigate])

  return (
    <section id="projects" className="section">
      <div className="container-px">
        <SectionHeader
          index="03"
          kicker={t('projects.kicker')}
          title={t('projects.title')}
          count={`${projects.length} ${t('nav.projects').toLowerCase()}`}
          channel={activeChannel}
        />

        {/* FILTER BAR — sticky under the header, glass, with channel recolor underline */}
        <div className="sticky top-16 z-30 -mx-5 mt-10 px-5 sm:-mx-8 sm:px-8">
          <div className="glass relative rounded-none border-x-0 border-t-0 border-b border-b-hairline py-3">
            <div
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label={t('projects.filter')}
            >
              {projectCategories.map((cat) => {
                const ch = categoryChannel(cat.id)
                const isActive = activeCat === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveCat(cat.id)}
                    className={[
                      'sys inline-flex items-center gap-2 rounded-full border px-4 py-1.5 transition-colors duration-200',
                      isActive
                        ? 'border-ink bg-ink text-bg'
                        : 'border-hairline text-ink-soft hover:text-ink',
                    ].join(' ')}
                  >
                    {ch ? <Chip channel={ch} className="h-2 w-2" /> : <ChipTriplet size="sm" />}
                    {cat.label[language]}
                  </button>
                )
              })}
            </div>

            {/* SECTION RECOLOR — 1.5px channel underline grows when a channel filter is active */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-[-1px] h-[1.5px] overflow-hidden"
            >
              {activeChannel && (
                <motion.span
                  key={activeChannel}
                  className={`block h-full origin-left ${CHIP_BG[activeChannel]}`}
                  initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: EASE_SHEET }}
                />
              )}
            </span>
          </div>
        </div>

        {/* GRID */}
        <motion.ul
          layout={!reduce}
          className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filtered.map((project) => {
              const ch = projectChannel(project)
              const idx = projectIndex.get(project.id)
              const flagship = isFlagship(project)
              const proof = CARD_PROOF[project.id]
              return (
                <motion.li
                  key={project.id}
                  layout={!reduce}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  transition={
                    reduce
                      ? { duration: 0.2 }
                      : { type: 'spring', stiffness: 350, damping: 30 }
                  }
                  className={['h-full', flagship ? 'lg:col-span-8' : 'lg:col-span-4'].join(' ')}
                >
                  <article
                    className={[
                      'group relative flex h-full flex-col overflow-hidden rounded-[14px]',
                      'border border-hairline bg-surface card-lift',
                      // delayed-hover recolor + lift + glow (mirrored on focus-within)
                      'transition-[transform,box-shadow,border-color] duration-300',
                      'hover:-translate-y-1 hover:delay-300 focus-within:-translate-y-1',
                      HOVER_BORDER_CH[ch],
                      GLOW_CH[ch],
                    ].join(' ')}
                  >
                    {/* top row — index code + optional status proof */}
                    <div className="flex items-center justify-between gap-3 p-5 pb-0">
                      {idx && <IndexCode code={idx.code} channel={idx.channel} />}
                      {project.status && (
                        <ProofTag className="shrink-0">{project.status[language]}</ProofTag>
                      )}
                    </div>

                    {/* MEDIA */}
                    <Media project={project} channel={ch} idxCode={idx?.code ?? ''} />

                    {/* BODY */}
                    <div className="flex flex-1 flex-col p-5">
                      <p className="sys text-ink-soft">{project.type[language]}</p>
                      <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
                        {project.title[language]}
                      </h3>
                      <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
                        {project.description[language]}
                      </p>

                      {proof && (
                        <div className="mt-3">
                          <ProofTag channel={ch}>{proof}</ProofTag>
                        </div>
                      )}

                      {/* tech chips */}
                      <div className="mt-4 flex flex-wrap items-center gap-1.5">
                        {project.tech.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="sys rounded-full border border-hairline px-2.5 py-0.5 text-[13px] text-ink-soft"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="sys rounded-full border border-hairline px-2.5 py-0.5 text-[13px] text-ink-soft">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>

                      {/* delayed "→ Details" cue */}
                      <p
                        className={`sys mt-4 inline-flex items-center gap-1.5 opacity-0 transition-opacity delay-300 duration-300 group-hover:opacity-100 group-focus-within:opacity-100 ${TEXT_CH[ch]}`}
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        {t('projects.details')}
                      </p>
                    </div>

                    {/* full-card trigger */}
                    <button
                      type="button"
                      onClick={() => setOpenId(project.id)}
                      aria-label={project.title[language]}
                      className="absolute inset-0 z-10 rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink"
                    />
                  </article>
                </motion.li>
              )
            })}
          </AnimatePresence>
        </motion.ul>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <ProjectModal
            project={active}
            language={language}
            t={t}
            reduce={!!reduce}
            dialogRef={dialogRef}
            onClose={close}
            onPrev={() => navigate(-1)}
            onNext={() => navigate(1)}
            hasNav={filtered.length > 1}
            position={openIndex >= 0 ? `${openIndex + 1} / ${filtered.length}` : ''}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

/* ---------- MEDIA — image (with graceful fallback) or tinted index field ---------- */
function Media({
  project,
  channel,
  idxCode,
}: {
  project: Project
  channel: Channel
  idxCode: string
}) {
  const [broken, setBroken] = useState(false)
  const src = project.images?.[0]
  const showImage = !!src && !broken

  return (
    <div className="relative mt-4 aspect-[16/10] overflow-hidden bg-surface-2">
      {showImage ? (
        <>
          <img
            src={src}
            alt=""
            loading="lazy"
            onError={() => setBroken(true)}
            className="h-full w-full object-cover grayscale-[0.35] transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
          {/* flat veil (NOT a gradient) */}
          <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-bg/10" />
        </>
      ) : (
        <div className={`grid h-full w-full place-items-center ${TINT_CH[channel]}`}>
          <span aria-hidden="true" className="display text-6xl text-ink/10">
            {idxCode}
          </span>
        </div>
      )}
    </div>
  )
}

/* ---------- MODAL — full project detail, keyboard-driven ---------- */
function ProjectModal({
  project,
  language,
  t,
  reduce,
  dialogRef,
  onClose,
  onPrev,
  onNext,
  hasNav,
  position,
}: {
  project: Project
  language: 'fr' | 'en'
  t: (key: string) => string
  reduce: boolean
  dialogRef: React.RefObject<HTMLDivElement>
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  hasNav: boolean
  position: string
}) {
  const ch = projectChannel(project)
  const idx = projectIndex.get(project.id)
  const showLink = hasRealLink(project.link)
  const title = project.title[language]

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/70 p-4 backdrop-blur sm:p-6 md:items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.15 : 0.3 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: reduce ? 0.15 : 0.48, ease: EASE_SHEET }}
        className="flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-[14px] border border-hairline bg-surface focus:outline-none"
      >
        {/* sticky header band — channel tint */}
        <div
          className={`flex items-center justify-between gap-4 border-b border-hairline p-5 ${TINT_CH[ch]}`}
        >
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
            {idx && <IndexCode code={idx.code} channel={idx.channel} />}
            <span className="sys text-ink-soft">{project.type[language]}</span>
            {project.status && <ProofTag>{project.status[language]}</ProofTag>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('projects.close')}
            className="glass grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="display text-2xl text-ink">{title}</h3>

          {/* story / description */}
          <div className="mt-5 space-y-4">
            {project.details ? (
              project.details[language].map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink-soft text-pretty">
                  {para}
                </p>
              ))
            ) : (
              <p className="text-sm leading-relaxed text-ink-soft text-pretty">
                {project.description[language]}
              </p>
            )}
          </div>

          {/* videos */}
          {project.videos && project.videos.length > 0 && (
            <div className="mt-6 space-y-4">
              {project.videos.map((vid) => (
                <ModalVideo key={vid} src={vid} />
              ))}
            </div>
          )}

          {/* gallery */}
          {project.images && project.images.length > 0 && (
            <div className="mt-8">
              <p className="sys text-ink-soft">{t('projects.gallery')}</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                {project.images.map((img) => (
                  <ModalImage key={img} src={img} />
                ))}
              </div>
            </div>
          )}

          {/* role / learned / result blocks */}
          <dl className="mt-8 space-y-6 border-t border-hairline pt-6">
            <Block label={t('projects.role')} value={project.role[language]} />
            <Block label={t('projects.learned')} value={project.learned[language]} />
            {project.result && (
              <Block label={t('projects.result')} value={project.result[language]} />
            )}
          </dl>

          {/* full tech list */}
          <div className="mt-8 border-t border-hairline pt-6">
            <p className="sys text-ink-soft">{t('projects.tech')}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="sys rounded-full border border-hairline px-2.5 py-0.5 text-[13px] text-ink-soft"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* view link — only for real (non-placeholder) URLs */}
          {showLink && (
            <a
              href={project.link as string}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ink mt-8"
            >
              {t('projects.view')}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>

        {/* footer — prev / next within the filtered list */}
        {hasNav && (
          <div className="flex items-center justify-between gap-4 border-t border-hairline p-4">
            <button
              type="button"
              onClick={onPrev}
              aria-label={t('projects.prev')}
              className="btn-glass px-4 py-2 text-[13px]"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {t('projects.prev')}
            </button>
            {position && <span className="sys text-ink-soft">{position}</span>}
            <button
              type="button"
              onClick={onNext}
              aria-label={t('projects.next')}
              className="btn-glass px-4 py-2 text-[13px]"
            >
              {t('projects.next')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function Block({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="sys text-ink-soft">{label}</dt>
      <dd className="mt-2 text-sm leading-relaxed text-ink-soft text-pretty">{value}</dd>
    </div>
  )
}

function ModalVideo({ src }: { src: string }) {
  const [broken, setBroken] = useState(false)
  if (broken) return null
  return (
    <video
      controls
      playsInline
      preload="metadata"
      onError={() => setBroken(true)}
      className="w-full rounded-xl border border-hairline bg-surface-2"
    >
      <source src={src} />
    </video>
  )
}

function ModalImage({ src }: { src: string }) {
  const [broken, setBroken] = useState(false)
  if (broken) return null
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      onError={() => setBroken(true)}
      className="w-full rounded-xl border border-hairline bg-surface-2 object-cover"
    />
  )
}
