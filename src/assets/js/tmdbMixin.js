import TmdbAPI from './tmdb.js'

export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          tmdb: new TmdbAPI(import.meta.env.VITE_TMDB_KEY)
        }
      }
    })
  }
}
