import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

// Components
import AmbientBackground from './components/AmbientBackground'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Skills from './pages/Skills'
import Achievements from './pages/Achievements'
import Testimonials from './pages/Testimonials'
import Contact from './pages/Contact'
import Footer from './components/Footer'

// Context
import { LanguageProvider } from './contexts/LanguageContext'

// Types
import { Language, isValidLanguage } from './types/language'

function App() {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('portfolio-language')
    if (savedLanguage && isValidLanguage(savedLanguage)) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('portfolio-language', newLanguage)
  }

  return (
    <LanguageProvider value={{ language, setLanguage: handleLanguageChange }}>
      <div className="relative min-h-screen bg-surface-900 text-gray-100">
        <AmbientBackground />
        <Navigation />
        
        <main className="relative z-10 overflow-x-hidden">
          <section id="home">
            <Home />
          </section>
          <section id="about">
            <About />
          </section>
          <section id="experience">
            <Experience />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="skills">
            <Skills />
          </section>
          <section id="achievements">
            <Achievements />
          </section>
          <section id="testimonials">
            <Testimonials />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </main>
        
        <Footer />
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </div>
    </LanguageProvider>
  )
}

export default App
