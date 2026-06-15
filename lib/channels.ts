/**
 * TRICHROME channel system — the wayfinding logic.
 * Every artifact (project, skill, role, certification) is tagged to one
 * of three channels. All counts/codes are DERIVED from content.ts facts.
 *   mech = mechanics (gentian blue)   — CAD, design
 *   elec = electronics & automation (phosphor amber)
 *   soft = software & AI (process magenta)
 */
import { projects, experiences, type Project, type Experience } from './content'

export type Channel = 'mech' | 'elec' | 'soft'

export const CHANNEL_LETTER: Record<Channel, string> = {
  mech: 'M',
  elec: 'E',
  soft: 'S',
}

/* Category → channel mapping (robotique resolves per-project below). */
const CATEGORY_CHANNEL: Record<string, Channel | null> = {
  mecanique: 'mech',
  automatisme: 'elec',
  iot: 'elec',
  energie: 'elec',
  ia: 'soft',
  ar: 'soft',
  gestion: 'soft',
  robotique: null, // per-project dominant channel
}

/** Dominant channel of a project: first mapped category wins;
 *  pure-robotics projects default to elec (embedded control). */
export function projectChannel(p: Project): Channel {
  for (const cat of p.categories) {
    const ch = CATEGORY_CHANNEL[cat]
    if (ch) return ch
  }
  return 'elec'
}

/** Channel of a filter category (for pill chips). Robotique → elec chip. */
export function categoryChannel(id: string): Channel | null {
  if (id === 'all') return null
  return CATEGORY_CHANNEL[id] ?? 'elec'
}

/** Index codes M·01, E·03, S·07 — numbered per channel, in display order. */
export const projectIndex: Map<string, { channel: Channel; code: string }> = (() => {
  const counters: Record<Channel, number> = { mech: 0, elec: 0, soft: 0 }
  const map = new Map<string, { channel: Channel; code: string }>()
  for (const p of projects) {
    const ch = projectChannel(p)
    counters[ch] += 1
    map.set(p.id, { channel: ch, code: `${CHANNEL_LETTER[ch]}·${String(counters[ch]).padStart(2, '0')}` })
  }
  return map
})()

/** Dominant channel of an experience, from its tech list. */
export function experienceChannel(e: Experience): Channel {
  const t = e.tech.join(' ').toLowerCase()
  if (/(python|c#|java|unity|vuforia|lstm|random forest|pytorch|windev|machine learning)/.test(t)) return 'soft'
  if (/(arduino|esp32|tia|capteur|automate|mqtt|node-red|électronique|qr)/.test(t)) return 'elec'
  return 'mech'
}

/** Channels touched by an experience (for multi-chip rows). */
export function experienceChannels(e: Experience): Channel[] {
  const t = e.tech.join(' ').toLowerCase()
  const out: Channel[] = []
  if (/(solidworks|catia|blender|guard revolution)/.test(t)) out.push('mech')
  if (/(arduino|esp32|tia|capteur|mqtt|node-red|électronique|qr|lean)/.test(t)) out.push('elec')
  if (/(python|c#|java|unity|vuforia|lstm|random forest|pytorch|windev|excel|flask)/.test(t)) out.push('soft')
  return out.length ? out : [experienceChannel(e)]
}

/** Channel of a tool/skill name (for chips on skills, conveyor, about). */
export function toolChannel(tool: string): Channel {
  const s = tool.toLowerCase()
  if (/(solidworks|catia|blender|conception|simulation|prototypage|cao|rt toolbox)/.test(s)) return 'mech'
  if (/(arduino|esp32|tia|capteur|node-red|mqtt|automat|pvsyst|électro|electro)/.test(s)) return 'elec'
  return 'soft'
}

/** TRUE usage count of a tool across projects + experiences tech lists.
 *  Used for the Skills bench weight-as-usage mapping — never invented. */
export function usageCount(tool: string): number {
  const needle = tool.toLowerCase()
  let n = 0
  for (const p of projects) {
    if (p.tech.some((t) => t.toLowerCase().includes(needle) || needle.includes(t.toLowerCase()))) n += 1
  }
  for (const e of experiences) {
    if (e.tech.some((t) => t.toLowerCase().includes(needle) || needle.includes(t.toLowerCase()))) n += 1
  }
  return n
}

/** Map a true usage count to a Bricolage variable weight. */
export function usageWeight(count: number): number {
  if (count >= 5) return 700
  if (count >= 3) return 550
  return 420
}

/** Per-channel TRUE project counts (About tri-axis bars). */
export function channelCounts(): Record<Channel, number> {
  const counts: Record<Channel, number> = { mech: 0, elec: 0, soft: 0 }
  for (const p of projects) counts[projectChannel(p)] += 1
  return counts
}
