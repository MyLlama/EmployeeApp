import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router/index.ts'
import i18n from './i18n.ts'

// Since we will using global components everywhere, it is advisable to import them in main file
// Global components
import BaseButton from './components/BaseButton.vue'

const vuetify = createVuetify()
const app = createApp(App)
const pinia = createPinia()

app.component('BaseButton', BaseButton)
app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
