import Header, { SkipLink } from '@/components/Header'
import Intro from '@/components/Intro'
import Hero from '@/components/Hero'
import Pitch from '@/components/Pitch'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Certifications from '@/components/Certifications'
import Education from '@/components/Education'
import Engagements from '@/components/Engagements'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

/*
 * Ordre de lecture pensé pour un recruteur pressé :
 * qui (hero) → pourquoi elle (accroche) → profil → preuves (projets) → parcours
 * → outils → validations → formation → international → contact.
 * Sections numérotées de 01 à 08 sans trou (voir SHEETS dans components/ui/kit.tsx).
 */
export default function Home() {
  return (
    <>
      <SkipLink />
      <Intro />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Pitch />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <Education />
        <Engagements />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
