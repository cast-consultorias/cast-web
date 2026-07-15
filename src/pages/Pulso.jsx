import { useRef, useState, useEffect } from 'react'
import { Play, CheckCircle, AlertTriangle, Shield, ChevronRight, MessageCircle, Plus } from 'lucide-react'

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
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

// ─── ACORDEÓN ─────────────────────────────────────────────────────────────────
function Accordion({ trigger, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-bp-gold/30 rounded-2xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-start justify-between gap-4 px-6 py-5 text-left bg-white/5 hover:bg-white/[0.07] transition-colors"
        aria-expanded={open}
      >
        <span className="font-montserrat font-bold text-white text-base leading-snug">{trigger}</span>
        <span
          className="text-bp-gold shrink-0 mt-0.5 transition-transform duration-300"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          <Plus size={20} />
        </span>
      </button>
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: open ? '9999px' : '0px', opacity: open ? 1 : 0 }}
      >
        <div className="px-6 pb-8 pt-4 bg-white/[0.03] border-t border-bp-gold/15">
          {children}
        </div>
      </div>
    </div>
  )
}

// ─── SECCIÓN 1 — HERO ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pulso-navy-light via-pulso-navy to-pulso-navy-deep py-20 px-6 flex flex-col items-center gap-10 text-center">
      <PulsoWaves />
      <div className="relative z-10 flex flex-col items-center gap-10 w-full">
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

        <PulsoVideo className="w-full max-w-2xl" />
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

// ─── SECCIÓN 3-BIS — DE LA AVIACIÓN A LA SALUD ───────────────────────────────
const AVIACION_TABLE = [
  ['Aerolínea que paga el servicio', 'EPS / Entidad Responsable de Pago'],
  ['Proveedor del servicio aeroportuario', 'IPS prestadora que atiende y factura'],
  ['Billetera virtual con fondos cargados', 'Presupuesto por contrato gestionado en la plataforma'],
  ['Aprobador con autenticación de doble factor', 'Auditor médico y financiero'],
  ['Ciclo de servicio', 'Ciclo de cuenta médica'],
  ['Disputa comercial', 'Proceso de glosa'],
  ['Nota de crédito', 'Nota crédito / conciliación de glosa'],
]

