<template>
  <box class="show">
    <div class="poster">
      <!--suppress HtmlUnknownTarget -->
      <img v-if="poster" :src="poster" :alt="title" />
      <img v-else src="../../assets/img/trakt-icon-red.svg" alt="trakt icon" />
    </div>
    <div class="details">
      <element-title size="2xl">{{ title }}</element-title>
      <span class="countdown">
        <countdown
          v-if="airing"
          :airing="airing"
          :aired="aired"
          @aired="onAired"
        />
        <template v-else-if="status === 'returning series'">
          next episode to be announced.
        </template>
        <template v-else>{{ status }}.</template>
      </span>
    </div>
  </box>
</template>

<script>
  import Box from '../../lib/elements/Box.vue'
  import ElementTitle from '../../lib/titles/ElementTitle.vue'
  import Countdown from './countdown.vue'

  export default {
    name: 'Show',
    components: { Countdown, ElementTitle, Box },
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    emits: ['order'],
    data() {
      return {
        title: 'loading...',
        poster: undefined,
        status: undefined,
        episodeTitle: 'tba',
        airing: undefined,
        season: undefined,
        episode: undefined,
        aired: false,
        currentDate: new Date()
      }
    },
    computed: {
      order() {
        const difference = +new Date(this.airing) - +this.currentDate

        if (this.airing && difference > 0) {
          return difference
        } else {
          return (
            {
              'returning series': -1,
              'in production': -2,
              planned: -3,
              canceled: -4,
              ended: -5,
              default: -2
            }?.[this.status] || -2
          )
        }
      }
    },
    watch: {
      order(curr) {
        this.$emit('order', curr)
      }
    },
    async mounted() {
      const {
        title,
        status,
        ids: { tmdb }
      } = await this.trakt.getShow(this.slug, true)
      const poster = await this.tmdb.getPosterPath(tmdb)

      // assign the show information to the state
      this.title = title
      this.poster = poster
      this.status = status

      // fetch the next episode
      await this.getNextEpisode()
    },
    methods: {
      onAired() {
        this.aired = true
        this.getNextEpisode()
      },
      async getNextEpisode() {
        // attempt to get the next episode
        const {
          title: episodeTitle,
          first_aired,
          season,
          number
        } = await this.trakt.getNextEpisode(this.slug)

        // if a new episode has aired switch the aired property
        if (this.airing !== first_aired) {
          this.aired = false
        }

        // assign the show information to the state after checking if it's valid
        if (episodeTitle) this.episodeTitle = episodeTitle
        this.airing = first_aired
        this.season = season
        this.number = number

        // refresh the date to update order
        this.refreshDate()
      },
      refreshDate() {
        this.currentDate = new Date()
      },
      pad(number) {
        return number.toString().padStart(2, '0')
      }
    }
  }
</script>

<style scoped>
  .show {
    @apply flex flex-row flex-no-wrap items-center content-center justify-start cursor-pointer;

    .poster {
      @apply w-20 flex-none;

      img {
        @apply object-cover rounded;
      }
    }

    .details {
      @apply h-full ml-4 flex-1 flex flex-col items-start justify-between;

      .countdown {
        @apply text-lg;
      }
    }
  }
</style>
