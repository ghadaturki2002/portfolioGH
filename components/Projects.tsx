'use client'

import { useState, useEffect, ReactNode } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ArrowUpRight, Play, ImageOff } from 'lucide-react'
import { useLanguage } from './LanguageProvider'
import SectionHeader from './draft/SectionHeader'
import Measured from './draft/Measured'

interface Project {
  id: number
  title: string
  category: string
  description: string
  problem: string
  solution: string
  technologies: string[]
  image: string
}

const PLACEHOLDER = '/api/placeholder/600/400'
const ref = (id: number) => `PRJ-${String(id).padStart(2, '0')}`

/* ---------- small drafting sub-components for the modal ---------- */
function SpecBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="draft-surface p-5">
      <h4 className="label mb-3 text-ink">{label}</h4>
      {children}
    </div>
  )
}
function Bullet({ children, check }: { children: ReactNode; check?: boolean }) {
  return (
    <li className="flex items-start gap-2.5 leading-relaxed text-ink-soft">
      {check ? (
        <span className="mt-0.5 font-mono text-accent">✓</span>
      ) : (
        <span className="mt-2 h-1 w-1 flex-none bg-accent" />
      )}
      <span>{children}</span>
    </li>
  )
}

/**
 * Video that gracefully removes itself if the source file is missing.
 * (Two large demo videos are hosted separately; this keeps the modal clean
 * until they're added back — at which point the video appears automatically.)
 */
