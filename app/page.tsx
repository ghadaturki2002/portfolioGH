import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Carousel from '@/components/fx/Carousel'
import Certifications from '@/components/Certifications'
import Education from '@/components/Education'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ConvergenceIntro from '@/components/fx/ConvergenceIntro'
import ConvergenceScroll from '@/components/ConvergenceScroll'
import ReadingProgress from '@/components/fx/ReadingProgress'

export default function Home() {
  return (
    <>
      <ConvergenceIntro />
      <ReadingProgress />
      <Header />
      <main id="main">
        <Hero />
        <ConvergenceScroll />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Carousel />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
