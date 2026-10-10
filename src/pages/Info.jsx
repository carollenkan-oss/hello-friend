import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { countries, getPackage, getPeople, packages } from '../lib/api.js'
import { BRAND, waysToTravel, promiseToYou, promiseToHosts, askOfYou, faqs, howItWorks } from '../data/content.js'
import { PageHero, usePageTitle } from '../components/ui.jsx'

export function About() {
  usePageTitle('Our story')
  return (
    <>
      <PageHero tone="#5a2d5f" eyebrow="About us" title="We travel with the keepers of the story." crumbs={[['/', 'Home'], [null, 'About']]} />
      <section>
        <div className="wrap split">
          <div>
            <p className="lead">In much of Africa, the deepest knowledge has never lived in books. It lives in a grandmother naming the clans at the fireside, a court historian reciting the line of kings, a sheikh teaching verses in a Lamu doorway, a priest chanting in Ge'ez before dawn, a bandleader in Kinshasa who learned rumba from his father.</p>
            <p>We started {BRAND.name} because travellers kept passing these places without ever meeting those people. They saw the tomb but not its custodian, the drum but not the drummer, the cathedral but not the choir. Every journey we make is built around the keepers, and around the joy of actually being there.</p>
            <h3 style={{ marginTop: 32 }}>Our vision</h3>
            <p>To be Africa's most trusted house for journeys of faith, heritage and culture.</p>
            <h3>Our mission</h3>
            <p>To open Africa's sacred and cultural life to travellers with care, honesty and fairness, so that every journey leaves guest and host richer.</p>
          </div>
          <div>
            <span className="eyebrow">What guides us</span>
            <ul className="points">
              <li><strong>Reverence.</strong> Sacred places have rules older than tourism. We learn them and keep them.</li>
              <li><strong>Plurality.</strong> Many faiths, many peoples, many stories. We don't rank them and we don't flatten them.</li>
              <li><strong>Permission.</strong> We go where we're invited and step back where we're not.</li>
              <li><strong>Reciprocity.</strong> Every journey should leave the hosting community stronger.</li>
              <li><strong>Joy.</strong> Meaning and fun belong on the same journey.</li>
            </ul>
            <p className="muted" style={{ marginTop: 20 }}>Based in {BRAND.address}, travelling the continent. {BRAND.licence}.</p>
          </div>
        </div>
      </section>
    </>
  )
}

