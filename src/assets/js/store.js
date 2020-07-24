import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexLocal = new VuexPersist({
  key: 'when',
  storage: window.localStorage
})

// TODO: store token expiry date as well

export default new Vuex.Store({
  state: {
    token: undefined,
    refresh: undefined
    // slugs: []
  },
  getters: {
    token: state => state.token,
    refresh: state => state.refresh
  },
  mutations: {
    setToken: (state, token) => (state.token = token),
    setRefresh: (state, refresh) => (state.refresh = refresh),
    invalidateToken: state => (state.token = undefined),
    invalidateRefresh: state => (state.refresh = undefined)
  },
  actions: {
    setToken: (ctx, { token, refresh }) => {
      ctx.commit('setToken', token)
      ctx.commit('setRefresh', refresh)
    },
    invalidateToken: ctx => {
      ctx.commit('invalidateToken')
      ctx.commit('invalidateRefresh')
    }
  },
  plugins: [vuexLocal.plugin]
})
