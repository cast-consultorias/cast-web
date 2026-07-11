import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Servicios', href: '#servicios-detalle' },
  { label: 'Metodología', href: '#metodologia' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'ESG', href: '#esg' },
  { label: 'Contacto', href: '#contacto' },
]

export default function Navbar() {
  const navRef = useRef(null)
  const indicatorRef = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
    )

    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkHover = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const navRect = navRef.current.getBoundingClientRect()
    gsap.to(indicatorRef.current, {
      x: rect.left - navRect.left,
      width: rect.width,
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    })
    setActive(el.dataset.label)
  }

  const handleNavLeave = () => {
    gsap.to(indicatorRef.current, { opacity: 0, duration: 0.2 })
    setActive(null)
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-dark shadow-lg shadow-black/40' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between" onMouseLeave={handleNavLeave}>
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <span className="font-display font-800 text-xl tracking-widest text-gradient-gold">CAST</span>
          <span className="text-white/30 text-xs font-light tracking-wider hidden sm:block">CONSULTORÍAS</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 relative">
          <div
            ref={indicatorRef}
            className="absolute bottom-0 h-px bg-cast-gold opacity-0 pointer-events-none transition-none"
          />
          {links.map((l) => (
            <a
              key={l.label}
              data-label={l.label}
              href={l.href}
              onMouseEnter={handleLinkHover}
              className={`text-sm font-medium transition-colors duration-200 ${
                active === l.label ? 'text-cast-gold' : 'text-white/60 hover:text-white'
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contacto"
          className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-cast-gold text-cast-dark hover:bg-cast-gold-light transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cast-gold/20"
        >
          Agenda tu sesión
        </a>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white/70 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden glass-dark border-t border-cast-gold/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/70 hover:text-cast-gold text-sm font-medium py-1 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="mt-2 text-center px-5 py-2.5 rounded-full text-sm font-semibold bg-cast-gold text-cast-dark"
            onClick={() => setMenuOpen(false)}
          >
            Agenda tu sesión
          </a>
        </div>
      )}
    </nav>
  )
}
