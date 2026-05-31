// Data loading utilities
import homeData from '../../portfolio/home.json'
import aboutData from '../../portfolio/about.json'
import experienceData from '../../portfolio/experience.json'
import projectsData from '../../portfolio/projects.json'
import skillsData from '../../portfolio/skills.json'
import achievementsData from '../../portfolio/achievements.json'
import testimonialsData from '../../portfolio/testimonials.json'
import blogData from '../../portfolio/blog.json'
import galleryData from '../../portfolio/gallery.json'
import contactData from '../../portfolio/contact.json'
import footerData from '../../portfolio/footer.json'

export {
  getLocalizedText,
  getLocalizedArray,
  getLangBlockKey,
  getLangContent,
  getLocalizedHighlight,
} from '../i18n/helpers'

export const loadPortfolioData = () => {
  return {
    home: homeData,
    about: aboutData,
    experience: experienceData,
    projects: projectsData,
    skills: skillsData,
    achievements: achievementsData,
    testimonials: testimonialsData,
    blog: blogData,
    gallery: galleryData,
    contact: contactData,
    footer: footerData,
  }
}
