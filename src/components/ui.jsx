import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { countryById, pathById } from '../lib/api.js'
import { BRAND } from '../data/content.js'

export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export function usePageTitle(title) {
  useEffect(() => { document.title = title ? `${title} · ${BRAND.name}` : `${BRAND.name} · ${BRAND.tagline}` }, [title])
}

const NAV = [
  ['/where-we-go', 'Where We Go'],
  ['/paths/sacred', 'Sacred'],
  ['/paths/heritage', 'Heritage'],
  ['/paths/culture', 'Culture'],
  ['/paths/immersion', 'Immersion'],
  ['/paths/fun', 'Fun'],
  ['/peoples', 'Peoples'],
]

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => setOpen(false), [pathname])
  return (
    <header className="site-header">
      <div className="wrap">
        <Link to="/" className="logo"><span className="logo-mark" aria-hidden="true" />{BRAND.name}</Link>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open}>Menu</button>
        <nav className={`nav ${open ? 'open' : ''}`}>
          {NAV.map(([to, label]) => <NavLink key={to} to={to}>{label}</NavLink>)}
          <Link to="/plan" className="cta">Plan a journey</Link>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ color: 'var(--paper)', marginBottom: 12 }}><span className="logo-mark" />{BRAND.name}</div>
            <p>{BRAND.tagline}. Travelling with the elders, clergy, historians, musicians and families who keep the story.</p>
            <p style={{ fontSize: '.85rem' }}>{BRAND.licence} · Licensed partners in every country we visit.</p>
          </div>
          <div>
            <h4>Paths</h4>
            <ul>{['sacred', 'heritage', 'culture', 'immersion', 'fun'].map((p) => <li key={p}><Link to={`/paths/${p}`}>{pathById[p].title}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Where we go</h4>
            <ul>{Object.values(countryById).map((c) => <li key={c.id}><Link to={`/countries/${c.id}`}>{c.name}</Link></li>)}</ul>
          </div>
          <div>
            <h4>About</h4>
            <ul>
              <li><Link to="/about">Our story</Link></li>
              <li><Link to="/peoples">Peoples and cultures</Link></li>
              <li><Link to="/promise">Our promise</Link></li>
              <li><Link to="/plan">Plan a journey</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <span>{BRAND.address} · {BRAND.email} · {BRAND.phone}</span>
        </div>
      </div>
      <a className="wa-float" href={`https://wa.me/${BRAND.whatsapp}`} target="_blank" rel="noreferrer">WhatsApp us</a>
    </footer>
  )
}

export function Pattern({ tone, alt, className = '', style, children }) {
  return <div className={`pattern ${alt ? 'alt' : ''} ${className}`} style={{ '--tone': tone, ...style }}>{children}</div>
}

export function PageHero({ tone, eyebrow, title, lead, crumbs, children }) {
  return (
    <Pattern tone={tone} className="page-hero">
      <div className="shade" />
      <div className="wrap">
        {crumbs && <div className="crumbs">{crumbs.map(([to, label], i) => <span key={i}>{i > 0 && ' / '}{to ? <Link to={to}>{label}</Link> : label}</span>)}</div>}
        {eyebrow && <span className="eyebrow" style={{ color: 'var(--ochre)' }}>{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </Pattern>
  )
}

export function PackageCard({ p }) {
  const c = countryById[p.country]
  return (
    <Link to={`/packages/${p.slug}`} className="card">
      {p.image
        ? <div className="card-top" style={{ background: `center/cover url(${p.image})` }} />
        : (
          <Pattern tone={c.tone} alt={p.days % 2 === 0} className="card-top">
            <div className="badge-row">
              <span className="badge">{c.name}</span>
              {p.offbeat && <span className="badge offbeat">Off the beaten track</span>}
            </div>
            <span className="days">{p.days} {p.days === 1 ? 'day' : 'days'}</span>
          </Pattern>
        )}
      <div className="card-body">
        <h3>{p.name}</h3>
        <p>{p.summary}</p>
        <div className="tags">{p.paths.map((id) => <span className="tag" key={id}>{pathById[id].name}</span>)}</div>
      </div>
    </Link>
  )
}
