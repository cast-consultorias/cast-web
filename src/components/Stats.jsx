import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 25, suffix: '+', label: 'Años de experiencia', desc: 'Liderazgo ejecutivo internacional' },
  { value: 25, suffix: '+', label: 'Países alcanzados', desc: 'Red de capital global activa' },
  { value: 8.5, suffix: 'x', label: 'ROI promedio', desc: 'En proyectos estructurados' },
  { value: 6, suffix: '', label: 'Sectores de impacto', desc: 'Minería, salud, agro, tech y más' },
]

function RadialProgress({ value, max = 10, size = 80 }) {
  const r = 30
  const circ = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  const dashOffset = circ * (1 - pct)

  return (
    <svg width={size} height={size} className="absolute top-4 right-4 opacity-20" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#C9A84C22" strokeWidth={3} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="#C9A84C" strokeWidth={3}
        strokeDasharray={circ}
        strokeDashoffset={dashOffset}
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Stats() {
  const sectionRef = useRef(null)
  const numberRefs = useRef([])

  useEffect(() => {
    const els = numberRefs.current

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        stats.forEach((s, i) => {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: s.value,
            duration: 2,
            ease: 'power2.out',
            delay: i * 0.15,
            onUpdate() {
              if (els[i]) {
                const v = s.value % 1 !== 0 ? obj.val.toFixed(1) : Math.floor(obj.val)
                els[i].textContent = v + s.suffix
              }
            },
          })
        })

        gsap.fromTo(
          sectionRef.current.querySelectorAll('.stat-card'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' }
        )
      },
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-cast-dark-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-card opacity-0 relative glass rounded-2xl p-6 overflow-hidden group hover:border-cast-gold/30 transition-all duration-300 hover:glow-gold-sm"
            >
              <RadialProgress value={s.value} max={i === 2 ? 10 : i === 3 ? 8 : 30} />
              <p
                ref={(el) => (numberRefs.current[i] = el)}
                className="font-display font-bold text-4xl md:text-5xl text-gradient-gold mb-1"
              >
                0{s.suffix}
              </p>
              <p className="text-white font-semibold text-sm mb-1">{s.label}</p>
              <p className="text-white/40 text-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
