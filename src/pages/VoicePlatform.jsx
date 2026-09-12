import { MessageCircle, CheckCircle2, XCircle, ExternalLink } from 'lucide-react'

// ─── CONSTANTES ───────────────────────────────────────────────────────────────
const VITRINA_URL = 'https://app.castconsultorias.com/vitrina'
const WA_VOICE = 'https://wa.me/573246284189'

// ─── BOTONES ──────────────────────────────────────────────────────────────────
function VitrinaButton({ text = 'Conoce a los empleados y los planes →', className = '' }) {
  return (
    <a
      href={VITRINA_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 font-montserrat font-bold px-8 py-4 rounded-xl shadow-md transition-all duration-300 text-sm tracking-wide border-2 bg-bp-gold text-bp-navy border-transparent hover:bg-bp-navy hover:text-bp-gold hover:border-bp-gold ${className}`}
    >
      {text}
    </a>
  )
}

function WhatsAppButton({ text = 'Hablar por WhatsApp', dark = false, className = '' }) {
  const base = 'inline-flex items-center justify-center gap-2 font-montserrat font-bold px-8 py-4 rounded-xl shadow-md transition-all duration-300 text-sm tracking-wide border-2'
  const light = 'bg-transparent text-white border-white/25 hover:border-bp-gold hover:text-bp-gold'
  const darkV = 'bg-bp-navy text-bp-gold border-bp-navy hover:bg-bp-navy-deep'
  return (
    <a
      href={WA_VOICE}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${dark ? darkV : light} ${className}`}
    >
      <MessageCircle size={16} />
      {text}
    </a>
  )
}

// ─── SECCIÓN 1 — HERO ─────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="bg-bp-navy py-20 px-6 text-center flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-1">
        <img
          src="/sello-metodologia.png"
          alt="CAST Consultorías"
          className="h-12 w-auto object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <span className="font-montserrat font-extrabold text-bp-gold text-xl tracking-widest">
          CAST VOICE PLATFORM
        </span>
        <span className="font-opensans text-white/40 text-xs tracking-widest uppercase">
          CAST GRAVEDAD™ · Producto CAST
        </span>
      </div>

      <div className="max-w-3xl flex flex-col gap-5">
        <h1 className="font-montserrat font-extrabold text-white text-3xl md:text-5xl leading-tight">
          Empleados de IA que resuelven{' '}
          <span className="text-bp-gold">problemas reales</span> de tu negocio
        </h1>
        <p className="font-opensans text-white/65 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          No son minutos de llamada. No son chatbots. Son compañeros de trabajo que atienden por voz,
          WhatsApp, Instagram y Messenger las 24 horas, agendan en tu calendario real, consultan tu CRM
          y saben cuándo pasarle el caso a un humano.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <VitrinaButton />
        <WhatsAppButton />
      </div>
    </section>
  )
}

