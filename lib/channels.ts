/**
 * Logique des trois disciplines (filtres, compteurs, pastilles).
 * Tous les chiffres affichés sur le site sont CALCULÉS ici à partir de content.ts :
 * aucun compteur n'est écrit en dur.
 *   mech = Mécanique · elec = Électronique & Automatisme · soft = Logiciel & IA
 */
import { projects, type Channel, type Project, type SkillItem } from './content'

export type { Channel }

export const CHANNELS: Channel[] = ['mech', 'elec', 'soft']

/** Réalisations rattachées à une discipline (ou toutes). */
export function projectsFor(ch: Channel | 'all'): Project[] {
  return ch === 'all' ? projects : projects.filter((p) => p.disciplines.includes(ch))
}

/** Nombre de réalisations par discipline (une réalisation peut en couvrir plusieurs). */
export function countByChannel(): Record<Channel | 'all', number> {
  return {
    all: projects.length,
    mech: projectsFor('mech').length,
    elec: projectsFor('elec').length,
    soft: projectsFor('soft').length,
  }
}

const norm = (v: string) => v.trim().toLowerCase()

/**
 * Réalisations du portfolio qui mobilisent une compétence.
 * Correspondance exacte (insensible à la casse) entre les jetons de la compétence
 * et la liste « tech » de chaque projet, plus les rattachements explicites (refs).
 */
export function skillUsage(item: SkillItem): Project[] {
  const tokens = (item.match ?? [item.label.fr, item.label.en]).map(norm)
  const refs = new Set(item.refs ?? [])
  return projects.filter((p) => refs.has(p.id) || p.tech.some((t) => tokens.includes(norm(t))))
}

/** Discipline d'un nom d'outil (conservé pour l'ancien composant Conveyor, non affiché). */
export function toolChannel(tool: string): Channel {
  const v = tool.toLowerCase()
  if (/(solidworks|catia|blender|conception|cao)/.test(v)) return 'mech'
  if (/(arduino|esp32|stm32|tia|node-red|mqtt|automat|rt toolbox|pvsyst|électro|electro)/.test(v)) return 'elec'
  return 'soft'
}
