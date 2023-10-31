import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@mdi/font/css/materialdesignicons.css'
import { VsxIcon } from "vue-iconsax";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n.ts'

const vuetify = createVuetify({
  components,
  directives
})
const app = createApp(App)
const pinia = createPinia()

app.use(vuetify)
app.use(pinia)
app.use(router)
app.use(i18n)
app.component("VsxIcon", VsxIcon);
// Static usage of icons

app.mount('#app')
