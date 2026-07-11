import { useState } from 'react'
import { Check, ChevronDown, ChevronUp, MessageCircle, ExternalLink } from 'lucide-react'

// ─── FLAGS DE AUTORIZACIÓN DE TESTIMONIOS ─────────────────────────────────────
// Cambiar a true SOLO cuando llegue autorización escrita del cliente.
const BP01_AUTHORIZED = true  // Dra. Eusimary Contreras Morales — autorización escrita recibida jul-2026

// ─── CTA BUTTON ──────────────────────────────────────────────────────────────
function CTAButton({ text = 'HAZTE LA RADIOGRAFÍA Y AGENDA TU SESIÓN →', className = '' }) {
  const scrollToConversion = () => {
    document.getElementById('radiografia')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <button
      onClick={scrollToConversion}
      className={`inline-block bg-bp-gold text-bp-navy font-montserrat font-bold uppercase px-8 py-4 rounded-xl shadow-md hover:bg-bp-navy hover:text-bp-gold border-2 border-transparent hover:border-bp-gold transition-all duration-300 text-sm tracking-wide cursor-pointer ${className}`}
    >
      {text}
    </button>
  )
}

// ─── SECCIÓN 1 — BARRA DE URGENCIA ───────────────────────────────────────────
function UrgencyBar() {
  return (
    <div className="sticky top-0 z-50 w-full bg-bp-gold py-2.5 px-4">
      <p className="font-montserrat font-semibold text-bp-navy text-sm text-center">
        ⚠ Solo <strong>[8]</strong> Blueprint Sessions disponibles este mes — cupo real de agenda ⚠
      </p>
    </div>
  )
}

// ─── SECCIÓN 2 — HERO ────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="bg-bp-navy py-20 px-6 text-center flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-1">
        <img
          src="/sello-metodologia.png"
          alt="CAST Consultorías"
          className="h-14 w-auto object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <span className="font-montserrat font-extrabold text-bp-gold text-2xl tracking-widest">CAST</span>
        <span className="font-opensans text-white/40 text-xs tracking-widest uppercase">Consultorías S.A.S.</span>
      </div>

      <div className="max-w-3xl flex flex-col gap-4">
        <h1 className="font-montserrat font-extrabold text-white text-3xl md:text-5xl leading-tight">
          DEJA DE EMPRENDER{' '}
          <span className="text-bp-gold">A CIEGAS.</span>
        </h1>
        <p className="font-montserrat font-extrabold text-white text-xl md:text-3xl leading-snug">
          EN{' '}
          <span className="text-bp-gold">48 HORAS</span>{' '}
          TIENES EL DIAGNÓSTICO ESTRATÉGICO DE TU NEGOCIO: NÚMEROS REALES, ESTRUCTURA Y TU RUTA HACIA EL CAPITAL.
        </p>
      </div>

      <div className="max-w-2xl flex flex-col gap-2 text-white/65 font-opensans text-base leading-relaxed">
        <p className="italic">
          (Más del 60% de los emprendimientos en Colombia nace sin un modelo sólido. El tuyo no tiene por qué ser uno de ellos.)
        </p>
        <p className="italic">
          Ojo: NO es una asesoría gratis más. Es un diagnóstico profesional con entregable real de 8 a 12 páginas.
        </p>
      </div>

      {/* Video placeholder — reemplazar con <video> cuando esté listo */}
      <div className="w-full max-w-2xl aspect-video bg-bp-navy-deep rounded-2xl border border-bp-gold/20 flex flex-col items-center justify-center gap-3">
        <div className="w-16 h-16 rounded-full border-2 border-bp-gold/40 flex items-center justify-center">
          <span className="text-bp-gold text-2xl">▶</span>
        </div>
        <p className="text-white/30 font-opensans text-sm text-center px-6">
          Video: Carlos Suárez — Guion Anexo A (pendiente de grabación en Malecón del Río)
        </p>
      </div>

      <CTAButton />
    </section>
  )
}

