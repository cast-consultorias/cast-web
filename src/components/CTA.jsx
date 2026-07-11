import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Send, Lock, ChevronDown, CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL

// ─── SCORING CLIENTE (espejo del backend) ────────────────────────────────────
const SCORE_PERFIL = {
  'Inversor o socio estratégico':    25,
  'Empresa buscando escalar':        22,
  'Busco automatización con IA':     19,
  'Empresa sin estructura sólida':   17,
  'Emprendedor con idea':            11,
}
const SCORE_URGENCIA = {
  'Inmediatamente':          8,
  'En los próximos 30 días': 6,
  'En 1 a 3 meses':          3,
  'Solo explorando':         0,
}
const SCORE_PAIS = {
  'Suiza':10,'Alemania':10,'Estados Unidos':10,'Francia':9,'Reino Unido':9,
  'España':9,'Colombia':9,'México':8,'Chile':8,'Argentina':8,
  'Perú':7,'Ecuador':7,'Costa Rica':7,'Panamá':7,'Uruguay':7,
  'Venezuela':5,'Bolivia':5,'Honduras':5,'Otro':5,
}
const KW_DOLOR      = ['problema','desafío','necesito','urgente','no puedo','bloqueado','estancado','crisis','riesgo','pérdida']
const KW_VIABILIDAD = ['empresa','clientes','facturación','ingresos','ya tenemos','constituida','operamos','mercado','producto','equipo']
const KW_RUTA       = ['financiamiento','capital','inversión','estructurar','escalar','automatizar','exportar','certificar','expandir','plan']
const KW_NEGATIVOS  = ['no tengo dinero','sin capital','solo curiosidad','no sé si','quizás','tal vez']

function calcularScoreLocal({ perfil, urgencia, pais, proyecto, whatsapp }) {
  const texto = (proyecto || '').toLowerCase()

  const dPerfil = SCORE_PERFIL[perfil] || 10

  const dUrgencia = SCORE_URGENCIA[urgencia] || 0
  let dDolorKw = 0
  KW_DOLOR.forEach(k => { if (texto.includes(k)) dDolorKw += 3 })
  dDolorKw = Math.min(dDolorKw, 12)
  const dLong = texto.length > 400 ? 5 : texto.length > 200 ? 4 : texto.length > 100 ? 2 : 1
  const dDolor = Math.min(25, dUrgencia + dDolorKw + dLong)

  let dViabKw = 0
  KW_VIABILIDAD.forEach(k => { if (texto.includes(k)) dViabKw += 3 })
  dViabKw = Math.min(dViabKw, 15)
  const dViab = Math.min(25, dViabKw + (SCORE_PAIS[pais] || 5))

  let dRutaKw = 0
  KW_RUTA.forEach(k => { if (texto.includes(k)) dRutaKw += 3 })
  dRutaKw = Math.min(dRutaKw, 12)
  const dContacto = (whatsapp && whatsapp.length > 5) ? 8 : 2
  const dRuta = Math.min(25, dRutaKw + dContacto)

  let pen = 0
  KW_NEGATIVOS.forEach(k => { if (texto.includes(k)) pen += 4 })

  const total = Math.max(0, Math.min(100, dPerfil + dDolor + dViab + dRuta - pen))
  const grade = total >= 88 ? 'A' : total >= 66 ? 'B' : total >= 44 ? 'C' : 'D'
  return { total, grade, dims: { perfil: dPerfil, dolor: dDolor, viabilidad: dViab, ruta: dRuta } }
}

// ─── MENSAJES DE ÉXITO PERSONALIZADOS POR GRADO ──────────────────────────────
const SUCCESS_MESSAGES = {
  A: {
    title: '¡Tu perfil es excepcional!',
    body: 'Nuestro equipo senior está revisando tu proyecto ahora mismo. Te contactaremos en las próximas 2 horas para agendar tu sesión.',
    time: '2 horas',
    color: 'text-red-400',
  },
  B: {
    title: 'Solicitud recibida con prioridad',
    body: 'Tu proyecto tiene alto potencial. Te contactaremos dentro de las próximas 24 horas para agendar tu CAST Blueprint Session™.',
    time: '24 horas',
    color: 'text-cast-gold',
  },
  C: {
    title: '¡Solicitud recibida!',
    body: 'Estamos analizando tu caso. Recibirás noticias nuestras dentro de las próximas 72 horas con los próximos pasos.',
    time: '72 horas',
    color: 'text-sky-400',
  },
  D: {
    title: 'Gracias por escribirnos',
    body: 'Hemos recibido tu solicitud. Cuando tu proyecto esté listo para avanzar, estaremos aquí para acompañarte.',
    time: 'próximos días',
    color: 'text-white/60',
  },
}

