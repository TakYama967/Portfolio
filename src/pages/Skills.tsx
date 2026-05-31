import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText } from '../utils/dataLoader'
import { useUIText } from '../i18n/ui'
import { fadeUp, staggerContainer, defaultViewport } from '../utils/animations'
import { 
  Code, 
  Server, 
  Cloud, 
  Brain,
  Star,
  Calendar,
  Award,
  TrendingUp
} from 'lucide-react'

const Skills: React.FC = () => {
  const { language } = useLanguage()
  const t = useUIText(language)
  const data = loadPortfolioData()
  const skillsData = data.skills
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const iconMap = {
    'paint-brush': Code,
    'server': Server,
    'cloud': Cloud,
    'brain': Brain,
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'text-green-400 bg-green-500/20 border-green-500/30'
      case 'Advanced':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30'
      case 'Intermediate':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'Beginner':
        return 'text-red-400 bg-red-500/20 border-red-500/30'
      default:
        return 'text-gray-400 bg-white/10 border-white/10'
    }
  }

  const getLevelPercentage = (level: string) => {
    switch (level) {
      case 'Expert':
        return 90
      case 'Advanced':
        return 75
      case 'Intermediate':
        return 60
      case 'Beginner':
        return 30
      default:
        return 50
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
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="inline-block">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient-cool mb-4">
                {getLocalizedText(skillsData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-gray-400 leading-relaxed mt-6">
              {t('skillsSubtitle')}
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
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-100 mb-4">
              {t('skillCategories')}
            </h2>
          </motion.div>

          <div className="space-y-16">
            {skillsData.categories.map((category, categoryIndex) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={defaultViewport}
                  transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                  className="card p-8"
                >
                  <div className="flex items-center mb-8">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center mr-6 border border-white/10"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <IconComponent 
                        className="w-8 h-8" 
                        style={{ color: category.color }}
                      />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-gray-100 mb-2">
                        {getLocalizedText(category, 'name', language)}
                      </h3>
                      <p className="text-gray-400">
                        {getLocalizedText(category, 'description', language)}
                      </p>
                    </div>
                  </div>

                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {category.skills.map((skill) => (
                      <motion.div
                        key={skill.name}
                        variants={fadeUp}
                        whileHover={{ scale: 1.02 }}
                        className="border border-white/10 rounded-lg p-6 hover:border-ocean-500/20 hover:shadow-glow-ocean-sm transition-all duration-300 bg-white/5"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-100">
                            {getLocalizedText(skill, 'name', language)}
                          </h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(skill.level)}`}>
                            {getLocalizedText(skill, 'level', language)}
                          </span>
                        </div>

                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                          {getLocalizedText(skill, 'description', language)}
                        </p>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400 flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {t('experienceLabel')}
                            </span>
                            <span className="font-medium text-gray-200">
                              {skill.years_experience} {t('years')}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-400 flex items-center">
                              <TrendingUp className="w-4 h-4 mr-2" />
                              {t('projectsUsed')}
                            </span>
                            <span className="font-medium text-gray-200">
                              {skill.projects_used}
                            </span>
                          </div>

                          <div>
                            <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                              <span>{t('proficiency')}</span>
                              <span>{getLevelPercentage(skill.level)}%</span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all duration-1000"
                                style={{
                                  width: `${getLevelPercentage(skill.level)}%`,
                                  backgroundColor: category.color,
                                }}
                              />
                            </div>
                          </div>

                          {skill.certifications.length > 0 && (
                            <div className="flex items-center text-sm">
                              <Award className="w-4 h-4 mr-2 text-yellow-400" />
                              <span className="text-gray-400">
                                {skill.certifications.length} {t('certifications')}
                              </span>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )
            })}
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
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cool mb-4">
              {t('skillLevels')}
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
            {skillsData.skill_levels.map((level) => (
              <motion.div
                key={level.level}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="card p-6 text-center"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10" style={{ backgroundColor: `${level.color}20` }}>
                  <Star className="w-8 h-8" style={{ color: level.color }} />
                </div>
                <h3 className="text-lg font-semibold text-gray-100 mb-2">
                  {getLocalizedText(level, 'level', language)}
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  {getLocalizedText(level, 'description', language)}
                </p>
                <div className="text-2xl font-mono font-bold" style={{ color: level.color }}>
                  {level.percentage}%
                </div>
              </motion.div>
            ))}
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
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient-cool mb-4">
              {t('learningGoals')}
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-400 mt-6">
              {t('learningGoalsDesc')}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={defaultViewport}
            className="grid md:grid-cols-3 gap-6"
          >
            {skillsData.learning_goals.map((goal) => (
              <motion.div
                key={goal.skill}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="card p-6"
              >
                <h3 className="text-lg font-semibold text-gray-100 mb-2">
                  {getLocalizedText(goal, 'skill', language)}
                </h3>
                <p className="text-gray-400 mb-4">
                  {getLocalizedText(goal, 'reason', language)}
                </p>
                <div className="text-sm text-ocean-400 font-medium">
                  {t('targetDate')}: {goal.target_date}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Skills
