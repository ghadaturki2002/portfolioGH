'use client'

import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

/** Build a stylized cog geometry (alternating tooth radii) with a centre bore. */
function makeGearGeometry(teeth = 16, r = 1, toothDepth = 0.2, bore = 0.34, depth = 0.42) {
  const shape = new THREE.Shape()
  const inner = r - toothDepth
  const seg = teeth * 2
  for (let i = 0; i <= seg; i++) {
    const a = (i / seg) * Math.PI * 2
    const rr = i % 2 === 0 ? r : inner
    const x = Math.cos(a) * rr
    const y = Math.sin(a) * rr
    if (i === 0) shape.moveTo(x, y)
    else shape.lineTo(x, y)
  }
  const hole = new THREE.Path()
  hole.absarc(0, 0, bore, 0, Math.PI * 2, true)
  shape.holes.push(hole)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.05,
    bevelSize: 0.05,
    bevelSegments: 2,
    curveSegments: 6,
  })
  geo.center()
  return geo
}

function Gear({ reduce }: { reduce: boolean }) {
  const ref = useRef<THREE.Mesh>(null)
  const geo = useMemo(() => makeGearGeometry(), [])
  useEffect(() => () => geo.dispose(), [geo])

  useFrame((state, delta) => {
    const m = ref.current
    if (!m) return
    const sy = typeof window !== 'undefined' ? window.scrollY : 0
    if (reduce) {
      m.rotation.set(0.5, 0.4, 0.2)
    } else {
      m.rotation.z += delta * 0.25
      m.rotation.x = 0.5 + sy * 0.0011
      m.rotation.y = Math.sin(state.clock.elapsedTime * 0.18) * 0.3
    }
  })

  return (
    <mesh ref={ref} geometry={geo}>
      <meshStandardMaterial color="#9fb2bf" metalness={0.85} roughness={0.35} />
    </mesh>
  )
}

export default function Gear3DScene() {
  const reduce = useReducedMotion()
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 4.6], fov: 45 }}
      style={{ pointerEvents: 'none' }}
      frameloop={reduce ? 'demand' : 'always'}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.2} />
      <pointLight position={[-4, -2, 3]} intensity={8} color="#22d3ee" />
      <Gear reduce={!!reduce} />
    </Canvas>
  )
}
