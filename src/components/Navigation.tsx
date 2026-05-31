import React, { useState, useEffect } from 'react'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../contexts/LanguageContext'
import { mobileMenuVariants, navItemVariants } from '../utils/animations'
import { LANGUAGES, Language } from '../types/language'
import { useUIText } from '../i18n/ui'

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { language, setLanguage } = useLanguage()
  const t = useUIText(language)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['home', 'about', 'experience', 'projects', 'skills', 'achievements', 'testimonials', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems: { id: string; label: string }[] = [
    { id: 'home', label: t('navHome') },
    { id: 'about', label: t('navAbout') },
    { id: 'experience', label: t('navExperience') },
    { id: 'projects', label: t('navProjects') },
    { id: 'skills', label: t('navSkills') },
    { id: 'contact', label: t('navContact') },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
    setIsOpen(false)
  }

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang)
    setLangOpen(false)
  }

  const currentLang = LANGUAGES.find((l) => l.code === language)!

  const isHomeTop = activeSection === 'home' && !scrolled

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-[100] px-3 sm:px-4 lg:px-6 pt-3 sm:pt-4 pointer-events-none"
    >
      <div
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 pointer-events-auto ${
          scrolled || isHomeTop
            ? 'glass shadow-glow-ocean-sm border-ocean-500/20 bg-white/10'
            : 'glass border-white/10 bg-black/30'
        }`}
      >
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-14 px-3 sm:px-4 lg:px-5 gap-2 lg:gap-3">
          <motion.button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-2 flex-shrink-0 min-w-0"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-8 h-8 bg-ocean-gradient rounded-lg flex items-center justify-center shadow-glow-ocean-sm flex-shrink-0">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="font-display font-bold text-sm lg:text-base text-white hidden md:block truncate max-w-[120px] lg:max-w-none">
              {t('nameShort')}
            </span>
          </motion.button>

          <div className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1 min-w-0 overflow-x-auto scrollbar-hide">
            {navigationItems.map((item) => {
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative flex-shrink-0 px-2 xl:px-2.5 py-1.5 text-[11px] xl:text-xs font-heading font-medium uppercase tracking-wide transition-colors duration-200 whitespace-nowrap"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-ocean-500/20 rounded-lg border border-ocean-500/30"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive ? 'text-ocean-400' : 'text-gray-300 hover:text-ocean-300'
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="flex items-center justify-end gap-1 sm:gap-2 flex-shrink-0">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 text-[11px] sm:text-xs font-medium text-gray-300 hover:text-ocean-400 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-white/5 whitespace-nowrap"
              >
                <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="uppercase">{currentLang.code}</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 z-50 min-w-[140px] glass rounded-xl border border-white/10 shadow-glow-ocean-sm overflow-hidden"
                    >
                      {LANGUAGES.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`block w-full text-left px-4 py-2.5 text-sm transition-colors duration-200 ${
                            language === lang.code
                              ? 'text-ocean-400 bg-ocean-500/10'
                              : 'text-gray-300 hover:text-ocean-300 hover:bg-white/5'
                          }`}
                        >
                          <span className="font-medium">{lang.nativeLabel}</span>
                          <span className="text-xs text-gray-500 ml-2 uppercase">{lang.code}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-ocean-400 hover:bg-white/5 transition-colors duration-200"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden overflow-hidden border-t border-white/10"
            >
              <div className="px-3 py-2 space-y-1">
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.id
                  return (
                    <motion.button
                      key={item.id}
                      variants={navItemVariants}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        isActive
                          ? 'text-ocean-400 bg-ocean-500/10 border border-ocean-500/20'
                          : 'text-gray-300 hover:text-ocean-300 hover:bg-white/5'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navigation