function SafeVideo({ src }: { src: string }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <div className="overflow-hidden border-[1.5px] border-ink bg-black">
      <video src={src} controls className="h-auto w-full" playsInline onError={() => setFailed(true)}>
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    </div>
  )
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const { t } = useLanguage()
  const reduce = useReducedMotion()

  // close any open modal on Escape (a11y)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPlayingVideo(null)
        setSelectedProject(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const projects: Project[] = [
    { id: 1, title: t('projects.project1.title'), category: 'IA', description: t('projects.project1.description'), problem: t('projects.project1.problem'), solution: t('projects.project1.solution'), technologies: ['SolidWorks', 'Intelligence Artificielle', 'ESP32', 'Computer Vision'], image: '/crac.jpg' },
    { id: 2, title: t('projects.project2.title'), category: 'AR', description: t('projects.project2.description'), problem: t('projects.project2.problem'), solution: t('projects.project2.solution'), technologies: ['Unity', 'C#', 'Vuforia', 'Blender', 'SolidWorks'], image: '/app.jpg' },
    { id: 7, title: t('projects.project7.title'), category: 'Automatisation', description: t('projects.project7.description'), problem: t('projects.project7.problem'), solution: t('projects.project7.solution'), technologies: ['Java', 'Électronique industrielle', 'Contrôleurs', 'SolidWorks'], image: '/groupe.jpg' },
    { id: 3, title: t('projects.project3.title'), category: 'IoT', description: t('projects.project3.description'), problem: t('projects.project3.problem'), solution: t('projects.project3.solution'), technologies: ['Arduino', 'Capteur E3F-DS30C4', 'SolidWorks', 'VS Code / Arduino IDE', 'Automatisation industrielle'], image: '/gd11.png' },
    { id: 8, title: t('projects.project8.title'), category: 'IoT', description: t('projects.project8.description'), problem: t('projects.project8.problem'), solution: t('projects.project8.solution'), technologies: ['Python', 'VS Code', 'QR Code', 'Reconnaissance faciale', 'CSV / Excel', 'Supervision industrielle'], image: '/gd.png' },
    { id: 9, title: t('projects.project9.title'), category: 'Automatisation', description: t('projects.project9.description'), problem: t('projects.project9.problem'), solution: t('projects.project9.solution'), technologies: ['Application mobile', 'Maintenance industrielle', 'Groupes électrogènes'], image: '/cappp.jpg' },
    { id: 4, title: t('projects.project4.title'), category: 'Robotique', description: t('projects.project4.description'), problem: t('projects.project4.problem'), solution: t('projects.project4.solution'), technologies: ['Arduino', 'SolidWorks', 'Capteurs', 'Algorithmes'], image: PLACEHOLDER },
    { id: 5, title: t('projects.project5.title'), category: 'Robotique', description: t('projects.project5.description'), problem: t('projects.project5.problem'), solution: t('projects.project5.solution'), technologies: ['SolidWorks', 'RT Tool Box', 'Robotique industrielle', 'Teaching method'], image: '/rttoolbox.png' },
    { id: 6, title: t('projects.project6.title'), category: 'IoT', description: t('projects.project6.description'), problem: t('projects.project6.problem'), solution: t('projects.project6.solution'), technologies: ['Node-RED', 'MQTT', 'ESP32', 'IoT', 'Dashboard'], image: PLACEHOLDER },
    { id: 10, title: t('projects.project10.title'), category: 'Automatisation', description: t('projects.project10.description'), problem: t('projects.project10.problem'), solution: t('projects.project10.solution'), technologies: ['WinDev', 'Base de données', "Carte d'acquisition", 'Supervision industrielle', 'Maintenance industrielle', 'MTTR / MTBF', 'Proteus 8'], image: '/mes1.png' },
  ]

  return (
    <section id="projects" className="section-pad">
      <div className="sheet">
        <SectionHeader number="04" marker="B—B" label={t('projects.subtitle')} title={t('projects.title')} />

        {/* PROJECT GRID */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const hasImage = project.image && project.image !== PLACEHOLDER
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: reduce ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : (index % 3) * 0.08 }}
                className="group flex flex-col"
              >
                {/* measured image */}
                <Measured widthLabel="640.00" heightLabel="440.00">
                  <div className="corner-ticks relative aspect-[16/11] overflow-hidden border-[1.5px] border-ink bg-paper-2">
                    {hasImage ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover grayscale-[35%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                      />
                    ) : (
                      // TODO: no real image — Projects 4 & 6 use a placeholder; replace with an actual image if available
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(45deg,transparent,transparent_9px,rgb(var(--hairline)/0.5)_9px,rgb(var(--hairline)/0.5)_10px)] text-ink-soft">
                        <ImageOff className="h-6 w-6" />
                        <span className="label">NO&nbsp;IMG · TODO</span>
                      </div>
                    )}
                    <span className="absolute right-3 top-3 spec-chip border-accent bg-paper/90 uppercase text-accent">
                      {project.category}
                    </span>
                  </div>
                </Measured>

                {/* meta */}
                <div className="mt-5 flex flex-1 flex-col">
                  <div className="label mb-2 text-ink-soft">{ref(project.id)}</div>
                  <h3 className="font-display text-xl font-semibold leading-tight text-ink transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span key={i} className="spec-chip">{tech}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="spec-chip text-ink-soft">+{project.technologies.length - 3}</span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="group/btn mt-5 flex items-center justify-between border-t border-hairline pt-4 font-mono text-xs uppercase tracking-label text-ink transition-colors hover:text-accent"
                  >
                    {t('projects.viewDetails')}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>

      {/* ---------- PROJECT DETAIL MODAL (section-view zoom) ---------- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: reduce ? 1 : 0.94, opacity: 0, y: reduce ? 0 : 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: reduce ? 1 : 0.96, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.title}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border-[1.5px] border-ink bg-paper shadow-2xl"
            >
              {/* modal title bar */}
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink bg-paper/95 px-5 py-3 backdrop-blur md:px-8">
                <span className="label text-accent">{ref(selectedProject.id)} · DETAIL VIEW — B—B</span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex h-8 w-8 items-center justify-center border border-ink transition-colors hover:bg-ink hover:text-paper"
                  aria-label={t('projects.close')}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-5 md:p-8">
                <span className="spec-chip border-accent uppercase text-accent">{selectedProject.category}</span>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-ink">{selectedProject.title}</h2>

                {/* ===== Project 5 — Woodcraft ===== */}
                {selectedProject.id === 5 && (
                  <div className="mt-6 space-y-5">
                    <div className="draft-surface overflow-hidden">
                      <img src="/rttoolbox.png" alt="Bras robotique Woodcraft - RT Tool Box" className="h-auto w-full" />
                    </div>
                    <SpecBlock label={t('projects.project5.objective')}>
                      <p className="leading-relaxed text-ink-soft">{t('projects.project5.objectiveDesc')}</p>
                    </SpecBlock>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((n) => (
                        <div key={n} className="draft-surface p-5">
                          <h4 className="mb-2 flex items-center gap-3 font-display text-lg font-semibold text-ink">
                            <span className="flex h-7 w-7 flex-none items-center justify-center bg-accent font-mono text-sm text-paper">{n}</span>
                            {t(`projects.project5.step${n}`)}
                          </h4>
                          <p className="leading-relaxed text-ink-soft">{t(`projects.project5.step${n}Desc`)}</p>
                        </div>
                      ))}
                    </div>
                    <SpecBlock label={t('projects.project5.highlights')}>
                      <ul className="space-y-2">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Bullet key={n} check>{t(`projects.project5.highlight${n}`)}</Bullet>
                        ))}
                      </ul>
                    </SpecBlock>
                  </div>
                )}

                {/* ===== Project 2 — Emulator + AR ===== */}
                {selectedProject.id === 2 && (
                  <div className="mt-6 draft-surface overflow-hidden">
                    <img src="/8.jpg" alt="Application AR - Émulateur de groupe électrogène" className="h-auto w-full" />
                  </div>
                )}

                {/* ===== Project 1 — Crack detection ===== */}
                {selectedProject.id === 1 && (
                  <div className="mt-6 space-y-5">
                    <SpecBlock label={t('projects.description')}>
                      <p className="leading-relaxed text-ink-soft">{t('projects.project1.detail')}</p>
                    </SpecBlock>
                    <div className="overflow-hidden border-[1.5px] border-ink bg-black">
                      <video src="/video.mp4" controls autoPlay className="h-auto w-full" playsInline>
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                    </div>
                  </div>
                )}

                {/* ===== Project 3 — Cable counting ===== */}
                {selectedProject.id === 3 && (
                  <div className="mt-6 space-y-5">
                    <SafeVideo src="/compateg.MOV" />
                    <SpecBlock label={t('projects.description')}>
                      <p className="leading-relaxed text-ink-soft">{t('projects.project3.detail')}</p>
                    </SpecBlock>
                    <SpecBlock label={t('projects.project3.features')}>
                      <ul className="space-y-2">{[1, 2, 3, 4].map((n) => <Bullet key={n}>{t(`projects.project3.feature${n}`)}</Bullet>)}</ul>
                    </SpecBlock>
                    <SpecBlock label={t('projects.project3.electronic')}>
                      <ul className="space-y-2">{[1, 2, 3, 4].map((n) => <Bullet key={n}>{t(`projects.project3.electronic${n}`)}</Bullet>)}</ul>
                    </SpecBlock>
                    <SpecBlock label={t('projects.project3.programming')}>
                      <ul className="space-y-2">{[1, 2, 3, 4].map((n) => <Bullet key={n}>{t(`projects.project3.programming${n}`)}</Bullet>)}</ul>
                    </SpecBlock>
                    <SpecBlock label={t('projects.project3.mechanical')}>
                      <ul className="space-y-2">{[1, 2, 3].map((n) => <Bullet key={n}>{t(`projects.project3.mechanical${n}`)}</Bullet>)}</ul>
                    </SpecBlock>
                  </div>
                )}

                {/* ===== Project 8 — Production desktop app (hardcoded FR) ===== */}
                {selectedProject.id === 8 && (
                  <div className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {[
                        ['/gd.png', 'Application desktop - Interface principale'],
                        ['/gd1.png', 'Module Administrateur'],
                        ['/gd3.png', 'Gestion des ouvriers'],
                        ['/gd4.png', 'Tableau de bord'],
                        ['/gd5.png', 'Module Ouvrier'],
                        ['/gd6.png', 'Export des données'],
                        ['/GD12.png', 'Supervision de production'],
                      ].map(([src, alt]) => (
                        <div key={src} className="draft-surface overflow-hidden">
                          <img src={src} alt={alt} className="h-auto w-full" />
                        </div>
                      ))}
                    </div>

                    <SpecBlock label="Description">
                      <p className="leading-relaxed text-ink-soft">
                        Application desktop intelligente dédiée à la gestion et au suivi de la production industrielle,
                        permettant de remplacer un système manuel basé sur des fiches papier par une solution numérique
                        automatisée, fiable et centralisée.
                      </p>
                    </SpecBlock>

                    <SpecBlock label="Architecture de l'application">
                      <ul className="space-y-2">
                        <Bullet>Application développée sous <strong className="text-ink">VS Code</strong></Bullet>
                        <Bullet>Interface divisée en deux modules : <strong className="text-ink">Module Administrateur</strong> et <strong className="text-ink">Module Ouvrier</strong></Bullet>
                        <Bullet>Navigation simple et intuitive via des menus dédiés</Bullet>
                      </ul>
                    </SpecBlock>

                    <SpecBlock label="Module Administrateur">
                      <div className="space-y-4 text-ink-soft">
                        <div>
                          <h5 className="mb-1 font-semibold text-ink">Authentification sécurisée</h5>
                          <ul className="ml-4 space-y-1 text-sm">
                            <li>• Accès protégé par mot de passe</li>
                            <li>• Fenêtre modale bloquant l'accès en cas d'échec</li>
                            <li>• Gestion sécurisée des fonctionnalités sensibles</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="mb-1 font-semibold text-ink">Gestion des ouvriers</h5>
                          <ul className="ml-4 space-y-1 text-sm">
                            <li>• Ajout d'un ouvrier avec saisie du nom</li>
                            <li>• Capture photo via webcam</li>
                            <li>• Génération automatique d'un <strong className="text-ink">QR code unique</strong></li>
                            <li>• Encodage facial pour la <strong className="text-ink">reconnaissance biométrique</strong></li>
                            <li>• Données sauvegardées (CSV, PNG, JSON)</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="mb-1 font-semibold text-ink">Gestion des opérations</h5>
                          <ul className="ml-4 space-y-1 text-sm">
                            <li>• Génération automatique de QR codes d'opérations</li>
                            <li>• Visualisation centralisée de tous les QR codes (ouvriers & opérations)</li>
                            <li>• Suppression sécurisée des ouvriers avec nettoyage complet des données</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="mb-1 font-semibold text-ink">Tableau de bord & supervision</h5>
                          <ul className="ml-4 space-y-1 text-sm">
                            <li>• Vue globale des opérations en cours et terminées</li>
                            <li>• Filtrage des données par dates</li>
                            <li>• Groupement par type de câble ou par opération</li>
                            <li>• Indicateurs clés : nombre de shifts, efficacité moyenne, quantités demandées/produites/restantes</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="mb-1 font-semibold text-ink">Export des données</h5>
                          <ul className="ml-4 space-y-1 text-sm">
                            <li>• Génération automatique de rapports <strong className="text-ink">Excel multi-feuilles</strong></li>
                            <li>• Historique des shifts, statistiques globales, liste des ouvriers</li>
                            <li>• Résumé de production par câble et par opération</li>
                          </ul>
                        </div>
                      </div>
                    </SpecBlock>

                    <SpecBlock label="Module Ouvrier">
                      <div className="space-y-4 text-ink-soft">
                        <div>
                          <h5 className="mb-1 font-semibold text-ink">Début de shift</h5>
                          <ul className="ml-4 space-y-1 text-sm">
                            <li>• Identification par <strong className="text-ink">reconnaissance faciale</strong> ou scan de QR code personnel</li>
                            <li>• Sélection de l'opération via QR code</li>
                            <li>• Choix du type de câble</li>
                            <li>• Saisie de la quantité demandée</li>
                            <li>• Enregistrement automatique du shift</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="mb-1 font-semibold text-ink">Fin de shift</h5>
                          <ul className="ml-4 space-y-1 text-sm">
                            <li>• Identification de l'ouvrier</li>
                            <li>• Affichage des données du shift en cours</li>
                            <li>• Saisie de la quantité réellement produite</li>
                            <li>• Validation et clôture automatique du shift</li>
                            <li>• Enregistrement sécurisé dans le système</li>
                          </ul>
                        </div>
                      </div>
                    </SpecBlock>

                    <SpecBlock label="Valeur ajoutée du projet">
                      <ul className="space-y-2">
                        <Bullet check><strong className="text-ink">Digitalisation complète</strong> d'un processus industriel manuel</Bullet>
                        <Bullet check>Amélioration de la <strong className="text-ink">traçabilité et de la fiabilité</strong> des données</Bullet>
                        <Bullet check><strong className="text-ink">Suivi en temps réel</strong> de la production</Bullet>
                        <Bullet check>Base solide pour l'intégration d'automatisation (comptage câbles, IoT)</Bullet>
                      </ul>
                    </SpecBlock>
                  </div>
                )}

                {/* ===== Project 9 — Error-code mobile app (hardcoded FR) ===== */}
                {selectedProject.id === 9 && (
                  <div className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {[
                        ['/Phone.jpg', 'Application mobile - Interface principale', false],
                        ['/phone1.jpg', "Phone 1 - Saisie du code d'erreur", false],
                        ['/phone 2.jpg', "Phone 2 - Interface de l'application", true],
                        ['/phone 3.jpg', 'Phone 3 - Affichage de la description', false],
                        ['/phone 4.jpg', "Phone 4 - Interface de l'application", false],
                        ['/phone 5.jpg', "Phone 5 - Résultat de l'interprétation", false],
                        ['/phone 6.jpg', "Phone 6 - Fonctionnalités de l'application", true],
                      ].map(([src, alt, hideOnError]) => (
                        <div key={src as string} className="draft-surface overflow-hidden">
                          <img
                            src={src as string}
                            alt={alt as string}
                            className="h-auto w-full"
                            onError={hideOnError ? (e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' } : undefined}
                          />
                        </div>
                      ))}
                    </div>

                    <SpecBlock label="Description">
                      <p className="leading-relaxed text-ink-soft">
                        Application mobile simple permettant aux techniciens de saisir un code d'erreur affiché sur le
                        contrôleur <strong className="text-ink">Guard Revolution AMF25</strong> d'un groupe électrogène et d'afficher instantanément
                        la description détaillée du défaut correspondant.
                      </p>
                    </SpecBlock>

                    <SpecBlock label="Fonctionnalité principale">
                      <ul className="space-y-2">
                        <Bullet><strong className="text-ink">Saisie manuelle du code d'erreur</strong> affiché sur le générateur</Bullet>
                        <Bullet><strong className="text-ink">Affichage instantané</strong> de la description correspondante</Bullet>
                        <Bullet>Aucun paramétrage complexe, <strong className="text-ink">utilisation rapide sur le terrain</strong></Bullet>
                      </ul>
                    </SpecBlock>

                    <SpecBlock label="Développement & Programmation">
                      <ul className="space-y-2">
                        <Bullet>Application mobile développée</Bullet>
                        <Bullet>Gestion des entrées utilisateur (code d'erreur)</Bullet>
                        <Bullet>Association code → description via une <strong className="text-ink">base de données locale</strong></Bullet>
                        <Bullet>Affichage dynamique du résultat à l'écran</Bullet>
                        <Bullet>Tests fonctionnels pour garantir la fiabilité de l'affichage</Bullet>
                      </ul>
                    </SpecBlock>

                    <SpecBlock label="Contexte industriel">
                      <ul className="space-y-2">
                        <Bullet>Utilisation en <strong className="text-ink">maintenance de groupes électrogènes</strong></Bullet>
                        <Bullet>Outil d'<strong className="text-ink">assistance rapide</strong> pour les techniciens</Bullet>
                        <Bullet>Complément direct à l'afficheur <strong className="text-ink">Guard Revolution AMF25</strong></Bullet>
                      </ul>
                    </SpecBlock>

                    <SpecBlock label="Avantages de la solution">
                      <ul className="space-y-2">
                        <Bullet check><strong className="text-ink">Gain de temps</strong> lors des interventions de maintenance</Bullet>
                        <Bullet check><strong className="text-ink">Interprétation instantanée</strong> des codes d'erreur techniques</Bullet>
                        <Bullet check>Application <strong className="text-ink">légère et intuitive</strong>, facile à utiliser sur le terrain</Bullet>
                        <Bullet check>Fonctionne <strong className="text-ink">hors ligne</strong> grâce à la base de données locale</Bullet>
                      </ul>
                    </SpecBlock>
                  </div>
                )}

                {/* ===== Project 10 — Industrial supervision ===== */}
                {selectedProject.id === 10 && (
                  <div className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      {[
                        ['/mes1.png', 'Application de supervision - Interface principale'],
                        ['/MES2.png', 'Fenêtre Arrêts & Maintenance'],
                        ['/MES3.png', 'Fenêtre Suivi de la production'],
                        ['/mes4.png', 'Fenêtre Suivi process'],
                      ].map(([src, alt]) => (
                        <div key={src} className="draft-surface overflow-hidden">
                          <img src={src} alt={alt} className="h-auto w-full" />
                        </div>
                      ))}
                    </div>

                    <SpecBlock label={t('projects.description')}>
                      <p className="leading-relaxed text-ink-soft">{t('projects.project10.detail')}</p>
                    </SpecBlock>

                    <SpecBlock label={t('projects.project10.problematic')}>
                      <p className="mb-3 leading-relaxed text-ink-soft">{t('projects.project10.problematicDesc')}</p>
                      <ul className="space-y-2">{[1, 2, 3].map((n) => <Bullet key={n}>{t(`projects.project10.problematic${n}`)}</Bullet>)}</ul>
                    </SpecBlock>

                    <SpecBlock label={t('projects.project10.solutionTitle')}>
                      <p className="mb-3 leading-relaxed text-ink-soft">{t('projects.project10.solutionDesc')}</p>
                      <ul className="space-y-2">{[1, 2, 3].map((n) => <Bullet key={n}>{t(`projects.project10.solution${n}`)}</Bullet>)}</ul>
                    </SpecBlock>

                    <SpecBlock label={t('projects.project10.acquisition')}>
                      <ul className="mb-3 space-y-2">{[1, 2, 3].map((n) => <Bullet key={n}>{t(`projects.project10.acquisition${n}`)}</Bullet>)}</ul>
                      <p className="leading-relaxed text-ink-soft">➡️ {t('projects.project10.acquisitionDesc')}</p>
                    </SpecBlock>

                    <SpecBlock label={t('projects.project10.interface')}>
                      <div className="space-y-4 text-ink-soft">
                        {['window1', 'window2', 'window3', 'windowMain'].map((w) => (
                          <div key={w}>
                            <h5 className="mb-1 font-semibold text-ink">{t(`projects.project10.${w}`)}</h5>
                            <p className="text-sm">{t(`projects.project10.${w}Desc`)}</p>
                          </div>
                        ))}
                      </div>
                    </SpecBlock>

                    <SpecBlock label={t('projects.project10.development')}>
                      <ul className="space-y-2">{[1, 2, 3, 4].map((n) => <Bullet key={n}>{t(`projects.project10.dev${n}`)}</Bullet>)}</ul>
                    </SpecBlock>

                    <SpecBlock label={t('projects.project10.value')}>
                      <ul className="space-y-2">{[1, 2, 3, 4].map((n) => <Bullet key={n} check>{t(`projects.project10.value${n}`)}</Bullet>)}</ul>
                    </SpecBlock>
                  </div>
                )}

                {/* ===== Project 7 — Fault simulator (photos + video gallery) ===== */}
                {selectedProject.id === 7 && (
                  <div className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="draft-surface overflow-hidden">
                        <img src="/groupe.jpg" alt="Simulateur de pannes de groupe électrogène" className="h-auto w-full" />
                      </div>
                      <div className="draft-surface overflow-hidden">
                        <img src="/projet  groupe.jpg" alt="Projet simulateur de pannes - Vue d'ensemble" className="h-auto w-full" />
                      </div>
                    </div>
                    <div>
                      <h3 className="label mb-4 text-ink">Présentation du projet</h3>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[
                          ['/realisation.mp4', 'Vidéo de réalisation'],
                          ['/video1.mp4', 'Présentation du projet'],
                          ['/video2.mp4', 'Présentation du projet'],
                          ['/video3.mp4', 'Présentation du projet'],
                        ].map(([src, label]) => (
                          <motion.button
                            key={src}
                            onClick={() => setPlayingVideo(src)}
                            whileHover={reduce ? {} : { scale: 1.02 }}
                            aria-label={label}
                            className="group/v overflow-hidden border-[1.5px] border-ink bg-black text-left"
                          >
                            <div className="relative aspect-video">
                              <video
                                src={src}
                                className="h-full w-full object-cover"
                                muted
                                playsInline
                                preload="metadata"
                                onError={(e) => {
                                  // hide this thumbnail if its video file isn't deployed (large videos hosted separately)
                                  const btn = (e.currentTarget as HTMLVideoElement).closest('button')
                                  if (btn) (btn as HTMLElement).style.display = 'none'
                                }}
                              />
                              <span className="absolute inset-0 flex items-center justify-center bg-ink/40 transition-colors group-hover/v:bg-ink/20">
                                <Play className="h-9 w-9 fill-paper text-paper" />
                              </span>
                            </div>
                            <p className="bg-paper-2 px-3 py-2 text-center font-mono text-[11px] text-ink">{label}</p>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ===== Generic blocks (all projects) ===== */}
                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  <div>
                    <h3 className="label mb-2 text-ink">{t('projects.description')}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{selectedProject.description}</p>
                  </div>
                  <div>
                    <h3 className="label mb-2 text-ink">{t('projects.problem')}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{selectedProject.problem}</p>
                  </div>
                  <div>
                    <h3 className="label mb-2 text-ink">{t('projects.solution')}</h3>
                    <p className="text-sm leading-relaxed text-ink-soft">{selectedProject.solution}</p>
                  </div>
                </div>

                <div className="mt-8 border-t border-hairline pt-6">
                  <h3 className="label mb-3 text-ink">{t('projects.technologies')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, i) => (
                      <span key={i} className="spec-chip">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------- VIDEO LIGHTBOX ---------- */}
      <AnimatePresence>
        {playingVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/90 p-4 backdrop-blur-sm"
            onClick={() => setPlayingVideo(null)}
          >
            <motion.div
              initial={{ scale: reduce ? 1 : 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: reduce ? 1 : 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Video"
              className="relative w-full max-w-5xl"
            >
              <button
                onClick={() => setPlayingVideo(null)}
                className="absolute -top-11 right-0 flex h-9 w-9 items-center justify-center border border-paper/40 text-paper transition-colors hover:bg-paper/20"
                aria-label={t('projects.close')}
              >
                <X className="h-5 w-5" />
              </button>
              <div className="overflow-hidden border-[1.5px] border-paper/30 bg-black shadow-2xl">
                <video src={playingVideo} controls autoPlay className="h-auto w-full" playsInline>
                  Votre navigateur ne supporte pas la lecture de vidéos.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