// ─── SECCIÓN 2 — EL PROBLEMA ─────────────────────────────────────────────────
function ProblemSection() {
  return (
    <section className="bg-bp-navy-deep py-20 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <p className="font-opensans text-white/70 text-base md:text-lg leading-relaxed">
          El cliente escribe a las 9 de la noche. Contestas al otro día a las 10 de la mañana.
          Para entonces ya le escribió a otros tres.
        </p>
        <p className="font-opensans text-white/70 text-base md:text-lg leading-relaxed">
          Y cuando alcanzas a contestar, empieza lo de siempre: te cuenta su caso, lo pasas a otra
          persona, tiene que contarlo de nuevo. La cotización que mandaste el martes nadie la volvió
          a tocar. El recado que dejaron para la doctora se quedó en un chat. El comprobante de pago
          está en la galería de un celular.
        </p>
        <div className="border-t border-bp-gold/20 pt-6 mt-2">
          <p className="font-montserrat font-bold text-white text-xl md:text-2xl leading-snug">
            No es que tu equipo trabaje mal.{' '}
            <span className="text-bp-gold">
              Es que un equipo humano no puede estar en cuatro canales, a toda hora, con la memoria
              completa de cada conversación.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 3 — QUÉ ES UN EMPLEADO DE IA ────────────────────────────────────
const QUE_ES = [
  {
    lead: 'Es un empleado, no una licencia.',
    body: 'No te entregamos un tablero para que lo configures solo. Un FDE+PMP de CAST se incrusta en tu operación, entiende dónde se te están cayendo los clientes y parametriza al empleado alrededor de esos dolores concretos.',
  },
  {
    lead: 'Razona sobre tu negocio, no sobre un guion.',
    body: 'Tú le enseñas qué hace tu empresa, qué servicios prestas y qué no puede prometer. Responde con eso, consulta tu CRM antes de hablar y, si necesita un dato que no tiene, lo investiga y te dice de dónde lo sacó.',
  },
  {
    lead: 'Sabe cuándo no le toca a él.',
    body: 'Deriva a la persona correcta, escala los comprobantes para que un humano los valide y avisa que la llamada se graba conforme a Habeas Data antes de pedir un solo dato.',
  },
]

const QUE_NO_ES = [
  'No es un chatbot de botones ni un árbol de opciones.',
  'No es un paquete de minutos.',
  'No es autoservicio: no te dejamos solo con una plataforma para que la armes tú.',
  'No compra ni contrata nada por su cuenta. Investiga y te trae la información; la decisión sigue siendo tuya.',
  'No reemplaza el criterio humano donde hace falta: un comprobante de pago lo valida una persona.',
  'No hace de asistente ejecutiva con clientes. Esa función es solo para las personas de tu equipo que tú autorices.',
]

function WhatIsSection() {
  return (
    <section className="bg-bp-navy py-20 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col items-center gap-3">
          <span className="text-bp-gold text-[11px] font-montserrat font-bold tracking-[0.35em] uppercase">
            QUÉ ES UN EMPLEADO DE IA
          </span>
        </div>

        <div className="flex flex-col gap-7">
          {QUE_ES.map((item) => (
            <div key={item.lead}>
              <p className="font-montserrat font-bold text-white text-lg leading-snug mb-2">{item.lead}</p>
              <p className="font-opensans text-white/60 text-sm md:text-base leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-7">
          <p className="font-montserrat font-bold text-white/70 text-xs tracking-widest uppercase mb-5">
            Qué NO es
          </p>
          <ul className="flex flex-col gap-3">
            {QUE_NO_ES.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <XCircle size={16} className="text-white/30 mt-0.5 shrink-0" />
                <span className="font-opensans text-white/55 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 4 — QUÉ HACE, EN CINCO FRENTES ──────────────────────────────────
const FRENTES = [
  {
    n: '01',
    title: 'Contesta y pone a cada quien donde va',
    items: [
      'Atiende por voz, WhatsApp, Instagram y Messenger, las 24 horas.',
      'Avisa que la llamada se graba conforme a Habeas Data antes de pedir cualquier dato.',
      'Identifica si el motivo es ventas, pagos o soporte y transfiere al compañero correcto sin hacer repetir la historia.',
      'Deriva a la persona concreta: quien pregunta por "la doctora" termina con la doctora; quien pide al gerente, con el gerente.',
      'Toma recados y se los hace llegar por WhatsApp a la persona a la que iban.',
    ],
  },
  {
    n: '02',
    title: 'Agenda de verdad y no suelta al cliente',
    items: [
      'Agenda reuniones en el calendario real del negocio, por WhatsApp: consulta la disponibilidad, ofrece las horas libres y crea el evento con invitación y videollamada.',
      'Agenda devoluciones de llamada reales: a la hora acordada, la llamada sale sola.',
      'Hace seguimiento automático de las cotizaciones a las 24 horas, a las 72 horas y al día 7.',
      'Manda un correo de seguimiento después de cada llamada.',
    ],
  },
  {
    n: '03',
    title: 'Habla con el contexto de tu negocio en la mano',
    items: [
      'Consulta el CRM antes de responder: cotización, estado de la negociación, datos reales del contacto.',
      'Sabe de tu negocio lo que tú le enseñes: en una pantalla escribes qué hace tu empresa, qué servicios prestas y qué no puede prometer, y responde con eso.',
      'Entiende notas de voz, fotos de comprobantes y archivos PDF. Y si le escriben con una nota de voz, contesta con una nota de voz, con la voz del empleado.',
      'Investiga en internet y trae la respuesta citando la fuente.',
    ],
  },
  {
    n: '04',
    title: 'Cobra, valida y deja la venta registrada',
    items: [
      'Manda el enlace de pago dentro de la misma conversación.',
      'Escala los comprobantes para validación humana; no da por pagado lo que no está confirmado.',
      'Califica cada llamada con la metodología IVC CAST y crea el Lead en el tablero.',
    ],
  },
  {
    n: '05',
    title: 'También trabaja para tu equipo, no solo para tus clientes',
    items: [
      'Con las personas que tú autorices, el empleado de IA funciona como asistente ejecutiva: consulta si hay espacio en la agenda, reserva bloques de trabajo y deja recordatorios.',
      'Nunca hace esto con un cliente.',
    ],
  },
]

function FrentesSection() {
  return (
    <section className="bg-bp-navy-deep py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-bp-gold text-[11px] font-montserrat font-bold tracking-[0.35em] uppercase">
            QUÉ HACE, EN CINCO FRENTES
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FRENTES.map((f) => (
            <div
              key={f.n}
              className={`rounded-2xl border border-white/10 bg-white/5 p-7 flex flex-col gap-4 hover:border-bp-gold/30 transition-colors duration-300 ${
                f.n === '05' ? 'md:col-span-2 md:max-w-2xl md:mx-auto' : ''
              }`}
            >
              <span className="font-montserrat font-extrabold text-bp-gold text-3xl leading-none">{f.n}</span>
              <h3 className="font-montserrat font-bold text-white text-base leading-snug">{f.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {f.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-bp-gold mt-0.5 shrink-0" />
                    <span className="font-opensans text-white/55 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 5 — CÓMO SE IMPLEMENTA ──────────────────────────────────────────
const IMPLEMENTACION = [
  {
    n: '1',
    title: 'Entramos a tu operación.',
    body: 'Un FDE+PMP de CAST levanta los dolores concretos: por dónde entran tus clientes, dónde se caen, qué preguntas se repiten, quién debería recibir cada caso.',
  },
  {
    n: '2',
    title: 'Parametrizamos al empleado alrededor de esos dolores.',
    body: 'No se activa una plantilla: se define qué hace, qué no puede prometer, a quién deriva cada tipo de caso y con qué reglas cobra o escala.',
  },
  {
    n: '3',
    title: 'Conectamos lo que ya usas.',
    body: 'Tus canales de WhatsApp, Instagram y Messenger, el calendario del negocio y tu CRM. No te pedimos cambiar de herramientas ni de número.',
  },
  {
    n: '4',
    title: 'Le enseñas tu negocio.',
    body: 'Tú escribes en pantalla qué hace tu empresa, qué servicios prestas y qué no puede prometer. Eso queda en tus manos: cuando cambie tu portafolio, lo actualizas.',
  },
  {
    n: '5',
    title: 'Queda operando y medido.',
    body: 'Cada llamada calificada con IVC CAST y cada Lead en el tablero, para que veas qué está entrando y qué se está cayendo.',
  },
]

function ImplementacionSection() {
  return (
    <section className="bg-bp-navy py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-bp-gold text-[11px] font-montserrat font-bold tracking-[0.35em] uppercase">
            CÓMO SE IMPLEMENTA
          </span>
        </div>
        <ol className="flex flex-col gap-8">
          {IMPLEMENTACION.map((step) => (
            <li key={step.n} className="flex items-start gap-5">
              <span className="font-montserrat font-extrabold text-bp-gold text-2xl leading-none shrink-0 w-8">
                {step.n}
              </span>
              <div>
                <p className="font-montserrat font-bold text-white text-base leading-snug mb-1.5">{step.title}</p>
                <p className="font-opensans text-white/60 text-sm md:text-base leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

// ─── SECCIÓN 6 — PLANES ───────────────────────────────────────────────────────
const PLANES = [
  { label: 'Precio', starter: 'USD 299/mes', pro: 'USD 799/mes', ent: 'USD 1.799/mes' },
  { label: 'Empleados de IA', starter: '1', pro: '3', ent: '7' },
  { label: 'Minutos de voz', starter: '500', pro: '1.500', ent: '3.500' },
  { label: 'Contactos', starter: '3.000', pro: '10.000', ent: '30.000' },
  { label: 'Canales', starter: '2', pro: '4', ent: '8' },
  { label: 'Usuarios', starter: '3', pro: '10', ent: 'Ilimitados' },
  { label: 'SLA y API', starter: '—', pro: '—', ent: 'Incluidos' },
]

const ADICIONALES = [
  'Empleado de IA adicional: desde USD 249/mes.',
  'Empleado especializado: USD 399/mes.',
  'Daniela Ospina — contabilidad y finanzas: USD 499/mes. Requiere un contador humano que no está incluido en ese precio.',
]

const MINUTOS_TABLE = [
  { label: 'Minuto adicional', co: 'USD 0,69', us: 'USD 0,45' },
  { label: 'Bloque de 500 minutos', co: 'USD 305', us: 'USD 199' },
]

function PlanesSection() {
  return (
    <section className="bg-bp-navy-deep py-20 px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-14">
        <div className="text-center">
          <span className="text-bp-gold text-[11px] font-montserrat font-bold tracking-[0.35em] uppercase">
            PLANES
          </span>
          <p className="font-opensans text-white/45 text-sm mt-3">
            Precios en dólares por mes. El plan anual equivale a 10 meses.
          </p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm font-opensans min-w-[560px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="text-left px-4 py-4 text-white/40 font-montserrat font-bold text-xs uppercase tracking-wide">—</th>
                <th className="text-left px-4 py-4 text-white font-montserrat font-bold text-xs uppercase tracking-wide">Starter</th>
                <th className="text-left px-4 py-4 text-bp-gold font-montserrat font-bold text-xs uppercase tracking-wide">Professional</th>
                <th className="text-left px-4 py-4 text-white font-montserrat font-bold text-xs uppercase tracking-wide">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {PLANES.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                  <td className="px-4 py-3 text-white/50 font-montserrat font-semibold">{row.label}</td>
                  <td className="px-4 py-3 text-white/75">{row.starter}</td>
                  <td className="px-4 py-3 text-white/90 font-semibold">{row.pro}</td>
                  <td className="px-4 py-3 text-white/75">{row.ent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="font-montserrat font-bold text-white text-sm uppercase tracking-wide mb-4">
              Empleados adicionales
            </p>
            <ul className="flex flex-col gap-3">
              {ADICIONALES.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-bp-gold mt-0.5 shrink-0" />
                  <span className="font-opensans text-white/55 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-montserrat font-bold text-white text-sm uppercase tracking-wide mb-4">
              Si se acaban los minutos
            </p>
            <p className="font-opensans text-white/55 text-sm leading-relaxed mb-5">
              No se corta la atención por chat: WhatsApp, Instagram y Messenger no consumen minutos.
              Los minutos son de voz, y se amplían cuando los necesites.
            </p>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-sm font-opensans">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.04]">
                    <th className="text-left px-4 py-3 text-white/40 font-montserrat font-bold text-xs uppercase tracking-wide">—</th>
                    <th className="text-left px-4 py-3 text-bp-gold font-montserrat font-bold text-xs uppercase tracking-wide">Colombia</th>
                    <th className="text-left px-4 py-3 text-bp-gold font-montserrat font-bold text-xs uppercase tracking-wide">Estados Unidos</th>
                  </tr>
                </thead>
                <tbody>
                  {MINUTOS_TABLE.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                      <td className="px-4 py-3 text-white/60">{row.label}</td>
                      <td className="px-4 py-3 text-white/80">{row.co}</td>
                      <td className="px-4 py-3 text-white/80">{row.us}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── SECCIÓN 7 — CTA FINAL ────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section id="vitrina-cta" className="bg-bp-gold py-20 px-6 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        <h2 className="font-montserrat font-extrabold text-bp-navy text-2xl md:text-3xl leading-snug">
          Mira a los empleados antes de decidir
        </h2>
        <p className="font-opensans text-bp-navy/70 text-base leading-relaxed">
          Entra a la vitrina, abre cada empleado y lee todo lo que hace. Si te cuadra, nos escribes por
          WhatsApp y hablamos de tu operación.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href={VITRINA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 font-montserrat font-bold px-8 py-4 rounded-xl shadow-md transition-all duration-300 text-sm tracking-wide border-2 bg-bp-navy text-bp-gold border-bp-navy hover:bg-bp-navy-deep"
          >
            <ExternalLink size={16} />
            Conoce a los empleados y los planes
          </a>
          <a
            href={WA_VOICE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-bp-navy/70 hover:text-bp-navy text-sm font-montserrat font-semibold transition-colors"
          >
            <MessageCircle size={15} />
            Hablar con CAST por WhatsApp — +57 324 628 4189
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function VoicePlatformFooter() {
  return (
    <footer className="bg-bp-navy-deep py-8 px-6 text-center border-t border-white/5">
      <p className="font-opensans text-white/25 text-xs leading-relaxed">
        CAST Voice Platform — CAST GRAVEDAD™ · Producto de CAST Consultorías S.A.S. · Barranquilla — Colombia
        <br />
        <a href="/" className="hover:text-white/50 transition-colors mt-1 inline-block">
          ← Volver a CAST Consultorías
        </a>
      </p>
    </footer>
  )
}

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function VoicePlatform() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <WhatIsSection />
      <FrentesSection />
      <ImplementacionSection />
      <PlanesSection />
      <FinalCTASection />
      <VoicePlatformFooter />
    </div>
  )
}
