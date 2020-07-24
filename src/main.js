import { createApp } from 'vue'
import App from './App.vue'

import TraktAPI from './assets/js/trakt.js'
import router from './assets/js/router.js'
import store from './assets/js/store.js'
import './assets/css/tailwind.css'
import './assets/css/tt-norms.css'

const TraktMixin = {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          trakt: new TraktAPI(
            import.meta.env.VITE_TRAKT_API_KEY,
            import.meta.env.VITE_ORIGIN,
            import.meta.env.VITE_SERVER
          )
        }
      }
    })
  }
}

createApp(App).use(router).use(store).use(TraktMixin).mount('#app')
