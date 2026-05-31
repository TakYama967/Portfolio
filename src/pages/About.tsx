import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray, getLangContent } from '../utils/dataLoader'
import { useUIText } from '../i18n/ui'
import { fadeUp, staggerContainer, defaultViewport } from '../utils/animations'
import { 
  Puzzle, 
  Code, 
  Users, 
  GraduationCap,
  Heart
} from 'lucide-react'

const About: React.FC = () => {
  const { language } = useLanguage()
  const t = useUIText(language)
  const data = loadPortfolioData()
  const aboutData = data.about
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const iconMap = {
    'puzzle-piece': Puzzle,
    'code': Code,
    'users': Users,
    'graduation-cap': GraduationCap,
  }

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

      {/* Professional Values */}
      <section className="section-padding bg-surface-800/30">
        <div className="container-max">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="text-center mb-20"
          >
            <div className="inline-block">
              <h2 className="text-4xl sm:text-5xl font-bold text-gradient-cool mb-4">
                {t('professionalValues')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mt-8 leading-relaxed">
              {t('professionalValuesDesc')}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {aboutData.professional_values.map((value) => {
              const IconComponent = iconMap[value.icon as keyof typeof iconMap] || Code
              
              return (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group glass-card p-8 text-center card-hover"
                >
                  <div className="w-20 h-20 bg-ocean-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 border border-ocean-500/20">
                    <IconComponent className="w-10 h-10 text-ocean-400" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-gray-100 mb-4">
                    {getLocalizedText(value, 'title', language)}
                  </h3>
                  <p className="text-gray-400 leading-relaxed text-sm">
                    {getLocalizedText(value, 'description', language)}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Personal Highlights */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="text-center mb-20"
          >
            <div className="inline-block">
              <h2 className="text-4xl sm:text-5xl font-bold py-2 text-gradient-cool mb-4">
                {t('personalHighlights')}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid md:grid-cols-3 gap-8"
          >
            {aboutData.personal_highlights.map((highlight) => (
              <motion.div
                key={highlight.category}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group glass-card p-8 card-hover"
              >
                <h3 className="text-xl font-heading font-bold text-gray-100 mb-6 flex items-center justify-center">
                  <div className="w-10 h-10 bg-pink-500/10 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300 border border-pink-500/20">
                    <Heart className="w-5 h-5 text-pink-400" />
                  </div>
                  {getLocalizedText(highlight, 'category', language)}
                </h3>
                <ul className="space-y-3">
                  {getLocalizedArray(highlight, 'items', language).map((item: string, itemIndex: number) => (
                    <li key={itemIndex} className="text-gray-400 flex items-start group-hover:text-gray-300 transition-colors duration-300">
                      <span className="w-2 h-2 bg-gradient-to-r from-ocean-500 to-blue-500 rounded-full mt-2 mr-3 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default About