// ─── SECCIÓN 3 — DATO DE AUTORIDAD ───────────────────────────────────────────
function StatsSection() {
  return (
    <section className="bg-bp-navy-deep py-16 px-6 text-center">
      <div className="max-w-2xl mx-auto">
        <p className="font-montserrat font-extrabold text-bp-gold text-8xl md:text-[9rem] leading-none">
          69%
        </p>
        <h2 className="font-montserrat font-bold text-white text-xl md:text-2xl mt-4 leading-snug">
          de los micronegocios en Colombia no tiene registro mercantil.
        </h2>

        <div className="mt-8 flex flex-col gap-3 text-white/65 font-opensans text-base md:text-lg">
          <p>
            El <strong className="text-white">47%</strong> de quienes ven una buena oportunidad no la toma por miedo al fracaso.
          </p>
          <p>
            Y más del <strong className="text-white">60%</strong> de los emprendimientos nace sin modelo sólido.
          </p>
        </div>

        <p className="mt-10 font-montserrat font-bold text-white text-xl md:text-2xl">
          No es casualidad que la mayoría no crezca.
        </p>
        <p className="mt-3 font-montserrat font-bold text-white text-xl md:text-2xl">
          La diferencia no está en las ganas. Está en la{' '}
          <span className="text-bp-gold">ESTRUCTURA.</span>
        </p>

        <p className="mt-10 text-white/25 text-xs font-opensans">
          Fuentes: DANE Emicron 2024 · GEM 2024/25
        </p>
      </div>
    </section>
  )
}

