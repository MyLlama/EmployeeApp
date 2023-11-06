import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/icons/style.css'
import '@mdi/font/css/materialdesignicons.css'
// import { VsxIcon } from 'vue-iconsax'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router/index.ts'
import i18n from './i18n.ts'

// Since we will using global components everywhere, it is advisable to import them in main file
// Global components
import BaseButton from './components/BaseButton.vue'

// Iconsax
import { VsxIcon } from 'vue-iconsax'

const vuetify = createVuetify({
  components,
  directives
})
const app = createApp(App)
const pinia = createPinia()

app.component('VsxIcon', VsxIcon)
app.component('BaseButton', BaseButton)
app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(i18n)
// app.component('VsxIcon', VsxIcon)
// Static usage of icons

app.mount('#app')
