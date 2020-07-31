<template>
  <div v-if="shows.length" class="results">
    <div v-for="show in shows" :key="show.slug" class="show">
      <div @click="add(show.slug)">
        <!--suppress HtmlUnknownTarget -->
        <img
          v-if="show.poster"
          :src="show.poster"
          :alt="show.title"
          :title="show.title"
          class="poster"
        />
        <img
          v-else
          src="../../assets/img/trakt.png"
          :alt="show.title"
          :title="show.title"
          class="poster"
        />
      </div>
      <element-title size="sm" class="truncate w-full" :title="show.title">{{
        show.title
      }}</element-title>
      <a :href="`https://trakt.tv/shows/${show.slug}`" target="_blank">
        <svg
          class="open"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M497.6,0,334.4.17A14.4,14.4,0,0,0,320,14.57V47.88a14.4,14.4,0,0,0,14.69,14.4l73.63-2.72,2.06,2.06L131.52,340.49a12,12,0,0,0,0,17l23,23a12,12,0,0,0,17,0L450.38,101.62l2.06,2.06-2.72,73.63A14.4,14.4,0,0,0,464.12,192h33.31a14.4,14.4,0,0,0,14.4-14.4L512,14.4A14.4,14.4,0,0,0,497.6,0ZM432,288H416a16,16,0,0,0-16,16V458a6,6,0,0,1-6,6H54a6,6,0,0,1-6-6V118a6,6,0,0,1,6-6H208a16,16,0,0,0,16-16V80a16,16,0,0,0-16-16H48A48,48,0,0,0,0,112V464a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V304A16,16,0,0,0,432,288Z"
          ></path>
        </svg>
      </a>
    </div>
  </div>
  <div v-else class="not-found">
    <element-title v-if="search">no results found.</element-title>
    <element-title v-else>start typing to search.</element-title>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import ElementTitle from '../../lib/titles/ElementTitle.vue'

  export default {
    name: 'SearchResults',
    components: { ElementTitle },
    props: {
      search: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        results: [],
        posters: {}
      }
    },
    computed: {
      shows() {
        return this.results.map(s => {
          const slug = s.show.ids.slug

          return {
            title: s.show.title,
            slug,
            poster: this.posters[slug]
          }
        })
      }
    },
    watch: {
      async search() {
        try {
          const results = (await this.trakt.searchShows(this.search)).slice(
            0,
            8
          )

          this.results = results

          console.log(results)

          for (const show of results) {
            const {
              show: {
                ids: { slug, tmdb }
              }
            } = show

            if (tmdb) {
              const poster = await this.tmdb.getPoster(tmdb)

              if (poster) {
                this.posters[slug] = `https://image.tmdb.org/t/p/w500/${poster}`
              }
            } else {
              this.posters[slug] = undefined
            }
          }
        } catch {}
      }
    },
    methods: {
      async add(slug) {
        try {
          await this.trakt.getShow(slug)

          // TODO: show check mark on success or error on fail
          return this.addShow(slug)
        } catch (err) {
          console.error(err)

          console.log('show not found')
        }
      },
      ...mapActions(['addShow'])
    }
  }
</script>

<style scoped>
  .results {
    @apply grid grid-cols-4 gap-4 mt-4;

    .show {
      @apply flex flex-col items-center content-center justify-between text-center;

      .poster {
        @apply w-20 rounded cursor-pointer;
      }

      .open {
        @apply h-4 w-4 text-gray-500 transition duration-150 ease-in-out;

        &:hover {
          @apply text-gray-700;
        }
      }
    }
  }

  .not-found {
    @apply mt-4;
  }
</style>
