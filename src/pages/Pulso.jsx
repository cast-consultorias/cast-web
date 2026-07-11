import { useRef, useState, useEffect } from 'react'
import { Play, CheckCircle, AlertTriangle, Shield, ChevronRight, MessageCircle } from 'lucide-react'

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
// TODO: Crear el evento 'Demo PULSO — 30 min' en cal.com antes del lanzamiento
const CAL_DEMO_PULSO = 'https://cal.com/carlos-alberto-suarez-tous-3hbcmp/demostracion-pulso'
const WA_PULSO = 'https://wa.me/573042113374?text=Hola+Carlos%2C+quiero+una+demostraci%C3%B3n+de+PULSO+para+mi+instituci%C3%B3n'

// ─── CTA BUTTON ──────────────────────────────────────────────────────────────
function DemoButton({ text = 'AGENDAR DEMOSTRACIÓN →', dark = false, className = '' }) {
  const base = 'inline-block font-montserrat font-bold uppercase px-8 py-4 rounded-xl shadow-md transition-all duration-300 text-sm tracking-wide border-2'
  const light = 'bg-bp-gold text-bp-navy border-transparent hover:bg-bp-navy hover:text-bp-gold hover:border-bp-gold'
  const darkV = 'bg-bp-navy text-bp-gold border-bp-navy hover:bg-bp-navy-deep'
  return (
    <a
      href={CAL_DEMO_PULSO}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${dark ? darkV : light} ${className}`}
    >
      {text}
    </a>
  )
}

// ─── VIDEO PULSO ─────────────────────────────────────────────────────────────
function PulsoVideo({ className = '' }) {
  const videoRef = useRef(null)
  const containerRef = useRef(null)
  const [videoMounted, setVideoMounted] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden border border-bp-gold/30 shadow-2xl ${className}`}
    >
      {videoMounted ? (
        <div className="relative aspect-video bg-bp-navy-deep">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            controls
            preload="metadata"
            playsInline
            aria-label="Video demostración de PULSO"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          >
            <source src="/PULSO-demo-mp4.mp4" type="video/mp4" />
          </video>
          {!playing && (
            <button
              onClick={() => videoRef.current?.play()}
              aria-label="Reproducir video de PULSO"
              className="absolute inset-0 flex items-center justify-center bg-bp-navy/30 hover:bg-bp-navy/40 transition-colors group"
            >
              <span className="w-20 h-20 rounded-full bg-bp-gold shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Play size={28} className="text-bp-navy ml-1.5" fill="currentColor" />
              </span>
            </button>
          )}
        </div>
      ) : (
        <div className="aspect-video bg-bp-navy-deep flex items-center justify-center">
          <span className="w-20 h-20 rounded-full bg-bp-gold flex items-center justify-center">
            <Play size={28} className="text-bp-navy ml-1.5" fill="currentColor" />
          </span>
        </div>
      )}
    </div>
  )
}

// ─── ONDAS METALIZADAS (reutilizadas del home) ────────────────────────────────
function PulsoWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.025] to-transparent" />
      <div className="absolute bottom-0 left-0 w-[200%] animate-wave-drift-r">
        <svg viewBox="0 0 2880 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,85 C480,20 960,150 1440,85 C1920,20 2400,150 2880,85 L2880,130 L0,130 Z" fill="#1E4A7A" fillOpacity="0.18" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-[200%] animate-wave-drift-l">
        <svg viewBox="0 0 2880 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,55 C360,10 720,90 1080,55 C1440,10 1800,90 2160,55 C2520,10 2760,75 2880,55 L2880,90 L0,90 Z" fill="#255A8E" fillOpacity="0.20" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 w-[200%] animate-wave-drift-r2">
        <svg viewBox="0 0 2880 55" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,32 C240,8 480,52 720,32 C960,12 1200,52 1440,32 C1680,12 1920,52 2160,32 C2400,12 2640,52 2880,32 L2880,55 L0,55 Z" fill="#2E6AAA" fillOpacity="0.13" />
        </svg>
      </div>
    </div>
  )
}

