export type Language = 'en' | 'es' | 'de' | 'ja'

export interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}

export const LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'ja', label: 'Japanese', nativeLabel: '日本語' },
]

export const LANGUAGE_PREFIX: Record<Language, string> = {
  en: '',
  es: 'spanish_',
  de: 'german_',
  ja: 'japanese_',
}

export const LANGUAGE_BLOCK: Record<Language, string> = {
  en: 'english',
  es: 'spanish',
  de: 'german',
  ja: 'japanese',
}

export const isValidLanguage = (value: string): value is Language =>
  ['en', 'es', 'de', 'ja'].includes(value)
