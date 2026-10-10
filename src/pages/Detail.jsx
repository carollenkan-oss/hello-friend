import { Link, useParams, useSearchParams } from 'react-router-dom'
import { countries, countryById, getPackage, getPeople, packagesForPeople, pathById, peoples } from '../lib/api.js'
import { included } from '../data/content.js'
import { PackageCard, PageHero, usePageTitle } from '../components/ui.jsx'
import { NotFoundInline, PeopleLinks } from './Browse.jsx'

const SLOTS = [['morning', 'Morning'], ['afternoon', 'Afternoon'], ['evening', 'Evening']]

export function PackagePage() {
  const { slug } = useParams()
  const p = getPackage(slug)
  usePageTitle(p?.name)
  if (!p) return <NotFoundInline />
  const c = countryById[p.country]
  const combine = (p.combine || []).map(getPackage).filter(Boolean)

  return (
    <>
      <PageHero tone={c.tone} eyebrow={`${c.name} · ${p.region}`} title={p.name} lead={p.summary}
        crumbs={[['/', 'Home'], [`/countries/${c.id}`, c.name], [null, p.name]]}>
        <div className="tags" style={{ marginTop: 14 }}>
          {p.paths.map((id) => <Link key={id} to={`/paths/${id}`} className="badge" style={{ textDecoration: 'none' }}>{pathById[id].name}</Link>)}
          {p.offbeat && <span className="badge offbeat">Off the beaten track</span>}
        </div>
      </PageHero>

      <section style={{ paddingTop: 40 }}>
        <div className="wrap pkg-layout">
          <article>
            <dl className="facts">
              <div><dt>Length</dt><dd>{p.days} {p.days === 1 ? 'day' : 'days'}</dd></div>
              <div><dt>Country</dt><dd>{c.name}</dd></div>
              <div><dt>Region</dt><dd>{p.region}</dd></div>
              <div><dt>Best time</dt><dd>{p.bestTime}</dd></div>
              {p.faiths.length > 0 && <div><dt>Traditions</dt><dd>{p.faiths.join(', ')}</dd></div>}
            </dl>

            <h2>Overview</h2>
            <p className="lead">{p.overview}</p>

            <h3 style={{ marginTop: 36 }}>Highlights</h3>
            <ul className="highlights">{p.highlights.map((h) => <li key={h}>{h}</li>)}</ul>

            <h2 style={{ marginTop: 48 }}>Day by day</h2>
            {p.itinerary.map((d, i) => (
              <div className="day" key={i}>
                <div className="day-num"><small>Day</small>{i + 1}</div>
                <div>
                  <h3>{d.title}</h3>
                  {SLOTS.map(([k, label]) => d[k] && <p className="slot" key={k}><strong>{label}</strong> {d[k]}</p>)}
                </div>
              </div>
            ))}

            {p.stay && <><h3 style={{ marginTop: 36 }}>Where you'll stay</h3><p>{p.stay}</p></>}

            <h3 style={{ marginTop: 28 }}>What's included</h3>
            <ul>{included.map((x) => <li key={x}>{x}</li>)}{p.included && <li><strong>Also:</strong> {p.included}</li>}</ul>
            <p className="muted" style={{ fontSize: '.92rem' }}>Not included: international flights, visas, travel insurance, drinks, tips and optional activities.</p>

            {p.goodToKnow && <><h3 style={{ marginTop: 28 }}>Good to know</h3><p className="note">{p.goodToKnow}</p></>}

            {p.peoples.length > 0 && <><h3 style={{ marginTop: 36 }}>Peoples you'll meet</h3><PeopleLinks names={p.peoples} /></>}
          </article>

          <aside className="side-card">
            <span className="eyebrow" style={{ color: 'var(--ochre)' }}>Book this package</span>
            <h3>{p.days} {p.days === 1 ? 'day' : 'days'} in {c.name}</h3>
            <p className="muted">Travel it your way:</p>
            <ul>
              <li><strong>Explorer:</strong> shared small group</li>
              <li><strong>Signature:</strong> private guide and vehicle</li>
              <li><strong>Group:</strong> 15 or more</li>
              <li><strong>Bespoke:</strong> built around you</li>
            </ul>
            <p className="muted" style={{ fontSize: '.9rem' }}>Prices on request, with a line-by-line breakdown within three working days.</p>
            <Link className="btn light" style={{ width: '100%', justifyContent: 'center' }} to={`/plan?package=${p.slug}`}>Enquire about this package</Link>
          </aside>
        </div>
      </section>

      {combine.length > 0 && (
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="eyebrow">Combine with</span>
            <h2>Make it a longer journey</h2>
            <div className="grid">{combine.map((x) => <PackageCard key={x.slug} p={x} />)}</div>
          </div>
        </section>
      )}
    </>
  )
}

export function PeoplesIndex() {
  usePageTitle('Peoples and Cultures')
  const [params, setParams] = useSearchParams()
  const country = params.get('country') || ''
  const q = (params.get('q') || '').toLowerCase()
  const set = (k, v) => { const n = new URLSearchParams(params); v ? n.set(k, v) : n.delete(k); setParams(n, { replace: true }) }
  const shown = countries.filter((c) => !country || c.id === country)

  return (
    <>
      <PageHero tone="#b5532f" eyebrow="Peoples and cultures" title="Every people has its own names, food, faith and way of life."
        lead="We travel with the communities below, from kingdoms known across the world to mountain peoples unknown even to their neighbours."
        crumbs={[['/', 'Home'], [null, 'Peoples']]} />
      <section>
        <div className="wrap">
          <div className="filters">
            <div><label htmlFor="pc">Country</label>
              <select id="pc" value={country} onChange={(e) => set('country', e.target.value)}>
                <option value="">All countries</option>{countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select></div>
            <div><label htmlFor="pq">Search</label><input id="pq" placeholder="People, language or tradition" value={params.get('q') || ''} onChange={(e) => set('q', e.target.value)} /></div>
          </div>
          {shown.map((c) => {
            const list = peoples.filter((p) => p.countries[0] === c.id && (!q || `${p.name} ${p.language} ${p.knownFor} ${p.region}`.toLowerCase().includes(q)))
            if (!list.length) return null
            const regions = [...new Set(list.map((p) => p.region))]
            return (
              <div className="country-block" key={c.id}>
                <div className="country-block-head"><h3>{c.name}</h3><Link className="link-arrow" to={`/countries/${c.id}`}>{c.name} packages →</Link></div>
                {regions.map((r) => (
                  <div key={r} style={{ marginBottom: 20 }}>
                    <p className="eyebrow" style={{ color: 'var(--ink-2)' }}>{r}</p>
                    <div className="profile-grid">
                      {list.filter((p) => p.region === r).map((p) => (
                        <Link key={p.slug} to={`/peoples/${p.slug}`} className="profile-link"><strong>{p.name}</strong><span>{p.language} · {p.knownFor}</span></Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}

const FACETS = [['names', 'Names'], ['food', 'Food'], ['worship', 'Worship'], ['dress', 'Dress'], ['life', 'Way of life'], ['today', 'Life today']]

export function PeoplePage() {
  const { slug } = useParams()
  const p = getPeople(slug)
  usePageTitle(p?.name)
  if (!p) return <NotFoundInline />
  const c = countryById[p.country]
  const pkgs = packagesForPeople(p.name)
  const hasProfile = FACETS.some(([k]) => p[k])

  return (
    <>
      <PageHero tone={c.tone} eyebrow={`${p.countries.map((id) => countryById[id].name).join(' · ')} · ${p.region}`} title={p.name}
        lead={p.knownFor} crumbs={[['/', 'Home'], ['/peoples', 'Peoples'], [`/peoples?country=${c.id}`, c.name], [null, p.name]]} />
      <section>
        <div className="wrap">
          <dl className="facts" style={{ marginTop: 0 }}>
            <div><dt>Language</dt><dd>{p.language}</dd></div>
            <div><dt>Where</dt><dd>{p.where || `${p.region}, ${c.name}`}</dd></div>
          </dl>
          {hasProfile && (
            <div className="facet-grid">
              {FACETS.map(([k, label]) => p[k] && <div className="facet" key={k}><h4>{label}</h4><p>{p[k]}</p></div>)}
            </div>
          )}
          <div style={{ marginTop: 48 }}>
            <span className="eyebrow">Travel with the {p.name}</span>
            {pkgs.length > 0
              ? <div className="grid">{pkgs.map((x) => <PackageCard key={x.slug} p={x} />)}</div>
              : (
                <div className="note">
                  <p style={{ marginBottom: 8 }}><strong>Visits with the {p.name} are arranged privately.</strong> We design each one with community leaders, so it is built around your dates and interests.</p>
                  <Link className="link-arrow" to={`/plan?people=${p.slug}`}>Plan a visit →</Link>
                </div>
              )}
          </div>
        </div>
      </section>
    </>
  )
}
