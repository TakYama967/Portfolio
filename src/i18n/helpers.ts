import { Language, LANGUAGE_PREFIX, LANGUAGE_BLOCK } from '../types/language'

export const getLangBlockKey = (language: Language): string => LANGUAGE_BLOCK[language]

export const getLocalizedText = (obj: Record<string, any>, key: string, language: Language): string => {
  const prefix = LANGUAGE_PREFIX[language]
  if (prefix && obj[`${prefix}${key}`]) {
    return String(obj[`${prefix}${key}`])
  }
  if (obj[key]) {
    return String(obj[key])
  }
  if (obj[`japanese_${key}`]) return String(obj[`japanese_${key}`])
  if (obj[`spanish_${key}`]) return String(obj[`spanish_${key}`])
  if (obj[`german_${key}`]) return String(obj[`german_${key}`])
  return ''
}

export const getLocalizedArray = (obj: Record<string, any>, key: string, language: Language): string[] => {
  const prefix = LANGUAGE_PREFIX[language]
  if (prefix && Array.isArray(obj[`${prefix}${key}`])) {
    return obj[`${prefix}${key}`] as string[]
  }
  if (Array.isArray(obj[key])) {
    return obj[key] as string[]
  }
  if (Array.isArray(obj[`japanese_${key}`])) return obj[`japanese_${key}`] as string[]
  if (Array.isArray(obj[`spanish_${key}`])) return obj[`spanish_${key}`] as string[]
  if (Array.isArray(obj[`german_${key}`])) return obj[`german_${key}`] as string[]
  return []
}

export const getLangContent = (
  obj: Partial<Record<string, string>>,
  language: Language
): string => {
  const blockKey = LANGUAGE_BLOCK[language]
  return obj[blockKey] || obj.english || obj.japanese || ''
}

export const getLocalizedHighlight = (
  highlights: Record<string, string | number>,
  key: string,
  language: Language
): string => {
  const prefix = LANGUAGE_PREFIX[language]
  if (prefix && highlights[`${prefix}${key}`]) {
    return String(highlights[`${prefix}${key}`])
  }
  return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
