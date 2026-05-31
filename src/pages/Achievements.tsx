import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { useUIText } from '../i18n/ui'
import { fadeUp, staggerContainer, defaultViewport } from '../utils/animations'
import { Award, Calendar, ExternalLink, Star } from 'lucide-react'

const Achievements: React.FC = () => {
  const { language } = useLanguage()
  const t = useUIText(language)
  const data = loadPortfolioData()
  const achievementsData = data.achievements
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
                {getLocalizedText(achievementsData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-gray-400 leading-relaxed mt-6">
              {t('achievementsSubtitle')}
            </p>
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
              {t('professionalAwards')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="space-y-8"
          >
            {achievementsData.professional_awards.map((award) => (
              <motion.div
                key={award.id}
                variants={fadeUp}
                whileHover={{ scale: 1.01 }}
                className="card p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center flex-shrink-0 border border-yellow-500/30">
                      <Award className="w-8 h-8 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-100 mb-2">
                        {getLocalizedText(award, 'title', language)}
                      </h3>
                      <p className="text-lg text-ocean-400 font-semibold mb-2">
                        {getLocalizedText(award, 'organization', language)}
                      </p>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        {award.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-3 py-1 bg-ocean-500/20 text-ocean-300 text-sm font-medium rounded-full border border-ocean-500/30">
                      {getLocalizedText(award, 'category', language)}
                    </span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {getLocalizedText(award, 'description', language)}
                </p>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-100 mb-2">
                      {t('relatedProject')}
                    </h4>
                    <p className="text-gray-400">
                      {getLocalizedText(award, 'project_related', language)}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-100 mb-2">
                      {t('impact')}
                    </h4>
                    <p className="text-gray-400">
                      {getLocalizedText(award, 'impact', language)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    <span>5.0</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    {award.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
              {t('certifications')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {achievementsData.certifications.map((cert) => (
              <motion.div
                key={cert.id}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="card p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-1">
                      {getLocalizedText(cert, 'name', language)}
                    </h3>
                    <p className="text-sm text-ocean-400 font-medium">
                      {getLocalizedText(cert, 'issuer', language)}
                    </p>
                  </div>
                  <Award className="w-6 h-6 text-yellow-400" />
                </div>

                <p className="text-gray-400 text-sm mb-4">
                  {getLocalizedText(cert, 'description', language)}
                </p>

                <div className="space-y-2 text-xs text-gray-500 mb-4">
                  <div className="flex justify-between">
                    <span>{t('earned')}:</span>
                    <span>{cert.date_earned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('expires')}:</span>
                    <span>{cert.expiry_date}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {getLocalizedArray(cert, 'skills_covered', language).map((skill: string, skillIndex: number) => (
                    <span
                      key={skillIndex}
                      className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={cert.verification_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-ocean-400 hover:text-ocean-300 transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('verify')}
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Achievements
