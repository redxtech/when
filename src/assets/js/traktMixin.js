import TraktAPI from './trakt.js'

export default {
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
