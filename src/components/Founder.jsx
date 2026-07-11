import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Globe, Anchor, GraduationCap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const credentials = [
  { Icon: GraduationCap, label: 'Máster en Dirección de Proyectos — OBS Business School · Universidad de Barcelona' },
  { Icon: Anchor, label: '12 años de servicio en la Armada Nacional' },
  { Icon: Globe, label: 'Operaciones financieras internacionales en Europa, Asia y LATAM' },
  { Icon: Award, label: 'Liderazgo ejecutivo en minería, salud, agronomía y tecnología' },
]

export default function Founder() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const contentRef = useRef(null)
  const credRefs = useRef([])
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
          { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1.1, ease: 'power4.out' }
        )
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.3 }
        )
        gsap.fromTo(
          credRefs.current.filter(Boolean),
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out', delay: 0.5 }
        )
      },
    })
  }, [])

  return (
    <section ref={sectionRef} id="nosotros" className="py-24 bg-cast-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Image side */}
          <div className="relative">
            <div
              ref={imageRef}
              className="relative rounded-3xl overflow-hidden aspect-[4/5] border border-white/5"
              style={{
                background: 'linear-gradient(135deg, #111118 0%, #1A1A28 100%)',
              }}
            >
              {!imgError ? (
                <img
                  src="/ceo-carlos.png"
                  alt="Carlos Alberto Suárez Tous — CEO & Founder CAST Consultorías"
                  onError={() => setImgError(true)}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="750"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              ) : (
                /* Fallback si la imagen no carga */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <div className="w-28 h-28 rounded-full bg-cast-gold/10 border-2 border-cast-gold/20 flex items-center justify-center">
                    <span className="font-display font-bold text-cast-gold text-4xl">CS</span>
                  </div>
                  <p className="text-white/30 text-sm">Carlos A. Suárez Tous</p>
                </div>
              )}

              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-cast-dark via-cast-dark/60 to-transparent pointer-events-none" />

              {/* Name overlay */}
              <div className="absolute bottom-5 left-5">
                <p className="font-display font-bold text-white text-lg leading-tight">Carlos Alberto</p>
                <p className="font-display font-bold text-gradient-gold text-lg leading-tight">Suárez Tous</p>
                <p className="text-white/40 text-xs mt-1">CEO & Founder</p>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 glass rounded-2xl px-5 py-3 border border-cast-gold/20 glow-gold-sm">
              <p className="text-cast-gold font-display font-bold text-2xl">25+</p>
              <p className="text-white/50 text-xs">años de experiencia</p>
            </div>
          </div>

          {/* Content side */}
          <div ref={contentRef} className="opacity-0 flex flex-col gap-6">
            <div>
              <span className="inline-flex items-center gap-2 text-cast-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">
                <span className="w-6 h-px bg-cast-gold" />
                Quién hay detrás
              </span>
              <h2 className="font-display font-bold text-4xl text-white mb-1">
                Carlos Alberto<br />
                <span className="text-gradient-gold">Suárez Tous</span>
              </h2>
              <p className="text-white/40 text-sm tracking-wide">CEO & Founder — CAST Consultorías</p>
            </div>

            <blockquote className="border-l-2 border-cast-gold pl-5">
              <p className="text-white/70 text-base leading-relaxed italic">
                "Mi eslogan no es una promesa de marketing. Es el resultado de 25 años
                convirtiendo ideas en proyectos que el mundo puede financiar."
              </p>
            </blockquote>

            <div className="flex flex-col gap-3">
              {credentials.map((c, i) => (
                <div
                  key={c.label}
                  ref={(el) => (credRefs.current[i] = el)}
                  className="opacity-0 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-cast-gold/10 border border-cast-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <c.Icon size={14} className="text-cast-gold" />
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed">{c.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              {['Minería', 'Salud', 'Finanzas', 'Agronomía', 'Tecnología', 'ESG', 'Infraestructura'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-white/40 text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
