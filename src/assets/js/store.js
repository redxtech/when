import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

// TODO: move some api calls to the store

const vuexLocal = new VuexPersist({
  key: 'when',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    token: undefined,
    refresh: undefined,
    slugs: []
  },
  getters: {
    token: state => state.token,
    refresh: state => state.refresh,
    loggedIn: state => state.token !== undefined,
    slugs: state => state.slugs
  },
  mutations: {
    setToken: (state, token) => (state.token = token),
    setRefresh: (state, refresh) => (state.refresh = refresh),
    invalidateToken: state => (state.token = undefined),
    invalidateRefresh: state => (state.refresh = undefined),
    addSlugs: (state, slugs) => {
      if (Array.isArray(slugs)) {
        for (const slug of slugs) {
          if (!state.slugs.includes(slug)) {
            state.slugs.push(slug)
          }
        }
      } else {
        state.slugs.push(slugs)
      }
    },
    removeSlugs: (state, slugs) => {
      if (Array.isArray(slugs)) {
        state.slugs = state.slugs.filter(s => slugs.some(slug => slug === s))
      } else {
        const index = state.slugs.indexOf(slugs)
        if (index > -1) {
          state.slugs.splice(index, 1)
        }
      }
    },
    setSlugs: (state, slugs) => (state.slugs = slugs)
  },
  actions: {
    setToken: (ctx, { token, refresh }) => {
      ctx.commit('setToken', token)
      ctx.commit('setRefresh', refresh)
    },
    invalidateToken: ctx => {
      ctx.commit('invalidateToken')
      ctx.commit('invalidateRefresh')
    },
    addSlugs: (ctx, slugs) => ctx.commit('addSlugs', slugs),
    removeSlugs: (ctx, slugs) => ctx.commit('removeSlugs', slugs),
    setSlugs: (ctx, slugs) => ctx.commit('setSlugs', slugs)
  },
  plugins: [vuexLocal.plugin]
})
