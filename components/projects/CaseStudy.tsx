'use client'

/**
 * ÉTUDE DE CAS (projets phares) : cadre, contexte, réalisation, architecture,
 * visuels, résultats réels. Pour TUNIAOS, seuls le titre, la ligne de cadre et les
 * quatre puces fournis par Ghada sont affichés (aucun contexte ni résultat ajouté) ;
 * les vidéos montrent le système en fonctionnement.
 */
import { ReactNode } from 'react'
import { useLanguage } from '../LanguageProvider'
import type { Project } from '@/lib/content'
import { DisciplineTags, Reveal } from '../ui/kit'
import Diagram from './Diagram'
import { MediaFigure } from './MediaFigure'

function Block({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <h4 className="label flex items-center gap-3 text-ink-faint">
        <span aria-hidden="true" className="tabular text-accent">{n}</span>
        <span>{title}</span>
        <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
      </h4>
      <div className="mt-4">{children}</div>
    </Reveal>
  )
}

function Bullets({ items, accent = false }: { items: string[]; accent?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex gap-3 text-[1rem] leading-relaxed text-ink">
          <span aria-hidden="true" className={`mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-[1px] ${accent ? 'bg-accent' : 'bg-ink-faint'}`} />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

export default function CaseStudy({ project: p, index, total }: { project: Project; index: number; total: number }) {
  const { language, t } = useLanguage()
  const longTitle = p.title.fr.length > 60
  const titleId = `case-${p.id}-title`
  const meta = [p.kind[language], p.place?.[language], p.period?.[language]].filter(Boolean).join(' | ')

  const blocks: { title: string; node: ReactNode }[] = []
  if (p.context) blocks.push({ title: t('projects.context'), node: <p className="text-[1.02rem] leading-relaxed text-ink">{p.context[language]}</p> })
  if (p.work)
    blocks.push({
      title: p.context ? t('projects.work') : t('projects.workList'),
      node: <Bullets items={p.work[language]} />,
    })
  if (p.results) blocks.push({ title: t('projects.results'), node: <Bullets items={p.results[language]} accent /> })
  if (p.role) blocks.push({ title: t('projects.role'), node: <p className="leading-relaxed text-ink-soft">{p.role[language]}</p> })
  if (p.learned) blocks.push({ title: t('projects.learned'), node: <p className="leading-relaxed text-ink-soft">{p.learned[language]}</p> })

  const hasVideo = p.media?.some((m) => m.type === 'video')

  return (
    <article id={`case-${p.id}`} aria-labelledby={titleId} className="scroll-mt-24">
      <Reveal className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-hairline-strong pb-4">
        <p className="label tabular text-accent">
          {t('projects.case')} {String(index + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
          <span className="text-ink-faint"> · {p.code}</span>
        </p>
        <DisciplineTags list={p.disciplines} />
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-8">
          {longTitle ? (
            <>
              {p.subtitle && <p className="label text-ink-soft">{p.subtitle[language]}</p>}
              <h3 id={titleId} className="heading mt-3 text-[clamp(1.45rem,2.6vw,2.15rem)] text-ink">
                {p.title[language]}
              </h3>
            </>
          ) : (
            <>
              <h3 id={titleId} className="display text-[clamp(2.4rem,5vw,3.8rem)] text-ink">
                {p.title[language]}
              </h3>
              {p.subtitle && <p className="heading mt-3 text-[clamp(1.15rem,2vw,1.45rem)] text-ink-soft">{p.subtitle[language]}</p>}
            </>
          )}
          <p className="mono mt-5 text-[0.9rem] leading-relaxed text-ink-soft">{meta}</p>
        </Reveal>

        <Reveal className="lg:col-span-4">
          <dl className="cartouche grid-cols-1 text-[0.875rem]">
            {p.team && (
              <div>
                <dt className="label text-ink-faint">{t('projects.team')}</dt>
                <dd className="mt-1 text-ink">{p.team[language]}</dd>
              </div>
            )}
            <div>
              <dt className="label text-ink-faint">{t('projects.tools')}</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-1.5">
                  {p.tech.map((tech) => (
                    <li key={tech} className="tag">
                      {tech}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-10 lg:col-span-6">
          {blocks.map((b, i) => (
            <Block key={b.title} n={String(i + 1).padStart(2, '0')} title={b.title}>
              {b.node}
            </Block>
          ))}
        </div>
        {p.architecture && (
          <Reveal className="lg:col-span-6">
            <Diagram arch={p.architecture} title={t('projects.architecture')} />
          </Reveal>
        )}
      </div>

      {p.media && p.media.length > 0 && (
        <div className="mt-14">
          <Reveal>
            <h4 className="label flex items-center gap-3 text-ink-faint">
              <span>{hasVideo && p.id === 'tuniaos' ? t('projects.demos') : t('projects.visuals')}</span>
              <span aria-hidden="true" className="h-px flex-1 bg-hairline" />
            </h4>
          </Reveal>
          <div className="mt-7 grid items-start gap-10 md:grid-cols-2">
            {p.media.map((m, i) => (
              <Reveal key={m.src} delay={i * 80}>
                <MediaFigure media={m} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
