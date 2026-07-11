import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CalendarCheck, ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── FLAGS DE AUTORIZACIÓN ────────────────────────────────────────────────────
// Activar solo con autorización escrita del cliente.
const BP01_HOME_AUTHORIZED = true  // Dra. Eusimary Contreras Morales — autorización escrita jul-2026
const BP02_HOME_AUTHORIZED = false
const BP03_HOME_AUTHORIZED = false

// ─── CONTADORES ───────────────────────────────────────────────────────────────
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

// ─── TESTIMONIO BP01 — Dra. Eusimary Contreras Morales ───────────────────────
// Autorización escrita recibida jul-2026. Handle: @draeusy_saludmetabolica
function TestimonialBP01Home() {
  const [expanded, setExpanded] = useState(false)

  const shortVersion = '23 años como médica y más de 18 atendiendo pacientes metabólicos, y nunca había podido monetizarlo fuera de una clínica. CAST identificó la oportunidad en la Blueprint Session, diseñó los dos programas desde mi propia experiencia, y construyó el ecosistema completo: marca, legal, página web, embudo automático, emails y CRM médico. Hoy atiendo en mis horas libres, sin consultorio, con un sistema que trabaja solo.'

  const bodyParagraphs = [
    'Llevo 23 años como médica cirujana, y más de 18 de esos años los he dedicado a pacientes con sobrepeso, obesidad y problemas metabólicos. No por obligación: porque siempre fue mi pasión. El metabolismo, la actividad física, el control del peso… eso fue lo que me apasionó desde el principio. Pero trabajar como auditora a tiempo completo me dejaba sin espacio para ejercer clínicamente, y yo seguía buscando la forma de poner ese conocimiento a trabajar.',
    'Cuando llegué a CAST, no llegué con un plan de negocios. Llegué con más de 18 años de trayectoria en medicina metabólica y una pregunta: ¿cómo convierto esto en algo? Carlos y su equipo no me ayudaron a "crear" un programa. Descubrieron el programa que ya existía en mi experiencia, lo estructuraron, lo documentaron legalmente y lo conectaron con tecnología real. En una sola Blueprint Session identificaron una oportunidad que yo no había sabido ver: en Barranquilla no existe ningún médico con marca en medicina metabólica en redes sociales. Ese espacio era mío.',
    'Nacieron dos programas desde esa investigación: uno farmacológico con GLP-1 para pacientes que lo necesitan clínicamente, y uno de bienestar integral sin medicamentos para quienes quieren prevención. Los dos son exactamente lo que yo he tratado toda mi vida. CAST los formalizó, les puso protocolo y respaldo jurídico. Eso no lo tenía antes.',
    'Pero lo que más me sorprendió fue el ecosistema digital. Nunca imaginé que en mis horas libres pudiera tener una página profesional, un sistema de captura de pacientes automático, catorce emails diseñados que trabajan solos, y un CRM médico hecho a la medida de mi forma de atender. Todo integrado, sin aprender a programar, sin contratar a nadie.',
    'Hoy opero con 2 a 5 horas semanales libres. Mi agenda se activa cuando yo puedo. El sistema hace el resto. CAST no me ayudó a crear una página web. Me ayudó a construir un negocio médico real, desde la estrategia hasta el último botón del embudo de ventas.',
  ]

  return (
    <div className="glass rounded-3xl p-8 md:p-10 border border-cast-gold/20 flex flex-col gap-6">
      {/* Hook */}
      <p className="font-display font-bold italic text-cast-gold text-lg md:text-xl leading-snug">
        "23 años como médica cirujana. Más de 18 dedicados a la medicina metabólica. Cero horas para convertirlo en un negocio — hasta ahora."
      </p>

      {/* Cuerpo */}
      <blockquote cite="https://draeusimary.netlify.app/" className="border-l-2 border-cast-gold/30 pl-5">
        {!expanded ? (
          <p className="text-white/65 text-sm md:text-base leading-relaxed">
            {shortVersion}
          </p>
        ) : (
          <div className="flex flex-col gap-4 text-white/65 text-sm md:text-base leading-relaxed">
            {bodyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-cast-gold text-xs font-semibold hover:text-cast-gold-light transition-colors"
        >
          {expanded ? 'Leer menos ↑' : 'Leer testimonio completo ↓'}
        </button>
      </blockquote>

      {/* Atribución */}
      <footer className="flex flex-col gap-1">
        <cite className="font-display font-bold text-white not-italic text-base">
          Dra. Eusimary Contreras Morales
        </cite>
        <p className="text-white/50 text-sm">
          Médica Cirujana · Esp. Gerencia de la Calidad y Auditoría Médica en Salud
        </p>
        <p className="text-white/35 text-sm">
          Medicina Metabólica &amp; Longevidad · Barranquilla, Colombia
        </p>
        <div className="flex flex-wrap gap-4 mt-3">
          <a
            href="https://www.instagram.com/draeusy_saludmetabolica/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-cast-gold text-xs transition-colors"
          >
            <ExternalLink size={11} />
            @draeusy_saludmetabolica
          </a>
          <a
            href="https://draeusimary.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-cast-gold text-xs transition-colors"
          >
            <ExternalLink size={11} />
            draeusimary.netlify.app
          </a>
        </div>
      </footer>
    </div>
  )
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
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

  const activeTestimonials = [
    BP01_HOME_AUTHORIZED && 'BP01',
    BP02_HOME_AUTHORIZED && 'BP02',
    BP03_HOME_AUTHORIZED && 'BP03',
  ].filter(Boolean)

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

        {/* Testimonios — solo los autorizados */}
        {activeTestimonials.length > 0 && (
          <div className="mb-14">
            <p className="text-cast-gold text-xs font-semibold tracking-[0.25em] uppercase text-center mb-8">
              Lo que dicen nuestros clientes
            </p>
            <div className={`grid grid-cols-1 gap-5 ${activeTestimonials.length > 1 ? 'md:grid-cols-' + activeTestimonials.length : ''}`}>
              {BP01_HOME_AUTHORIZED && <TestimonialBP01Home />}
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
