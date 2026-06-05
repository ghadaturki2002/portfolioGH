'use client'

import { useLanguage } from '../LanguageProvider'

/**
 * Engineering-drawing title block, pinned in the bottom-right corner.
 * Doubles as a sticky meta element. Field labels are drawing apparatus;
 * values reuse real identity content (name + discipline).
 */
export default function TitleBlock() {
  const { language } = useLanguage()
  const discipline =
    language === 'fr' ? 'ÉLECTROMÉCANIQUE · MÉCATRONIQUE' : 'ELECTROMECHANICS · MECHATRONICS'

  return (
    <aside
      aria-label="Drawing title block"
      className="fixed bottom-4 right-4 z-40 hidden border-[1.5px] border-ink bg-paper/95 font-mono text-ink shadow-[0_2px_0_rgb(var(--hairline))] backdrop-blur-sm lg:block"
    >
      <div className="flex border-b border-hairline">
        <div className="border-r border-hairline px-3 py-1.5">
          <span className="block text-[8px] tracking-label text-ink-soft">TITLE</span>
          <span className="font-display text-[13px] font-bold tracking-wide">GHADA TURKI</span>
        </div>
        <div className="px-3 py-1.5">
          <span className="block text-[8px] tracking-label text-ink-soft">DISCIPLINE</span>
          <span className="text-[10px] tracking-wide text-accent">{discipline}</span>
        </div>
      </div>
      <div className="flex text-[9px]">
        <div className="border-r border-hairline px-3 py-1.5">
          <span className="block text-[8px] tracking-label text-ink-soft">DWG&nbsp;NO</span>
          GT-2026-01
        </div>
        <div className="border-r border-hairline px-3 py-1.5">
          <span className="block text-[8px] tracking-label text-ink-soft">REV</span>A
        </div>
        <div className="border-r border-hairline px-3 py-1.5">
          <span className="block text-[8px] tracking-label text-ink-soft">DATE</span>2026-06
        </div>
        <div className="px-3 py-1.5">
          <span className="block text-[8px] tracking-label text-ink-soft">SCALE</span>1:1
        </div>
      </div>
    </aside>
  )
}
