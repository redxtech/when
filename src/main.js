import { createApp } from 'vue'
import App from './App.vue'

import router from './assets/js/router.js'
import './assets/css/tailwind.css'
import './assets/css/tt-norms.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
