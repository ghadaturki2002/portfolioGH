'use client'

/**
 * 05 · CERTIFICATIONS — les 13 certificats, groupés par éditeur ;
 * les deux « Professional » SOLIDWORKS sont mis en avant. Chaque ligne télécharge
 * le PDF du certificat.
 */
import { Award, Download } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import { certificationGroups, certifications, type Certification } from '@/lib/content'
import { Reveal, SectionHeader } from './ui/kit'

function Row({ c }: { c: Certification }) {
  const { t } = useLanguage()
  return (
    <li className="flex items-center justify-between gap-4 border-t py-3 first:border-t-0">
      <div className="min-w-0">
        <p className="text-[0.98rem] text-ink">{c.name}</p>
        <p className="mono tabular mt-0.5 text-[0.8125rem] text-ink-faint">{c.date}</p>
      </div>
      <a
        href={c.file}
        download
        className="inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-md px-3 text-[0.875rem] text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        <span aria-hidden="true">{t('certs.pdf')}</span>
        <span className="sr-only">
          {t('certs.download')} : {c.fullName} ({t('certs.pdf')})
        </span>
      </a>
    </li>
  )
}

export default function Certifications() {
  const { language, t } = useLanguage()
  const pros = certifications.filter((c) => c.level === 'professional')
  const solidworksAssociates = certifications.filter((c) => c.group === 'solidworks' && c.level !== 'professional')
  const group = (id: Certification['group']) => certificationGroups.find((g) => g.id === id)!

  return (
    <section id="certifications" aria-labelledby="certs-title" className="section border-t">
      <div className="container-x">
        <SectionHeader
          index={5}
          kicker={t('certs.kicker')}
          title={t('certs.title')}
          intro={t('certs.count', { n: certifications.length })}
          titleId="certs-title"
        />

        {/* les deux « Professional » */}
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {pros.map((c, i) => (
            <Reveal as="li" key={c.file} delay={i * 80} className="card relative overflow-hidden p-7">
              <div aria-hidden="true" className="bp-grid absolute inset-0 opacity-60" />
              <div className="relative">
                <p className="label flex items-center gap-2 text-accent">
                  <Award className="h-4 w-4" aria-hidden="true" />
                  {t('certs.professional')}
                </p>
                <h3 className="heading mt-4 text-[clamp(1.35rem,2.4vw,1.75rem)] text-ink">{c.fullName}</h3>
                <p className="mono tabular mt-2 text-[0.875rem] text-ink-soft">
                  Dassault Systèmes · {c.date}
                </p>
                <a href={c.file} download className="btn-secondary mt-6 min-h-[44px] text-sm">
                  <Download className="h-4 w-4" aria-hidden="true" />
                  {t('certs.download')}
                  <span className="sr-only"> : {c.fullName} ({t('certs.pdf')})</span>
                </a>
              </div>
            </Reveal>
          ))}
        </ul>

        <div className="mt-5 grid gap-5 lg:grid-cols-12">
          <Reveal className="card p-6 lg:col-span-7">
            <h3 className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="heading text-[1.15rem] text-ink">{group('solidworks').name} · Associate</span>
              <span className="mono tabular text-[0.8125rem] text-ink-faint">
                <span className="sr-only">, </span>
                {solidworksAssociates.length}
              </span>
            </h3>
            <p className="mt-1 text-[0.9rem] text-ink-soft">{group('solidworks').detail[language]}</p>
            <ul className="mt-4">
              {solidworksAssociates.map((c) => (
                <Row key={c.file} c={c} />
              ))}
            </ul>
          </Reveal>

          <div className="space-y-5 lg:col-span-5">
            {(['3dexperience', 'nvidia'] as const).map((id, i) => {
              const items = certifications.filter((c) => c.group === id)
              return (
                <Reveal key={id} delay={i * 80} className="card p-6">
                  <h3 className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="heading text-[1.15rem] text-ink">{group(id).name}</span>
                    <span className="mono tabular text-[0.8125rem] text-ink-faint">
                      <span className="sr-only">, </span>
                      {items.length}
                    </span>
                  </h3>
                  <p className="mt-1 text-[0.9rem] text-ink-soft">{group(id).detail[language]}</p>
                  <ul className="mt-4">
                    {items.map((c) => (
                      <Row key={c.file} c={c} />
                    ))}
                  </ul>
                </Reveal>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
