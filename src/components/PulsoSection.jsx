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
    <section ref={sectionRef} id="pulso" className="py-24 bg-bp-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

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

          {/* Video — arriba en mobile, izquierda en desktop */}
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
                    className="absolute inset-0 flex items-center justify-center bg-cast-dark/40 hover:bg-cast-dark/50 transition-colors group"
                  >
                    <span className="w-16 h-16 rounded-full bg-cast-gold shadow-lg shadow-cast-gold/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Play size={22} className="text-cast-dark ml-1" fill="currentColor" />
                    </span>
                  </button>
                )}
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center bg-cast-dark-3">
                <span className="w-16 h-16 rounded-full bg-cast-gold flex items-center justify-center">
                  <Play size={22} className="text-cast-dark ml-1" fill="currentColor" />
                </span>
              </div>
            )}
          </div>

          {/* Texto — abajo en mobile, derecha en desktop */}
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
