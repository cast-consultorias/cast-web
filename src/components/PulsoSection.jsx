import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Play } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BULLETS = [
  'IA predictiva: hasta 70% de glosas evitables detectadas antes de la radicación*',
  'Ciclo de cuenta médica: de meses a días*',
  'Validación automática de RIPS y cumplimiento normativo (Res. 3100 · Res. 1888/2025 · HL7 FHIR)',
  'Diseñado para IPS, redes prestadoras, EPS y consultorios privados',
]

// ─── ONDAS METALIZADAS ────────────────────────────────────────────────────────
function PulsoWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Reflejo metálico diagonal */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.025] to-transparent" />

      {/* Onda 1 — lenta, profunda */}
      <div className="absolute bottom-0 left-0 w-[200%] animate-wave-drift-r">
        <svg viewBox="0 0 2880 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,85 C480,20 960,150 1440,85 C1920,20 2400,150 2880,85 L2880,130 L0,130 Z"
            fill="#1E4A7A"
            fillOpacity="0.18"
          />
        </svg>
      </div>

      {/* Onda 2 — velocidad media, sentido contrario */}
      <div className="absolute bottom-0 left-0 w-[200%] animate-wave-drift-l">
        <svg viewBox="0 0 2880 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,55 C360,10 720,90 1080,55 C1440,10 1800,90 2160,55 C2520,10 2760,75 2880,55 L2880,90 L0,90 Z"
            fill="#255A8E"
            fillOpacity="0.20"
          />
        </svg>
      </div>

      {/* Onda 3 — rápida, superficie */}
      <div className="absolute bottom-0 left-0 w-[200%] animate-wave-drift-r2">
        <svg viewBox="0 0 2880 55" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,32 C240,8 480,52 720,32 C960,12 1200,52 1440,32 C1680,12 1920,52 2160,32 C2400,12 2640,52 2880,32 L2880,55 L0,55 Z"
            fill="#2E6AAA"
            fillOpacity="0.13"
          />
        </svg>
      </div>
    </div>
  )
}

// ─── SECCIÓN PRINCIPAL ────────────────────────────────────────────────────────
export default function PulsoSection() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [videoMounted, setVideoMounted] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoMounted(true)
          videoObserver.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    if (sectionRef.current) videoObserver.observe(sectionRef.current)

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          sectionRef.current.querySelectorAll('.pulso-animate'),
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.75, ease: 'power3.out' }
        )
      },
    })

    return () => videoObserver.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="pulso"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-pulso-navy-light via-pulso-navy to-pulso-navy-deep"
    >
      <PulsoWaves />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="pulso-animate opacity-0 text-center mb-14">
          <span className="inline-flex items-center gap-2 text-cast-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
            <span className="w-6 h-px bg-cast-gold" />
            Producto Propio CAST
            <span className="w-6 h-px bg-cast-gold" />
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white">
            Tecnología CAST.<br />
            <span className="text-gradient-gold">Para el sector salud.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Video */}
          <div className="pulso-animate opacity-0 relative glass rounded-3xl overflow-hidden border border-cast-gold/20">
            {videoMounted ? (
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl"
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
                    className="absolute inset-0 flex items-center justify-center bg-pulso-navy/50 hover:bg-pulso-navy/60 transition-colors group"
                  >
                    <span className="w-16 h-16 rounded-full bg-cast-gold shadow-lg shadow-cast-gold/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Play size={22} className="text-cast-dark ml-1" fill="currentColor" />
                    </span>
                  </button>
                )}
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center bg-pulso-navy-deep">
                <span className="w-16 h-16 rounded-full bg-cast-gold flex items-center justify-center">
                  <Play size={22} className="text-cast-dark ml-1" fill="currentColor" />
                </span>
              </div>
            )}
          </div>

          {/* Texto */}
          <div className="pulso-animate opacity-0 flex flex-col gap-6">
            <span className="text-white/35 text-[11px] font-semibold tracking-[0.3em] uppercase">
              REGISTRADO ANTE LA DNDA COLOMBIA
            </span>

            <div>
              <h3 className="font-display font-bold text-3xl md:text-4xl text-white leading-tight">
                PULSO<sup className="text-cast-gold text-sm align-super ml-0.5">®</sup>
              </h3>
              <p className="text-white/45 text-sm mt-1 leading-snug">
                Plataforma Unificada de Liquidación, Seguimiento y Operaciones en Salud
              </p>
            </div>

            <p className="text-white/65 text-base leading-relaxed">
              Las glosas y la cartera vencida están asfixiando a las IPS de Colombia.
              PULSO centraliza y automatiza el ciclo completo de cuentas médicas — de la
              autorización a la liquidación — con inteligencia artificial que detecta la
              glosa{' '}
              <strong className="text-white font-semibold">ANTES de radicar</strong>{' '}
              y trazabilidad blockchain en cada transacción.
            </p>

            <ul className="flex flex-col gap-3">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-cast-gold mt-0.5 shrink-0" />
                  <span className="text-white/60 text-sm leading-snug">{b}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                to="/pulso"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cast-gold text-cast-dark font-semibold text-sm hover:bg-cast-gold-light transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cast-gold/25"
              >
                CONOCE PULSO →
              </Link>
            </div>

            <p className="text-white/30 text-[11px] leading-relaxed">
              *Indicadores proyectados del modelo PULSO.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
