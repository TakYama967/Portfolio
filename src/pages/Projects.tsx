import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { useUIText } from '../i18n/ui'
import { Project } from '../types/portfolio'
import { fadeUp, staggerContainer, defaultViewport } from '../utils/animations'
import { 
  ExternalLink, 
  Github, 
  Play, 
  X, 
  Calendar, 
  Clock, 
  Award,
  Lightbulb,
  CheckCircle
} from 'lucide-react'

const Projects: React.FC = () => {
  const { language } = useLanguage()
  const t = useUIText(language)
  const data = loadPortfolioData()
  const projectsData = data.projects
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const openProjectModal = (project: Project) => {
    setSelectedProject(project)
  }

  const closeProjectModal = () => {
    setSelectedProject(null)
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
                {getLocalizedText(projectsData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-gray-400 leading-relaxed mt-6">
              {t('projectsSubtitle')}
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
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projectsData.projects.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="card card-hover cursor-pointer overflow-hidden"
                onClick={() => openProjectModal(project)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={getLocalizedText(project, 'name', language)}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-3 py-1 bg-ocean-500/20 text-ocean-300 text-xs font-medium rounded-full border border-ocean-500/30">
                      {getLocalizedText(project, 'category', language)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-100 mb-2">
                    {getLocalizedText(project, 'name', language)}
                  </h3>

                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {getLocalizedText(project, 'description', language)}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center text-ocean-400 font-medium text-sm">
                    <span>{t('viewDetails')}</span>
                    <ExternalLink className="w-4 h-4 ml-2" />
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
              {t('projectCategories')}
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
            {projectsData.project_categories.map((category) => (
              <motion.div
                key={category.name}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="card p-6 text-center"
              >
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  {getLocalizedText(category, 'name', language)}
                </h3>
                <p className="text-gray-400 mb-4">
                  {getLocalizedText(category, 'description', language)}
                </p>
                <div className="text-2xl font-bold text-ocean-400">
                  {category.count} {t('projectsCount')}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10 shadow-glow-ocean"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedProject.images[0]}
                  alt={getLocalizedText(selectedProject, 'name', language)}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button
                  onClick={closeProjectModal}
                  className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors duration-200"
                >
                  <X className="w-6 h-6 text-gray-100" />
                </button>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="px-3 py-1 bg-ocean-500/20 text-ocean-300 text-sm font-medium rounded-full border border-ocean-500/30">
                        {getLocalizedText(selectedProject, 'category', language)}
                      </span>
                      <span className="px-3 py-1 bg-white/10 text-gray-300 text-sm font-medium rounded-full">
                        {getLocalizedText(selectedProject, 'status', language)}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-100 mb-2">
                      {getLocalizedText(selectedProject, 'name', language)}
                    </h2>
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {selectedProject.year}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {getLocalizedText(selectedProject, 'duration', language)}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  {getLocalizedText(selectedProject, 'description', language)}
                </p>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-ocean-400" />
                    {t('keyFeatures')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {getLocalizedArray(selectedProject, 'features', language).map((feature: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-ocean-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-orange-400" />
                      {t('challenges')}
                    </h3>
                    <p className="text-gray-300">
                      {getLocalizedText(selectedProject, 'challenges', language)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-green-400" />
                      {t('solutions')}
                    </h3>
                    <p className="text-gray-300">
                      {getLocalizedText(selectedProject, 'solutions', language)}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-100 mb-4">
                    {t('results')}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {getLocalizedArray(selectedProject, 'results', language).map((result: string, index: number) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="text-gray-300">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-100 mb-4">
                    {t('technologiesUsed')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-ocean-500/20 text-ocean-300 text-sm font-medium rounded-full border border-ocean-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {selectedProject.demo_url && (
                    <a
                      href={selectedProject.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex items-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {t('viewDemo')}
                    </a>
                  )}
                  {selectedProject.github_url && (
                    <a
                      href={selectedProject.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  )}
                  {selectedProject.live_url && (
                    <a
                      href={selectedProject.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex items-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      {t('liveSite')}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects
