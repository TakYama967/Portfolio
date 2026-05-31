import React from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { useUIText } from '../i18n/ui'
import { 
  Github, 
  Linkedin, 
  ArrowUp,
  Heart
} from 'lucide-react'

const Footer: React.FC = () => {
  const { language } = useLanguage()
  const t = useUIText(language)
  const data = loadPortfolioData()
  const footerData = data.footer

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <footer className="relative z-10 border-t border-white/10 bg-surface-900/80 backdrop-blur-xl text-white">
      <div className="container-max py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-ocean-gradient rounded-lg flex items-center justify-center shadow-glow-ocean-sm">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <span className="font-bold text-xl">
                {t('nameShort')}
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              {t('footerBio')}
            </p>
            
            <div className="flex space-x-4">
              <a
                href="https://github.com/Ron114"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-ocean-500/20 hover:border-ocean-500/30 transition-all duration-200"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/kuroda-tatsuya-508276385/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-ocean-500/20 hover:border-ocean-500/30 transition-all duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {footerData.quick_links.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4 text-gray-100">
                {getLocalizedText(section, 'title', language)}
              </h3>
              <ul className="space-y-2">
                {getLocalizedArray(section, 'links', language).map((link: any, linkIndex: number) => (
                  <li key={linkIndex}>
                    {link.external ? (
                      <a
                        href={getLocalizedText(link, 'url', language)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-ocean-400 transition-colors duration-200"
                      >
                        {getLocalizedText(link, 'text', language)}
                      </a>
                    ) : (
                      <button
                        onClick={() => scrollToSection(getLocalizedText(link, 'url', language).replace('#', ''))}
                        className="text-gray-400 hover:text-ocean-400 transition-colors duration-200 text-left"
                      >
                        {getLocalizedText(link, 'text', language)}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-100">
              {t('stayUpdated')}
            </h3>
            <p className="text-gray-400 mb-4">
              {t('stayUpdatedDesc')}
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder={t('emailPlaceholder')}
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-ocean-500/50 focus:border-ocean-500/50 text-gray-100 placeholder-gray-500"
              />
              <button className="px-6 py-2 bg-ocean-500 hover:bg-ocean-400 rounded-r-lg transition-all duration-200 hover:shadow-glow-ocean-sm">
                {t('subscribe')}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-max py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              {t('copyright')}
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="/privacy-policy" className="hover:text-ocean-400 transition-colors duration-200">
                {t('privacyPolicy')}
              </a>
              <a href="/terms-of-service" className="hover:text-ocean-400 transition-colors duration-200">
                {t('termsOfService')}
              </a>
              <a href="/sitemap.xml" className="hover:text-ocean-400 transition-colors duration-200">
                {t('sitemap')}
              </a>
            </div>

            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -2 }}
              className="flex items-center space-x-2 text-gray-400 hover:text-ocean-400 transition-colors duration-200"
            >
              <span className="text-sm">
                {t('backToTop')}
              </span>
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      <div className="bg-surface-900 py-4 border-t border-white/5">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span>
                {t('lastUpdated')}: 2025-01-15
              </span>
              <span>•</span>
              <span>
                {t('version')}: 2.1.0
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Heart className="w-3 h-3 text-red-400" />
              <span>
                {t('madeInOsaka')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