export function Plan() {
  usePageTitle('Plan a journey')
  const [params] = useSearchParams()
  const pkg = getPackage(params.get('package') || '')
  const people = getPeople(params.get('people') || '')
  const [sent, setSent] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(data).toString() })
    } catch { /* Netlify handles the form in production */ }
    setSent(true)
  }

  return (
    <>
      <PageHero tone="#3d5a1e" eyebrow="Plan a journey" title="Every journey begins with a conversation." lead="We start by listening: to what draws you, who you're travelling with, what you observe, and how deep you want to go." crumbs={[['/', 'Home'], [null, 'Plan']]} />
      <section>
        <div className="wrap split">
          <div>
            <span className="eyebrow">How it unfolds</span>
            <ol className="steps">{howItWorks.map(([h, t]) => <li key={h}><div><strong>{h}.</strong> {t}</div></li>)}</ol>
            <h3 style={{ marginTop: 40 }}>Ways to travel</h3>
            <div className="table-wrap">
              <table className="simple">
                <thead><tr><th>Package</th><th>Who it suits</th><th>Group</th><th>What sets it apart</th></tr></thead>
                <tbody>{waysToTravel.map((w) => <tr key={w.name}><td><strong>{w.name}</strong></td><td>{w.who}</td><td>{w.size}</td><td>{w.point}</td></tr>)}</tbody>
              </table>
            </div>
            <p className="note" style={{ marginTop: 24 }}><strong>For groups:</strong> congregations, mosque and temple communities, choirs, schools, universities and family reunions get a dedicated coordinator, instalment plans held in a separate client account, and schedules built around your observances.</p>
          </div>
          <div>
            {sent ? (
              <div className="note"><h3>Thank you.</h3><p>A real person will answer within 24 hours. Prefer WhatsApp? <a href={`https://wa.me/${BRAND.whatsapp}`}>Message us</a>.</p></div>
            ) : (
              <form name="enquiry" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={submit}>
                <input type="hidden" name="form-name" value="enquiry" />
                <p hidden><label>Leave empty <input name="bot-field" /></label></p>
                <div className="form-grid">
                  <div><label htmlFor="name">Name</label><input id="name" name="name" required /></div>
                  <div><label htmlFor="phone">Phone or WhatsApp</label><input id="phone" name="phone" /></div>
                  <div><label htmlFor="email">Email</label><input id="email" name="email" type="email" required /></div>
                  <div><label htmlFor="residence">Country of residence</label><input id="residence" name="residence" /></div>
                  <div><label htmlFor="who">Who's travelling</label>
                    <select id="who" name="who"><option>Individual</option><option>Couple</option><option>Family</option><option>Faith community</option><option>School or university</option><option>Other group</option></select></div>
                  <div><label htmlFor="size">Number of travellers</label><input id="size" name="size" type="number" min="1" /></div>
                  <div><label htmlFor="when">When</label><input id="when" name="when" placeholder="Month or dates" /></div>
                  <div><label htmlFor="country">Country of interest</label>
                    <select id="country" name="country" defaultValue={pkg?.country || people?.country || ''}><option value="">Not sure yet</option>{countries.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
                  <div className="full"><label htmlFor="package">Package</label>
                    <select id="package" name="package" defaultValue={pkg?.slug || ''}><option value="">Not sure yet / build something for me</option>{packages.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}</select></div>
                  <div className="full"><label htmlFor="observances">Faith or dietary observances, accessibility needs</label><input id="observances" name="observances" /></div>
                  <div className="full"><label htmlFor="message">Tell us in your own words what you're hoping for</label>
                    <textarea id="message" name="message" defaultValue={people ? `I'd like to visit the ${people.name}.` : ''} /></div>
                  <div className="full"><button className="btn" type="submit">Start the conversation</button></div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export function Promise() {
  usePageTitle('Our promise')
  return (
    <>
      <PageHero tone="#7a3b1d" eyebrow="Our promise" title="A guest is a responsibility." lead="Across the region, hospitality carries obligation on both sides: the host protects the guest, and the guest honours the house. We hold ourselves to both." crumbs={[['/', 'Home'], [null, 'Our promise']]} />
      <section>
        <div className="wrap">
          <h2>What we promise you</h2>
          <div className="facet-grid">{promiseToYou.map(([h, t]) => <div className="facet" key={h}><h4>{h}</h4><p>{t}</p></div>)}</div>
          <div className="split" style={{ marginTop: 56 }}>
            <div><h2>What we promise our hosts</h2><ul className="points">{promiseToHosts.map((x) => <li key={x}>{x}</li>)}</ul></div>
            <div><h2>What we ask of you</h2><ul className="points">{askOfYou.map((x) => <li key={x}>{x}</li>)}</ul></div>
          </div>
        </div>
      </section>
    </>
  )
}

export function Faq() {
  usePageTitle('FAQ')
  return (
    <>
      <PageHero tone="#1f5b5b" eyebrow="FAQ" title="Questions travellers ask us" crumbs={[['/', 'Home'], [null, 'FAQ']]} />
      <section><div className="wrap narrow faq">{faqs.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>
    </>
  )
}

export function Contact() {
  usePageTitle('Contact')
  return (
    <>
      <PageHero tone="#b5532f" eyebrow="Contact" title="Tell us what moves you." lead="Gathering a congregation? Planning a study programme? Searching for the village your grandmother left? Or just want to dance in Kinshasa? A real person answers every message." crumbs={[['/', 'Home'], [null, 'Contact']]} />
      <section>
        <div className="wrap split">
          <ul className="points">
            <li><strong>Office:</strong> {BRAND.address}</li>
            <li><strong>Call or WhatsApp:</strong> <a href={`https://wa.me/${BRAND.whatsapp}`}>{BRAND.phone}</a></li>
            <li><strong>Email:</strong> <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></li>
            <li><strong>Hours:</strong> Monday to Friday 8am to 6pm EAT, Saturday 9am to 1pm</li>
          </ul>
          <div><p className="lead">The quickest way to start is our planning form.</p><Link className="btn" to="/plan">Plan a journey</Link></div>
        </div>
      </section>
    </>
  )
}