const PERFILES = [
  'Emprendedor con idea',
  'Empresa sin estructura sólida',
  'Empresa buscando escalar',
  'Busco automatización con IA',
  'Inversor o socio estratégico',
]

const URGENCIAS = [
  'Inmediatamente',
  'En los próximos 30 días',
  'En 1 a 3 meses',
  'Solo explorando',
]

const PAISES = [
  'Colombia','México','Argentina','Chile','Perú','Ecuador','Venezuela',
  'Bolivia','Costa Rica','Panamá','Uruguay','Honduras',
  'España','Estados Unidos','Suiza','Alemania','Francia','Reino Unido','Otro',
]

// ─── INDICADOR DE PROGRESO DE EVALUACIÓN ─────────────────────────────────────
function ScoreIndicator({ score, dims }) {
  if (!score) return null
  const dimLabels = [
    { key: 'perfil',     label: '① Perfil' },
    { key: 'dolor',      label: '② Dolor' },
    { key: 'viabilidad', label: '③ Viabilidad' },
    { key: 'ruta',       label: '④ Ruta' },
  ]
  return (
    <div className="mt-4 p-4 rounded-2xl bg-white/3 border border-white/8">
      <p className="text-white/35 text-[10px] font-semibold tracking-widest uppercase mb-3">
        Evaluación en tiempo real
      </p>
      <div className="flex flex-col gap-2">
        {dimLabels.map(({ key, label }) => {
          const pts = dims[key] || 0
          const pct = Math.round((pts / 25) * 100)
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="text-white/30 text-[10px] w-24 flex-shrink-0">{label}</span>
              <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cast-gold/60 to-cast-gold transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="text-white/25 text-[10px] w-8 text-right">{pts}/25</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function CTA() {
  const sectionRef = useRef(null)
  const meshRef    = useRef(null)
  const formRef    = useRef(null)

  const [fields, setFields] = useState({
    nombre: '', email: '', whatsapp: '', pais: '', perfil: '', urgencia: '', proyecto: '',
  })
  const [scoreInfo, setScoreInfo] = useState(null)
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [resultGrade, setResultGrade] = useState('B')

  // Recalcular score cada vez que cambian los campos relevantes
  useEffect(() => {
    const { perfil, urgencia, pais, proyecto, whatsapp } = fields
    if (perfil || proyecto.length > 20) {
      const s = calcularScoreLocal({ perfil, urgencia, pais, proyecto, whatsapp })
      setScoreInfo(s)
    }
  }, [fields.perfil, fields.urgencia, fields.pais, fields.proyecto, fields.whatsapp])

  useEffect(() => {
    gsap.to(meshRef.current, {
      backgroundPosition: '100% 100%',
      duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%', once: true,
      onEnter: () => {
        gsap.fromTo(formRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
        )
      },
    })
  }, [])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const scoreLocal = calcularScoreLocal(fields)
    setResultGrade(scoreLocal.grade)

    try {
      // Intentar POST al Apps Script
      if (APPS_SCRIPT_URL) {
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        })
      }
      setStatus('success')
    } catch {
      // Si falla la conexión igual mostramos éxito (no-cors no permite leer respuesta)
      setStatus('success')
    }
  }

  const msg = SUCCESS_MESSAGES[resultGrade]

  return (
    <section ref={sectionRef} id="contacto" className="relative py-24 overflow-hidden">
      <div
        ref={meshRef}
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(201,168,76,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 30%, rgba(201,168,76,0.07) 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 50% 100%, rgba(10,10,15,1) 40%, transparent 100%)
          `,
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
          backgroundColor: '#0A0A0F',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-cast-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            <span className="w-6 h-px bg-cast-gold" />
            CAST Blueprint Session™
            <span className="w-6 h-px bg-cast-gold" />
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
            Convierte tu visión en un proyecto<br />
            <span className="text-gradient-gold">que el mundo puede financiar</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-base">
            Blueprint Session™ gratuita. Sin compromiso. Sin spam.
          </p>
        </div>

        <div ref={formRef} className="opacity-0">
          {status === 'success' ? (
            <div className="glass rounded-3xl p-12 text-center border border-cast-gold/20 glow-gold">
              <div className="w-16 h-16 rounded-full bg-cast-gold/15 border border-cast-gold/30 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-cast-gold" />
              </div>
              <h3 className={`font-display font-bold text-2xl mb-3 ${msg.color}`}>{msg.title}</h3>
              <p className="text-white/50 text-sm mb-5 max-w-md mx-auto leading-relaxed">{msg.body}</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-cast-gold animate-pulse" />
                <span className="text-white/50 text-xs">Respuesta estimada: {msg.time}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 md:p-10 border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Nombre */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/40 text-xs font-medium tracking-wide uppercase">Nombre</label>
                  <input required name="nombre" value={fields.nombre} onChange={handleChange}
                    placeholder="Tu nombre completo"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cast-gold/40 transition-colors" />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/40 text-xs font-medium tracking-wide uppercase">Email</label>
                  <input required type="email" name="email" value={fields.email} onChange={handleChange}
                    placeholder="correo@empresa.com"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cast-gold/40 transition-colors" />
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/40 text-xs font-medium tracking-wide uppercase">WhatsApp</label>
                  <input name="whatsapp" value={fields.whatsapp} onChange={handleChange}
                    placeholder="+57 300 000 0000"
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cast-gold/40 transition-colors" />
                </div>

                {/* País */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/40 text-xs font-medium tracking-wide uppercase">País</label>
                  <div className="relative">
                    <select name="pais" value={fields.pais} onChange={handleChange}
                      className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cast-gold/40 transition-colors text-white/70">
                      <option value="" className="bg-cast-dark">Selecciona tu país</option>
                      {PAISES.map(p => <option key={p} value={p} className="bg-cast-dark">{p}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  </div>
                </div>

                {/* Perfil */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/40 text-xs font-medium tracking-wide uppercase">Perfil</label>
                  <div className="relative">
                    <select required name="perfil" value={fields.perfil} onChange={handleChange}
                      className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cast-gold/40 transition-colors text-white/70">
                      <option value="" className="bg-cast-dark">¿Quién eres?</option>
                      {PERFILES.map(p => <option key={p} value={p} className="bg-cast-dark">{p}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  </div>
                </div>

                {/* Urgencia */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-white/40 text-xs font-medium tracking-wide uppercase">¿Cuándo quieres iniciar?</label>
                  <div className="relative">
                    <select required name="urgencia" value={fields.urgencia} onChange={handleChange}
                      className="w-full appearance-none bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cast-gold/40 transition-colors text-white/70">
                      <option value="" className="bg-cast-dark">Selecciona una opción</option>
                      {URGENCIAS.map(u => <option key={u} value={u} className="bg-cast-dark">{u}</option>)}
                    </select>
                    <ChevronDown size={13} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" />
                  </div>
                </div>

                {/* Descripción */}
                <div className="flex flex-col gap-1.5 md:col-span-2">
                  <label className="text-white/40 text-xs font-medium tracking-wide uppercase">
                    Describe tu proyecto o desafío
                  </label>
                  <textarea required rows={4} name="proyecto" value={fields.proyecto} onChange={handleChange}
                    placeholder="¿Qué quieres lograr? ¿Cuál es tu principal desafío hoy? Cuéntanos con detalle — entre más contexto, mejor podemos evaluarte..."
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-cast-gold/40 transition-colors resize-none leading-relaxed" />
                  <p className="text-white/20 text-[10px] text-right">{fields.proyecto.length} caracteres</p>
                </div>

              </div>

              {/* Indicador de evaluación en tiempo real */}
              {scoreInfo && (
                <ScoreIndicator score={scoreInfo.total} dims={scoreInfo.dims} />
              )}

              <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-cast-gold text-cast-dark font-semibold text-sm hover:bg-cast-gold-light transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cast-gold/25 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-cast-dark/40 border-t-cast-dark animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Solicitar Blueprint Session™
                    </>
                  )}
                </button>
                <div className="flex items-center gap-1.5 text-white/25 text-xs flex-shrink-0">
                  <Lock size={11} />
                  100% confidencial
                </div>
              </div>
            </form>
          )}

          {/* WhatsApp */}
          <div className="mt-6 text-center">
            <p className="text-white/30 text-xs mb-4">¿Prefieres hablar directamente?</p>
            <a
              href="https://wa.me/573042113374?text=Hola+Carlos%2C+quiero+agendar+mi+Blueprint+Session%E2%84%A2"
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-emerald-500 text-white font-semibold text-sm hover:bg-emerald-400 transition-all duration-300 hover:scale-105"
            >
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-pulse-ring" />
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-pulse-ring" style={{ animationDelay: '0.6s' }} />
              <MessageCircle size={17} />
              Hablar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
