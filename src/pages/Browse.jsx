import { Link, useParams, useSearchParams } from 'react-router-dom'
import { countries, countryById, packagesFor, facetsFor, pathById, paths, sitesFor, peopleRef } from '../lib/api.js'
import { festivals, natureAddOns } from '../data/paths.js'
import { PackageCard, PageHero, usePageTitle } from '../components/ui.jsx'

const PATH_TONES = { sacred: '#5a2d5f', heritage: '#7a3b1d', culture: '#b5532f', immersion: '#3d5a1e', fun: '#1f5b5b' }
export { PATH_TONES }

// Packages grouped by country, 4 per row, with "See all" to the country page
export function CountryRows({ path, offbeat }) {
  return countries.map((c) => {
    const list = packagesFor({ country: c.id, path, offbeat })
    if (!list.length) return null
    const qs = new URLSearchParams()
    if (path) qs.set('path', path)
    if (offbeat) qs.set('offbeat', '1')
    return (
      <div className="country-block" key={c.id}>
        <div className="country-block-head">
          <div>
            <span className="eyebrow">{list.length} {list.length === 1 ? 'package' : 'packages'}</span>
            <h3>{c.name}</h3>
          </div>
          <Link className="link-arrow" to={`/countries/${c.id}${qs.toString() ? `?${qs}` : ''}`}>
            See all {c.name}{path ? ` ${pathById[path].name.toLowerCase()}` : ''} packages →
          </Link>
        </div>
        <div className="row-scroll">{list.slice(0, 4).map((p) => <PackageCard key={p.slug} p={p} />)}</div>
      </div>
    )
  })
}

