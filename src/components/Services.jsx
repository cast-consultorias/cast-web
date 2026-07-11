import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  HeartPulse, Landmark, BrainCircuit, Star, Building2,
  Coins, Globe, Handshake, ArrowUpRight, X, CheckCircle2, CalendarCheck, MessageCircle,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const WA_RWA = 'https://wa.me/573042113374?text=' + encodeURIComponent(
  'Hola Carlos, tengo un proyecto con activo real y quiero explorar la ruta de tokenización RWA. ¿Podemos hablar?'
)

const services = [
  {
    Icon: HeartPulse,
    badge: 'ESPECIALIDAD CAST',
    featured: true,
    target: 'MÉDICO, ODONTÓLOGO O PROFESIONAL DE LA SALUD',
    title: 'Estructura tu Consultorio, Telemedicina o IPS',
    desc: 'Ruta completa de habilitación (Res. 3100 y Res. 1888/2025), estructura financiera y tecnología de gestión clínica con PULSO — nuestro software propio. Abre y escala tu proyecto de salud sin riesgo de sanción.',
    ctaHref: '/blueprint',
    ctaLabel: 'Agenda tu Blueprint Session™',
    ctaExternal: false,
    detail: {
      heading: 'El único servicio integral de salud en el Caribe',
      body: 'Combinamos la ruta regulatoria completa (Res. 3100 y Res. 1888/2025) con estructura financiera sólida y tecnología propia (PULSO) para que abras o escales tu proyecto de salud con cero riesgo de sanción. Somos el único aliado en Barranquilla que integra lo legal, lo financiero y lo tecnológico en una sola ruta.',
      includes: [
        'Ruta de habilitación Res. 3100 y Res. 1888/2025',
        'Estructura financiera del proyecto clínico',
        'Implementación de PULSO — software de gestión CAST',
        'Registro ante SDS y SISPRO',
        'Modelo de telemedicina estructurado y habilitado',
        'Acompañamiento hasta apertura y primera auditoría',
      ],
    },
  },
  {
    Icon: Landmark,
    badge: null,
    featured: false,
    target: 'EMPRESA QUE BUSCA FINANCIACIÓN',
    title: 'Estudios de Viabilidad y Carpeta de Crédito',
    desc: 'El banco no rechaza negocios: rechaza carpetas. Construimos el estudio de viabilidad financiera y la documentación técnica que bancos, Bancóldex y FNG exigen — para que tu próxima solicitud llegue como los bancos quieren verla.',
    ctaHref: '/blueprint',
    ctaLabel: 'Agenda tu Blueprint Session™',
    ctaExternal: false,
    detail: {
      heading: 'La carpeta que los bancos no pueden rechazar',
      body: 'Construimos el estudio de viabilidad financiera completo con las proyecciones y documentación técnica que exigen Bancóldex, FNG y la banca comercial. No es un trámite: es tu argumento técnico para acceder al capital que tu negocio necesita.',
      includes: [
        'Estudio de viabilidad financiera certificado',
        'Proyecciones financieras a 5 años bajo estándares bancarios',
        'Carpeta de crédito Bancóldex / FNG completa',
        'Flujo de caja y análisis de riesgo crediticio',
        'Presentación ejecutiva ante comité de crédito',
        'Acompañamiento hasta desembolso',
      ],
    },
  },
  {
    Icon: BrainCircuit,
    badge: null,
    featured: false,
    target: 'NEGOCIO QUE VENDE PERO OPERA ARTESANALMENTE',
    title: 'CAST GRAVEDAD™ — IA y Sistema Comercial',
    desc: '¿WhatsApp como CRM y Excel como control? Diseñamos tu sistema comercial completo: CRM, embudos, automatización e IA aplicada — para que dejes de perder clientes por falta de seguimiento. No vendemos "IA": construimos el sistema que la usa.',
    ctaHref: '/blueprint',
    ctaLabel: 'Agenda tu Blueprint Session™',
    ctaExternal: false,
    detail: {
      heading: 'El sistema comercial que escala tu negocio',
      body: 'CAST GRAVEDAD™ es nuestro sistema comercial propietario: CRM, embudos de venta automatizados y agentes de IA construidos para tu operación específica. Ningún cliente se pierde más por falta de seguimiento.',
      includes: [
        'Diagnóstico de procesos comerciales actuales',
        'Diseño e implementación de CRM personalizado',
        'Embudos de venta y seguimiento automatizados',
        'Agentes de IA para atención y calificación de leads',
        'Integración con WhatsApp Business y correo',
        'Capacitación del equipo y manual de operación',
      ],
    },
  },
  {
    Icon: Star,
    badge: null,
    featured: false,
    target: 'EMPRENDEDOR CON IDEA Y AHORROS LISTOS',
    title: 'De la Idea al Impacto Real',
    desc: 'Antes de invertir tus ahorros, valida. Estructuramos tu idea de punta a punta — modelo, finanzas, marca, legal y lanzamiento (Perfil Origen: 12 entregables) — para que emprendas con estructura, no a ciegas.',
    ctaHref: '/blueprint',
    ctaLabel: 'Agenda tu Blueprint Session™',
    ctaExternal: false,
    detail: {
      heading: 'Emprende con estructura, no con miedo',
      body: 'El Perfil Origen CAST incluye 12 entregables que cubren modelo de negocio, proyecciones financieras, estructura legal, marca y plan de lanzamiento — todo antes de invertir un peso. Emprende sabiendo que está bien hecho.',
      includes: [
        'Validación de idea y estudio de mercado',
        'Business model canvas + propuesta de valor',
        'Proyecciones financieras y punto de equilibrio',
        'Estructura legal y registro de marca',
        'Identidad visual y narrativa de marca',
        'Plan de lanzamiento con primeras ventas',
      ],
    },
  },
  {
    Icon: Building2,
    badge: null,
    featured: false,
    target: 'NEGOCIO QUE YA FACTURA PERO SIN ESTRUCTURA',
    title: 'Formaliza y Estructura tu Negocio',
    desc: 'Tu negocio vende, pero sin registro ni estructura hay techo: cero crédito, cero contratos con empresas grandes, cero Bancóldex. Convertimos tu operación real en una empresa formal, robusta y lista para crecer.',
    ctaHref: '/blueprint',
    ctaLabel: 'Agenda tu Blueprint Session™',
    ctaExternal: false,
    detail: {
      heading: 'Del negocio informal al actor empresarial',
      body: 'Sin registro mercantil ni estructura hay un techo invisible: sin crédito, sin contratos corporativos, sin Bancóldex. Convertimos tu operación real en una empresa formal con gobierno, estructura tributaria y capacidad de crecimiento.',
      includes: [
        'Formalización mercantil y societaria',
        'Estructura tributaria optimizada',
        'Gobierno corporativo básico',
        'Preparación para crédito bancario y Bancóldex',
        'Contratos y documentación legal estándar',
        'KPIs y tablero de control operativo',
      ],
    },
  },
  {
    Icon: Coins,
    badge: null,
    featured: false,
    target: 'PROYECTO CON ACTIVO REAL — MINERÍA, AGRO, ENERGÍA, INMOBILIARIO',
    title: 'Tokenización de Activos Reales (RWA)',
    desc: '¿Tu activo vale más que el capital que necesitas y aun así la banca dice no? Estructuramos financiación alternativa sobre tu colateral real: valoración, arquitectura legal internacional, diseño del token y conexión con capital global. Metodología probada en un proyecto minero de nueve cifras.',
    ctaHref: WA_RWA,
    ctaLabel: 'Iniciar conversación',
    ctaExternal: true,
    detail: {
      heading: 'Financiación global para activos que la banca no alcanza',
      body: 'Cuando tu activo vale más que lo que la banca puede financiar, la tokenización es la ruta. Metodología probada end-to-end en un proyecto minero de nueve cifras con inversionistas en Europa y América. El mercado RWA en LATAM creció +245% en el último año.',
      includes: [
        'Valoración de reservas y activos como colateral',
        'Arquitectura legal en múltiples jurisdicciones',
        'Diseño del token y estructura de emisión',
        'Due diligence ESG para capital internacional',
        'Presentación ante inversionistas en Europa y América',
        'Gestión del proceso hasta cierre de ronda',
      ],
    },
  },
  {
    Icon: Globe,
    badge: null,
    featured: false,
    target: 'EMPRESA O PROFESIONAL QUE QUIERE ESCALAR',
    title: 'Escala a Mercados Globales',
    desc: 'Estrategia de expansión internacional con análisis de mercado, plan financiero y acceso a nuestra red activa de capital y aliados en 25+ países de Europa, América y Asia.',
    ctaHref: '/blueprint',
    ctaLabel: 'Agenda tu Blueprint Session™',
    ctaExternal: false,
    detail: {
      heading: 'Expansión internacional con capital inteligente',
      body: 'Nuestra red activa en 25+ países nos permite conectar tu empresa con los mercados correctos, los socios adecuados y el capital que acelera la expansión. No es una estrategia genérica: es un plan a medida basado en inteligencia de mercado real.',
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
    Icon: Handshake,
    badge: null,
    featured: false,
    target: 'INVERSIONISTA O SOCIO ESTRATÉGICO',
    title: 'Acceso a Proyectos Estructurados',
    desc: 'Pipeline de proyectos con due diligence completo, marcos ESG y proyecciones validadas bajo metodología CAST. Conversación directa y confidencial.',
    ctaHref: '#contacto',
    ctaLabel: 'Iniciar conversación confidencial',
    ctaExternal: false,
    detail: {
      heading: 'Pipeline de proyectos curados y validados',
      body: 'Para inversores y socios estratégicos que buscan proyectos con potencial real. Cada proyecto pasa por due diligence riguroso, validación financiera y certificación ESG. Accedes a oportunidades ya listas para recibir capital.',
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

  const CtaIcon = service.ctaExternal ? MessageCircle : CalendarCheck

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
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:border-cast-gold/30 hover:text-cast-gold transition-all"
        >
          <X size={14} />
        </button>

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

        <p className="text-cast-gold font-semibold text-base mb-3">{service.detail.heading}</p>
        <p className="text-white/55 text-sm leading-relaxed mb-6">{service.detail.body}</p>

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

        <a
          href={service.ctaHref}
          onClick={handleClose}
          {...(service.ctaExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className="flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-full bg-cast-gold text-cast-dark font-semibold text-sm hover:bg-cast-gold-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cast-gold/25"
        >
          <CtaIcon size={15} />
          {service.ctaLabel}
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
          { opacity: 1, y: 0, stagger: 0.08, duration: 0.75, ease: 'power3.out' }
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <div
                key={s.title}
                ref={(el) => (cardRefs.current[i] = el)}
                onClick={() => setActiveService(s)}
                className={`opacity-0 group relative rounded-3xl p-7 border transition-all duration-300 cursor-pointer flex flex-col gap-4 hover:-translate-y-1 ${
                  s.featured
                    ? 'bg-gradient-to-br from-cast-gold/15 to-cast-gold-dark/5 border-cast-gold/40 glow-gold'
                    : 'glass border-white/5 hover:border-cast-gold/20'
                }`}
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
