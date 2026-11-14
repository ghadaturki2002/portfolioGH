/**
 * SCHÉMAS DE PRINCIPE au trait, façon plan, pour les réalisations sans photo.
 * Ce sont des illustrations génériques du TYPE de système (robot suiveur de ligne,
 * réservoir connecté…), pas des représentations du matériel réel : elles sont
 * décoratives (aria-hidden) et la carte porte toujours le titre du projet.
 * Aucun texte traduisible : seulement des sigles techniques (ESP32, I2C, PV…).
 */
import type { ReactNode } from 'react'
import type { SchematicKey } from '@/lib/content'

const T = ({ x, y, children, anchor = 'start', className = 'fill-ink-faint' }: { x: number; y: number; children: ReactNode; anchor?: 'start' | 'middle' | 'end'; className?: string }) => (
  <text x={x} y={y} textAnchor={anchor} stroke="none" fontSize="9" letterSpacing="0.08em" className={`mono ${className}`}>
    {children}
  </text>
)

const DRAW: Record<SchematicKey, ReactNode> = {
  /* robot suiveur de ligne, vue de dessus, capteurs IR à l'avant, obstacle coté */
  'line-follower': (
    <>
      <path d="M-10 166 C 60 166, 92 126, 140 116 S 236 74, 330 84" strokeWidth="9" className="stroke-ink-faint" opacity="0.28" />
      <g transform="translate(146 110) rotate(-13)">
        <rect x="-36" y="-25" width="70" height="50" rx="7" />
        <rect x="-28" y="-33" width="22" height="8" rx="2" className="fill-ink-faint" opacity="0.5" />
        <rect x="-28" y="25" width="22" height="8" rx="2" className="fill-ink-faint" opacity="0.5" />
        <rect x="-20" y="-14" width="30" height="24" rx="1.5" strokeDasharray="3 2" />
        <circle cx="24" cy="0" r="4" />
        <rect x="34" y="-16" width="7" height="32" rx="1.5" className="stroke-mech" />
        {[-11, -5.5, 0, 5.5, 11].map((yy) => (
          <circle key={yy} cx="37.5" cy={yy} r="1.6" className="fill-mech" stroke="none" />
        ))}
        <circle cx="47" cy="-7" r="4.5" className="stroke-elec" />
        <circle cx="47" cy="7" r="4.5" className="stroke-elec" />
      </g>
      <rect x="262" y="34" width="26" height="44" rx="2" />
      <path d="M266 40 l18 18 M266 52 l18 18 M266 64 l14 14" opacity="0.5" />
      <path d="M204 24 H258" className="stroke-accent" />
      <path d="M204 20 v8 M258 20 v8" className="stroke-accent" />
      <T x={231} y={16} anchor="middle" className="fill-accent">d</T>
      <T x={24} y={30}>IR ×5</T>
    </>
  ),

  /* réservoir avec sonde de niveau, pompe, ESP32 et tableau de bord */
  tank: (
    <>
      <rect x="34" y="36" width="92" height="124" rx="5" />
      <rect x="35" y="96" width="90" height="63" className="fill-mech" stroke="none" opacity="0.16" />
      <path d="M35 96 q 11 -5 22 0 t 22 0 t 22 0 t 23 0" className="stroke-mech" />
      <path d="M66 26 V 150" className="stroke-elec" />
      <rect x="60" y="20" width="12" height="8" rx="1.5" className="stroke-elec" />
      <path d="M126 150 H 156" />
      <circle cx="170" cy="150" r="13" />
      <path d="M164 143 l12 7 l-12 7 z" />
      <path d="M183 150 H 214 V 120" />
      <rect x="190" y="56" width="50" height="32" rx="2" className="stroke-elec" />
      {[196, 204, 212, 220, 228, 234].map((x) => (
        <path key={x} d={`M${x} 88 v5`} className="stroke-elec" />
      ))}
      <T x={215} y={76} anchor="middle" className="fill-elec">ESP32</T>
      <path d="M244 60 q 8 -8 0 -16 M250 64 q 14 -14 0 -28" className="stroke-soft" />
      <rect x="252" y="96" width="56" height="44" rx="3" />
      <path d="M262 128 a 18 18 0 0 1 36 0" className="stroke-soft" />
      <path d="M280 128 l 9 -10" className="stroke-accent" />
      <path d="M72 70 H 190" strokeDasharray="3 3" opacity="0.6" />
      <T x={131} y={64} anchor="middle">MQTT</T>
    </>
  ),

  /* microcontrôleur relié en I2C à l'afficheur et en UART au PC */
  mcu: (
    <>
      <rect x="128" y="66" width="64" height="64" rx="3" className="stroke-elec" />
      {[78, 90, 102, 114].map((y) => (
        <path key={`l${y}`} d={`M120 ${y} h8 M192 ${y} h8`} />
      ))}
      {[140, 152, 164, 176].map((x) => (
        <path key={`t${x}`} d={`M${x} 58 v8 M${x} 130 v8`} />
      ))}
      <T x={160} y={102} anchor="middle" className="fill-elec">STM32</T>
      <rect x="232" y="40" width="72" height="36" rx="2" />
      <rect x="240" y="47" width="56" height="22" rx="1" className="stroke-mech" opacity="0.8" />
      <path d="M200 84 H 218 V 58 H 232 M200 96 H 224 V 64 H 232" className="stroke-mech" />
      <T x={206} y={44}>I2C</T>
      <rect x="24" y="44" width="62" height="26" rx="2" />
      <circle cx="44" cy="57" r="8" />
      <circle cx="66" cy="57" r="8" />
      <path d="M86 57 H 104 V 84 H 120" />
      <circle cx="60" cy="152" r="17" />
      <T x={60} y={155} anchor="middle">M</T>
      <path d="M77 152 H 104 V 108 H 120" />
      <circle cx="248" cy="152" r="7" />
      <circle cx="276" cy="152" r="7" />
      <path d="M200 108 H 212 V 152 H 241" />
      <path d="M152 58 V 30 H 112 M164 58 V 22 H 112" className="stroke-soft" />
      <T x={64} y={28} className="fill-soft">UART</T>
    </>
  ),

  /* automate, pupitre IHM, servomoteur et étiquette RFID en réseau */
  plc: (
    <>
      <rect x="24" y="48" width="118" height="70" rx="3" />
      {[34, 56, 78, 100, 122].map((x, i) => (
        <g key={x}>
          <rect x={x} y="56" width="16" height="54" rx="1.5" className={i === 0 ? 'stroke-elec' : ''} />
          <circle cx={x + 8} cy="64" r="1.8" className={i % 2 ? 'fill-elec' : 'fill-accent'} stroke="none" />
        </g>
      ))}
      <rect x="196" y="34" width="96" height="62" rx="4" />
      <rect x="204" y="42" width="80" height="40" rx="1.5" className="stroke-mech" opacity="0.85" />
      <path d="M212 72 v-8 M222 72 v-14 M232 72 v-10 M242 72 v-18" className="stroke-mech" />
      <rect x="198" y="140" width="62" height="32" rx="5" />
      <path d="M260 156 H 286" strokeWidth="2.4" />
      <path d="M210 140 v-6 h24 v6" />
      <T x={229} y={160} anchor="middle">S210</T>
      <rect x="40" y="148" width="46" height="28" rx="3" className="stroke-soft" />
      <path d="M92 154 q 6 8 0 16 M98 150 q 10 12 0 24" className="stroke-soft" />
      <T x={63} y={166} anchor="middle" className="fill-soft">RFID</T>
      <path d="M142 70 H 196 M142 100 H 168 V 156 H 198" strokeDasharray="4 3" className="stroke-elec" />
      <path d="M84 118 V 148" strokeDasharray="4 3" className="stroke-elec" />
      <T x={90} y={136}>IO-LINK</T>
    </>
  ),

  /* portique pick & place : axes X et Z cotés, caisses empilées */
  gantry: (
    <>
      <path d="M36 178 V 30 H 290 V 178" />
      <path d="M30 178 H 42 M284 178 H 296" />
      <rect x="150" y="24" width="34" height="14" rx="2" className="stroke-mech" />
      <path d="M167 38 V 92" strokeWidth="2.2" className="stroke-mech" />
      <path d="M154 92 H 180 M154 92 v12 M180 92 v12" className="stroke-mech" />
      <rect x="156" y="104" width="22" height="18" rx="1.5" className="stroke-accent" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x="226" y={156 - i * 22} width="44" height="22" rx="1.5" />
      ))}
      {[62, 90, 118].map((x) => (
        <circle key={x} cx={x} cy="171" r="6" />
      ))}
      <path d="M50 165 H 130 M50 177 H 130" />
      <rect x="74" y="143" width="28" height="22" rx="1.5" />
      <path d="M60 14 H 140" className="stroke-accent" />
      <path d="M60 10 v8 M140 10 v8" className="stroke-accent" />
      <T x={100} y={11} anchor="middle" className="fill-accent">X</T>
      <path d="M200 40 V 92" className="stroke-accent" />
      <path d="M196 40 h8 M196 92 h8" className="stroke-accent" />
      <T x={210} y={70} className="fill-accent">Z</T>
    </>
  ),

  /* champ photovoltaïque, onduleur, pompe et réservoir */
  solar: (
    <>
      <circle cx="40" cy="36" r="11" className="stroke-accent" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
        const r = (a * Math.PI) / 180
        return <path key={a} d={`M${40 + Math.cos(r) * 15} ${36 + Math.sin(r) * 15} L${40 + Math.cos(r) * 20} ${36 + Math.sin(r) * 20}`} className="stroke-accent" />
      })}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(${70 + i * 70} 0)`}>
          <path d="M0 140 L 22 84 H 74 L 52 140 Z" className="stroke-mech" />
          <path d="M7 122 H 59 M15 102 H 67 M18 140 L 40 84 M35 140 L 57 84" className="stroke-mech" opacity="0.7" />
          <path d="M26 140 V 166" />
        </g>
      ))}
      <path d="M96 166 H 166 M166 166 H 214" />
      <rect x="214" y="150" width="34" height="32" rx="2" />
      <path d="M222 166 q 4 -6 8 0 t 8 0" className="stroke-elec" />
      <path d="M248 166 H 262" />
      <circle cx="272" cy="166" r="10" />
      <path d="M282 166 H 296 V 104" />
      <rect x="276" y="76" width="36" height="28" rx="2" />
      <path d="M277 92 H 311" className="stroke-mech" opacity="0.7" />
      <T x={46} y={180}>PV</T>
    </>
  ),

  /* vélo au trait et arborescence de nomenclature */
  bom: (
    <>
      <circle cx="58" cy="140" r="30" />
      <circle cx="160" cy="140" r="30" />
      <circle cx="58" cy="140" r="2" className="fill-ink-faint" stroke="none" />
      <circle cx="160" cy="140" r="2" className="fill-ink-faint" stroke="none" />
      <path d="M58 140 L 100 140 L 86 94 Z M86 94 H 140 L 100 140 M140 94 L 160 140" className="stroke-mech" />
      <path d="M80 86 H 94 M140 94 L 136 80 H 148" />
      <circle cx="100" cy="140" r="6" />
      <rect x="228" y="26" width="44" height="18" rx="2" className="stroke-accent" />
      <path d="M250 44 V 58 M212 58 H 288 M212 58 v12 M250 58 v12 M288 58 v12" />
      {[198, 236, 274].map((x) => (
        <rect key={x} x={x} y="70" width="28" height="14" rx="2" />
      ))}
      <path d="M212 84 v14 M200 98 H 224 M200 98 v10 M224 98 v10 M288 84 v14 M280 98 H 296 M280 98 v10 M296 98 v10" opacity="0.7" />
      {[192, 216, 272, 288].map((x) => (
        <rect key={x} x={x} y="108" width="16" height="10" rx="1.5" opacity="0.7" />
      ))}
      <T x={250} y={150} anchor="middle" className="fill-soft">MM · PP · EAM</T>
    </>
  ),

  /* cycle de maintenance : panne → intervention → remise en service, historique au centre */
  cycle: (
    <>
      <circle cx="160" cy="100" r="62" strokeDasharray="5 4" opacity="0.6" />
      <path d="M160 26 l 22 38 h -44 z" className="stroke-accent" />
      <path d="M160 40 v12 M160 57 v2" className="stroke-accent" />
      <g transform="translate(222 132) rotate(-35)" className="stroke-mech">
        <path d="M-16 0 H 10" strokeWidth="5" />
        <circle cx="16" cy="0" r="8" />
        <path d="M16 -8 V 0" />
      </g>
      <circle cx="98" cy="134" r="16" className="stroke-elec" />
      <path d="M90 134 l 6 6 l 11 -12" className="stroke-elec" />
      <path d="M196 54 a 66 66 0 0 1 30 46" className="stroke-ink-faint" />
      <path d="M222 96 l 4 8 l 6 -6" className="stroke-ink-faint" />
      <path d="M196 170 a 66 66 0 0 1 -64 -4" className="stroke-ink-faint" />
      <path d="M136 172 l -8 -4 l 5 -7" className="stroke-ink-faint" />
      <path d="M86 112 a 66 66 0 0 1 40 -62" className="stroke-ink-faint" />
      <path d="M122 46 l 8 2 l -3 8" className="stroke-ink-faint" />
      <rect x="146" y="88" width="28" height="26" rx="2" />
      <path d="M152 96 H 168 M152 102 H 168 M152 108 H 162" opacity="0.8" />
    </>
  ),

  /* convoyeur : magasin de récipients et poste de dépose */
  conveyor: (
    <>
      <circle cx="44" cy="150" r="13" />
      <circle cx="276" cy="150" r="13" />
      <path d="M44 137 H 276 M44 163 H 276" />
      <path d="M86 137 l 4 -26 h 26 l 4 26 z" />
      <path d="M146 137 l 4 -26 h 26 l 4 26 z" />
      <path d="M200 24 V 96 M244 24 V 96" className="stroke-mech" />
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M206 ${40 + i * 12} l 4 -14 h 24 l 4 14`} opacity={0.5 + i * 0.2} />
      ))}
      <path d="M208 92 l 4 -18 h 20 l 4 18 z" className="stroke-accent" />
      <path d="M222 100 v 22 M216 114 l 6 8 l 6 -8" className="stroke-accent" />
      <path d="M103 182 H 163" className="stroke-accent" />
      <path d="M103 178 v8 M163 178 v8" className="stroke-accent" />
      <T x={133} y={196} anchor="middle" className="fill-accent">p</T>
      <rect x="252" y="40" width="38" height="24" rx="2" className="stroke-elec" />
      <path d="M252 52 H 244" className="stroke-elec" />
    </>
  ),

  /* bobine de câble et tableau d'outils « 5S » */
  lean: (
    <>
      <circle cx="80" cy="104" r="52" />
      <circle cx="80" cy="104" r="36" opacity="0.7" />
      <circle cx="80" cy="104" r="12" />
      <path d="M118 74 C 150 60, 160 110, 196 96" className="stroke-mech" strokeWidth="2" />
      <rect x="196" y="58" width="104" height="112" rx="3" />
      <path d="M212 76 h22 v8 h-22 z M212 76 l -6 4 l 6 4" className="stroke-mech" opacity="0.9" />
      <path d="M252 72 v28 M246 100 h12" className="stroke-mech" opacity="0.9" />
      <circle cx="282" cy="80" r="6" className="stroke-mech" opacity="0.9" />
      <path d="M210 118 h80 M210 134 h80 M210 150 h80" opacity="0.4" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={212 + i * 16} y="120" width="10" height="10" rx="1.5" className={i < 4 ? 'fill-elec' : ''} stroke="none" opacity={i < 4 ? 0.7 : 1} />
      ))}
      <rect x="276" y="120" width="10" height="10" rx="1.5" className="stroke-elec" />
      <T x={248} y={48} anchor="middle" className="fill-accent">5S</T>
    </>
  ),
}

export function Schematic({ kind, className = '' }: { kind: SchematicKey; className?: string }) {
  return (
    <div className={`bp-grid relative h-full w-full bg-surface-2 ${className}`}>
      <svg
        viewBox="0 0 320 200"
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 h-full w-full text-ink-soft"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {DRAW[kind]}
      </svg>
    </div>
  )
}
