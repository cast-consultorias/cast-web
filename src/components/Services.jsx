import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, Building2, BarChart3, BrainCircuit, Handshake, ArrowUpRight, X, CheckCircle2, CalendarCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    Icon: Star,
    badge: 'Más popular',
    title: 'De la Idea al Impacto Real',
    target: 'Emprendedor con visión clara',
    desc: 'Tomamos tu concepto y lo convertimos en un proyecto estructurado, financiable y presentable ante capital internacional.',
    featured: true,
    detail: {
      heading: 'Convierte tu idea en un proyecto bancable',
      body: 'Acompañamos al emprendedor desde la concepción de su idea hasta tener un proyecto listo para presentar ante inversores, fondos o instituciones financieras internacionales. Estructuramos tu modelo de negocio, plan financiero y narrativa de impacto con estándares PMBOK y metodologías ágiles.',
      includes: [
        'Diagnóstico estratégico de tu idea o negocio',
        'Business plan con proyecciones financieras a 5 años',
        'Modelo de negocio canvas + lean canvas',
        'Pitch deck para inversores internacionales',
        'Estructura ESG básica integrada',
        'Acompañamiento en primeras rondas de capital',
      ],
    },
  },
  {
    Icon: Building2,
    title: 'Estructura tu Empresa',
    target: 'Empresa sin arquitectura sólida',
    desc: 'Rediseñamos tu modelo operativo, financiero y de gobierno para que sea robusto, escalable y atractivo para socios estratégicos.',
    featured: false,
    detail: {
      heading: 'Arquitectura empresarial de clase mundial',
      body: 'Muchas empresas crecen sin estructura y llegan a un techo invisible. Rediseñamos tu arquitectura organizacional, financiera y de gobierno corporativo para que tu empresa pueda escalar sin depender de una sola persona y sea atractiva para capital institucional.',
      includes: [
        'Auditoría de estructura organizacional',
        'Diseño de gobierno corporativo',
        'Reestructuración financiera y contable',
        'Manual de procesos y procedimientos',
        'KPIs y tablero de control ejecutivo',
        'Preparación para due diligence externo',
      ],
    },
  },
  {
    Icon: BarChart3,
    title: 'Escala a Mercados Globales',
    target: 'Empresa o profesional que quiere escalar',
    desc: 'Estrategia de expansión internacional con análisis de mercado, plan financiero y acceso a nuestra red de capital en 15+ países.',
    featured: false,
    detail: {
      heading: 'Expansión internacional con capital inteligente',
      body: 'Nuestra red activa en 15+ países nos permite conectar tu empresa con los mercados correctos, los socios adecuados y el capital que acelera la expansión. No es una estrategia genérica: es un plan a medida basado en inteligencia de mercado real.',
      includes: [
        'Análisis de mercados objetivo con datos actualizados',
        'Estrategia de entrada por país',
        'Estructuración de vehículo legal internacional',
        'Conexión con red de capital y socios en destino',
        'Plan de expansión con hitos y métricas',
        'Gestión de riesgo cambiario y regulatorio',
      ],
    },
  },
  {
    Icon: BrainCircuit,
    title: 'IA & Automatización',
    target: 'Negocio que quiere eficiencia operativa',
    desc: 'Agentes de IA, workflows automatizados y apps personalizadas que reducen costos operativos hasta un 40% en 90 días.',
    featured: false,
    detail: {
      heading: 'Transformación operativa con Inteligencia Artificial',
      body: 'Implementamos soluciones de IA y automatización adaptadas a tu operación real: no plantillas genéricas, sino sistemas diseñados para tu flujo de trabajo, tu equipo y tus objetivos. El resultado es una operación más eficiente, escalable y preparada para el futuro.',
      includes: [
        'Diagnóstico de procesos automatizables',
        'Diseño e implementación de agentes de IA',
        'Workflows automatizados con n8n / Make / Zapier',
        'Apps personalizadas con IA integrada',
        'Integración con CRM, ERP y herramientas existentes',
        'Capacitación del equipo en herramientas IA',
      ],
    },
  },
  {
    Icon: Handshake,
    title: 'Inversionista Estratégico',
    target: 'Inversor o socio buscando proyectos',
    desc: 'Accede a nuestro pipeline de proyectos curados con estándares ESG, due diligence completo y proyecciones validadas.',
    featured: false,
    detail: {
      heading: 'Pipeline de proyectos curados y validados',
      body: 'Para inversores y socios estratégicos que buscan proyectos con potencial real. Cada proyecto en nuestro pipeline pasa por un proceso de due diligence riguroso, validación financiera y certificación ESG. Accedes a oportunidades que ya están listas para recibir capital.',
      includes: [
        'Acceso a pipeline de proyectos curados',
        'Due diligence financiero y legal completo',
        'Reportes ESG certificados por proyecto',
        'Proyecciones financieras validadas por terceros',
        'Estructura legal para inversión internacional',
        'Seguimiento y reporting post-inversión',
      ],
    },
  },
]

