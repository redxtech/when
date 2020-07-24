import { createApp } from 'vue'
import App from './App.vue'

import router from './assets/js/router.js'
import store from './assets/js/store.js'
import traktMixin from './assets/js/traktMixin.js'
import './assets/css/tailwind.css'
import './assets/css/tt-norms.css'

createApp(App).use(router).use(store).use(traktMixin).mount('#app')
