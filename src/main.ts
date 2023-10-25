import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives
})

import App from './App.vue'
import router from './router'
import i18n from './i18n.ts'

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
