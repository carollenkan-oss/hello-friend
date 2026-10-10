import { Link } from 'react-router-dom'
import { countries, getPackage, paths, packages, peoples } from '../lib/api.js'
import { PackageCard, Pattern, usePageTitle } from '../components/ui.jsx'
import { PATH_TONES } from './Browse.jsx'

const FEATURED = ['lalibela-churches-of-rock', 'lamu-swahili-soul', 'fort-portal-empaako', 'kinshasa-rumba-la-sape', 'lost-kingdom-bachwezi', 'gitega-drums-of-gishora']

export default function Home() {
  usePageTitle()
  const offbeat = packages.filter((p) => p.offbeat)
  return (
    <>
      <Pattern tone="#2a1d14" className="hero">
        <div className="wrap">
          <span className="eyebrow" style={{ color: 'var(--ochre)' }}>Sacred · Heritage · Culture · Immersion</span>
          <h1>Go where the story is still alive.</h1>
          <p className="lead">Sacred journeys, royal kingdoms, living cultures, and the kind of joy you can't plan for. Africa, with the people who keep it.</p>
          <div className="btn-row" style={{ marginTop: 28 }}>
            <Link className="btn light" to="/where-we-go">See our journeys</Link>
            <Link className="btn ghost" style={{ color: 'var(--paper)', borderColor: 'var(--paper)' }} to="/plan">Plan something unforgettable</Link>
          </div>
          <p style={{ marginTop: 40, fontSize: '.9rem', color: '#cdbfa9' }}>{packages.length} destination packages · {peoples.length} peoples · {countries.length} countries</p>
        </div>
      </Pattern>

      <section>
        <div className="wrap split">
          <div>
            <span className="eyebrow">Why we exist</span>
            <h2>None of this is staged.</h2>
          </div>
          <div>
            <p className="lead">At dawn in Lalibela, thousands of pilgrims in white wait in silence for a procession carved out of centuries. At midnight in Kinshasa, a rumba band is just getting started. In Burundi, drummers carry great drums on their heads, set them in a circle and make the ground shake. On the White Nile, young herders greet their cattle by name through clouds of ash smoke.</p>
            <p>We take you into it, with the elders, priests, musicians, historians and families who make it what it is.</p>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow">Our paths</span>
          <h2>Choose how you want to go deep</h2>
          <div className="path-tiles" style={{ marginTop: 24 }}>
            {paths.map((p) => (
              <Pattern key={p.id} tone={PATH_TONES[p.id]} alt={p.id === 'culture' || p.id === 'fun'} className="path-tile" style={{ padding: 0 }}>
                <Link to={`/paths/${p.id}`} style={{ position: 'relative', zIndex: 1, color: 'inherit', textDecoration: 'none', padding: 22, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                  <h3>{p.name}</h3>
                  <p>{p.tagline}</p>
                </Link>
              </Pattern>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="country-block-head">
            <div><span className="eyebrow">Featured</span><h2 style={{ margin: 0 }}>Journeys to start with</h2></div>
            <Link className="link-arrow" to="/where-we-go">All packages →</Link>
          </div>
          <div className="grid" style={{ marginTop: 24 }}>{FEATURED.map((s) => <PackageCard key={s} p={getPackage(s)} />)}</div>
        </div>
      </section>

      <section className="dark">
        <div className="wrap split">
          <div>
            <span className="eyebrow" style={{ color: 'var(--ochre)' }}>Off the beaten track</span>
            <h2>Places even locals have forgotten</h2>
            <p className="lead">Earthworks of a vanished dynasty. Rock paintings in farmers' fields. Forts on the Nile. Mountain peoples whose languages are heard almost nowhere else. We bring these places back into the light, with the custodians who keep them.</p>
            <Link className="btn light" to="/countries/uganda?offbeat=1">Explore off the beaten track</Link>
          </div>
          <div className="grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {offbeat.slice(0, 4).map((p) => <PackageCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <span className="eyebrow">Why travel with us</span>
          <h2>Doors that are usually closed</h2>
          <div className="facet-grid" style={{ marginTop: 24 }}>
            {[
              ['Storytellers, not script-readers', 'Every journey is led by people who belong to the story: elders, clergy, historians, musicians and families.'],
              ['Timed to the moment', 'Built around the days that matter: Timkat, Maulidi, Imbalu, Irreecha, harvests and coronation anniversaries.'],
              ['Depth and delight', 'A morning at a shrine, an afternoon on the Nile, an evening of live music. Meaning doesn\'t have to be solemn.'],
              ['Honest from first message', 'Licensed, transparent prices, protected payments, and hosts who are paid fairly.'],
            ].map(([h, t]) => <div className="facet" key={h}><h4>{h}</h4><p>{t}</p></div>)}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow">Where we begin</span>
          <h2>Eight countries. A continent to come.</h2>
          <div className="path-tiles" style={{ marginTop: 24 }}>
            {countries.map((c, i) => (
              <Pattern key={c.id} tone={c.tone} alt={i % 2 === 1} className="path-tile" style={{ minHeight: 190, padding: 0 }}>
                <Link to={`/countries/${c.id}`} style={{ position: 'relative', zIndex: 1, color: 'inherit', textDecoration: 'none', padding: 20, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                  <h3>{c.name}</h3><p>{c.headline}</p>
                </Link>
              </Pattern>
            ))}
          </div>
        </div>
      </section>

      <Pattern tone="#7a3b1d" alt className="page-hero" style={{ padding: '80px 0' }}>
        <div className="shade" />
        <div className="wrap">
          <h2 style={{ color: 'var(--paper)' }}>The story is waiting. Come and hear it.</h2>
          <p className="lead">Tell us what moves you, and we'll build the journey around it.</p>
          <Link className="btn light" to="/plan">Start planning</Link>
        </div>
      </Pattern>
    </>
  )
}
