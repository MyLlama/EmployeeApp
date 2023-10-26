import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import './assets/icons/style.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives
})

app.use(vuetify)
app.use(createPinia())
app.use(vuetify)
app.use(router)
app.use(i18n)

app.mount('#app')
