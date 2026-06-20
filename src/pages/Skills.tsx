import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText } from '../utils/dataLoader'
import { useUIText } from '../i18n/ui'
import { fadeUp, staggerContainer, defaultViewport } from '../utils/animations'
import { Code, Server, Cloud, Brain } from 'lucide-react'

const Skills: React.FC = () => {
  const { language } = useLanguage()
  const t = useUIText(language)
  const data = loadPortfolioData()
  const skillsData = data.skills
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const iconMap = {
    'paint-brush': Code,
    server: Server,
    cloud: Cloud,
    brain: Brain,
  }

  const getLevelStyles = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25'
      case 'Advanced':
        return 'text-sky-300 bg-sky-500/10 border-sky-500/25'
      case 'Intermediate':
        return 'text-amber-300 bg-amber-500/10 border-amber-500/25'
      case 'Beginner':
        return 'text-rose-300 bg-rose-500/10 border-rose-500/25'
      default:
        return 'text-gray-300 bg-white/5 border-white/10'
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      <section className="section-padding ocean-bg pt-24">
        <div className="container-max">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            ref={ref}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-cool mb-4">
              {getLocalizedText(skillsData, 'title', language)}
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full" />
            <p className="text-lg text-gray-400 mt-6">{t('skillsSubtitle')}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max max-w-5xl">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="text-2xl sm:text-3xl font-heading font-bold text-gray-100 mb-10 text-center"
          >
            {t('skillCategories')}
          </motion.h2>

          <div className="space-y-10">
            {skillsData.categories.map((category, categoryIndex) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.5, delay: categoryIndex * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
                >
                  <div
                    className="flex items-center gap-4 px-6 py-5 border-b border-white/10"
                    style={{ borderLeftWidth: '4px', borderLeftColor: category.color }}
                  >
                    <div
                      className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${category.color}18` }}
                    >
                      <IconComponent className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-100">
                      {getLocalizedText(category, 'name', language)}
                    </h3>
                  </div>

                  <motion.ul
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                    className="divide-y divide-white/5"
                  >
                    {category.skills.map((skill) => (
                      <motion.li
                        key={skill.name}
                        variants={fadeUp}
                        className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors"
                      >
                        <span className="text-base font-medium text-gray-100">
                          {getLocalizedText(skill, 'name', language)}
                        </span>
                        <span
                          className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border ${getLevelStyles(skill.level)}`}
                        >
                          {getLocalizedText(skill, 'level', language)}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Skills
