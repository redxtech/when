<template>
  <box class="show">
    <div class="poster">
      <!--suppress HtmlUnknownTarget -->
      <img v-if="poster" :src="poster" :alt="title" />
      <img v-else src="../../assets/img/trakt-icon-red.svg" alt="trakt icon" />
    </div>
    <div class="details">
      <element-title size="2xl">{{ title }}</element-title>
      <span class="countdown">{{ countdown }}</span>
    </div>
  </box>
</template>

<script>
  import Box from '../../lib/elements/Box.vue'
  import ElementTitle from '../../lib/titles/ElementTitle.vue'

  export default {
    name: 'Show',
    components: { ElementTitle, Box },
    props: {
      slug: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        title: 'loading...',
        poster: undefined,
        countdown: '13d 20h 14m 48s'
      }
    },
    async mounted() {
      const show = await this.trakt.getShow(this.slug)
      console.log(show)

      const { title } = show

      // assign the show information to the state
      this.title = title
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
