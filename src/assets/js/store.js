import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import TraktAPI from './trakt.js'

const trakt = new TraktAPI(
  import.meta.env.VITE_TRAKT_API_KEY,
  import.meta.env.VITE_ORIGIN,
  import.meta.env.VITE_SERVER,
  import.meta.env.VITE_ENDPOINT
)

const vuexLocal = new VuexPersist({
  key: 'when',
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    token: undefined,
    refresh: undefined,
    slugs: [],
    order: {}
  },
  getters: {
    token: state => state.token,
    refresh: state => state.refresh,
    loggedIn: state => state.token !== undefined,
    slugs: state => state.slugs,
    sortedSlugs: state =>
      [...state.slugs].sort((a, b) =>
        state.order[a] > 0 && state.order[b] > 0
          ? state.order[a] - state.order[b]
          : state.order[b] - state.order[a]
      ),
    order: (state, slug) => {
      if (state.order.hasOwnProperty(slug)) {
        return state.order[slug]
      } else {
        return -2
      }
    }
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
    setSlugs: (state, slugs) => (state.slugs = slugs),
    setOrder: (state, { slug, order }) => (state.order[slug] = order)
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
    setSlugs: (ctx, slugs) => ctx.commit('setSlugs', slugs),
    setOrder: (ctx, payload) => ctx.commit('setOrder', payload),
    // functions
    login: async (ctx, code) => {
      try {
        // attempt to exchange the code for an oauth token
        const { token, refresh } = await trakt.getOAuthToken(code)

        // if it's successful, save the token to the store
        if (token) {
          await ctx.dispatch('setToken', { token, refresh })

          // update the slugs list
          return ctx.dispatch('updateSlugs')
        }
      } catch (err) {
        console.error(err)
      }
    },
    logout: async ctx => {
      try {
        // revoke the token
        await trakt.revokeOAuthToken(ctx.getters.token)
      } catch (err) {
        console.error(err)
      }

      await ctx.dispatch('invalidateToken')

      // reset to default when list
      return ctx.dispatch('setDefaultWhenList')
    },
    refreshToken: async ctx => {
      try {
        const { token, refresh } = await trakt.refreshOAuthToken(
          ctx.getters.refresh
        )

        // save the tokens to the store to trigger refresh
        return ctx.dispatch('setToken', { token, refresh })
      } catch (err) {
        console.error(err)

        return ctx.dispatch('invalidateToken')
      }
    },
    updateSlugs: async ctx => {
      try {
        // fetch the shows in the when list
        const shows = await trakt.getUserWhenListItems(ctx.getters.token)

        if (shows.length > 0) {
          // map the show information to an array of slugs
          return ctx.dispatch(
            'setSlugs',
            shows.map(s => s.show.ids.slug)
          )
        } else {
          return ctx.dispatch('setDefaultWhenList')
        }
      } catch (err) {
        console.error(err)

        return ctx.dispatch('setDefaultWhenList')
      }
    },
    removeShow: async (ctx, slug) => {
      try {
        const { deleted } = await trakt.removeShowFromUserWhenList(
          ctx.getters.token,
          slug
        )

        if (deleted.shows === 1) {
          await ctx.dispatch('removeSlugs', slug)
        }

        return deleted
      } catch (err) {
        console.error(err)
      }
    },
    setDefaultWhenList: async ctx => {
      try {
        // fetch the shows in the default when list
        const shows = await trakt.getDefaultListItems()

        // map the show information to an array of slugs
        return ctx.dispatch(
          'setSlugs',
          shows.map(s => s.show.ids.slug)
        )
      } catch (err) {
        console.error(err)

        return ctx.dispatch('setSlugs', [
          'mr-robot',
          'dave',
          'the-100',
          'euphoria-2019'
        ])
      }
    }
  },
  plugins: [vuexLocal.plugin]
})
