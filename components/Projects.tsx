'use client'

/**
 * 02 · PROJETS — trois études de cas en grand format (TUNIAOS, GenARino,
 * Crack Scout), puis l'index filtrable de toutes les réalisations.
 */
import { useLanguage } from './LanguageProvider'
import { projects } from '@/lib/content'
import { SectionHeader } from './ui/kit'
import CaseStudy from './projects/CaseStudy'
import ProjectIndex from './projects/ProjectIndex'

const flagships = projects.filter((p) => p.flagship)

export default function Projects() {
  const { t } = useLanguage()
  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="container-x">
        <SectionHeader
          index={2}
          kicker={t('projects.kicker')}
          title={t('projects.title')}
          intro={t('projects.intro')}
          titleId="projects-title"
        />
        <div className="mt-16 space-y-28 md:mt-20 md:space-y-36">
          {flagships.map((p, i) => (
            <CaseStudy key={p.id} project={p} index={i} total={flagships.length} />
          ))}
        </div>
        <ProjectIndex />
      </div>
    </section>
  )
}
