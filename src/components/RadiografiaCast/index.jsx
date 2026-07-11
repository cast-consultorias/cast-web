import { useState, useRef } from 'react'
import { Check } from 'lucide-react'
import {
  QUESTIONS,
  calculateScore,
  getLevel,
  getBuyerPersona,
  getBanderaBP05,
  buildRespuestasText,
} from './questions'
import { supabase } from '../../lib/supabase'

// ─── SUBMIT CON REINTENTO ────────────────────────────────────────────────────
async function submitWithRetry(payload) {
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const { error } = await supabase.from('leads_radiografia').insert([payload])
      if (error) throw error

      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL
      if (webhookUrl) {
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...payload,
            ...(payload.bandera_bp05 ? { prioridad: 'BP05_ALERTA' } : {}),
          }),
        }).catch(() => {})
      }

      return true
    } catch {
      if (attempt === 0) await new Promise(r => setTimeout(r, 1500))
    }
  }
  return false
}

// ─── HELPERS DE UI ────────────────────────────────────────────────────────────
function ProgressBar({ current, total }) {
  return (
    <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
      <div
        className="h-full bg-bp-gold transition-all duration-500 ease-out rounded-full"
        style={{ width: `${Math.round((current / total) * 100)}%` }}
      />
    </div>
  )
}

function QuestionLabel({ number }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-px bg-bp-gold" />
      <span className="font-merriweather italic text-bp-gold text-sm">
        Pregunta {String(number).padStart(2, '0')}
      </span>
    </div>
  )
}

// Renderiza *palabra* como Merriweather italic dorado
function QuestionText({ text }) {
  const parts = text.split(/\*([^*]+)\*/)
  return (
    <h2 className="font-montserrat font-bold text-white text-xl md:text-2xl leading-snug">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-merriweather italic text-bp-gold">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </h2>
  )
}

function OptionCard({ optId, text, selected, multi, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left',
        'transition-all duration-200',
        selected
          ? 'border-2 border-bp-gold bg-[rgba(201,164,82,0.08)] shadow-[0_0_10px_rgba(201,164,82,0.12)]'
          : 'border border-white/12 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]',
      ].join(' ')}
    >
      <span className={`text-xs font-montserrat font-semibold tabular-nums shrink-0 w-6 text-left ${selected ? 'text-bp-gold' : 'text-white/30'}`}>
        {optId}
      </span>
      <span className="flex-1 font-opensans text-sm text-white leading-snug">{text}</span>
      <span className={[
        'shrink-0 w-5 h-5 border-2 flex items-center justify-center transition-all duration-200',
        multi ? 'rounded' : 'rounded-full',
        selected ? 'border-bp-gold bg-bp-gold' : 'border-white/25 bg-transparent',
      ].join(' ')}>
        {selected && <Check size={10} className="text-bp-navy" strokeWidth={3} />}
      </span>
    </button>
  )
}

function WizardFooter({ onBack, onNext, canNext, loading, isLast, showBack }) {
  return (
    <div className="flex flex-col gap-3 mt-8">
      <div className="flex items-center justify-between gap-4">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-white/40 hover:text-white/70 font-opensans text-sm transition-colors"
          >
            ← ATRÁS
          </button>
        ) : (
          <span />
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext || loading}
          className={[
            'font-montserrat font-bold text-sm px-7 py-3 rounded-xl border-2 transition-all duration-200',
            canNext && !loading
              ? 'border-bp-gold text-bp-gold hover:bg-bp-gold hover:text-bp-navy cursor-pointer'
              : 'border-white/15 text-white/20 cursor-not-allowed',
          ].join(' ')}
        >
          {loading ? 'ENVIANDO…' : isLast ? 'VER MI RESULTADO →' : 'SIGUIENTE →'}
        </button>
      </div>
      <p className="text-center font-opensans text-white/20 text-[11px] tracking-[0.25em] uppercase">
        Confidencial
      </p>
    </div>
  )
}