// ─── SECCIÓN 4 — ESTO ES PARA TI SI ─────────────────────────────────────────
function ForWhoSection() {
  const items = [
    'Eres médico, odontólogo o profesional de la salud montando tu consultorio, canal de telemedicina o IPS — y no tienes clara la ruta legal, financiera y tecnológica completa (la Res. 1888 de 2025 ya está vigente).',
    'Tu empresa factura y pediste crédito, pero el banco te dijo no — o te condicionó — por falta de documentación técnica. El problema no es tu negocio: es tu carpeta.',
    'Tu negocio vende, pero lo manejas con WhatsApp y Excel. Quieres usar IA y automatización, pero no sabes qué comprar ni por dónde empezar.',
    'Tienes una idea y ahorros listos — o un negocio informal que ya factura — y quieres crecer con estructura antes de arriesgar tu plata.',
  ]

  return (
    <section className="bg-bp-navy py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-bp-cream rounded-2xl p-8 md:p-12">
          <h2 className="font-montserrat font-bold text-bp-navy text-2xl md:text-3xl mb-8">
            Esto es para ti si:
          </h2>
          <ul className="flex flex-col gap-6">
            {items.map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-bp-gold flex items-center justify-center mt-0.5">
                  <Check size={13} className="text-bp-navy" strokeWidth={3} />
                </span>
                <p className="font-opensans text-bp-navy text-base leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 font-montserrat font-bold text-bp-navy text-base md:text-lg">
            Si te viste en al menos uno, la Blueprint Session™ se diseñó para ti.
          </p>
        </div>
        <div className="flex justify-center mt-10">
          <CTAButton />
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 5 — QUÉ RECIBES ─────────────────────────────────────────────────
function WhatYouGetSection() {
  const items = [
    'Análisis de tu modelo de negocio: qué tienes, qué falta y dónde está el riesgo.',
    'Lectura de viabilidad: si tu proyecto aguanta la inversión que planeas hacer.',
    'Tu perfil de cliente ideal (hipótesis de buyer persona) cuando tu etapa lo amerita.',
    'Recomendación de primer paso concreto (MVP): qué construir primero y qué NO comprar todavía.',
    'Tu ruta hacia el capital: crédito, inversión, fondos o financiación alternativa — cuál te aplica y qué te falta para acceder.',
  ]

  return (
    <section className="bg-bp-cream py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-montserrat font-bold text-bp-navy text-2xl md:text-3xl mb-4 leading-snug">
          Esto no es una charla motivacional. Es trabajo real con entregable real.
        </h2>
        <p className="font-opensans text-bp-navy/75 text-base leading-relaxed mb-8">
          Después de tu Blueprint Session™, en máximo{' '}
          <strong className="text-bp-navy">48 horas</strong> recibes tu{' '}
          <strong className="text-bp-navy">Diagnóstico Estratégico de 8 a 12 páginas</strong>,
          construido sobre tus números y tu realidad:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm border border-bp-navy/8">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-bp-gold flex items-center justify-center mt-0.5">
                <Check size={13} className="text-bp-navy" strokeWidth={3} />
              </span>
              <p className="font-opensans text-bp-navy text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 font-merriweather italic text-bp-navy/50 text-sm text-center">
          Documento tuyo. Sin compromiso. Con la firma metodológica CAST (PMBOK® · PMP®).
        </p>
      </div>
    </section>
  )
}

// ─── SECCIÓN 6 — METODOLOGÍA C.A.S.T. ───────────────────────────────────────
function MethodologySection() {
  const cards = [
    {
      letter: 'C',
      title: 'CONSULTORÍA INTEGRAL',
      subtitle: 'La mirada completa',
      delivery: 'Diagnóstico de tu modelo de negocio, finanzas y operación — todo junto, no por pedazos.',
      tagline: 'Aquí no miramos un síntoma. Miramos el sistema completo.',
    },
    {
      letter: 'A',
      title: 'ANÁLISIS PROFUNDO',
      subtitle: 'Los números que no habías visto',
      delivery: 'Brechas, riesgos y oportunidades identificadas con estándar de due diligence internacional.',
      tagline: 'Aquí no opinamos. Medimos.',
    },
    {
      letter: 'S',
      title: 'SOLUCIONES INNOVADORAS',
      subtitle: 'La ruta, no el discurso',
      delivery: 'Recomendaciones concretas: qué estructurar, qué automatizar, qué financiar y en qué orden.',
      tagline: "Aquí no te decimos 'échale ganas'. Te decimos qué hacer el lunes.",
    },
    {
      letter: 'T',
      title: 'TRANSFORMACIÓN REAL',
      subtitle: 'El impacto que se mide',
      delivery: 'Tu ruta hacia el capital y los siguientes pasos con métricas — para que la decisión sea tuya, con datos.',
      tagline: 'De la Idea al Impacto Real. Por eso nos llamamos así.',
    },
  ]

  return (
    <section className="bg-bp-navy py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-extrabold text-white text-2xl md:text-4xl mb-4">
            BLUEPRINT NO ES TEORÍA. ES MÉTODO.
          </h2>
          <p className="font-opensans text-white/65 text-base max-w-2xl mx-auto leading-relaxed">
            Una sesión estratégica 1 a 1, entre 4 y 8 horas de análisis del equipo CAST sobre tu información real,
            y un documento en 48 horas. Metodología propia sobre estándares internacionales (PMBOK® del PMI).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div
              key={card.letter}
              className="border border-bp-gold rounded-2xl p-6 flex flex-col gap-3 hover:bg-bp-gold/5 transition-colors duration-300"
            >
              <span className="font-montserrat font-extrabold text-bp-gold text-6xl leading-none">
                {card.letter}
              </span>
              <div>
                <h3 className="font-montserrat font-bold text-white text-lg leading-tight">
                  {card.title}
                </h3>
                <p className="font-opensans text-white/45 text-sm italic mt-0.5">{card.subtitle}</p>
              </div>
              <div>
                <p className="font-montserrat font-semibold text-bp-gold text-xs uppercase tracking-wider mb-1.5">
                  Sales con:
                </p>
                <p className="font-opensans text-white/75 text-sm leading-relaxed">{card.delivery}</p>
              </div>
              <p className="font-merriweather italic text-white/45 text-sm border-t border-white/10 pt-3 mt-1">
                {card.tagline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 7 — CÓMO FUNCIONA ───────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Hazte la Radiografía CAST™.',
      body: '17 preguntas, 5 minutos. Es la radiografía de tu negocio: con ella llegamos a tu sesión conociendo tu proyecto, tus números y tu momento — no partimos de cero.',
    },
    {
      num: '02',
      title: 'Vive tu Blueprint Session™.',
      body: 'Sesión estratégica 1 a 1 con Carlos Suárez, PMP®. Trabajamos sobre tu realidad: tu oferta, tus números, tu mercado.',
    },
    {
      num: '03',
      title: 'Recibe tu Diagnóstico en 48 horas.',
      body: 'Documento de 8 a 12 páginas con tu análisis completo y tu ruta hacia el capital. Tuyo, sin compromiso.',
    },
  ]

  return (
    <section className="bg-bp-cream py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-montserrat font-bold text-bp-navy text-2xl md:text-3xl text-center mb-12">
          Así de simple. Así de serio.
        </h2>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div key={step.num} className="flex gap-6">
              {/* Timeline column */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-14 h-14 rounded-full bg-bp-gold flex items-center justify-center shadow-md">
                  <span className="font-montserrat font-extrabold text-bp-navy text-base">{step.num}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-0.5 flex-1 min-h-[3rem] bg-bp-gold/35 my-2" />
                )}
              </div>
              {/* Content */}
              <div className="pb-10 flex-1 pt-1">
                <h3 className="font-montserrat font-bold text-bp-navy text-base md:text-lg mb-2">
                  PASO {step.num} — {step.title}
                </h3>
                <p className="font-opensans text-bp-navy/70 text-base leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-2">
          <CTAButton text="EMPEZAR MI RADIOGRAFÍA →" />
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIO BP01 — Dra. Eusimary Contreras Morales ───────────────────────
// Visible solo cuando BP01_AUTHORIZED === true
function TestimonialBP01() {
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
    <div className="bg-white/5 border border-bp-gold/30 rounded-2xl p-8 md:p-10 flex flex-col gap-6">
      {/* Gancho / hook */}
      <p className="font-merriweather italic text-bp-gold text-lg md:text-xl leading-snug">
        "23 años como médica cirujana. Más de 18 dedicados a la medicina metabólica. Cero horas para convertirlo en un negocio — hasta ahora."
      </p>

      {/* Cuerpo — versión corta por defecto, completa al expandir */}
      <blockquote cite="https://draeusimary.netlify.app/" className="border-l-2 border-bp-gold/40 pl-5">
        {!expanded ? (
          <p className="font-opensans text-white/75 text-sm md:text-base leading-relaxed">
            {shortVersion}
          </p>
        ) : (
          <div className="flex flex-col gap-4 font-opensans text-white/75 text-sm md:text-base leading-relaxed">
            {bodyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-bp-gold text-sm font-montserrat font-semibold underline underline-offset-2 hover:text-bp-gold/80 transition-colors"
        >
          {expanded ? 'Leer menos ↑' : 'Leer testimonio completo ↓'}
        </button>
      </blockquote>

      {/* Atribución */}
      <footer className="flex flex-col gap-1">
        <cite className="font-montserrat font-bold text-white not-italic text-base">
          Dra. Eusimary Contreras Morales
        </cite>
        <p className="font-opensans text-white/60 text-sm">
          Médica Cirujana · Esp. Gerencia de la Calidad y Auditoría Médica en Salud
        </p>
        <p className="font-opensans text-white/45 text-sm">
          Medicina Metabólica &amp; Longevidad · Barranquilla, Colombia
        </p>
        <div className="flex flex-wrap gap-4 mt-3">
          {/* Handle verificado jul-2026: @draeusy_saludmetabolica */}
          <a
            href="https://www.instagram.com/draeusy_saludmetabolica/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-bp-gold/80 hover:text-bp-gold text-sm font-opensans transition-colors"
          >
            <ExternalLink size={13} />
            @draeusy_saludmetabolica
          </a>
          <a
            href="https://draeusimary.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-bp-gold/80 hover:text-bp-gold text-sm font-opensans transition-colors"
          >
            <ExternalLink size={13} />
            draeusimary.netlify.app
          </a>
        </div>
      </footer>

      {/* CTA dentro del testimonio */}
      <div className="border-t border-white/10 pt-5 flex flex-col gap-4">
        <p className="font-opensans text-white/65 text-sm leading-relaxed">
          ¿Tiene años de experiencia profesional sin un negocio estructurado detrás?<br />
          Agende su Blueprint Session gratuita y descubra el programa que ya existe en su trayectoria.
        </p>
        <div>
          <CTAButton text="AGENDAR MI BLUEPRINT SESSION →" />
        </div>
      </div>
    </div>
  )
}

// Tarjeta placeholder para testimonios pendientes de autorización
function TestimonialPlaceholder({ profile, label, hint }) {
  return (
    <div className="border border-bp-gold/20 rounded-2xl p-6 flex flex-col gap-3">
      <div className="w-14 h-14 rounded-full bg-bp-gold/10 border border-bp-gold/20 flex items-center justify-center">
        <span className="text-bp-gold font-montserrat font-bold text-xs">{profile}</span>
      </div>
      <p className="font-montserrat font-semibold text-white/60 text-sm">{label}</p>
      <p className="font-opensans text-white/35 text-sm italic leading-relaxed">
        Testimonio pendiente de autorización escrita del cliente.
      </p>
      <p className="font-opensans text-white/25 text-xs mt-auto">{hint}</p>
    </div>
  )
}

// ─── SECCIÓN 8 — TESTIMONIOS ─────────────────────────────────────────────────
function TestimonialsSection() {
  return (
    <section className="bg-bp-navy py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-montserrat font-bold text-white text-2xl md:text-3xl mb-2">
            Empresarios como tú ya pasaron por su Blueprint Session™
          </h2>
          <p className="font-opensans text-white/55 text-base">Estos son sus resultados.</p>
        </div>

        <div className="flex flex-col gap-6">
          {/* BP01 — Salud: testimonio real (oculto hasta autorización) o placeholder */}
          {BP01_AUTHORIZED ? (
            <TestimonialBP01 />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TestimonialPlaceholder profile="BP01" label="Sector salud" hint="Consultorio / IPS" />
              <TestimonialPlaceholder profile="BP02/03" label="Negocio en operación" hint="Crédito · Sistema comercial" />
              <TestimonialPlaceholder profile="BP04" label="Idea antes de invertir" hint="Validación pre-inversión" />
            </div>
          )}

          {/* BP02/03 y BP04 — siempre placeholders por ahora */}
          {BP01_AUTHORIZED && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TestimonialPlaceholder profile="BP02/03" label="Negocio en operación" hint="Crédito · Sistema comercial" />
              <TestimonialPlaceholder profile="BP04" label="Idea antes de invertir" hint="Validación pre-inversión" />
            </div>
          )}
        </div>

        <div className="flex justify-center mt-10">
          <CTAButton />
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 9 — QUIÉN ES CARLOS ─────────────────────────────────────────────
function BlueprintFounderSection() {
  const credentials = [
    '25+ años de experiencia ejecutiva real',
    'PMP® — Project Management Professional (PMI)',
    'Máster en Dirección de Proyectos — OBS Business School · Universidad de Barcelona',
    'Proyectos estructurados en minería, salud, agro, finanzas y tecnología',
    'Red de capital activa en 25+ países — Europa, América, Asia',
    'ISO 27001:2022 · Metodología sobre estándares PMBOK®',
  ]

  return (
    <section className="bg-bp-cream py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
          {/* Foto — mobile first (encima del texto) */}
          <div className="w-full md:w-[40%] flex-shrink-0">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-bp-navy/10 border border-bp-navy/10">
              <img
                src="/ceo-carlos.png"
                alt="Carlos Alberto Suárez Tous — CEO & Founder CAST Consultorías"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.parentElement.innerHTML =
                    '<div class="w-full h-full flex items-center justify-center"><span class="text-bp-navy/20 font-montserrat font-bold text-4xl">CS</span></div>'
                }}
              />
            </div>
          </div>

          {/* Texto */}
          <div className="flex-1 flex flex-col gap-5">
            <h2 className="font-montserrat font-bold text-bp-navy text-2xl md:text-3xl leading-tight">
              Soy Carlos Alberto Suárez Tous. Yo también sé lo que es empezar desde abajo.
            </h2>

            <div className="flex flex-col gap-4 font-opensans text-bp-navy/75 text-base leading-relaxed">
              <p>
                Monté mi primer negocio a los 13 años, en las calles de Barranquilla.
                Después vinieron 12 años en la Armada Nacional, donde aprendí lo que
                ninguna universidad enseña: disciplina y estructura bajo presión.
              </p>
              <p>
                Luego el mundo: operaciones financieras internacionales desde Zúrich,
                liderazgo de proyectos en minería, salud, agro y tecnología. Estructuré
                de punta a punta un proyecto minero de nueve cifras que hoy está
                presentado ante inversionistas en Europa y América.
              </p>
              <p>
                Todo eso está hoy dentro de una sola metodología: CAST. Y la Blueprint
                Session™ es donde la aplico a tu proyecto — el tuyo, con tus números.
              </p>
            </div>

            <ul className="flex flex-col gap-2 mt-1">
              {credentials.map((c, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-bp-gold font-bold mt-0.5">✓</span>
                  <span className="font-montserrat font-semibold text-bp-navy text-sm leading-snug">{c}</span>
                </li>
              ))}
            </ul>

            <p className="font-merriweather italic text-bp-gold text-base mt-2">
              "No vendemos consultoría. Construimos el futuro."
            </p>

            <a
              href="/"
              className="text-bp-navy/35 text-sm font-opensans hover:text-bp-navy/65 transition-colors underline self-start"
            >
              Conoce la firma completa →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 10 — PREGUNTAS FRECUENTES ───────────────────────────────────────
function FAQSection() {
  const [openIdx, setOpenIdx] = useState(null)

  const faqs = [
    {
      q: '¿Esto es una asesoría gratis más?',
      a: 'No. Es un diagnóstico profesional con metodología PMP® y un entregable real: un documento de 8 a 12 páginas sobre TU negocio, en 48 horas. Lo que no tiene es costo de entrada — porque preferimos que nos conozcas trabajando, no prometiendo.',
    },
    {
      q: '¿Qué recibo exactamente y en cuánto tiempo?',
      a: 'Tu Diagnóstico Estratégico de 8 a 12 páginas, máximo 48 horas después de tu sesión: análisis de tu modelo, viabilidad, riesgos, primer paso recomendado y tu ruta hacia el capital.',
    },
    {
      q: '¿Para qué debo llenar la Radiografía CAST™ antes?',
      a: 'Son 17 preguntas, 5 minutos. Con ellas llegamos a tu sesión conociendo tu proyecto y tus números — así las horas de sesión se invierten en analizar, no en preguntar lo básico. Tú ganas profundidad; nadie pierde tiempo.',
    },
    {
      q: '¿Sirve si todavía no tengo empresa constituida, solo la idea?',
      a: 'Sí. De hecho, ese es el mejor momento: validar ANTES de invertir tus ahorros. El diagnóstico te dice si tu idea aguanta la inversión y qué construir primero.',
    },
    {
      q: '¿Sirve si mi negocio es informal pero ya vende?',
      a: 'Sí — y probablemente ya sentiste el techo: sin registro no hay crédito, ni contratos con empresas grandes, ni Bancóldex. En el diagnóstico trazamos tu ruta de formalización como inversión, no como gasto.',
    },
    {
      q: '¿Esto es solo teoría?',
      a: 'No. La misma metodología estructuró proyectos reales en salud, agro y un proyecto minero de nueve cifras presentado ante inversionistas internacionales. En tu sesión trabajamos sobre tus números reales, no sobre plantillas.',
    },
    {
      q: '¿Me van a vender algo en la sesión?',
      a: 'Seremos directos: si tu proyecto califica para una siguiente etapa con CAST, te lo diremos con claridad y con propuesta formal. Pero el diagnóstico es tuyo, completo, decidas lo que decidas. Sin presión y sin letra menuda.',
    },
    {
      q: '¿Atienden solo en Barranquilla?',
      a: 'No. CAST ha atendido clientes en los 6 departamentos del Caribe y en Bogotá, presencial y remoto. La sesión funciona igual de bien por videollamada.',
    },
    {
      q: 'Tengo un proyecto grande con activos reales (minería, agro, energía, inmobiliario). ¿Esto me aplica?',
      a: 'Sí — para ese perfil existe la Blueprint Session Premium, un proceso de calificación especializado que incluye análisis de estructuración internacional y financiación alternativa. Márcalo en tu Radiografía y lo conversamos directamente.',
    },
  ]

  return (
    <section className="bg-bp-cream py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-montserrat font-bold text-bp-navy text-2xl md:text-3xl text-center mb-10">
          Preguntas frecuentes
        </h2>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-bp-navy/12">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-bp-cream transition-colors duration-200"
              >
                <span className="font-montserrat font-semibold text-bp-navy text-sm md:text-base">
                  {faq.q}
                </span>
                {openIdx === i ? (
                  <ChevronUp size={18} className="text-bp-gold flex-shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-bp-gold flex-shrink-0" />
                )}
              </button>
              {openIdx === i && (
                <div className="px-6 py-4 bg-white border-t border-bp-navy/8">
                  <p className="font-opensans text-bp-navy/70 text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 11 — RADIOGRAFÍA + CALENDARIO ───────────────────────────────────
function ConversionSection() {
  const whatsappMsg = encodeURIComponent('Hola Carlos, hice mi Radiografía CAST y quiero mi Blueprint Session')

  return (
    <section id="radiografia" className="bg-bp-navy py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-2xl">
          <h2 className="font-montserrat font-extrabold text-bp-navy text-2xl md:text-3xl text-center mb-2">
            Empieza aquí.
          </h2>
          <p className="font-opensans text-bp-navy/60 text-center text-base mb-10">
            5 minutos que pueden ahorrarte 5 años de errores.
          </p>

          {/* PASO 1 — Formulario */}
          <div className="mb-10">
            <p className="font-montserrat font-bold text-bp-navy text-lg mb-1">
              PASO 1: Completa tu Radiografía CAST™
            </p>
            <p className="font-opensans text-bp-navy/55 text-sm mb-4">
              17 preguntas sobre tu negocio, tus números y tu momento. 100% confidencial.
            </p>
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfEtWKn9413pbT-gsUods74VeF9FgHkVpG6f6FGCPsaO7t4VA/viewform?embedded=true"
              width="100%"
              height="620"
              frameBorder="0"
              marginHeight="0"
              marginWidth="0"
              className="rounded-xl border border-bp-navy/8 w-full"
              title="Radiografía CAST™"
              loading="lazy"
            >
              Cargando formulario…
            </iframe>
          </div>

          {/* PASO 2 — Calendario */}
          <div className="mb-8">
            <p className="font-montserrat font-bold text-bp-navy text-lg mb-1">
              PASO 2: Elige el día y la hora de tu Blueprint Session™
            </p>
            <p className="font-opensans text-bp-navy/55 text-sm mb-4">
              Al confirmar recibirás tu Guía CAST de Financiamiento Estratégico de regalo,
              junto con la confirmación de tu sesión.
            </p>
            <iframe
              src="https://cal.com/carlos-alberto-suarez-tous-3hbcmp/sesion-blueprints-cast?embed=true&layout=month_view&theme=light"
              width="100%"
              height="600"
              frameBorder="0"
              className="rounded-xl border border-bp-navy/8 w-full"
              title="Agenda tu Blueprint Session™ — CAST"
              loading="lazy"
            />
          </div>

          {/* WhatsApp */}
          <div className="text-center pt-2">
            <p className="font-opensans text-bp-navy/50 text-sm mb-3">
              ¿Prefieres hablar directamente?
            </p>
            <a
              href={`https://wa.me/573042113374?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-montserrat font-bold uppercase px-6 py-3 rounded-xl text-sm hover:bg-[#1dba5a] transition-colors duration-200 shadow-md"
            >
              <MessageCircle size={17} />
              ESCRÍBEME POR WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 12 — CIERRE + FOOTER MÍNIMO ─────────────────────────────────────
function CloseSection() {
  return (
    <section className="bg-bp-navy py-16 px-6 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-8">
        <h2 className="font-montserrat font-bold text-white text-2xl md:text-3xl leading-tight">
          Tu proyecto merece más que intuición. Merece estructura.
        </h2>
        <CTAButton />

        <div className="border-t border-white/10 pt-8 w-full">
          <p className="font-montserrat font-bold text-bp-gold text-base mb-2">
            CAST CONSULTORÍAS S.A.S. · De la Idea al Impacto Real®
          </p>
          <p className="font-opensans text-white/45 text-sm">
            Barranquilla, Colombia · Zúrich, Suiza · +57 304 211 3374 · carlos@castconsultorias.com
          </p>
          <p className="font-opensans text-white/25 text-xs mt-3">
            © 2026 CAST Consultorías S.A.S. Todos los derechos reservados.
          </p>
          <p className="font-merriweather italic text-white/35 text-sm mt-4">
            "No vendemos consultoría. Construimos el futuro."
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── PAGE ROOT ────────────────────────────────────────────────────────────────
export default function Blueprint() {
  return (
    <>
      {/* SEO meta — se inyectan en el head via prerender o react-helmet si se agrega */}
      <div className="font-opensans">
        <UrgencyBar />
        <HeroSection />
        <StatsSection />
        <ForWhoSection />
        <WhatYouGetSection />
        <MethodologySection />
        <HowItWorksSection />
        <TestimonialsSection />
        <BlueprintFounderSection />
        <FAQSection />
        <ConversionSection />
        <CloseSection />
      </div>
    </>
  )
}
