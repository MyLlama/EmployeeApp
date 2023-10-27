import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    Home: 'Home',
    Library: 'Library',
    Learning: 'Learning',
    Profile: 'Profile',
    Llama: 'Llama'
  }
}

const i18n = createI18n({
  locale: 'en', // Default locale
  messages
})

export default i18n
