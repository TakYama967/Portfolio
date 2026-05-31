import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray, getLocalizedHighlight } from '../utils/dataLoader'
import { useUIText } from '../i18n/ui'
import { fadeUp, staggerContainer, defaultViewport } from '../utils/animations'
import { Calendar, MapPin, Award, TrendingUp } from 'lucide-react'

const Experience: React.FC = () => {
  const { language } = useLanguage()
  const t = useUIText(language)
  const data = loadPortfolioData()
  const experienceData = data.experience
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen bg-transparent">
      <section className="section-padding ocean-bg pt-24">
        <div className="container-max">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            ref={ref}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="inline-block">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-cool mb-4">
                {getLocalizedText(experienceData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-gray-400 leading-relaxed mt-6">
              {t('experienceSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-surface-800/30">
        <div className="container-max">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {Object.entries(experienceData.career_highlights).map(([key, value]) => {
              if (key.startsWith('japanese_') || key.startsWith('spanish_') || key.startsWith('german_')) return null
              
              const label = getLocalizedHighlight(experienceData.career_highlights, key, language)
              
              return (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  className="text-center glass-card p-6"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-ocean-400 mb-2">
                    {value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {label}
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cool mb-4">
              {t('experienceTimeline')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-ocean-500/30 transform md:-translate-x-0.5" />
            
            <div className="space-y-12">
              {experienceData.timeline.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-ocean-500 rounded-full transform -translate-x-2 md:-translate-x-2 z-10 shadow-glow-ocean-sm" />
                  
                  <div className={`ml-12 md:ml-0 w-full md:w-1/2 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="card p-6"
                    >
                      <div className="flex items-center text-sm text-ocean-400 font-semibold mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        {getLocalizedText(experience, 'period', language)}
                      </div>

                      <h3 className="text-xl font-bold text-gray-100 mb-1">
                        {getLocalizedText(experience, 'position', language)}
                      </h3>
                      <h4 className="text-lg font-semibold text-ocean-400 mb-2">
                        {getLocalizedText(experience, 'company', language)}
                      </h4>

                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <MapPin className="w-4 h-4 mr-2" />
                        {getLocalizedText(experience, 'location', language)}
                      </div>

                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {getLocalizedText(experience, 'description', language)}
                      </p>

                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-100 mb-2 flex items-center">
                          <Award className="w-4 h-4 mr-2 text-ocean-400" />
                          {t('keyAchievements')}
                        </h5>
                        <ul className="space-y-1">
                          {getLocalizedArray(experience, 'key_achievements', language).map((achievement: string, achievementIndex: number) => (
                            <li key={achievementIndex} className="text-sm text-gray-400 flex items-start">
                              <span className="w-1.5 h-1.5 bg-ocean-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-semibold text-gray-100 mb-2 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-ocean-400" />
                          {t('technologies')}
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-ocean-500/20 text-ocean-300 text-xs font-medium rounded-full border border-ocean-500/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface-800/30">
        <div className="container-max">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cool mb-4">
              {t('specializations')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {experienceData.specializations.map((specialization) => (
              <motion.div
                key={specialization.area}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="card p-6 text-center"
              >
                <h3 className="text-lg font-semibold text-gray-100 mb-2">
                  {getLocalizedText(specialization, 'area', language)}
                </h3>
                <div className="text-sm text-ocean-400 font-medium">
                  {getLocalizedText(specialization, 'expertise_level', language)}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Experience
