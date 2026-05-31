import React, { useState, useEffect } from 'react'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp } from '../utils/animations'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLangBlockKey } from '../utils/dataLoader'
import { useUIText } from '../i18n/ui'
import { OceanBackground } from '../types/portfolio'

const Home: React.FC = () => {
  const { language } = useLanguage()
  const t = useUIText(language)
  const [currentBackground, setCurrentBackground] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const data = loadPortfolioData()
  const homeData = data.home

  const backgrounds: OceanBackground[] = homeData.ocean_backgrounds

  const langBlock = homeData.languages[getLangBlockKey(language) as keyof typeof homeData.languages] ?? homeData.languages.english

  useEffect(() => {
    setIsLoaded(true)
    
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length)
    }, homeData.rotation_settings.interval_seconds * 1000)

    return () => clearInterval(interval)
  }, [backgrounds.length, homeData.rotation_settings.interval_seconds])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ocean Backgrounds */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBackground}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: homeData.rotation_settings.transition_duration }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${backgrounds[currentBackground].image_url})`,
            }}
          />
        </AnimatePresence>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-surface-900/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="container-max text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white mb-6"
            >
              <span className="block text-gradient-cool py-3">
                {langBlock.title}
              </span>
            </motion.h1>

            <motion.h2
              variants={fadeUp}
              className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-8 font-heading font-medium"
            >
              {langBlock.subtitle}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {langBlock.description}
            </motion.p>

            <motion.div variants={fadeUp}>
              <button
                onClick={scrollToProjects}
                className="inline-flex items-center space-x-2 bg-ocean-500/90 text-white px-8 py-4 rounded-full font-heading font-semibold text-lg hover:bg-ocean-400 transition-all duration-300 hover:scale-105 shadow-glow-ocean border border-ocean-400/30"
              >
                <span>{langBlock.cta.text}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <button
          onClick={scrollToProjects}
          className="flex flex-col items-center space-y-2 text-white/80 hover:text-white transition-colors duration-300"
        >
          <span className="text-sm font-medium text-white/80">
            {t('scroll')}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </button>
      </motion.div>

      {/* Background Indicators */}
      <div className="absolute bottom-8 right-8 z-10">
        <div className="flex space-x-2">
          {backgrounds.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBackground(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentBackground
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Background Info */}
      <div className="absolute bottom-8 left-8 z-10 text-white/80">
        <div className="text-sm">
          <p className="font-medium">
            {backgrounds[currentBackground].name}
          </p>
          <p className="text-xs opacity-75">
            {backgrounds[currentBackground].description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home