// ─── PORTADA ─────────────────────────────────────────────────────────────────
function Portada({ onStart, initialData }) {
  const [form, setForm] = useState(
    initialData ?? { nombre: '', profesion: '', email: '', whatsapp: '+57 ' }
  )
  const [errors, setErrors] = useState({})

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Campo requerido'
    if (!form.profesion.trim()) e.profesion = 'Campo requerido'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email inválido'
    if (form.whatsapp.replace(/\D/g, '').length < 7) e.whatsapp = 'Número inválido'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onStart(form)
  }

  const inputCls = 'w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-white font-opensans text-sm placeholder:text-white/25 focus:outline-none focus:border-bp-gold transition-colors duration-200'

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3 text-center">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-px bg-bp-gold" />
          <span className="font-merriweather italic text-bp-gold text-sm">CAST Consultorías S.A.S.</span>
          <div className="w-8 h-px bg-bp-gold" />
        </div>
        <h1 className="font-montserrat font-extrabold text-white text-3xl md:text-4xl">
          La Radiografía CAST™
        </h1>
        <p className="font-montserrat font-bold text-bp-gold text-base md:text-lg leading-snug">
          🚀 ¿Estás listo para transformar tu idea o negocio en un proyecto de alto impacto?
        </p>
        <p className="font-opensans text-white/60 text-sm leading-relaxed max-w-lg mx-auto">
          Solicita tu sesión estratégica gratuita con CAST CONSULTORÍAS S.A.S. — cupos limitados.
          A través de este diagnóstico inicial, evaluaremos el potencial real de tu idea o negocio.{' '}
          <span className="text-bp-gold">🔒 Confidencialidad garantizada.</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        {[
          { key: 'nombre', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre completo' },
          { key: 'profesion', label: 'Profesión', type: 'text', placeholder: 'Ej: Médico, Empresario, Ingeniero…' },
          { key: 'email', label: 'E-mail', type: 'email', placeholder: 'tu@email.com' },
          { key: 'whatsapp', label: 'WhatsApp', type: 'tel', placeholder: '+57 300 000 0000' },
        ].map(({ key, label, type, placeholder }) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label htmlFor={`rc-${key}`} className="font-montserrat font-semibold text-white/70 text-xs uppercase tracking-wider">
              {label}
            </label>
            <input
              id={`rc-${key}`}
              type={type}
              value={form[key]}
              onChange={set(key)}
              placeholder={placeholder}
              autoComplete={key === 'email' ? 'email' : key === 'whatsapp' ? 'tel' : 'off'}
              className={inputCls}
            />
            {errors[key] && <p className="text-red-400 text-xs font-opensans">{errors[key]}</p>}
          </div>
        ))}
        <button
          type="submit"
          className="mt-2 w-full bg-bp-gold text-bp-navy font-montserrat font-extrabold uppercase tracking-wider py-4 rounded-xl hover:bg-bp-gold/90 transition-colors duration-200 text-sm shadow-lg shadow-bp-gold/20"
        >
          INICIAR MI RADIOGRAFÍA →
        </button>
        <p className="text-center font-opensans text-white/20 text-[11px] tracking-[0.25em] uppercase">
          Confidencial · Tus datos están seguros
        </p>
      </form>
    </div>
  )
}

