import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CalendarCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// Flags de testimonios — activar solo con autorización escrita del cliente
const BP01_HOME_AUTHORIZED = false
const BP02_HOME_AUTHORIZED = false
const BP03_HOME_AUTHORIZED = false

const counters = [
  {
    startText: 'USD $0M+',
    endValue: 150,
    getDisplay: (v) => `USD $${Math.floor(v)}M+`,
    label: 'en proyectos estructurados bajo metodología CAST',
  },
  {
    startText: '0x',
    endValue: 18,
    getDisplay: (v) => `${Math.floor(v)}x`,
    label: 'ROI documentado sobre la inversión en consultoría',
  },
  {
    startText: '0/6',
    endValue: 6,
    getDisplay: (v) => `${Math.floor(v)}/6`,
    label: 'departamentos del Caribe colombiano con clientes reales',
  },
  {
    startText: '0h',
    endValue: 48,
    getDisplay: (v) => `${Math.floor(v)}h`,
    label: 'de sesión a diagnóstico entregado, siempre',
  },
]

const DEPARTMENTS = ['Atlántico', 'Bolívar', 'Magdalena', 'Córdoba', 'Cesar', 'La Guajira']

const testimonialSlots = [
  { id: 'BP01', authorized: BP01_HOME_AUTHORIZED, sector: 'Salud' },
  { id: 'BP02', authorized: BP02_HOME_AUTHORIZED, sector: 'Empresa' },
  { id: 'BP03', authorized: BP03_HOME_AUTHORIZED, sector: 'Emprendedor' },
]

export default function Resultados() {
  const sectionRef = useRef(null)
  const numberRefs = useRef([])

  useEffect(() => {
    const els = numberRefs.current

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        counters.forEach((c, i) => {
          const obj = { val: 0 }
          gsap.to(obj, {
            val: c.endValue,
            duration: 2.2,
            ease: 'power2.out',
            delay: i * 0.15,
            onUpdate() {
              if (els[i]) els[i].textContent = c.getDisplay(obj.val)
            },
          })
        })

        gsap.fromTo(
          sectionRef.current.querySelectorAll('.result-animate'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out' }
        )
      },
    })
  }, [])

  const hasAnyTestimonial = testimonialSlots.some((s) => s.authorized)

  return (
    <section ref={sectionRef} id="resultados" className="py-24 bg-cast-dark-2">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 text-cast-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            <span className="w-6 h-px bg-cast-gold" />
            Resultados
            <span className="w-6 h-px bg-cast-gold" />
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            No prometemos.<br />
            <span className="text-gradient-gold">Mostramos.</span>
          </h2>
        </div>

        {/* Contadores animados */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {counters.map((c, i) => (
            <div
              key={c.label}
              className="result-animate opacity-0 glass rounded-2xl p-6 text-center border border-white/5 hover:border-cast-gold/20 transition-all duration-300"
            >
              <p
                ref={(el) => (numberRefs.current[i] = el)}
                className="font-display font-bold text-3xl md:text-4xl text-gradient-gold mb-3"
              >
                {c.startText}
              </p>
              <p className="text-white/50 text-xs leading-relaxed">{c.label}</p>
            </div>
          ))}
        </div>

        {/* Caso ancla */}
        <div className="result-animate opacity-0 relative rounded-3xl p-8 md:p-12 border border-cast-gold/20 bg-gradient-to-br from-cast-gold/5 to-transparent mb-14 overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cast-gold/60 via-cast-gold/20 to-transparent" />
          <span className="inline-block text-cast-gold text-[11px] font-bold tracking-[0.3em] uppercase mb-4">
            El caso que lo prueba
          </span>
          <h3 className="font-display font-bold text-2xl md:text-3xl text-white mb-4">
            Un proyecto minero de nueve cifras,<br className="hidden md:block" /> estructurado de punta a punta.
          </h3>
          <p className="text-white/55 text-base leading-relaxed mb-4 max-w-3xl">
            Valoración de reservas como colateral, arquitectura legal en tres jurisdicciones, tokenización completa y
            presentación ante inversionistas internacionales en Europa y América. De un activo inmovilizado a una
            estructura que el capital global puede financiar.
          </p>
          <p className="text-white/35 text-sm italic">
            Y la misma metodología ya se replica en un segundo proyecto del sector agroindustrial.
          </p>
        </div>

        {/* Testimonios */}
        {hasAnyTestimonial && (
          <div className="mb-14">
            <p className="text-cast-gold text-xs font-semibold tracking-[0.25em] uppercase text-center mb-8">
              Lo que dicen nuestros clientes
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {testimonialSlots.filter((s) => s.authorized).map((slot) => (
                <div
                  key={slot.id}
                  className="result-animate opacity-0 rounded-3xl p-6 border border-white/8 glass min-h-[180px]"
                >
                  {/* Testimonio autorizado — insertar aquí */}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA principal */}
        <div className="result-animate opacity-0 text-center">
          <a
            href="/blueprint"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cast-gold text-cast-dark font-semibold text-sm hover:bg-cast-gold-light transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cast-gold/25"
          >
            <CalendarCheck size={16} />
            Agenda tu Blueprint Session™
          </a>
        </div>
      </div>

      {/* Franja regional */}
      <div className="mt-20 border-t border-white/5 pt-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-white/30 text-xs leading-relaxed">
            <span className="text-white/50 font-medium">Clientes reales en los 6 departamentos del Caribe</span>
            {' — '}
            {DEPARTMENTS.join(' · ')}
            {' — y operación remota en toda Colombia.'}
          </p>
        </div>
      </div>
    </section>
  )
}
