import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TrendingUp, Zap, Bot } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const props = [
  {
    Icon: TrendingUp,
    title: 'Crece con estructura, no solo con pauta',
    desc: 'Estructuramos tu modelo para que el crecimiento sea sostenible, financiado por capital inteligente y no solo por publicidad pagada.',
    color: 'from-amber-500/10 to-yellow-600/5',
    border: 'hover:border-amber-500/30',
    glow: 'hover:shadow-amber-500/10',
  },
  {
    Icon: Zap,
    title: 'Elimina los cuellos de botella',
    desc: 'Automatización de procesos críticos con IA para que tu operación funcione a máxima eficiencia sin fricción interna.',
    color: 'from-cast-gold/10 to-cast-gold-dark/5',
    border: 'hover:border-cast-gold/30',
    glow: 'hover:shadow-cast-gold/10',
  },
  {
    Icon: Bot,
    title: 'Duplica la eficiencia de tu equipo',
    desc: 'Agentes de IA y workflows inteligentes que multiplican la capacidad operativa sin aumentar la nómina.',
    color: 'from-orange-500/10 to-amber-600/5',
    border: 'hover:border-orange-500/30',
    glow: 'hover:shadow-orange-500/10',
  },
]

export default function ValueProps() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          cardRefs.current,
          { opacity: 0, y: 60, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.18, duration: 0.8, ease: 'power3.out' }
        )
      },
    })

    // Tilt 3D effect
    cardRefs.current.forEach((card) => {
      if (!card) return
      const onMove = (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        const rotX = (-y / rect.height) * 12
        const rotY = (x / rect.width) * 12
        gsap.to(card, {
          rotationX: rotX,
          rotationY: rotY,
          transformPerspective: 800,
          duration: 0.3,
          ease: 'power1.out',
        })
      }
      const onLeave = () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: 'power3.out',
        })
      }
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
    })
  }, [])

  return (
    <section ref={sectionRef} id="servicios" className="py-24 bg-cast-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-cast-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            <span className="w-6 h-px bg-cast-gold" />
            Por qué CAST
            <span className="w-6 h-px bg-cast-gold" />
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Resultados que se miden,<br />
            <span className="text-gradient-gold">no se prometen</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {props.map((p, i) => (
            <div
              key={p.title}
              ref={(el) => (cardRefs.current[i] = el)}
              className={`opacity-0 relative glass rounded-3xl p-8 border border-white/5 ${p.border} ${p.glow} hover:shadow-xl transition-all duration-300 cursor-default overflow-hidden`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} rounded-3xl`} />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-cast-gold/10 border border-cast-gold/20 flex items-center justify-center mb-5">
                  <p.Icon size={22} className="text-cast-gold" />
                </div>
                <h3 className="font-display font-bold text-xl text-white mb-3">{p.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
