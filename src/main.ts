import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router/index.ts'
import i18n from './i18n.ts'
import '@mdi/font/css/materialdesignicons.css'
import { VBottomSheet } from 'vuetify/labs/VBottomSheet'

// Since we will using global components everywhere, it is advisable to import them in main file
// Global components
import BaseButton from './components/BaseButton.vue'

const vuetify = createVuetify({
  components: {
    ...components,
    VBottomSheet
  },
  directives
})
const app = createApp(App)
const pinia = createPinia()

app.component('BaseButton', BaseButton)
app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
