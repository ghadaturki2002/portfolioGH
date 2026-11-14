'use client'

/**
 * INDEX DES RÉALISATIONS (« nomenclature ») : toutes les réalisations, filtrables
 * par discipline, avec des compteurs calculés. Les trois projets phares renvoient
 * à leur étude de cas ; les autres ouvrent une fiche dans un <dialog> natif
 * (piège du focus, Échap, flèches ← →), avec lien profond #p-<id>.
 */
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { useLanguage } from '../LanguageProvider'
import { disciplines, projects, type Channel, type Project } from '@/lib/content'
import { countByChannel, projectsFor } from '@/lib/channels'
import { ChannelChip, DisciplineTags, Reveal } from '../ui/kit'
import { Schematic } from '../illustrations/Schematics'
import { MediaFigure } from './MediaFigure'

type Filter = Channel | 'all'
const counts = countByChannel()

export const hasDetails = (p: Project) =>
  !p.flagship && Boolean(p.context || p.work || p.role || p.learned || (p.media && p.media.length))

const cardTitle = (p: Project) => (p.title.fr.length > 60 && p.subtitle ? p.subtitle : p.title)

function Thumb({ p }: { p: Project }) {
  if (p.thumb)
    return (
      <Image
        src={p.thumb}
        alt=""
        fill
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] ${p.thumbPosition === 'top' ? 'object-top' : ''}`}
      />
    )
  if (p.schematic) return <Schematic kind={p.schematic} />
  return <div className="bp-grid h-full w-full bg-surface-2" />
}

function Card({ p, onOpen, animate, order }: { p: Project; onOpen: (id: string) => void; animate: boolean; order: number }) {
  const { language, t } = useLanguage()
  const title = cardTitle(p)[language]
  const details = hasDetails(p)
  const meta = [p.kind[language], p.period?.[language]].filter(Boolean).join(' · ')
  const stretch = 'after:absolute after:inset-0 after:rounded-md after:content-[""]'

  return (
    <li
      id={`p-${p.id}`}
      className={`scroll-mt-28 ${animate ? 'card-in' : ''}`}
      style={animate ? ({ '--d': `${Math.min(order, 8) * 40}ms` } as React.CSSProperties) : undefined}
    >
      <article className="card group relative flex h-full flex-col overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-hairline-strong focus-within:border-hairline-strong">
        <div className="relative aspect-[16/10] overflow-hidden border-b bg-surface-2">
          <Thumb p={p} />
          <span className="label absolute left-3 top-3 rounded bg-bg/85 px-2 py-1 text-ink-soft backdrop-blur-sm">{p.code}</span>
          {p.flagship && (
            <span className="label absolute right-3 top-3 rounded bg-accent-fill px-2 py-1 text-accent-ink">{t('projects.case')}</span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="label text-ink-faint">{meta}</p>
          <h4 className="heading mt-2.5 text-[1.1rem] text-ink">{title}</h4>
          <p className="mt-2 line-clamp-3 text-[0.95rem] leading-relaxed text-ink-soft">{p.summary[language]}</p>
          <DisciplineTags list={p.disciplines} short className="mt-4" />
          {(p.flagship || details) && (
            <div className="mt-auto pt-5">
              {p.flagship ? (
                <a href={`#case-${p.id}`} className={`inline-flex min-h-[44px] items-center gap-1.5 text-[0.9rem] font-semibold text-accent ${stretch}`}>
                  {t('projects.toCase')}
                  <span className="sr-only"> : {title}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => onOpen(p.id)}
                  aria-haspopup="dialog"
                  className={`inline-flex min-h-[44px] items-center gap-1.5 text-[0.9rem] font-semibold text-accent ${stretch}`}
                >
                  {t('projects.open')}
                  <span className="sr-only"> : {title}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}
            </div>
          )}
        </div>
      </article>
    </li>
  )
}

