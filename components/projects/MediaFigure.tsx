'use client'

/**
 * Figure média : image optimisée (next/image) ou vidéo.
 * Vidéo « à la demande » : on affiche d'abord le poster (chargé paresseusement)
 * sous un vrai bouton « Lire la vidéo » atteignable au clavier ; le lecteur et le
 * fichier ne sont chargés qu'au clic. Pistes de sous-titres FR/EN, celle de la
 * langue du site étant active par défaut.
 */
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { useLanguage } from '../LanguageProvider'
import type { Media } from '@/lib/content'

export function VideoPlayer({ media, label }: { media: Media; label: string }) {
  const { language } = useLanguage()
  const [active, setActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!active) return
    const v = videoRef.current
    if (!v) return
    v.focus()
    v.play().catch(() => {
      /* lecture bloquée : les contrôles restent disponibles */
    })
  }, [active])

  return (
    <div className="relative overflow-hidden rounded-md border bg-black" style={{ aspectRatio: `${media.width} / ${media.height}` }}>
      {active ? (
        <video
          ref={videoRef}
          controls
          playsInline
          preload="metadata"
          poster={media.poster}
          aria-label={label}
          className="absolute inset-0 h-full w-full object-contain"
        >
          <source src={media.src} type="video/mp4" />
          {media.tracks?.map((tr) => (
            <track key={tr.src} src={tr.src} kind={tr.kind} srcLang={tr.lang} label={tr.label} default={tr.lang === language} />
          ))}
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 grid h-full w-full place-items-center focus-visible:outline-offset-[-4px]"
        >
          {media.poster && (
            <Image
              src={media.poster}
              alt=""
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}
          <span className="relative grid h-16 w-16 place-items-center rounded-full bg-accent-fill text-accent-ink shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] transition-transform duration-300 group-hover:scale-105">
            <Play className="ml-1 h-7 w-7" aria-hidden="true" fill="currentColor" />
          </span>
          <span className="sr-only">
            {language === 'fr' ? 'Lire la vidéo : ' : 'Play video: '}
            {label}
          </span>
        </button>
      )}
    </div>
  )
}

export function MediaFigure({
  media,
  index,
  sizes = '(min-width: 1024px) 560px, 100vw',
}: {
  media: Media
  index: number
  sizes?: string
}) {
  const { language, t } = useLanguage()
  const num = String(index + 1).padStart(2, '0')
  const isVideo = media.type === 'video'
  return (
    <figure className="min-w-0">
      <div className="marks">
        {isVideo ? (
          <VideoPlayer media={media} label={media.caption[language]} />
        ) : (
          <div className="overflow-hidden rounded-md border bg-surface-2">
            <Image src={media.src} alt={media.alt?.[language] ?? ''} width={media.width} height={media.height} sizes={sizes} className="h-auto w-full" />
          </div>
        )}
      </div>
      <figcaption className="mt-4">
        <p className="label tabular text-ink-faint">
          {isVideo ? t('projects.video') : t('projects.image')} {num}
          {media.duration ? ` · ${media.duration[language]}` : ''}
          {media.tracks?.length ? ` · ${t('projects.captions')}` : ''}
        </p>
        <p className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-soft">{media.caption[language]}</p>
      </figcaption>
    </figure>
  )
}
