import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLangContent } from '../utils/dataLoader'
import { fadeUp } from '../utils/animations'

const About: React.FC = () => {
  const { language } = useLanguage()
  const data = loadPortfolioData()
  const aboutData = data.about
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section className="section-padding ocean-bg pt-24">
        <div className="container-max">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            ref={ref}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeUp}
              className="inline-block"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-cool mb-4">
                {getLocalizedText(aboutData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full max-w-md mx-auto">
                <div className="aspect-square rounded-full overflow-hidden shadow-glow-ocean border-2 border-ocean-500/30">
                  <img
                    src="/avatar.png"
                    alt={getLocalizedText(aboutData.profile, 'name', language)}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-ocean-500 rounded-full animate-float shadow-glow-ocean-sm" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-japanese-gold rounded-full animate-float shadow-glow-ocean-sm" style={{ animationDelay: '1s' }} />
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <div className="text-center lg:text-left">
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-gray-100 mb-3">
                  {getLocalizedText(aboutData.profile, 'name', language)}
                </h2>
                <div className="inline-flex items-center px-4 py-2 bg-ocean-500/10 rounded-full border border-ocean-500/20">
                  <span className="text-lg text-ocean-400 font-heading font-semibold">
                    {getLocalizedText(aboutData.profile, 'title', language)}
                  </span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8">
                <p className="text-lg text-gray-300 leading-relaxed font-medium">
                  {getLangContent(aboutData.introduction, language)}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