// ─── PANTALLA DE PREGUNTA ─────────────────────────────────────────────────────
function QuestionScreen({ question, qIndex, total, respuestas, onAnswer, onBack, onNext, loading }) {
  const [transitioning, setTransitioning] = useState(false)
  const current = respuestas[question.id]
  const isMulti = question.type === 'multi'
  const isTextarea = question.type === 'textarea'
  const multiSelected = isMulti && Array.isArray(current) ? current : []
  const condDetail = respuestas[`${question.id}_detail`] ?? ''
  const showCondField = !!question.conditional && current === question.conditional.show_field_on

  const canNext = isTextarea
    ? (current ?? '').trim().length >= (question.minLength ?? 0)
    : isMulti
    ? multiSelected.length > 0
    : !!current

  const handleSingleClick = (optId) => {
    if (transitioning) return
    onAnswer(question.id, optId)
    const shouldAdvance = !question.conditional || optId !== question.conditional.show_field_on
    if (shouldAdvance) {
      setTransitioning(true)
      setTimeout(() => onNext(), 400)
    }
  }

  const handleMultiToggle = (optId) => {
    const next = multiSelected.includes(optId)
      ? multiSelected.filter(x => x !== optId)
      : [...multiSelected, optId]
    onAnswer(question.id, next)
  }

  const handleCondDetail = (e) => {
    let val = e.target.value
    if (question.conditional?.field_type === 'number') {
      val = val.replace(/[^\d]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    }
    onAnswer(`${question.id}_detail`, val)
  }

  return (
    <div className="flex flex-col gap-6">
      <QuestionLabel number={qIndex} />
      <QuestionText text={question.text} />

      {!isTextarea && (
        <div className="flex flex-col gap-2.5">
          {question.options.map(opt => {
            const sel = isMulti ? multiSelected.includes(opt.id) : current === opt.id
            return (
              <OptionCard
                key={opt.id}
                optId={opt.id}
                text={opt.text}
                selected={sel}
                multi={isMulti}
                onClick={() => isMulti ? handleMultiToggle(opt.id) : handleSingleClick(opt.id)}
              />
            )
          })}
        </div>
      )}

      {showCondField && (
        <div className="flex flex-col gap-1.5">
          <label className="font-montserrat font-semibold text-white/70 text-xs uppercase tracking-wider">
            {question.conditional.field_label}
          </label>
          <input
            type="text"
            inputMode={question.conditional.field_type === 'number' ? 'numeric' : 'text'}
            value={condDetail}
            onChange={handleCondDetail}
            placeholder={question.conditional.field_type === 'number' ? '0' : 'Especifica…'}
            className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-white font-opensans text-sm placeholder:text-white/25 focus:outline-none focus:border-bp-gold transition-colors duration-200"
          />
        </div>
      )}

      {isTextarea && (
        <div className="flex flex-col gap-1.5">
          <textarea
            rows={5}
            value={current ?? ''}
            onChange={e => onAnswer(question.id, e.target.value)}
            placeholder="Cuéntanos sobre tu idea o proyecto…"
            aria-label="Descripción de tu idea de negocio"
            className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 text-white font-opensans text-sm placeholder:text-white/25 focus:outline-none focus:border-bp-gold transition-colors duration-200 resize-none"
          />
          <p className={`text-xs font-opensans text-right ${(current ?? '').length >= question.minLength ? 'text-bp-gold' : 'text-white/30'}`}>
            {(current ?? '').length} / {question.minLength} mín.
          </p>
        </div>
      )}

      <WizardFooter
        onBack={onBack}
        onNext={onNext}
        canNext={canNext}
        loading={loading}
        isLast={qIndex === total}
        showBack={true}
      />
    </div>
  )
}

// ─── PANTALLA FINAL ────────────────────────────────────────────────────────────
function FinalScreen({ nombre, email, nivel, banderaBP05, retryError, onRetry }) {
  const isHighTier = nivel === 'A' || nivel === 'B' || banderaBP05
  const firstName = nombre.trim().split(' ')[0]

  const calParams = new URLSearchParams({
    embed: 'true',
    layout: 'month_view',
    theme: 'dark',
    name: nombre,
    email,
  })
  const calSrc = `https://cal.com/carlos-alberto-suarez-tous-3hbcmp/blueprint-session-cast?${calParams.toString()}`

  return (
    <div className="flex flex-col gap-8">
      {isHighTier ? (
        <>
          <div className="text-center flex flex-col gap-3">
            <span className="text-4xl" role="img" aria-label="check">✅</span>
            <h2 className="font-montserrat font-bold text-white text-xl md:text-2xl leading-snug">
              {firstName}, tu Radiografía está completa.
            </h2>
            <p className="font-opensans text-white/70 text-base leading-relaxed">
              Tu perfil califica para la{' '}
              <strong className="text-bp-gold">Blueprint Session™</strong>.
              Elige tu horario —{' '}
              <strong className="text-bp-gold">8 sesiones disponibles por mes</strong>.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-bp-gold/20">
            <iframe
              src={calSrc}
              width="100%"
              height="580"
              frameBorder="0"
              title="Agenda tu Blueprint Session™ — CAST"
              loading="lazy"
              className="w-full"
            />
          </div>
        </>
      ) : (
        <>
          <div className="text-center flex flex-col gap-3">
            <span className="text-4xl" role="img" aria-label="check">✅</span>
            <h2 className="font-montserrat font-bold text-white text-xl md:text-2xl leading-snug">
              Gracias por completar tu Radiografía CAST™, {firstName}.
            </h2>
            <p className="font-opensans text-white/70 text-base leading-relaxed max-w-md mx-auto">
              Nuestro equipo de especialistas{' '}
              <strong className="text-bp-gold">PMP®</strong> evaluará tu perfil
              y en las próximas{' '}
              <strong className="text-bp-gold">24 horas</strong> serás contactado
              por un Agente de CAST Consultorías para brindarte más información.
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="/"
              className="font-montserrat font-semibold text-bp-gold border border-bp-gold/40 px-6 py-3 rounded-xl hover:bg-bp-gold/10 transition-colors text-sm"
            >
              Conocer CAST Consultorías →
            </a>
          </div>
        </>
      )}

      {retryError && (
        <div className="bg-red-500/10 border border-red-400/30 rounded-xl p-4 flex flex-col items-center gap-2">
          <p className="font-opensans text-red-300 text-sm text-center">
            Hubo un error al enviar tus datos. Tus respuestas están guardadas localmente.
          </p>
          <button
            onClick={onRetry}
            className="font-montserrat font-bold text-sm text-bp-gold border border-bp-gold px-5 py-2 rounded-lg hover:bg-bp-gold/10 transition-colors"
          >
            Reintentar envío
          </button>
        </div>
      )}

      <div className="border-t border-white/10 pt-5 text-center flex flex-col gap-1">
        <p className="font-montserrat font-bold text-bp-gold text-sm tracking-wider">
          De la Idea al Impacto Real®
        </p>
        <p className="font-opensans text-white/25 text-[11px] tracking-[0.25em] uppercase">Confidencial</p>
      </div>
    </div>
  )
}

// ─── WIZARD PRINCIPAL ─────────────────────────────────────────────────────────
// screen: 0 = portada, 1-17 = preguntas, 18 = resultado final
export default function RadiografiaCast() {
  const [screen, setScreen] = useState(0)
  const [contacto, setContacto] = useState(null)
  const [respuestas, setRespuestas] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [retryError, setRetryError] = useState(false)
  const [savedPayload, setSavedPayload] = useState(null)
  const [result, setResult] = useState(null)
  const submittedRef = useRef(false)
  const containerRef = useRef(null)
  const TOTAL = QUESTIONS.length // 17

  const scrollTop = () =>
    containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const handleStart = (formData) => {
    setContacto(formData)
    setScreen(1)
    scrollTop()
  }

  const handleAnswer = (key, value) => {
    setRespuestas(prev => {
      const next = { ...prev, [key]: value }
      // Si la pregunta tiene un campo condicional y el usuario eligió otra opción, limpia el detail
      const q = QUESTIONS.find(q => q.id === key)
      if (q?.conditional && value !== q.conditional.show_field_on) {
        delete next[`${key}_detail`]
      }
      return next
    })
  }

  const handleBack = () => {
    const prev = screen > 1 ? screen - 1 : 0
    setScreen(prev)
    scrollTop()
  }

  const handleNext = async () => {
    if (submitting) return

    if (screen < TOTAL) {
      setScreen(s => s + 1)
      scrollTop()
      return
    }

    // P17 completado → calcular + guardar
    if (submittedRef.current) return
    submittedRef.current = true
    setSubmitting(true)

    const score = calculateScore(respuestas)
    const nivel = getLevel(score)
    const buyerPersona = getBuyerPersona(respuestas)
    const banderaBP05 = getBanderaBP05(respuestas)
    setResult({ score, nivel, buyerPersona, banderaBP05 })

    const payload = {
      nombre_completo: contacto.nombre,
      profesion: contacto.profesion,
      email: contacto.email,
      whatsapp: contacto.whatsapp,
      respuestas: buildRespuestasText(respuestas),
      capital_estimado_cop: respuestas.p3_detail
        ? parseFloat(String(respuestas.p3_detail).replace(/\./g, '')) || null
        : null,
      score,
      nivel,
      buyer_persona: buyerPersona,
      bandera_bp05: banderaBP05,
      origen: 'landing_blueprint',
    }
    setSavedPayload(payload)

    const ok = await submitWithRetry(payload)
    setSubmitting(false)
    setRetryError(!ok)
    setScreen(18)
    scrollTop()
  }

  const handleRetry = async () => {
    if (!savedPayload || submitting) return
    setSubmitting(true)
    const ok = await submitWithRetry(savedPayload)
    setSubmitting(false)
    setRetryError(!ok)
  }

  return (
    <div ref={containerRef} className="relative bg-[#0D1B2A] rounded-2xl overflow-hidden scroll-mt-6">
      {/* Radial glow cálido en esquina superior derecha */}
      <div
        className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(201,164,82,0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 p-6 md:p-10 max-w-2xl mx-auto">

        {/* Header strip: logo + contador */}
        {screen > 0 && screen < 18 && (
          <div className="flex items-center justify-between mb-5">
            <img
              src="/sello-metodologia.png"
              alt="CAST"
              className="h-7 w-auto object-contain opacity-70"
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
            <span className="font-merriweather italic text-bp-gold text-sm tabular-nums">
              {String(screen).padStart(2, '0')} / {String(TOTAL).padStart(2, '0')}
            </span>
          </div>
        )}

        {/* Barra de progreso */}
        {screen > 0 && screen < 18 && (
          <div className="mb-8">
            <ProgressBar current={screen} total={TOTAL} />
          </div>
        )}

        {/* Contenido con animación fade+slide-up al cambiar de screen */}
        <div key={screen} className="rc-fade-in">
          {screen === 0 && (
            <Portada onStart={handleStart} initialData={contacto} />
          )}

          {screen >= 1 && screen <= TOTAL && (
            <QuestionScreen
              question={QUESTIONS[screen - 1]}
              qIndex={screen}
              total={TOTAL}
              respuestas={respuestas}
              onAnswer={handleAnswer}
              onBack={handleBack}
              onNext={handleNext}
              loading={submitting}
            />
          )}

          {screen === 18 && result && (
            <FinalScreen
              nombre={contacto.nombre}
              email={contacto.email}
              nivel={result.nivel}
              banderaBP05={result.banderaBP05}
              retryError={retryError}
              onRetry={handleRetry}
            />
          )}
        </div>
      </div>

      <style>{`
        .rc-fade-in {
          animation: rcFadeSlideUp 250ms ease-out both;
        }
        @keyframes rcFadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