export function PathPage() {
  const { pathId } = useParams()
  const path = pathById[pathId]
  usePageTitle(path?.title)
  if (!path) return <NotFoundInline />
  return (
    <>
      <PageHero tone={PATH_TONES[path.id]} eyebrow={path.title} title={path.headline} lead={path.tagline} crumbs={[['/', 'Home'], [null, path.title]]} />
      <section>
        <div className="wrap split">
          <div>{path.overview.map((para, i) => <p key={i} className={i === 0 ? 'lead' : ''}>{para}</p>)}</div>
          <div>
            <span className="eyebrow">How we travel</span>
            <ul className="points">{path.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
          </div>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow">{path.name} packages</span>
          <h2>By country</h2>
          <p className="muted">Each package is built around one destination. Combine them for longer journeys, even across borders.</p>
          <CountryRows path={path.id} />
        </div>
      </section>
      {path.id === 'fun' && <FunExtras />}
    </>
  )
}

function FunExtras() {
  return (
    <section className="dark">
      <div className="wrap split">
        <div>
          <span className="eyebrow" style={{ color: 'var(--ochre)' }}>Festivals worth planning around</span>
          <div className="table-wrap" style={{ borderColor: '#3a2f26' }}>
            <table className="simple" style={{ color: 'var(--ink)' }}>
              <thead><tr><th>Festival</th><th>Where</th><th>When</th></tr></thead>
              <tbody>{festivals.map((f) => <tr key={f.name}><td>{f.name}</td><td>{f.where}</td><td>{f.when}</td></tr>)}</tbody>
            </table>
          </div>
          <p className="muted" style={{ marginTop: 12, fontSize: '.9rem' }}>Festival dates move from year to year. We confirm them with organisers before you book.</p>
        </div>
        <div>
          <span className="eyebrow" style={{ color: 'var(--ochre)' }}>Add a little wild</span>
          <p className="muted">Nature isn't our main story, but it's part of every land we travel. Add a few days to any journey, run by licensed specialist partners.</p>
          <ul className="points" style={{ color: 'var(--ink)' }}>{natureAddOns.map((n) => <li key={n.name}><strong>{n.name}</strong> · {n.where} · {n.days} days</li>)}</ul>
        </div>
      </div>
    </section>
  )
}

export function WhereWeGo() {
  usePageTitle('Where We Go')
  return (
    <>
      <PageHero tone="#1f5b5b" eyebrow="Where we go" title="The heart of the continent, where rivers, kingdoms and faiths meet." crumbs={[['/', 'Home'], [null, 'Where We Go']]} />
      <section>
        <div className="wrap split">
          <div>
            <p className="lead">We begin where some of Africa's great forces meet. The Nile rises from the great lakes and runs north through the Sudd to meet the Blue Nile, which falls from the Ethiopian highlands. The Rift Valley splits the land and has given up some of the oldest traces of humankind. To the west, the Congo basin pulses with rumba. To the east, the Indian Ocean coast has traded with Arabia, Persia and India for a thousand years.</p>
            <p>Across this land live hundreds of peoples. Some built kingdoms whose drums and courts still sound today. Some follow cattle across the plains. Some built stone towns on the ocean, or carved churches out of mountains. No border here contains a single culture, and no culture stops at a border.</p>
            <p>That is why we start with eight countries that hold stories belonging together, and where our relationships run deep. We'll grow across the continent from here.</p>
          </div>
          <div>
            <span className="eyebrow">How to choose</span>
            <ul className="points">
              <li><strong>By place:</strong> pick a country and filter its packages by path, people, region or faith.</li>
              <li><strong>By path:</strong> browse Sacred, Heritage, Culture, Immersion or Fun.</li>
              <li><strong>Off the beaten track:</strong> forgotten sites and little-known peoples, flagged on every card.</li>
              <li><strong>By length:</strong> book one package, or combine several into a longer journey.</li>
            </ul>
            <div className="chips" style={{ marginTop: 20 }}>{countries.map((c) => <Link className="chip" key={c.id} to={`/countries/${c.id}`}>{c.name}</Link>)}</div>
          </div>
        </div>
      </section>
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2>Packages by country</h2>
          <CountryRows />
        </div>
      </section>
    </>
  )
}

export function CountryPage() {
  const { countryId } = useParams()
  const c = countryById[countryId]
  const [params, setParams] = useSearchParams()
  usePageTitle(c?.name)
  if (!c) return <NotFoundInline />

  const f = {
    path: params.get('path') || '',
    people: params.get('people') || '',
    region: params.get('region') || '',
    faith: params.get('faith') || '',
    length: params.get('length') || '',
    offbeat: params.get('offbeat') === '1',
  }
  const all = packagesFor({ country: c.id })
  const facets = facetsFor(all)
  const list = packagesFor({ country: c.id, ...f })
  const set = (k, v) => { const next = new URLSearchParams(params); v ? next.set(k, v) : next.delete(k); setParams(next, { replace: true }) }
  const sites = sitesFor(c.id)

  return (
    <>
      <PageHero tone={c.tone} eyebrow={`${all.length} packages`} title={c.name} lead={c.headline} crumbs={[['/', 'Home'], ['/where-we-go', 'Where We Go'], [null, c.name]]} />
      <section className="section-tight">
        <div className="wrap narrow">
          <p className="lead">{c.intro}</p>
          {c.note && <p className="note">{c.note}</p>}
        </div>
      </section>
      <section style={{ paddingTop: 10 }}>
        <div className="wrap">
          <div className="chips">
            <button className={`chip ${!f.path ? 'on' : ''}`} onClick={() => set('path', '')}>All paths</button>
            {facets.paths.map((p) => <button key={p.id} className={`chip ${f.path === p.id ? 'on' : ''}`} onClick={() => set('path', p.id)}>{p.name}</button>)}
          </div>
          <div className="filters">
            <div><label htmlFor="f-people">People</label>
              <select id="f-people" value={f.people} onChange={(e) => set('people', e.target.value)}>
                <option value="">All peoples</option>{facets.peoples.map((x) => <option key={x}>{x}</option>)}
              </select></div>
            <div><label htmlFor="f-region">Region</label>
              <select id="f-region" value={f.region} onChange={(e) => set('region', e.target.value)}>
                <option value="">All regions</option>{facets.regions.map((x) => <option key={x}>{x}</option>)}
              </select></div>
            <div><label htmlFor="f-faith">Faith</label>
              <select id="f-faith" value={f.faith} onChange={(e) => set('faith', e.target.value)}>
                <option value="">All traditions</option>{facets.faiths.map((x) => <option key={x}>{x}</option>)}
              </select></div>
            <div><label htmlFor="f-length">Length</label>
              <select id="f-length" value={f.length} onChange={(e) => set('length', e.target.value)}>
                <option value="">Any length</option><option value="1">1 day</option><option value="2-3">2 to 3 days</option><option value="4">4 days or more</option>
              </select></div>
            <label className="check"><input type="checkbox" checked={f.offbeat} onChange={(e) => set('offbeat', e.target.checked ? '1' : '')} /> Off the beaten track only</label>
          </div>
          <p className="result-count">{list.length} {list.length === 1 ? 'package' : 'packages'}{list.length !== all.length && <> · <button className="chip" style={{ padding: '4px 12px' }} onClick={() => setParams({}, { replace: true })}>Clear filters</button></>}</p>
          <div className="grid">{list.map((p) => <PackageCard key={p.slug} p={p} />)}</div>
          {!list.length && <p className="muted">No packages match these filters. Try clearing one, or <Link to="/plan">ask us to build one</Link>.</p>}
        </div>
      </section>
      {sites.length > 0 && (
        <section style={{ paddingTop: 0 }}>
          <div className="wrap">
            <span className="eyebrow">Sacred, cultural and forgotten places</span>
            <h2>Places in {c.name} we bring back into the light</h2>
            <div className="table-wrap">
              <table className="simple">
                <thead><tr><th>Place</th><th>Region</th><th>Type</th><th>The story</th><th>Visit on</th></tr></thead>
                <tbody>{sites.map((s) => <tr key={s.name}><td><strong>{s.name}</strong></td><td>{s.region}</td><td>{s.type}</td><td>{s.story}</td><td><Link to={`/packages/${s.package}`}>View package</Link></td></tr>)}</tbody>
              </table>
            </div>
          </div>
        </section>
      )}
      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <span className="eyebrow">Peoples of {c.name}</span>
          <h2>Who you'll meet</h2>
          <PeopleLinks country={c.id} />
          <p style={{ marginTop: 18 }}><Link className="link-arrow" to={`/peoples?country=${c.id}`}>All peoples of {c.name} →</Link></p>
        </div>
      </section>
    </>
  )
}

export function PeopleLinks({ country, names }) {
  const list = names
    ? names.map(peopleRef).filter(Boolean)
    : facetsFor(packagesFor({ country })).peoples.map(peopleRef).filter(Boolean)
  return (
    <div className="profile-grid">
      {list.map((p) => <Link key={p.slug} to={`/peoples/${p.slug}`} className="profile-link"><strong>{p.name}</strong><span>{p.knownFor}</span></Link>)}
    </div>
  )
}

export function NotFoundInline() {
  usePageTitle('Not found')
  return <section><div className="wrap narrow"><h1>We couldn't find that page.</h1><p><Link className="link-arrow" to="/">Back home →</Link></p></div></section>
}

export const allPaths = paths
