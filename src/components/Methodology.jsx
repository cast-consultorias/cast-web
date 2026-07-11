import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Search, Lightbulb, Cog, Rocket } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  {
    letter: 'C',
    title: 'Consultoría Integral',
    desc: 'Diagnóstico profundo de tu modelo de negocio, estructura financiera, capacidad operativa y posicionamiento ante el capital.',
    Icon: Search,
  },
  {
    letter: 'A',
    title: 'Análisis Profundo',
    desc: 'Due diligence riguroso con estándares internacionales. Identificamos brechas, riesgos y oportunidades invisibles para el inversor promedio.',
    Icon: Lightbulb,
  },
  {
    letter: 'S',
    title: 'Soluciones Innovadoras',
    desc: 'Diseño de estrategias financieras, automatización con IA y marcos ESG que diferencian tu proyecto en mercados globales.',
    Icon: Cog,
  },
  {
    letter: 'T',
    title: 'Transformación Real',
    desc: 'Ejecución acompañada con métricas de impacto. No entregamos documentos, entregamos resultados que el capital puede financiar.',
    Icon: Rocket,
  },
]

export default function Methodology() {
  const sectionRef = useRef(null)
  const progressRef = useRef(null)
  const itemRefs = useRef([])
  const sealRef = useRef(null)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          sealRef.current,
          { opacity: 0, scale: 0.7, rotation: -20 },
          { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
        )
      },
    })

    itemRefs.current.forEach((el, i) => {
      if (!el) return
      ScrollTrigger.create({
        trigger: el,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            el,
            { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
            { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
          )
        },
      })
    })

    // Progress line grows with scroll
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 60%',
      end: 'bottom 40%',
      scrub: 1,
      onUpdate: (self) => {
        if (progressRef.current) {
          gsap.set(progressRef.current, { scaleY: self.progress })
        }
      },
    })
  }, [])

  return (
    <section ref={sectionRef} id="metodologia" className="py-24 bg-cast-dark-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <span className="inline-flex items-center gap-2 text-cast-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              <span className="w-6 h-px bg-cast-gold" />
              Nuestra metodología
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
              Metodología CAST <span className="text-gradient-gold">Premium®</span>
            </h2>
            <p className="text-white/55 mt-3 max-w-lg text-base leading-relaxed">
              Un framework construido sobre 25 años de experiencia real, que transforma tu idea o visión en un proyecto que el mundo puede financiar.
            </p>
          </div>

          {/* Seal */}
          <div ref={sealRef} className="opacity-0 flex-shrink-0">
            <div className="relative w-36 h-36">
              {/* Slow rotating glow ring behind */}
              <div className="absolute inset-0 rounded-full animate-spin-slow"
                style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(201,168,76,0.25) 100%)' }}
              />
              <img
                src="/sello-metodologia.png"
                alt="Sello Metodología CAST Premium®"
                loading="lazy"
                decoding="async"
                width="144"
                height="144"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_0_20px_rgba(201,168,76,0.3)]"
              />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-cast-gold/10">
            <div
              ref={progressRef}
              className="w-full bg-gradient-to-b from-cast-gold to-cast-gold-dark origin-top"
              style={{ height: '100%', scaleY: 0 }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {pillars.map((p, i) => (
              <div
                key={p.letter}
                ref={(el) => (itemRefs.current[i] = el)}
                className={`opacity-0 relative flex items-start gap-6 ${
                  i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-row pl-16 lg:pl-0`}
              >
                {/* Letter node */}
                <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 w-12 h-12 rounded-full bg-cast-dark border-2 border-cast-gold flex items-center justify-center z-10 glow-gold-sm">
                  <span className="font-display font-bold text-cast-gold text-lg">{p.letter}</span>
                </div>

                {/* Content card */}
                <div className={`lg:w-[calc(50%-3rem)] ${i % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'} w-full`}>
                  <div className="glass rounded-2xl p-6 border border-white/5 hover:border-cast-gold/20 transition-all duration-300 group">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-cast-gold/10 flex items-center justify-center">
                        <p.Icon size={16} className="text-cast-gold" />
                      </div>
                      <h3 className="font-display font-semibold text-lg text-white">{p.title}</h3>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
