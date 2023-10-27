import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    'Open Llama': 'Open Llama',
    'Enter your Username': 'Enter your Username',
    'Enter your Password': 'Enter your Password',
    'Enter Username': 'Enter Username',
    'Enter Password': 'Enter Password',
    'Remember me': 'Remember me',
    'Forgot Password?': 'Forgot Password?'
  }
}

const i18n = createI18n({
  locale: 'en', // Default locale
  messages
})

export default i18n
