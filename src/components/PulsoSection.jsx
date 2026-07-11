import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Play } from 'lucide-react'

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoMounted(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="pulso" className="bg-bp-cream py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Video — arriba en mobile, izquierda en desktop */}
          <div className="relative rounded-2xl overflow-hidden border border-bp-gold/40 shadow-2xl shadow-bp-navy/10">
            {videoMounted ? (
              <div className="relative aspect-video bg-bp-navy/5">
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
                    className="absolute inset-0 flex items-center justify-center bg-bp-navy/15 hover:bg-bp-navy/25 transition-colors group"
                  >
                    <span className="w-16 h-16 rounded-full bg-bp-gold shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <Play size={22} className="text-bp-navy ml-1" fill="currentColor" />
                    </span>
                  </button>
                )}
              </div>
            ) : (
              <div className="aspect-video bg-bp-navy/5 flex items-center justify-center">
                <span className="w-16 h-16 rounded-full bg-bp-gold flex items-center justify-center">
                  <Play size={22} className="text-bp-navy ml-1" fill="currentColor" />
                </span>
              </div>
            )}
          </div>

          {/* Texto — abajo en mobile, derecha en desktop */}
          <div className="flex flex-col gap-6">
            <span className="text-bp-navy/40 text-[11px] font-montserrat font-bold tracking-[0.3em] uppercase">
              PRODUCTO PROPIO CAST · REGISTRADO ANTE LA DNDA COLOMBIA
            </span>

            <div>
              <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl text-bp-navy leading-tight">
                PULSO
              </h2>
              <p className="font-opensans text-bp-navy/55 text-sm mt-1 leading-snug">
                Plataforma Unificada de Liquidación, Seguimiento y Operaciones en Salud
              </p>
            </div>

            <p className="font-opensans text-bp-navy/75 text-base leading-relaxed">
              Las glosas y la cartera vencida están asfixiando a las IPS de Colombia.
              PULSO centraliza y automatiza el ciclo completo de cuentas médicas — de la
              autorización a la liquidación — con inteligencia artificial que detecta la
              glosa{' '}
              <strong className="text-bp-navy font-semibold">ANTES de radicar</strong>{' '}
              y trazabilidad blockchain en cada transacción.
            </p>

            <ul className="flex flex-col gap-3">
              {BULLETS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-bp-gold mt-0.5 shrink-0" />
                  <span className="font-opensans text-bp-navy/70 text-sm leading-snug">{b}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <Link
                to="/pulso"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-bp-gold text-bp-navy font-montserrat font-bold text-sm uppercase tracking-wide hover:bg-bp-navy hover:text-bp-gold border-2 border-transparent hover:border-bp-gold transition-all duration-300"
              >
                CONOCE PULSO →
              </Link>
            </div>

            <p className="text-bp-navy/35 text-[11px] font-opensans leading-relaxed">
              *Indicadores proyectados del modelo PULSO.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
