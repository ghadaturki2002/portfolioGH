'use client'

/**
 * Schémas d'architecture en HTML (et non en image) : texte réel, lisible par les
 * lecteurs d'écran, qui se réorganise sur mobile. Posés sur une planche à dessin
 * (grille blueprint + repères de coupe).
 */
import { ArrowDown } from 'lucide-react'
import { useLanguage } from '../LanguageProvider'
import type { ArchBox, Architecture } from '@/lib/content'
import { CH_BG, CH_BORDER } from '../ui/kit'

function Box({ box, emphasis = false, dashed = false, fill = false }: { box: ArchBox; emphasis?: boolean; dashed?: boolean; fill?: boolean }) {
  const { language } = useLanguage()
  return (
    <div
      className={[
        'relative rounded-md border bg-surface px-4 py-3',
        fill ? 'h-full' : '',
        emphasis ? 'border-accent/70 shadow-[0_0_0_3px_rgb(var(--accent-fill)/0.12)]' : box.ch ? CH_BORDER[box.ch] : 'border-hairline-strong',
        dashed ? 'border-dashed' : '',
      ].join(' ')}
    >
      <p className="flex items-center gap-2 text-[0.9rem] font-semibold text-ink">
        {box.ch && <span aria-hidden="true" className={`chip-sq ${CH_BG[box.ch]}`} />}
        {box.title[language]}
      </p>
      <ul className="mt-1.5 space-y-0.5 text-[0.8125rem] leading-snug text-ink-soft">
        {box.items[language].map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Diagram({ arch, title }: { arch: Architecture; title: string }) {
  const { language } = useLanguage()
  return (
    <figure className="marks">
      <div className="bp-grid rounded-md border bg-bg-2 p-5 sm:p-6">
        <p className="label mb-5 flex items-center justify-between text-ink-faint">
          <span>{title}</span>
          <span aria-hidden="true">{language === 'fr' ? 'ÉCH. 1:1' : 'SCALE 1:1'}</span>
        </p>

        {arch.type === 'hub' ? (
          <div>
            <ul className="grid gap-3 sm:grid-cols-3">
              {arch.spokes.map((sp) => (
                <li key={sp.title.en} className="relative">
                  <Box box={sp} fill />
                  {/* liaison verticale vers le bus */}
                  <span aria-hidden="true" className="absolute left-1/2 top-full hidden h-4 w-px bg-ink-faint/60 sm:block" />
                </li>
              ))}
            </ul>
            {/* bus horizontal + descente vers le jumeau */}
            <div aria-hidden="true" className="relative hidden h-8 sm:block">
              <span className="absolute left-[16.66%] right-[16.66%] top-4 h-px bg-ink-faint/60" />
              <span className="absolute left-1/2 top-4 h-4 w-px bg-ink-faint/60" />
            </div>
            <div aria-hidden="true" className="flex justify-center py-2 text-ink-faint sm:hidden">
              <ArrowDown className="h-4 w-4" />
            </div>
            <div className="mx-auto max-w-sm">
              <Box box={arch.center} emphasis />
            </div>
          </div>
        ) : (
          <div>
            <ol className="space-y-0">
              {arch.steps.map((st, i) => (
                <li key={st.title.en}>
                  <Box box={st} />
                  {i < arch.steps.length - 1 && (
                    <div aria-hidden="true" className="flex justify-center py-1.5 text-ink-faint">
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  )}
                </li>
              ))}
            </ol>
            {(arch.outputs || arch.aside) && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {arch.outputs && <Box box={arch.outputs} emphasis />}
                {arch.aside && <Box box={arch.aside} dashed />}
              </div>
            )}
          </div>
        )}
      </div>
      <figcaption className="mt-3 text-[0.875rem] text-ink-faint">{arch.caption[language]}</figcaption>
    </figure>
  )
}
