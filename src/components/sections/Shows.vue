<template>
  <transition-group
    name="shows div"
    tag="div"
    class="shows grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    <show
      v-for="slug in sortedSlugs"
      :key="slug"
      :slug="slug"
      @open-modal="openModal"
    />
    <message
      v-if="!loggedIn"
      key="when-login"
      title="log in."
      message="log in to create your own list"
      :href="loginUrl"
    />
  </transition-group>
  <show-modal v-show="isModalVisible" v-bind="modalState" @close="closeModal" />
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  import Message from '../elements/message.vue'
  import Show from '../elements/show.vue'
  import ShowModal from '../elements/show-modal.vue'

  export default {
    name: 'Shows',
    components: { Message, Show, ShowModal },
    data() {
      return {
        isModalVisible: false,
        modalState: {
          slug: '',
          title: 'loading...',
          poster: '',
          status: '',
          episodeTitle: 'tba',
          overview: '',
          ids: {},
          homepage: '',
          airing: '',
          season: 0,
          episode: 0,
          episodeOverview: '',
          aired: false
        }
      }
    },
    computed: {
      loginUrl() {
        return this.trakt.getOAuthURL()
      },
      ...mapGetters(['token', 'refresh', 'loggedIn', 'sortedSlugs'])
    },
    async mounted() {
      // if the token is undefined, the user is logged out
      if (this.token === undefined) {
        // get the default when list
        await this.setDefaultWhenList()

        // check for oauth code from redirect
        const { code } = this.$route.query

        // if there is a code, attempt to authenticate with it
        if (code) {
          await this.login(code)

          // after successful authentication clear the code from the url
          this.$router.push({ path: this.$route.path })
        }
      } else {
        // if there is an oauth token check to see if it's valid
        if (await this.trakt.checkOAuthToken(this.token)) {
          try {
            // check to see if the user already has a when list
            const userLists = await this.trakt.getUserLists(this.token)

            if (this.trakt.userHasWhenList(userLists)) {
              await this.updateSlugs()
            } else {
              try {
                await this.trakt.createUserWhenList(this.token)
                await this.updateSlugs()
              } catch (err) {
                console.error(err)
              }
            }
          } catch (err) {
            console.error(err)

            await this.setDefaultWhenList()
          }
        } else {
          // attempt to obtain a new token with the refresh token
          if (this.refresh) {
            await this.refreshToken()
          } else {
            this.invalidateToken()
          }
        }
      }
    },
    methods: {
      openModal(modalState) {
        this.modalState = modalState
        this.isModalVisible = true
      },
      closeModal() {
        this.isModalVisible = false
      },
      ...mapActions([
        'invalidateToken',
        'login',
        'refreshToken',
        'updateSlugs',
        'setDefaultWhenList'
      ])
    }
  }
</script>

<style scoped>
  .shows div {
    @apply transform transition-all ease-in-out;

    &.div-move {
      @apply duration-700;
    }
  }
</style>