function ServiceModal({ service, onClose }) {
  const overlayRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' })
    gsap.fromTo(panelRef.current,
      { opacity: 0, y: 60, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' }
    )

    const onKey = (e) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 })
    gsap.to(panelRef.current, {
      opacity: 0, y: 40, scale: 0.97, duration: 0.3, ease: 'power3.in',
      onComplete: onClose,
    })
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === overlayRef.current && handleClose()}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-lg glass-dark rounded-3xl border border-cast-gold/20 p-8 shadow-2xl shadow-black/50 max-h-[90vh] overflow-y-auto"
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-cast-gold/30 hover:text-cast-gold transition-all"
        >
          <X size={14} />
        </button>

        {/* Icon + badge */}
        <div className="flex items-center gap-3 mb-5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            service.featured ? 'bg-cast-gold/20 border border-cast-gold/30' : 'bg-white/5 border border-white/10'
          }`}>
            <service.Icon size={22} className="text-cast-gold" />
          </div>
          <div>
            <p className="text-white/35 text-[11px] font-medium tracking-wide uppercase">{service.target}</p>
            <h3 className="font-display font-bold text-xl text-white">{service.title}</h3>
          </div>
        </div>

        {/* Heading */}
        <p className="text-cast-gold font-semibold text-base mb-3">{service.detail.heading}</p>

        {/* Body */}
        <p className="text-white/55 text-sm leading-relaxed mb-6">{service.detail.body}</p>

        {/* Includes */}
        <div className="mb-7">
          <p className="text-white/40 text-xs font-semibold tracking-widest uppercase mb-3">Incluye</p>
          <ul className="flex flex-col gap-2.5">
            {service.detail.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-white/65 text-sm">
                <CheckCircle2 size={15} className="text-cast-gold flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <a
          href="#contacto"
          onClick={handleClose}
          className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-cast-gold text-cast-dark font-semibold text-sm hover:bg-cast-gold-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cast-gold/25"
        >
          <CalendarCheck size={15} />
          Quiero este servicio
        </a>
      </div>
    </div>
  )
}

export default function Services() {
  const sectionRef = useRef(null)
  const cardRefs = useRef([])
  const [activeService, setActiveService] = useState(null)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          cardRefs.current.filter(Boolean),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.75, ease: 'power3.out' }
        )
      },
    })
  }, [])

  return (
    <>
      <section ref={sectionRef} id="servicios-detalle" className="py-24 bg-cast-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-cast-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
              <span className="w-6 h-px bg-cast-gold" />
              Qué hacemos
              <span className="w-6 h-px bg-cast-gold" />
            </span>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
              Soluciones para cada<br />
              <span className="text-gradient-gold">etapa de tu crecimiento</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => (cardRefs.current[i] = el)}
                onClick={() => setActiveService(s)}
                className={`opacity-0 group relative rounded-3xl p-7 border transition-all duration-300 cursor-pointer flex flex-col gap-4 hover:-translate-y-1 ${
                  s.featured
                    ? 'bg-gradient-to-br from-cast-gold/15 to-cast-gold-dark/5 border-cast-gold/40 glow-gold'
                    : 'glass border-white/5 hover:border-cast-gold/20'
                } ${i === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                {s.badge && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-cast-gold text-cast-dark text-[10px] font-bold tracking-wider uppercase">
                    {s.badge}
                  </span>
                )}

                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                  s.featured ? 'bg-cast-gold/20 border border-cast-gold/30' : 'bg-white/5 border border-white/10 group-hover:border-cast-gold/20'
                }`}>
                  <s.Icon size={20} className={s.featured ? 'text-cast-gold' : 'text-white/60 group-hover:text-cast-gold transition-colors'} />
                </div>

                <div>
                  <p className="text-white/35 text-[11px] font-medium tracking-wide uppercase mb-1.5">{s.target}</p>
                  <h3 className="font-display font-bold text-lg text-white mb-2">{s.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{s.desc}</p>
                </div>

                <div className="mt-auto flex items-center gap-1.5 text-cast-gold text-xs font-semibold group-hover:gap-2.5 transition-all duration-300">
                  Saber más
                  <ArrowUpRight size={13} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeService && (
        <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
      )}
    </>
  )
}
