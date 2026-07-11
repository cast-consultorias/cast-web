import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import ValueProps from './components/ValueProps'
import Methodology from './components/Methodology'
import Services from './components/Services'
import ESG from './components/ESG'
import Founder from './components/Founder'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Blueprint from './pages/Blueprint'

function HomePage() {
  return (
    <div className="min-h-screen bg-cast-dark">
      <Navbar />
      <Hero />
      <Stats />
      <ValueProps />
      <Methodology />
      <Services />
      <ESG />
      <Founder />
      <CTA />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blueprint" element={<Blueprint />} />
    </Routes>
  )
}
