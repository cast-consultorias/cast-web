import { MapPin, Phone, Mail, Globe } from 'lucide-react'

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/cast_consultorias/#',
    icon: <InstagramIcon size={15} />,
    hoverColor: 'hover:border-pink-500/50 hover:text-pink-400',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/cast-consultor%C3%ADas-sas/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    hoverColor: 'hover:border-sky-500/50 hover:text-sky-400',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1J2T6i5ij3/',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    hoverColor: 'hover:border-blue-500/50 hover:text-blue-400',
  },
]

const contactItems = [
  { Icon: MapPin, text: 'Barranquilla, Colombia', href: null },
  { Icon: MapPin, text: 'Zürich, Suiza', href: null },
  { Icon: Phone, text: '+57 304 211 3374', href: 'tel:+573042113374' },
  { Icon: Phone, text: '+41 79 416 1929', href: 'tel:+41794161929' },
  { Icon: Mail, text: 'carlos@castconsultorias.com', href: 'mailto:carlos@castconsultorias.com' },
  { Icon: Globe, text: 'www.castconsultorias.com', href: 'https://www.castconsultorias.com' },
]

export default function Footer() {
  return (
    <footer className="bg-cast-dark border-t border-white/5 py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div>
              <span className="font-display font-bold text-2xl tracking-widest text-gradient-gold">CAST</span>
              <p className="text-white/30 text-xs tracking-wider mt-0.5">CONSULTORÍAS</p>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Convertimos tu visión en un proyecto que el mundo puede financiar.
            </p>
            <div className="flex gap-3 mt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className={`w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-white/35 transition-all duration-200 ${s.hoverColor} hover:scale-110`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-4">Navegación</p>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: 'Servicios', href: '#servicios-detalle' },
                { label: 'Metodología', href: '#metodologia' },
                { label: 'Nosotros', href: '#nosotros' },
                { label: 'ESG', href: '#esg' },
                { label: 'Contacto', href: '#contacto' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/40 text-sm hover:text-cast-gold transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white/60 text-xs font-semibold tracking-widest uppercase mb-4">Contacto</p>
            <ul className="flex flex-col gap-3">
              {contactItems.map(({ Icon, text, href }) => (
                <li key={text}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-2.5 text-white/40 text-sm hover:text-cast-gold transition-colors duration-200 group"
                    >
                      <Icon size={13} className="text-cast-gold/60 flex-shrink-0 group-hover:text-cast-gold transition-colors" />
                      {text}
                    </a>
                  ) : (
                    <span className="flex items-center gap-2.5 text-white/40 text-sm">
                      <Icon size={13} className="text-cast-gold/60 flex-shrink-0" />
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-7 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/20 text-xs">
            © 2026 CAST Consultorías S.A.S. Todos los derechos reservados.
          </p>
          <p className="text-white/15 text-xs">
            Metodología CAST® Premium — Registrada internacionalmente
          </p>
        </div>
      </div>
    </footer>
  )
}
