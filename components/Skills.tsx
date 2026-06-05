'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Wrench, Cpu, Code2, Brain, Download } from 'lucide-react'
import SectionHeader from './draft/SectionHeader'

interface SkillCategory {
  icon: React.ElementType
  title: string
  skills: string[]
}

interface Certificate {
  title: string
  issuer: string
  href: string
}

const skillCategories: SkillCategory[] = [
  {
    icon: Wrench,
    title: 'Mécanique & Conception',
    skills: ['SolidWorks', 'CATIA V5', 'Blender', 'Conception 3D', 'Simulation'],
  },
  {
    icon: Cpu,
    title: 'Automatisation & Embarqué',
    skills: ['Arduino', 'ESP32', 'Capteurs industriels', 'Microcontrôleurs', 'Électronique'],
  },
  {
    icon: Code2,
    title: 'Logiciel & Data',
    skills: ['Python', 'Java', 'C#', 'Node-RED', 'MQTT', 'Développement logiciel'],
  },
  {
    icon: Brain,
    title: 'IA & AR',
    skills: [
      'Intelligence Artificielle',
      'Maintenance prédictive',
      'Unity',
      'Vuforia',
      'Computer Vision',
    ],
  },
]

const solidworksCerts: Certificate[] = [
  {
    title: 'SOLIDWORKS Simulation Professional',
    issuer: 'Par SOLIDWORKS',
    href: '/SOLIDWORKS Simulation Professional.jpg',
  },
  {
    title: 'SOLIDWORKS Additive Manufacturing Associate',
    issuer: 'Par SOLIDWORKS',
    href: '/SOLIDWORKS Additive Manufacturing Associate.jpg',
  },
  {
    title: 'SOLIDWORKS CAD Design Associate',
    issuer: 'Par SOLIDWORKS',
    href: '/Certified SOLIDWORKS CAD Design Associate.jpg',
  },
]

const nvidiaCerts: Certificate[] = [
  {
    title: 'Applications of AI for Predictive Maintenance',
    issuer: 'Par NVIDIA',
    href: '/Certificate Applications of AI for Predictive Maintenance.pdf',
  },
  {
    title: 'Generative AI with Diffusion Models',
    issuer: 'Par NVIDIA',
    href: '/Certificate Generative AI with Diffusion Models.pdf',
  },
]

/* ---------- downloadable certificate card (drafting treatment) ---------- */
function CertCard({
  cert,
  reference,
  reduce,
}: {
  cert: Certificate
  reference: string
  reduce: boolean | null
}) {
  return (
    <motion.a
      href={cert.href}
      download
      initial={{ opacity: 0, y: reduce ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: reduce ? 0 : 0.4 }}
      className="group corner-ticks flex flex-col justify-between border border-hairline bg-paper-2/40 p-5 transition-colors hover:border-accent
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
    >
      <div>
        <div className="label mb-3 text-ink-soft">{reference}</div>
        <h5 className="font-display text-base font-semibold leading-snug text-ink transition-colors group-hover:text-accent">
          {cert.title}
        </h5>
        <p className="mt-1 font-mono text-[11px] tracking-wide text-ink-soft">{cert.issuer}</p>
      </div>
      <span className="mt-5 flex items-center gap-2 border-t border-hairline pt-4 font-mono text-xs uppercase tracking-label text-ink transition-colors group-hover:text-accent">
        <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
        Télécharger le certificat
      </span>
    </motion.a>
  )
}

export default function Skills() {
  const reduce = useReducedMotion()

  return (
    <section id="skills" className="section-pad">
      <div className="sheet">
        <SectionHeader number="05" marker="E—E" title="Compétences" />

        {/* intro — hardcoded FR, drafting note style */}
        <motion.p
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: reduce ? 0 : 0.5 }}
          className="-mt-4 mb-14 max-w-2xl border-l-2 border-accent pl-4 text-base text-ink-soft md:text-lg"
        >
          Technologies et outils que je maîtrise pour transformer vos idées en réalité
        </motion.p>

        {/* SKILL CATEGORIES */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
          {skillCategories.map((category, categoryIndex) => {
            const Icon = category.icon
            const ref = `CMP-${String(categoryIndex + 1).padStart(2, '0')}`
            return (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: reduce ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : categoryIndex * 0.08 }}
                className="draft-surface flex flex-col p-6 md:p-7"
              >
                {/* header: accent icon + reference + title */}
                <div className="flex items-start gap-4 border-b border-hairline pb-5">
                  <span className="flex h-12 w-12 flex-none items-center justify-center border border-ink text-accent">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="label mb-1 text-ink-soft">{ref}</div>
                    <h3 className="font-display text-xl font-semibold leading-tight text-ink md:text-2xl">
                      {category.title}
                    </h3>
                  </div>
                </div>

                {/* skill chips */}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex}>
                      <span className="spec-chip inline-flex items-center gap-2 transition-colors hover:border-accent hover:text-accent">
                        <span className="h-1 w-1 flex-none bg-accent" aria-hidden="true" />
                        {skill}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* CERTIFICATIONS */}
        <div className="mt-24 border-t border-hairline pt-16">
          <div className="mb-12 flex items-center gap-3">
            <span className="inline-block h-px w-12 bg-accent" aria-hidden="true" />
            <h3 className="font-display text-3xl font-bold tracking-tight text-ink md:text-4xl">
              Certifications
            </h3>
          </div>

          {/* SOLIDWORKS group */}
          <div className="mb-16">
            <h4 className="label mb-6 text-ink">Certificats SOLIDWORKS disponibles</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {solidworksCerts.map((cert, i) => (
                <CertCard
                  key={cert.href}
                  cert={cert}
                  reference={`SW-${String(i + 1).padStart(2, '0')}`}
                  reduce={reduce}
                />
              ))}
            </div>
          </div>

          {/* NVIDIA group */}
          <div>
            <h4 className="label mb-6 text-ink">Certificats NVIDIA disponibles</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {nvidiaCerts.map((cert, i) => (
                <CertCard
                  key={cert.href}
                  cert={cert}
                  reference={`NV-${String(i + 1).padStart(2, '0')}`}
                  reduce={reduce}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
