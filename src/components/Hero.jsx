import { useEffect, useRef, lazy, Suspense } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, CalendarCheck } from 'lucide-react'

const NetworkGraph = lazy(() => import('./NetworkGraph'))

const words = ['De la Idea', 'al Impacto', 'Real.']

export default function Hero() {
  const containerRef = useRef(null)
  const wordRefs = useRef([])
  const subRef = useRef(null)
  const ctaRef = useRef(null)
  const taglineRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 })

    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
    )

    wordRefs.current.forEach((el, i) => {
      tl.fromTo(
        el,
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.75, ease: 'power3.out' },
        `-=${i === 0 ? 0 : 0.5}`
      )
    })

    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    )

    tl.fromTo(
      ctaRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
  }, [])

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-cast-dark"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cast-dark via-cast-dark-2 to-cast-dark-3" />
      <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l from-cast-gold/5 to-transparent pointer-events-none" />

      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#C9A84C 1px, transparent 1px),
            linear-gradient(90deg, #C9A84C 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left — content */}
        <div className="flex flex-col gap-7">
          <div ref={taglineRef} className="flex items-center gap-3 opacity-0">
            <span className="w-8 h-px bg-cast-gold" />
            <span className="text-cast-gold text-xs font-semibold tracking-[0.25em] uppercase">
              Sistema CAST® Premium 2026
            </span>
          </div>

          <h1 className="font-display font-bold leading-[1.05] overflow-hidden">
            {words.map((word, i) => (
              <span key={word} className="block overflow-hidden">
                <span
                  ref={(el) => (wordRefs.current[i] = el)}
                  className={`block ${
                    i === 2
                      ? 'text-gradient-gold'
                      : 'text-white'
                  } text-5xl md:text-6xl lg:text-7xl`}
                >
                  {word}
                </span>
              </span>
            ))}
          </h1>

          <p
            ref={subRef}
            className="text-white/55 text-lg leading-relaxed max-w-lg opacity-0"
          >
            Estructuramos tu visión con estándares internacionales para que sea
            financiable, escalable y listo para el capital global. 25+ años,
            25+ países, resultados medibles.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4">
            <a
              href="/blueprint"
              className="opacity-0 group flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-cast-gold text-cast-dark font-semibold text-sm hover:bg-cast-gold-light transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cast-gold/25"
            >
              <CalendarCheck size={16} />
              Agenda tu Blueprint Session™
            </a>
            <a
              href="#metodologia"
              className="opacity-0 group flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-white/15 text-white/70 text-sm font-medium hover:border-cast-gold/40 hover:text-white transition-all duration-300"
            >
              Ver Metodología
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right — 3D graph */}
        <div className="relative h-[480px] lg:h-[600px] w-full">
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <Suspense fallback={<div className="w-full h-full" />}>
              <NetworkGraph />
            </Suspense>
          </div>
          {/* Radial glow */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-white text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white to-transparent animate-pulse" />
      </div>
    </section>
  )
}
