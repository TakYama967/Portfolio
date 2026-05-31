import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { useUIText } from '../i18n/ui'
import { fadeUp, staggerContainer, defaultViewport } from '../utils/animations'
import { Star, Quote, ExternalLink, Calendar, MapPin } from 'lucide-react'

const Testimonials: React.FC = () => {
  const { language } = useLanguage()
  const t = useUIText(language)
  const data = loadPortfolioData()
  const testimonialsData = data.testimonials
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
                {getLocalizedText(testimonialsData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-gray-400 leading-relaxed mt-6">
              {t('testimonialsSubtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonialsData.testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                variants={fadeUp}
                whileHover={{ y: -5, scale: 1.02 }}
                className="card p-6 h-full flex flex-col"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 relative"
                  >
                    <img
                      src={testimonial.photo_url}
                      alt={getLocalizedText(testimonial, 'name', language)}
                      className="w-12 h-12 rounded-full object-cover shadow-glow-ocean-sm border border-ocean-500/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center">
                      <Quote className="w-3 h-3 text-white" />
                    </div>
                  </motion.div>
                  
                  <div className="flex-1">
                    <Quote className="w-6 h-6 text-ocean-500/40 mb-2" />
                    <p className="text-sm text-gray-300 leading-relaxed italic line-clamp-4">
                      "{getLocalizedText(testimonial, 'testimonial', language)}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 transition-all duration-300 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 flex-1">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-gray-100 mb-1">
                      {getLocalizedText(testimonial, 'name', language)}
                    </h3>
                    <p className="text-ocean-400 font-semibold text-sm">
                      {getLocalizedText(testimonial, 'position', language)}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {getLocalizedText(testimonial, 'company', language)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>{testimonial.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{getLocalizedText(testimonial, 'relationship', language)}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-200 mb-2">
                      {t('keyQualities')}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {getLocalizedArray(testimonial, 'key_qualities', language).slice(0, 3).map((quality: string, qualityIndex: number) => (
                        <span
                          key={qualityIndex}
                          className="px-2 py-1 bg-ocean-500/20 text-ocean-300 text-xs font-medium rounded-full border border-ocean-500/30"
                        >
                          {quality}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-200 mb-1">
                      {t('relatedProject')}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2">
                      {getLocalizedText(testimonial, 'project_context', language)}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <a
                      href={testimonial.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs text-ocean-400 hover:text-ocean-300 transition-all duration-300 hover:scale-105"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {t('viewOnLinkedIn')}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