function Modal({
  p,
  onClose,
  onStep,
  position,
}: {
  p: Project
  onClose: () => void
  onStep: (dir: 1 | -1) => void
  position: { i: number; n: number }
}) {
  const { language, t } = useLanguage()
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = `fiche-${p.id}-title`

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (!d.open) d.showModal()
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    const onCloseEvt = () => onClose()
    d.addEventListener('close', onCloseEvt)
    return () => {
      d.removeEventListener('close', onCloseEvt)
      root.style.overflow = prev
      if (d.open) d.close()
    }
  }, [onClose])

  // revient en haut du contenu quand on change de fiche
  useEffect(() => {
    ref.current?.querySelector('[data-scroll]')?.scrollTo({ top: 0 })
  }, [p.id])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName
    if (tag === 'VIDEO') return
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      onStep(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      onStep(-1)
    }
  }

  const meta = [p.kind[language], p.period?.[language], p.team?.[language]].filter(Boolean).join(' · ')
  const sections: { title: string; body: React.ReactNode }[] = []
  if (p.context) sections.push({ title: t('projects.context'), body: <p className="leading-relaxed text-ink">{p.context[language]}</p> })
  if (p.work)
    sections.push({
      title: t('projects.work'),
      body: (
        <ul className="space-y-2.5">
          {p.work[language].map((w) => (
            <li key={w} className="flex gap-3 leading-relaxed text-ink">
              <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-ink-faint" />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      ),
    })
  if (p.results)
    sections.push({
      title: t('projects.results'),
      body: (
        <ul className="space-y-2.5">
          {p.results[language].map((r) => (
            <li key={r} className="flex gap-3 leading-relaxed text-ink">
              <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-[1px] bg-accent" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      ),
    })
  if (p.role) sections.push({ title: t('projects.role'), body: <p className="leading-relaxed text-ink-soft">{p.role[language]}</p> })
  if (p.learned) sections.push({ title: t('projects.learned'), body: <p className="leading-relaxed text-ink-soft">{p.learned[language]}</p> })

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onKeyDown={onKeyDown}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close()
      }}
      className="fiche m-auto max-h-[min(90vh,920px)] w-[calc(100%-1.5rem)] max-w-3xl overflow-hidden rounded-md border border-hairline-strong bg-surface p-0 text-ink backdrop:bg-[rgb(4_7_14/0.72)] backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[min(90vh,920px)] flex-col">
        <div className="flex items-center justify-between gap-4 border-b bg-surface-2/60 px-5 py-3">
          <p className="label truncate text-ink-faint">
            <span className="text-accent">{p.code}</span> · {meta}
          </p>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label={t('projects.close')}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-md text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div data-scroll className="flex-1 overflow-y-auto px-5 py-7 sm:px-8">
          <h3 id={titleId} className="heading text-[clamp(1.5rem,3vw,2rem)] text-ink">
            {p.title[language]}
          </h3>
          <p className="mt-3 text-[1.05rem] leading-relaxed text-ink-soft">{p.summary[language]}</p>
          <DisciplineTags list={p.disciplines} className="mt-5" />

          <div className="mt-6 flex flex-wrap gap-1.5">
            {p.tech.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-9 space-y-8">
            {sections.map((s, i) => (
              <section key={s.title} aria-label={s.title}>
                <h4 className="label flex items-center gap-3 text-ink-faint">
                  <span aria-hidden="true" className="tabular text-accent">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                  <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
                </h4>
                <div className="mt-3">{s.body}</div>
              </section>
            ))}
          </div>

          {p.media && p.media.length > 0 && (
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {p.media.map((m, i) => (
                <MediaFigure key={m.src} media={m} index={i} sizes="(min-width: 768px) 360px, 100vw" />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t px-4 py-3">
          <button type="button" onClick={() => onStep(-1)} className="btn-quiet">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">{t('projects.prev')}</span>
            <span className="sr-only sm:hidden">{t('projects.prev')}</span>
          </button>
          <p className="label tabular text-ink-faint" aria-live="polite">
            <span className="sr-only">{p.title[language]}, </span>
            {t('projects.position', { i: position.i, n: position.n })}
          </p>
          <button type="button" onClick={() => onStep(1)} className="btn-quiet">
            <span className="hidden sm:inline">{t('projects.next')}</span>
            <span className="sr-only sm:hidden">{t('projects.next')}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default function ProjectIndex() {
  const { language, t } = useLanguage()
  const [filter, setFilter] = useState<Filter>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const [animate, setAnimate] = useState(false)
  const lastTrigger = useRef<HTMLElement | null>(null)

  const list = useMemo(() => projectsFor(filter), [filter])
  const navigable = useMemo(() => list.filter(hasDetails), [list])
  const open = openId ? projects.find((p) => p.id === openId) ?? null : null

  const applyFilter = useCallback((f: Filter) => {
    setAnimate(true)
    setFilter(f)
  }, [])

  // filtres déclenchés depuis le hero et la section À propos
  useEffect(() => {
    const onFilter = (e: Event) => applyFilter((e as CustomEvent<Filter>).detail)
    window.addEventListener('gt:filter', onFilter)
    return () => window.removeEventListener('gt:filter', onFilter)
  }, [applyFilter])

  // lien profond #p-<id> (depuis l'expérience, ou partagé)
  useEffect(() => {
    const check = () => {
      const m = window.location.hash.match(/^#p-([\w-]+)$/)
      if (!m) return
      const p = projects.find((x) => x.id === m[1])
      if (!p) return
      setFilter((f) => (f === 'all' || p.disciplines.includes(f) ? f : 'all'))
      if (hasDetails(p)) setOpenId(p.id)
      else requestAnimationFrame(() => document.getElementById(`p-${p.id}`)?.scrollIntoView({ block: 'center' }))
    }
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [])

  const openFiche = useCallback((id: string) => {
    lastTrigger.current = document.activeElement as HTMLElement
    setOpenId(id)
    try {
      window.history.replaceState(null, '', `#p-${id}`)
    } catch {
      /* ignore */
    }
  }, [])

  const openRef = useRef<string | null>(null)
  useEffect(() => {
    openRef.current = openId
  }, [openId])

  const closeFiche = useCallback(() => {
    const cur = openRef.current
    setOpenId(null)
    if (!cur) return
    try {
      window.history.replaceState(null, '', '#index')
    } catch {
      /* ignore */
    }
    // rend le focus à la carte d'origine
    requestAnimationFrame(() => {
      const back = lastTrigger.current ?? document.querySelector<HTMLElement>(`#p-${cur} button`)
      back?.focus()
    })
  }, [])

  const step = useCallback(
    (dir: 1 | -1) => {
      const pool = navigable.length ? navigable : projects.filter(hasDetails)
      const i = pool.findIndex((p) => p.id === openRef.current)
      const next = pool[(i + dir + pool.length) % pool.length]
      lastTrigger.current = null
      setOpenId(next.id)
      try {
        window.history.replaceState(null, '', `#p-${next.id}`)
      } catch {
        /* ignore */
      }
    },
    [navigable]
  )

  const pool = navigable.length ? navigable : projects.filter(hasDetails)
  const position = open ? { i: pool.findIndex((p) => p.id === open.id) + 1, n: pool.length } : { i: 0, n: 0 }

  const filters: { key: Filter; label: string; n: number }[] = [
    { key: 'all', label: t('projects.all'), n: counts.all },
    ...disciplines.map((d) => ({ key: d.key as Filter, label: d.label[language], n: counts[d.key] })),
  ]

  return (
    <div id="index" className="mt-28 scroll-mt-24 md:mt-36">
      <Reveal className="border-b border-hairline-strong pb-8">
        <div className="max-w-2xl">
          <p className="label text-accent">{t('projects.index.kicker')}</p>
          <h3 className="heading mt-3 text-[clamp(1.6rem,3vw,2.3rem)] text-ink">{t('projects.index.title')}</h3>
          <p className="mt-3 max-w-xl text-ink-soft">{t('projects.index.note')}</p>
        </div>
        <div role="group" aria-label={t('projects.filter')} className="mt-7 flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f.key
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={active}
                onClick={() => applyFilter(f.key)}
                className={`inline-flex min-h-[44px] items-center gap-2 rounded-md border px-3.5 text-[0.9rem] transition-colors ${
                  active ? 'border-ink bg-ink text-bg' : 'border-hairline-strong text-ink-soft hover:border-ink-soft hover:text-ink'
                }`}
              >
                {f.key !== 'all' && <ChannelChip ch={f.key} />}
                {f.label}
                <span className="sr-only">, </span>
                <span className={`mono tabular text-[0.8rem] ${active ? 'text-bg/80' : 'text-ink-faint'}`}>{f.n}</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      <p className="sr-only" aria-live="polite">
        {t(list.length > 1 ? 'projects.shown' : 'projects.shownOne', { n: list.length })}
      </p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <Card key={`${filter}-${p.id}`} p={p} onOpen={openFiche} animate={animate} order={i} />
        ))}
      </ul>

      {open && <Modal p={open} onClose={closeFiche} onStep={step} position={position} />}
    </div>
  )
}
