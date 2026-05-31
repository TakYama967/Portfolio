import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useLanguage } from '../contexts/LanguageContext'
import { loadPortfolioData, getLocalizedText, getLocalizedArray } from '../utils/dataLoader'
import { useUIText } from '../i18n/ui'
import { ContactForm } from '../types/portfolio'
import { fadeUp, defaultViewport } from '../utils/animations'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  ChevronDown
} from 'lucide-react'
import toast from 'react-hot-toast'

const Contact: React.FC = () => {
  const { language } = useLanguage()
  const t = useUIText(language)
  const data = loadPortfolioData()
  const contactData = data.contact
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast.success(getLocalizedText(contactData.contact_form.submit_button, 'success_text', language))
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      budget: '',
      timeline: ''
    })
    setIsSubmitting(false)
  }

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
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
                {getLocalizedText(contactData, 'title', language)}
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-500 to-purple-500 mx-auto rounded-full"></div>
            </motion.div>
            <p className="text-xl text-gray-400 leading-relaxed mt-6">
              {getLocalizedText(contactData, 'description', language)}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              transition={{ delay: 0.2 }}
            >
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-gray-100 mb-6">
                  {t('sendMessage')}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {getLocalizedText(contactData.contact_form.fields[0], 'label', language)} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder={getLocalizedText(contactData.contact_form.fields[0], 'placeholder', language)}
                      className="input-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {getLocalizedText(contactData.contact_form.fields[1], 'label', language)} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder={getLocalizedText(contactData.contact_form.fields[1], 'placeholder', language)}
                      className="input-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {getLocalizedText(contactData.contact_form.fields[2], 'label', language)}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder={getLocalizedText(contactData.contact_form.fields[2], 'placeholder', language)}
                      className="input-dark"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {getLocalizedText(contactData.contact_form.fields[3], 'label', language)} *
                    </label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="input-dark appearance-none cursor-pointer"
                      >
                        <option value="">{t('selectSubject')}</option>
                        {getLocalizedArray(contactData.contact_form.fields[3], 'options', language).map((option: any, index: number) => (
                          <option key={index} value={option.value}>
                            {getLocalizedText(option, 'label', language)}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {getLocalizedText(contactData.contact_form.fields[4], 'label', language)} *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      placeholder={getLocalizedText(contactData.contact_form.fields[4], 'placeholder', language)}
                      className="input-dark resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {getLocalizedText(contactData.contact_form.fields[5], 'label', language)}
                      </label>
                      <div className="relative">
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="input-dark appearance-none cursor-pointer"
                        >
                          <option value="">{t('selectBudget')}</option>
                          {getLocalizedArray(contactData.contact_form.fields[5], 'options', language).map((option: any, index: number) => (
                            <option key={index} value={option.value}>
                              {getLocalizedText(option, 'label', language)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {getLocalizedText(contactData.contact_form.fields[6], 'label', language)}
                      </label>
                      <div className="relative">
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleInputChange}
                          className="input-dark appearance-none cursor-pointer"
                        >
                          <option value="">{t('selectTimeline')}</option>
                          {getLocalizedArray(contactData.contact_form.fields[6], 'options', language).map((option: any, index: number) => (
                            <option key={index} value={option.value}>
                              {getLocalizedText(option, 'label', language)}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{getLocalizedText(contactData.contact_form.submit_button, 'loading_text', language)}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{getLocalizedText(contactData.contact_form.submit_button, 'text', language)}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={defaultViewport}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <div className="card p-8">
                <h3 className="text-xl font-bold text-gray-100 mb-6">
                  {t('contactInformation')}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <Mail className="w-6 h-6 text-ocean-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-100">
                        {getLocalizedText(contactData.contact_info.email, 'label', language)}
                      </h4>
                      <p className="text-gray-300">{contactData.contact_info.email.address}</p>
                      <p className="text-sm text-gray-500">
                        {getLocalizedText(contactData.contact_info.email, 'description', language)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="w-6 h-6 text-ocean-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-100">
                        {getLocalizedText(contactData.contact_info.phone, 'label', language)}
                      </h4>
                      <p className="text-gray-300">{contactData.contact_info.phone.number}</p>
                      <p className="text-sm text-gray-500">
                        {getLocalizedText(contactData.contact_info.phone, 'description', language)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <MapPin className="w-6 h-6 text-ocean-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-100">
                        {getLocalizedText(contactData.contact_info.location, 'label', language)}
                      </h4>
                      <p className="text-gray-300">{contactData.contact_info.location.address}</p>
                      <p className="text-sm text-gray-500">
                        {getLocalizedText(contactData.contact_info.location, 'description', language)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="w-6 h-6 text-ocean-400 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-100">
                        {getLocalizedText(contactData.contact_info.timezone, 'label', language)}
                      </h4>
                      <p className="text-gray-300">{contactData.contact_info.timezone.zone}</p>
                      <p className="text-sm text-gray-500">
                        {getLocalizedText(contactData.contact_info.timezone, 'description', language)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-8">
                <h3 className="text-xl font-bold text-gray-100 mb-6">
                  {t('socialLinks')}
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {contactData.social_links.map((social) => {
                    const IconComponent = socialIcons[social.platform.toLowerCase() as keyof typeof socialIcons] || Mail
                    return (
                      <a
                        key={social.platform}
                        href={getLocalizedText(social, 'url', language)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-4 border border-white/10 rounded-lg hover:border-ocean-500/30 hover:bg-ocean-500/10 transition-all duration-200"
                      >
                        <IconComponent className="w-5 h-5 text-ocean-400" />
                        <div>
                          <div className="font-medium text-gray-100">
                            {getLocalizedText(social, 'platform', language)}
                          </div>
                          <div className="text-sm text-gray-400">
                            {getLocalizedText(social, 'username', language)}
                          </div>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </div>

              <div className="card p-8">
                <h3 className="text-xl font-bold text-gray-100 mb-4">
                  {t('availability')}
                </h3>
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-green-400">
                    {getLocalizedText(contactData.availability, 'status', language)}
                  </span>
                </div>
                <p className="text-gray-400 mb-4">
                  {getLocalizedText(contactData.availability, 'description', language)}
                </p>
                <div className="text-sm text-gray-500">
                  <p>{getLocalizedText(contactData.availability, 'response_time', language)}</p>
                  <p>{getLocalizedText(contactData.availability, 'working_hours', language)}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