// ─── SECCIÓN 1 — HERO ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pulso-navy-light via-pulso-navy to-pulso-navy-deep py-20 px-6 flex flex-col items-center gap-10 text-center">
      <PulsoWaves />
      {/* Contenido — z-10 para quedar sobre las ondas */}
      <div className="relative z-10 flex flex-col items-center gap-10 w-full">
      {/* Logos */}
      <div className="flex items-center gap-6">
        <a href="/" className="flex items-center gap-2 group">
          <img
            src="/sello-metodologia.png"
            alt="CAST"
            className="h-10 w-auto object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="text-left">
            <span className="block font-montserrat font-extrabold text-bp-gold text-base tracking-widest">CAST</span>
            <span className="block font-opensans text-white/30 text-[10px] tracking-widest uppercase">Consultorías S.A.S.</span>
          </div>
        </a>
        <span className="text-white/20 text-xl">·</span>
        <div>
          <span className="font-montserrat font-extrabold text-white text-xl tracking-wide">
            PULSO<sup className="text-bp-gold text-xs align-super">®</sup>
          </span>
          <span className="block font-opensans text-white/30 text-[10px] uppercase tracking-wider mt-0.5">Producto CAST</span>
        </div>
      </div>

      {/* Headline */}
      <div className="max-w-3xl flex flex-col gap-4">
        <h1 className="font-montserrat font-extrabold text-white text-3xl md:text-5xl leading-tight">
          SU IPS NO TIENE UN PROBLEMA DE FACTURACIÓN.
        </h1>
        <p className="font-montserrat font-extrabold text-bp-gold text-2xl md:text-3xl leading-snug">
          TIENE UN PROBLEMA DE GLOSAS.
        </p>
        <p className="font-opensans text-white/65 text-base md:text-lg leading-relaxed mt-2 max-w-2xl mx-auto">
          En Colombia, entre el 20% y el 40% del valor facturado por los prestadores se pierde o se congela
          en glosas y cartera vencida. PULSO fue diseñado para atacar ese problema de raíz: detectar la glosa
          antes de radicar, acelerar la liquidación y darle trazabilidad total a cada peso.
        </p>
      </div>

      {/* Video */}
      <PulsoVideo className="w-full max-w-2xl" />

      {/* CTA */}
      <DemoButton />
      </div>
    </section>
  )
}

