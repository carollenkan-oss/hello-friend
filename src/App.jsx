import { Routes, Route } from 'react-router-dom'
import { Header, Footer, ScrollToTop } from './components/ui.jsx'
import Home from './pages/Home.jsx'
import { PathPage, WhereWeGo, CountryPage, NotFoundInline } from './pages/Browse.jsx'
import { PackagePage, PeoplesIndex, PeoplePage } from './pages/Detail.jsx'
import { About, Plan, Promise, Faq, Contact } from './pages/Info.jsx'

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/where-we-go" element={<WhereWeGo />} />
          <Route path="/paths/:pathId" element={<PathPage />} />
          <Route path="/countries/:countryId" element={<CountryPage />} />
          <Route path="/packages/:slug" element={<PackagePage />} />
          <Route path="/peoples" element={<PeoplesIndex />} />
          <Route path="/peoples/:slug" element={<PeoplePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/promise" element={<Promise />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFoundInline />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
