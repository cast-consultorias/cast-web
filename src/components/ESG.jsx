import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Leaf, Users, Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    Icon: Leaf,
    letter: 'E',
    label: 'Ambiental',
    color: 'from-emerald-500/20 to-green-600/5',
    glow: 'rgba(16,185,129,0.15)',
    border: 'border-emerald-500/20',
    iconColor: 'text-emerald-400',
    ringColor: 'border-emerald-500/30',
    desc: 'Huella de carbono reducida, impacto medioambiental positivo y métricas ESG auditables para inversores institucionales.',
    items: ['Carbono neutral certificado', 'Gestión de recursos hídricos', 'Biodiversidad protegida'],
  },
  {
    Icon: Users,
    letter: 'S',
    label: 'Social',
    color: 'from-cast-gold/15 to-amber-600/5',
    glow: 'rgba(201,168,76,0.15)',
    border: 'border-cast-gold/20',
    iconColor: 'text-cast-gold',
    ringColor: 'border-cast-gold/30',
    desc: 'Generación de empleo local, transferencia de conocimiento y valor comunitario que multiplica el impacto más allá del retorno financiero.',
    items: ['Empleo local calificado', 'Equidad de género', 'Desarrollo comunitario'],
  },
  {
    Icon: Shield,
    letter: 'G',
    label: 'Gobernanza',
    color: 'from-sky-500/15 to-blue-600/5',
    glow: 'rgba(14,165,233,0.15)',
    border: 'border-sky-500/20',
    iconColor: 'text-sky-400',
    ringColor: 'border-sky-500/30',
    desc: 'Transparencia total, cumplimiento regulatorio internacional y estructuras de gobierno que generan confianza en capital institucional.',
    items: ['Auditorías independientes', 'Cumplimiento OCDE', 'Reporte GRI estándar'],
  },
]

export default function ESG() {
  const sectionRef = useRef(null)
  const orbRefs = useRef([])
  const cardRefs = useRef([])

  useEffect(() => {
    // Orb pulse animations
    orbRefs.current.forEach((orb, i) => {
      if (!orb) return
      gsap.to(orb, {
        scale: 1.15,
        opacity: 0,
        repeat: -1,
        duration: 2.5,
        delay: i * 0.8,
        ease: 'power1.out',
      })
    })

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          cardRefs.current.filter(Boolean),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' }
        )
      },
    })
  }, [])

  return (
    <section ref={sectionRef} id="esg" className="py-24 bg-cast-dark-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-cast-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            <span className="w-6 h-px bg-cast-gold" />
            Sostenibilidad
            <span className="w-6 h-px bg-cast-gold" />
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            ESG integrado,<br />
            <span className="text-gradient-gold">capital atraído</span>
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto text-base">
            Los proyectos con marcos ESG sólidos acceden a 3x más capital internacional y a tasas preferenciales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.letter}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`opacity-0 relative glass rounded-3xl p-8 border ${p.border} overflow-hidden group hover:scale-[1.02] transition-all duration-400`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color}`} />

              {/* Pulsing orb */}
              <div
                ref={(el) => (orbRefs.current[i] = el)}
                className={`absolute top-8 right-8 w-16 h-16 rounded-full border ${p.ringColor} opacity-40`}
                style={{ boxShadow: `0 0 30px ${p.glow}` }}
              />

              <div className="relative z-10">
                {/* Letter + icon */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 border ${p.border} flex items-center justify-center`}
                    style={{ boxShadow: `0 0 20px ${p.glow}` }}>
                    <p.Icon size={22} className={p.iconColor} />
                  </div>
                  <div>
                    <span className={`font-display font-bold text-3xl ${p.iconColor}`}>{p.letter}</span>
                    <p className="text-white/50 text-xs font-medium -mt-1">{p.label}</p>
                  </div>
                </div>

                <p className="text-white/55 text-sm leading-relaxed mb-5">{p.desc}</p>

                <ul className="flex flex-col gap-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-white/60 text-xs">
                      <span className={`w-1.5 h-1.5 rounded-full ${p.iconColor} bg-current flex-shrink-0`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
