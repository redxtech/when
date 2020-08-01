<template>
  <div v-if="shows.length" class="results">
    <div v-for="show in shows" :key="show.slug" class="show">
      <div class="poster" @click="add(show.slug)">
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

        <div class="overlay">
          <svg
            :ref="`svg-${show.slug}`"
            class="w-full text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              :ref="`path-${show.slug}`"
              fill="currentColor"
              d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"
            ></path>
          </svg>
        </div>
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
        posters: {},
        icon: ''
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

          for (const show of results) {
            const {
              show: {
                ids: { slug, tmdb }
              }
            } = show

            if (tmdb) {
              try {
                const poster = await this.tmdb.getPoster(tmdb)

                if (poster) {
                  this.posters[
                    slug
                  ] = `https://image.tmdb.org/t/p/w500/${poster}`
                }
              } catch {}
            } else {
              this.posters[slug] = undefined
            }
          }

          this.results = results
        } catch {}
      }
    },
    methods: {
      async add(slug) {
        const check =
          'M435.848 83.466L172.804 346.51l-96.652-96.652c-4.686-4.686-12.284-4.686-16.971 0l-28.284 28.284c-4.686 4.686-4.686 12.284 0 16.971l133.421 133.421c4.686 4.686 12.284 4.686 16.971 0l299.813-299.813c4.686-4.686 4.686-12.284 0-16.971l-28.284-28.284c-4.686-4.686-12.284-4.686-16.97 0z'
        const x =
          'M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z'
        const add =
          'M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z'

        const svg = this.$refs[`svg-${slug}`]
        const path = this.$refs[`path-${slug}`]

        try {
          await this.trakt.getShow(slug)

          // TODO: show check mark on success or error on fail
          await this.addShow(slug)

          svg.classList.add('text-green-400')

          path.setAttribute('d', check)

          setTimeout(() => {
            svg.classList.remove('text-green-400')
            path.setAttribute('d', add)
          }, 2000)
        } catch (err) {
          console.error(err)

          svg.classList.add('text-red-400')

          path.setAttribute('d', x)

          setTimeout(() => {
            svg.classList.remove('text-red-400')
            path.setAttribute('d', add)
          }, 2000)
        }
      },
      ...mapActions(['addShow'])
    }
  }
</script>

<style scoped>
  .results {
    @apply grid grid-cols-4 gap-6 mt-4;

    .show {
      @apply flex flex-col items-center content-center justify-between text-center;

      .poster {
        @apply relative;

        img {
          @apply w-full h-auto block rounded cursor-pointer opacity-100 transition-opacity duration-300 ease-in-out;

          &.opacity-100 {
            opacity: 1 !important;
          }
        }

        .overlay {
          @apply absolute top-0 left-0 opacity-0 text-center transition-opacity duration-300 ease-in-out;

          svg {
            @apply p-6 pt-12;
          }
        }

        &:hover {
          img {
            @apply opacity-50;
          }

          .overlay {
            @apply opacity-100;
          }
        }
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