// ─── SECCIÓN 2 — EL PROBLEMA ─────────────────────────────────────────────────
function ProblemSection() {
  const problems = [
    'La glosa llega DESPUÉS de radicar — cuando ya es tarde y costosa de levantar.',
    'La auditoría manual revisa 8–12 cuentas por auditor al día. El volumen la desborda.',
    'La cartera vencida crece y la operación asistencial termina financiando a los pagadores.',
    'Y la exigencia normativa sube cada año: Res. 3100, Res. 1888/2025, RIPS, interoperabilidad HL7 FHIR... y las que vendrán.',
  ]

  return (
    <section className="bg-bp-navy-deep py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-montserrat font-bold text-white text-2xl md:text-3xl leading-snug mb-10">
          El ciclo de una cuenta médica en Colombia puede tardar de{' '}
          <span className="text-bp-gold">90 a 180 días.</span> Mientras tanto:
        </h2>
        <ul className="flex flex-col gap-5">
          {problems.map((p) => (
            <li key={p} className="flex items-start gap-4">
              <AlertTriangle size={18} className="text-bp-gold mt-0.5 shrink-0" />
              <span className="font-opensans text-white/70 text-base leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
        <div className="mt-12 border-t border-bp-gold/20 pt-8">
          <p className="font-montserrat font-bold text-white text-xl md:text-2xl leading-snug">
            El resultado: prestadores que atienden bien, pero cobran mal.{' '}
            <span className="text-bp-gold">PULSO existe para invertir esa ecuación.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 3 — QUÉ ES PULSO ────────────────────────────────────────────────
function WhatIsPulsoSection() {
  return (
    <section className="bg-bp-navy py-20 px-6">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <span className="text-bp-gold text-[11px] font-montserrat font-bold tracking-[0.35em] uppercase">
          QUÉ ES PULSO
        </span>
        <h2 className="font-montserrat font-extrabold text-white text-2xl md:text-4xl leading-tight">
          Plataforma Unificada de Liquidación,{' '}
          <br className="hidden md:block" />
          Seguimiento y Operaciones en Salud
        </h2>
        <p className="font-opensans text-white/65 text-base md:text-lg leading-relaxed max-w-2xl">
          Un ecosistema digital que centraliza y automatiza el ciclo completo de cuentas médicas —
          desde la autorización del servicio hasta la liquidación final — con inteligencia artificial
          especializada y trazabilidad blockchain que hace inmutable cada transacción.
        </p>
        <div className="px-6 py-4 rounded-xl border border-bp-gold/20 bg-bp-gold/5">
          <p className="font-opensans text-white/40 text-sm italic leading-relaxed">
            Diseñado y estructurado por CAST Consultorías como autor intelectual.
            Propiedad intelectual registrada ante la DNDA Colombia.
          </p>
        </div>
        <DemoButton className="mt-2" />
      </div>
    </section>
  )
}

// ─── SECCIÓN 4 — LOS 5 MÓDULOS DE IA ────────────────────────────────────────
function ModulesSection() {
  const modules = [
    {
      n: '01',
      title: 'Validación automática de RIPS',
      body: 'La cuenta sale limpia y conforme a norma desde el origen.',
    },
    {
      n: '02',
      title: 'Alertas predictivas de glosa',
      body: 'El sistema detecta el riesgo de glosa ANTES de radicar, cuando todavía se puede corregir.',
    },
    {
      n: '03',
      title: 'Asistente de auditoría médica',
      body: 'Multiplica la capacidad del equipo auditor con revisión asistida por IA.',
    },
    {
      n: '04',
      title: 'Analítica de red prestadora',
      body: 'Visión gerencial en tiempo real: qué sede, qué servicio y qué pagador concentran el problema.',
    },
    {
      n: '05',
      title: 'Detección de anomalías financieras',
      body: 'Dobles cobros, inconsistencias y patrones de fraude, bloqueados con respaldo blockchain.',
    },
  ]

  return (
    <section className="bg-bp-navy-deep py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-bp-gold text-[11px] font-montserrat font-bold tracking-[0.35em] uppercase">
            MÓDULOS DE IA
          </span>
          <h2 className="font-montserrat font-bold text-white text-2xl md:text-3xl mt-3">
            Inteligencia artificial donde más duele:
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {modules.map((m) => (
            <div
              key={m.n}
              className={`rounded-2xl border border-white/10 bg-white/5 p-7 flex flex-col gap-3 hover:border-bp-gold/30 transition-colors duration-300 ${
                m.n === '05' ? 'md:col-span-2 md:max-w-sm md:mx-auto' : ''
              }`}
            >
              <span className="font-montserrat font-extrabold text-bp-gold text-3xl leading-none">
                {m.n}
              </span>
              <h3 className="font-montserrat font-bold text-white text-base leading-snug">
                {m.title}
              </h3>
              <p className="font-opensans text-white/55 text-sm leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 5 — IMPACTO PROYECTADO ─────────────────────────────────────────
function ImpactSection() {
  const metrics = [
    { from: '20–40%', to: '<8%', label: 'del valor facturado en glosas' },
    { from: '90–180 días', to: '<20 días', label: 'ciclo de cuenta médica' },
    { from: '8–12/día', to: '>35/día', label: 'cuentas por auditor' },
    { highlight: '70%', label: 'de glosas evitables detectadas antes de la radicación' },
    { highlight: '>99%', label: 'de intentos de doble pago detectados y bloqueados' },
    { from: '35%', to: '<10%', label: 'cartera vencida a +90 días del total facturado' },
  ]

  return (
    <section className="bg-bp-navy py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-bp-gold text-[11px] font-montserrat font-bold tracking-[0.35em] uppercase">
            IMPACTO PROYECTADO*
          </span>
          <h2 className="font-montserrat font-bold text-white text-2xl md:text-3xl mt-3">
            Lo que el modelo PULSO está diseñado para lograr:
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="rounded-2xl border border-bp-gold/15 bg-bp-gold/5 p-6 flex flex-col gap-2"
            >
              {m.highlight ? (
                <p className="font-montserrat font-extrabold text-bp-gold text-4xl leading-none">
                  {m.highlight}
                </p>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-montserrat font-bold text-white/35 text-lg line-through leading-none">
                    {m.from}
                  </span>
                  <ChevronRight size={14} className="text-bp-gold shrink-0" />
                  <span className="font-montserrat font-extrabold text-bp-gold text-2xl leading-none">
                    {m.to}
                  </span>
                </div>
              )}
              <p className="font-opensans text-white/55 text-sm leading-snug">{m.label}</p>
            </div>
          ))}
        </div>
        <p className="text-white/30 text-[11px] font-opensans text-center leading-relaxed">
          *Indicadores proyectados del diseño del modelo PULSO.
          Los resultados medidos de cada implementación se documentan con el cliente.
        </p>
      </div>
    </section>
  )
}

// ─── SECCIÓN 6 — CUMPLIMIENTO NORMATIVO ──────────────────────────────────────
function ComplianceSection() {
  const norms = [
    'Res. 3100/2019 (habilitación)',
    'Res. 1888/2025 (HC interoperable HL7 FHIR)',
    'RIPS',
    'Trazabilidad exigible ante auditoría',
  ]

  return (
    <section className="bg-bp-navy-deep py-20 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div>
          <span className="text-bp-gold text-[11px] font-montserrat font-bold tracking-[0.35em] uppercase">
            CUMPLIMIENTO NORMATIVO
          </span>
          <h2 className="font-montserrat font-bold text-white text-2xl md:text-3xl mt-3 leading-snug">
            Construido para la norma de hoy —{' '}
            <br className="hidden md:block" />y preparado para la que viene.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {norms.map((n) => (
            <span
              key={n}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-bp-gold/30 bg-bp-gold/5 text-bp-gold text-xs font-montserrat font-bold"
            >
              <Shield size={12} />
              {n}
            </span>
          ))}
        </div>
        <p className="font-opensans text-white/60 text-base leading-relaxed">
          La regulación en salud solo va a endurecerse: PULSO convierte el cumplimiento en
          una ventaja operativa.
        </p>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="font-opensans text-white/40 text-sm italic leading-relaxed">
            Y para quien está montando su IPS o consultorio: PULSO se implementa dentro de la
            ruta de estructuración CAST — lo legal, lo financiero y lo tecnológico en un solo
            proceso.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 7 — FINANCIACIÓN SOBRE CARTERA ──────────────────────────────────
function FinancingSection() {
  return (
    <section className="bg-bp-navy py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-2xl border border-bp-gold/20 bg-bp-gold/5 p-8 md:p-10">
          <h2 className="font-montserrat font-bold text-white text-xl md:text-2xl leading-snug mb-4">
            ¿Y la cartera que ya está aprobada y verificada?
          </h2>
          <p className="font-opensans text-white/60 text-base leading-relaxed">
            El modelo PULSO contempla un módulo de estructuración financiera que permite convertir
            cartera de cuentas aprobadas y verificadas en instrumentos de liquidez, bajo marcos
            regulados. Es conversación de junta directiva — y la tenemos con gusto en privado.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 8 — QUIÉN ESTÁ DETRÁS ───────────────────────────────────────────
function BackingSection() {
  return (
    <section className="bg-bp-navy-deep py-20 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <span className="text-bp-gold text-[11px] font-montserrat font-bold tracking-[0.35em] uppercase">
          QUIÉN ESTÁ DETRÁS
        </span>
        <p className="font-opensans text-white/70 text-base md:text-lg leading-relaxed">
          Detrás de PULSO está CAST Consultorías: metodología PMBOK®, dirección PMP®, ISO 27001:2022,
          y experiencia estructurando proyectos en salud, finanzas y tecnología en Colombia y el
          exterior. PULSO no es una startup improvisada: es ingeniería de procesos de salud
          convertida en plataforma.
        </p>
        <blockquote className="border-l-2 border-bp-gold/40 pl-6">
          <p className="font-opensans text-white/50 text-base italic leading-relaxed">
            "CAST es el arquitecto intelectual de PULSO. Su capacidad para entender la complejidad
            operativa del sistema de salud colombiano y traducirla en una plataforma tecnológica
            funcional es algo que ningún otro consultor nos había propuesto."
          </p>
          <footer className="mt-3">
            <cite className="font-montserrat font-bold text-white/35 not-italic text-sm">
              Directivo del sector salud, Colombia
            </cite>
          </footer>
        </blockquote>
        <DemoButton className="self-start mt-2" />
      </div>
    </section>
  )
}

// ─── SECCIÓN 9 — CTA FINAL ────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section id="demo-cta" className="bg-bp-gold py-20 px-6 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        <h2 className="font-montserrat font-extrabold text-bp-navy text-2xl md:text-3xl leading-snug">
          Cada mes sin control de glosas es plata que su IPS ya trabajó — y no va a cobrar.
        </h2>
        <p className="font-opensans text-bp-navy/70 text-base leading-relaxed">
          Agende una demostración de PULSO: 30 minutos, con su propio caso sobre la mesa.
        </p>
        <DemoButton dark text="AGENDAR DEMOSTRACIÓN →" />
        <a
          href={WA_PULSO}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-bp-navy/60 hover:text-bp-navy text-sm font-opensans transition-colors"
        >
          <MessageCircle size={15} />
          ¿Prefiere WhatsApp directo?
        </a>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function PulsoFooter() {
  return (
    <footer className="bg-bp-navy-deep py-8 px-6 text-center border-t border-white/5">
      <p className="font-opensans text-white/25 text-xs leading-relaxed">
        PULSO® — Producto de CAST Consultorías S.A.S. · Registrado ante la DNDA Colombia ·
        Barranquilla — Colombia
        <br />
        <a href="/" className="hover:text-white/50 transition-colors mt-1 inline-block">
          ← Volver a CAST Consultorías
        </a>
      </p>
    </footer>
  )
}

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function Pulso() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <WhatIsPulsoSection />
      <ModulesSection />
      <ImpactSection />
      <ComplianceSection />
      <FinancingSection />
      <BackingSection />
      <FinalCTASection />
      <PulsoFooter />
    </div>
  )
}
