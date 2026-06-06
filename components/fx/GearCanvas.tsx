'use client'

import dynamic from 'next/dynamic'

/**
 * Client-only, lazy-loaded wrapper for the Three.js gear.
 * ssr:false keeps react-three-fiber out of the server bundle (no SSR errors),
 * and code-splits it so it never blocks first paint.
 */
const Gear3DScene = dynamic(() => import('./Gear3DScene'), {
  ssr: false,
  loading: () => null,
})

export default function GearCanvas({ className = '' }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Gear3DScene />
    </div>
  )
}
