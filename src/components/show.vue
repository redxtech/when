<template>
  <box class="show">
    <div class="poster">
      <!--suppress HtmlUnknownTarget -->
      <img v-if="poster" :src="poster" :alt="title" />
      <img v-else src="../assets/img/trakt-icon-red.svg" alt="trakt icon" />
    </div>
    <div class="content">
      <element-title size="2xl">{{ title }}</element-title>
      <span class="countdown">{{ countdown }}</span>
    </div>
  </box>
</template>

<script>
  import Box from '../lib/elements/Box.vue'
  import ElementTitle from '../lib/titles/ElementTitle.vue'

  export default {
    name: 'Show',
    components: { ElementTitle, Box },
    props: {
      title: {
        type: String,
        required: true
      },
      poster: {
        type: String,
        required: false,
        default: ''
      },
      countdown: {
        type: String,
        required: true
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

    .content {
      @apply h-full ml-4 flex-1 flex flex-col items-start justify-between;

      .countdown {
        @apply text-lg;
      }
    }
  }
</style>
