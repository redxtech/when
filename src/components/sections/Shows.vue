<template>
  <transition-group
    name="shows div"
    tag="div"
    class="shows grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    <show
      v-for="slug in slugs"
      :key="slug"
      :slug="slug"
    />
    <message
      v-if="loggedIn"
      key="when-logout"
      title="log out."
      message="click to log out."
      clickable
      @click="logout"
    />
    <message
      v-else
      key="when-login"
      title="log in."
      message="click to log in."
      :href="loginUrl"
    />
  </transition-group>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  import Message from '../elements/message.vue'
  import Show from '../elements/show.vue'

  export default {
    name: 'Shows',
    components: { Message, Show },
    data() {
      return {
        loggedIn: false,
        slugs: []
      }
    },
    computed: {
      loginUrl() {
        return this.trakt.getOAuthURL()
      },
      ...mapGetters(['token', 'refresh'])
    },
    async mounted() {
      // if the token is undefined, the user is logged out
      if (this.token === undefined) {
        this.loggedIn = false

        // get the default when list
        await this.useDefaultWhenList()

        // check for oauth code from redirect
        const { code } = this.$route.query

        // if there is a code, attempt to authenticate with it
        if (code) {
          // attempt to exchange the code for an oauth token
          const { token, refresh } = await this.trakt.getOAuthToken(code)

          // if it's successful, save the token to the store
          if (token) {
            this.setToken({ token, refresh })
            this.loggedIn = true

            // update the slugs list
            await this.updateSlugs()

            // after successful authentication clear the code from the url
            this.$router.push({ path: this.$route.path })
          }
        }
      } else {
        // if there is an oauth token check to see if it's valid
        if (await this.trakt.checkOAuthToken(this.token)) {
          // set the status to logged in
          this.loggedIn = true

          // check to see if the user already has a when list
          const userLists = await this.trakt.getUserLists(this.token)

          if (this.trakt.userHasWhenList(userLists)) {
            await this.updateSlugs()
          } else {
            // TODO: implement creation of user when list
            console.log('user does not have when list')
          }
        } else {
          // attempt to obtain a new token with the refresh token
          if (this.refresh) {
            const { token, refresh } = await this.trakt.refreshOAuthToken(
              this.refresh
            )

            // save the tokens to the store to trigger refresh
            this.setToken({ token, refresh })
          } else {
            this.invalidateToken()
          }
        }
      }
    },
    methods: {
      async updateSlugs() {
        // fetch the shows in the when list
        const shows = await this.trakt.getUserWhenListItems(this.token)

        // map the show information to an array of slugs
        this.slugs = shows.map(s => s.show.ids.slug)

        // TODO: add functionality to gracefully diff the slugs into the store
      },
      async useDefaultWhenList() {
        // fetch the shows in the default when list
        const shows = await this.trakt.getDefaultListItems()

        // map the show information to an array of slugs
        this.slugs = shows.map(s => s.show.ids.slug)

        // TODO: add functionality to gracefully diff the slugs into the store
      },
      async logout() {
        // revoke the token
        await this.trakt.revokeOAuthToken(this.token)
        this.invalidateToken()
        this.loggedIn = false

        // reset to default when list
        await this.useDefaultWhenList()
      },
      ...mapActions(['setToken', 'invalidateToken'])
    }
  }
</script>

<style scoped>
  .shows div {
    @apply transform transition-all ease-in-out duration-700;
  }
</style>
