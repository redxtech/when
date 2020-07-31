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
    <message
      v-else
      key="when-add"
      title="add a show."
      message="click to add a new show."
      @click="isAddModalVisible = true"
    >
      <template #poster>
        <svg
          class="w-12 text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          <path
            fill="currentColor"
            d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"
          ></path>
        </svg>
      </template>
    </message>
  </transition-group>
  <show-modal v-show="isModalVisible" v-bind="modalState" @close="closeModal" />
  <add-modal v-show="isAddModalVisible" @close="isAddModalVisible = false" />
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'

  import Message from '../elements/message.vue'
  import Show from '../elements/show.vue'
  import ShowModal from '../elements/show-modal.vue'
  import AddModal from '../elements/add-modal.vue'

  export default {
    name: 'Shows',
    components: { Message, Show, ShowModal, AddModal },
    data() {
      return {
        isModalVisible: false,
        isAddModalVisible: false,
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