function AviacionSection() {
  return (
    <section className="bg-bp-navy-deep py-14 px-6">
      <div className="max-w-3xl mx-auto">
        <Accordion trigger="¿Por qué se llama PULSO? Conozca el caso real que inspiró la plataforma →">
          <div className="flex flex-col gap-6 pt-2">
            <h3 className="font-montserrat font-bold text-white text-lg md:text-xl leading-snug">
              UN PROBLEMA IDÉNTICO YA FUE RESUELTO — EN OTRA INDUSTRIA.
            </h3>
            <p className="font-opensans text-white/65 text-sm md:text-base leading-relaxed">
              En Argentina, las aerolíneas enfrentaban exactamente el mismo caos que hoy vive la salud colombiana:
              facturas sin trazabilidad, aprobaciones interminables por correo electrónico, y disputas financieras
              con cada proveedor que tardaban semanas en resolverse.
            </p>
            <p className="font-opensans text-white/65 text-sm md:text-base leading-relaxed">
              Una plataforma digital resolvió ese problema centralizando en tiempo real la interacción entre todos
              los actores del proceso financiero: los fondos se cargan en una billetera virtual, el proveedor emite
              su solicitud de pago digitalmente, el responsable aprueba con un clic y autenticación de doble factor,
              y el sistema registra la transacción de forma inmutable.
            </p>
            <p className="font-opensans text-white/65 text-sm md:text-base leading-relaxed">
              El resultado: cero disputas sin trazabilidad, cero facturas perdidas, cero aprobaciones sin
              responsable identificado. Un ciclo que antes tardaba semanas se redujo a horas.
            </p>
            <p className="font-opensans text-white/45 text-sm italic leading-relaxed border-l-2 border-bp-gold/30 pl-4">
              "Si la aviación pudo modernizar sus finanzas con tecnología, la salud no tiene excusa para no hacerlo."
            </p>

            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm font-opensans">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left px-4 py-3 text-bp-gold font-montserrat font-bold text-xs uppercase tracking-wide">
                      Aviación (el caso original)
                    </th>
                    <th className="text-left px-4 py-3 text-bp-gold font-montserrat font-bold text-xs uppercase tracking-wide">
                      PULSO — Salud (Colombia)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {AVIACION_TABLE.map(([left, right], i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white/[0.03]' : ''}>
                      <td className="px-4 py-3 text-white/55 leading-snug align-top">{left}</td>
                      <td className="px-4 py-3 text-white/75 leading-snug align-top">{right}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="font-opensans text-white/55 text-sm md:text-base leading-relaxed">
              Esa misma arquitectura de trazabilidad total es la base sobre la que PULSO construye su visión de
              largo plazo: convertir cada cuenta médica auditada y verificada en un activo financiero con historial
              inmutable — la puerta de entrada, a futuro y bajo marcos regulados por la autoridad financiera
              competente, a instrumentos de liquidez sobre cartera de salud. Es una conversación que sostenemos
              con gusto en privado, con juntas directivas listas para ese siguiente paso.
            </p>
            <DemoButton text="CONOCER ESTA VISIÓN EN DETALLE →" className="self-start" />
          </div>
        </Accordion>
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

// ─── SECCIÓN 4-BIS — EL ECOSISTEMA PULSO ─────────────────────────────────────
const ECOSISTEMA = [
  {
    label: 'PULSO Agendamiento',
    body: 'Programación de citas, validación de derechos (BDUA) y autorizaciones en un solo flujo. Diseñado para crecer con usted: mismo sistema para el profesional independiente, la IPS privada y la red con contrato EPS, sin perder funcionalidad en el camino.',
  },
  {
    label: 'LATIDO — Historia Clínica + Facturación',
    body: 'El módulo clínico que construye automáticamente la epicrisis conforme a los 22 numerales exigidos por la Res. 2284/2023, y cubre consulta ambulatoria, urgencias, hospitalización y cirugía. Lo que el médico documenta, PULSO lo convierte directamente en un cobro correcto y completo.',
  },
  {
    label: 'PULSO Recobros',
    body: 'Blindaje financiero para servicios fuera de red: autorización con trazabilidad completa, prevención automática de doble pago, y respuesta documentada ante la EPS en minutos, no en días.',
  },
  {
    label: 'CAST Prefactura',
    body: 'Auditoría médica especializada antes de radicar, ejecutada por profesionales con formación clínica y de auditoría en salud. No solo evita la glosa: identifica lo que su IPS tiene derecho a cobrar y hoy no está cobrando.',
  },
]

function EcosistemaSection() {
  return (
    <section className="bg-bp-navy py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-bp-gold text-[11px] font-montserrat font-bold tracking-[0.35em] uppercase">
            ECOSISTEMA PULSO
          </span>
          <h2 className="font-montserrat font-bold text-white text-2xl md:text-3xl mt-3 leading-snug">
            PULSO no es un módulo.{' '}
            <br className="hidden md:block" />
            Es el ecosistema completo de su operación en salud.
          </h2>
          <p className="font-opensans text-white/55 text-base md:text-lg mt-4 max-w-2xl mx-auto leading-relaxed">
            La gestión de glosas es la puerta de entrada. Pero la plataforma que estamos construyendo
            cubre todo el ciclo de su institución — desde que el paciente agenda la cita, hasta que
            la cuenta médica se liquida.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {ECOSISTEMA.map((m) => (
            <div
              key={m.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-7 flex flex-col gap-3 hover:border-bp-gold/30 transition-colors duration-300"
            >
              <h3 className="font-montserrat font-bold text-bp-gold text-base leading-snug">
                {m.label}
              </h3>
              <p className="font-opensans text-white/55 text-sm leading-relaxed">{m.body}</p>
            </div>
          ))}
        </div>
        <p className="font-opensans text-white/40 text-sm italic text-center mt-10 max-w-2xl mx-auto leading-relaxed">
          Cada módulo se construye sobre la misma plataforma, el mismo motor de inteligencia artificial
          y la misma trazabilidad blockchain. Hoy hablamos con usted de glosas. Mañana, PULSO es el
          sistema operativo financiero completo de su institución.
        </p>
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
    <section className="bg-bp-navy-deep py-20 px-6">
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

// ─── SECCIÓN 6 — CUMPLIMIENTO NORMATIVO (ampliada) ───────────────────────────
const NORMAS = [
  {
    id: 'Res. 3100/2019',
    desc: 'Habilitación de prestadores de servicios de salud: IPS, IPS especializadas y consultorios independientes.',
  },
  {
    id: 'Res. 2284/2023',
    desc: 'Manual Único de Devoluciones, Glosas y Respuestas: los 7 grupos de glosa, las causales taxativas y los plazos perentorios de auditoría.',
  },
  {
    id: 'Res. 0948/2026',
    desc: 'El nuevo mecanismo único de validación RIPS–Factura Electrónica de Venta, vigente desde mayo de 2026. PULSO ya opera bajo este estándar, con un motor dinámico de reglas que se actualiza junto con el Ministerio — no con cada nueva resolución.',
  },
  {
    id: 'Res. 1888/2025',
    desc: 'Historia clínica interoperable bajo el estándar internacional HL7 FHIR.',
  },
  {
    id: 'RIPS',
    desc: 'Validado en tiempo real contra la factura y la Base de Datos Única de Afiliados (BDUA).',
  },
]

function ComplianceSection() {
  return (
    <section className="bg-bp-navy py-20 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <div>
          <span className="text-bp-gold text-[11px] font-montserrat font-bold tracking-[0.35em] uppercase">
            CUMPLIMIENTO NORMATIVO
          </span>
          <h2 className="font-montserrat font-bold text-white text-2xl md:text-3xl mt-3 leading-snug">
            Construido para la norma de hoy —{' '}
            <br className="hidden md:block" />y ya listo para la que viene.
          </h2>
        </div>
        <ul className="flex flex-col gap-5">
          {NORMAS.map((n) => (
            <li key={n.id} className="flex items-start gap-4">
              <CheckCircle size={18} className="text-bp-gold mt-0.5 shrink-0" />
              <div>
                <span className="font-montserrat font-bold text-white text-sm">{n.id}</span>
                <span className="font-opensans text-white/60 text-sm leading-relaxed"> — {n.desc}</span>
              </div>
            </li>
          ))}
        </ul>
        <p className="font-opensans text-white/45 text-sm italic leading-relaxed">
          La regulación en salud colombiana cambia todos los años. La mayoría del software del sector
          se queda un paso atrás. PULSO fue diseñado para ir un paso adelante.
        </p>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="font-opensans text-white/40 text-sm italic leading-relaxed">
            Y para quien está montando su IPS o consultorio desde cero: PULSO se implementa dentro
            de la ruta de estructuración CAST — lo legal, lo financiero y lo tecnológico en un solo
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
    <section className="bg-bp-navy-deep py-16 px-6">
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

// ─── SECCIÓN 8 — QUIÉN ESTÁ DETRÁS (ampliada) ────────────────────────────────
const TEAM_ITEMS = [
  'Dirección estratégica bajo metodología PMP® / PMBOK® (PMI)',
  'Liderazgo científico: médica especialista en Auditoría y Gerencia de Calidad en Salud, 23+ años de experiencia asistencial y administrativa',
  'Ingeniería de software y arquitectura especializada en salud',
  'Inteligencia Artificial y Big Data aplicados a validación y predicción de glosas',
  'Equipo financiero para indicadores, ROI y modelo de negocio',
  'Seguridad de la información y trazabilidad blockchain en cada capa',
]

function BackingSection() {
  return (
    <section className="bg-bp-navy py-20 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-8">
        <span className="text-bp-gold text-[11px] font-montserrat font-bold tracking-[0.35em] uppercase">
          QUIÉN ESTÁ DETRÁS
        </span>
        <h2 className="font-montserrat font-bold text-white text-xl md:text-2xl leading-snug">
          PULSO no nace de un equipo de tecnología que un día decidió incursionar en salud.
          Nace exactamente al revés.
        </h2>
        <p className="font-opensans text-white/70 text-base leading-relaxed">
          PULSO es liderado por una{' '}
          <strong className="text-white">médica cirujana, especialista en Gerencia de la Calidad y Auditoría en Salud</strong>,
          con más de <strong className="text-white">23 años de trayectoria</strong> en el sistema de salud colombiano:
          desde la práctica asistencial en múltiples roles clínicos, hasta la gestión administrativa en cargos de
          dirección — incluyendo experiencia directa dentro de una Entidad Responsable de Pago. Hoy dirige la visión
          científica y clínica de PULSO como <strong className="text-white">Directora Científica</strong>: la garantía
          de que cada regla de negocio, cada validación normativa y cada flujo de auditoría que ejecuta la plataforma
          responde a la realidad operativa real del sector — no a una interpretación externa de ella.
        </p>
        <p className="font-opensans text-white/70 text-base leading-relaxed">
          Detrás de PULSO está <strong className="text-white">CAST Consultorías S.A.S.</strong> y un equipo
          multidisciplinario listo para ejecutar: dirección de proyectos bajo metodología{' '}
          <strong className="text-white">PMP®</strong> y estándares <strong className="text-white">PMBOK®</strong> del
          PMI, ingenieros de software especializados en arquitecturas de salud, expertos en inteligencia artificial
          y analítica de big data, y analistas financieros que diseñan cada indicador de retorno.
        </p>
        <ul className="flex flex-col gap-3">
          {TEAM_ITEMS.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle size={16} className="text-bp-gold mt-0.5 shrink-0" />
              <span className="font-opensans text-white/65 text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
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
      <AviacionSection />
      <ModulesSection />
      <EcosistemaSection />
      <ImpactSection />
      <ComplianceSection />
      <FinancingSection />
      <BackingSection />
      <FinalCTASection />
      <PulsoFooter />
    </div>
  )
}
