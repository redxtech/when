<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <element-title size="xl">
            {{ title }} -
            <span class="remove" @click="remove">remove</span>
          </element-title>
          <span @click="close">
            <svg
              class="h-4 w-4 inline text-gray-400 hover:text-gray-500 transition duration-150 ease-in-out"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 96 320 320"
            >
              <path
                fill="currentColor"
                d="M207.6 256l107.72-107.72c6.23-6.23 6.23-16.34 0-22.58l-25.03-25.03c-6.23-6.23-16.34-6.23-22.58 0L160 208.4 52.28 100.68c-6.23-6.23-16.34-6.23-22.58 0L4.68 125.7c-6.23 6.23-6.23 16.34 0 22.58L112.4 256 4.68 363.72c-6.23 6.23-6.23 16.34 0 22.58l25.03 25.03c6.23 6.23 16.34 6.23 22.58 0L160 303.6l107.72 107.72c6.23 6.23 16.34 6.23 22.58 0l25.03-25.03c6.23-6.23 6.23-16.34 0-22.58L207.6 256z"
              ></path>
            </svg>
          </span>
        </header>
        <section class="modal-body">
          <div class="show-info">
            <p class="overview" v-text="overview" />
            <div class="poster">
              <!--suppress HtmlUnknownTarget -->
              <img v-if="poster" :src="poster" :alt="title" />
              <img v-else src="../../assets/img/trakt.png" alt="trakt icon" />
            </div>
          </div>
          <div class="links">
            <a :href="homepage" target="_blank">Homepage</a>
            <a :href="`http://www.imdb.com/title/${ids.imdb}`" target="_blank">
              IMDb
            </a>
            <a
              :href="`https://www.themoviedb.org/tv/${ids.tmdb}`"
              target="_blank"
            >
              TMDb
            </a>
            <a :href="`https://trakt.tv/shows/${ids.trakt}`" target="_blank">
              Trakt
            </a>
          </div>
          <div class="next-episode">
            <element-title size="lg">next episode:</element-title>
            <p>
              S{{ season.toString().padStart(2, '0') }}E{{
                episode.toString().padStart(2, '0')
              }}: {{ episodeTitle }}
            </p>
            <p>
              episode airs in:
              <countdown :aired="aired" :airing="airing" />
            </p>
            <element-title v-if="episodeOverview">description:</element-title>
            <div
              v-if="episodeOverview"
              class="overview"
              v-text="episodeOverview"
            />
          </div>
        </section>
        <footer class="modal-footer">
          <btn type="white" @click="close">close</btn>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapActions } from 'vuex'

  import Btn from '../../lib/elements/Btn.vue'
  import ElementTitle from '../../lib/titles/ElementTitle.vue'
  import Countdown from './countdown.vue'
  export default {
    name: 'ShowModal',
    components: { Countdown, ElementTitle, Btn },
    props: {
      slug: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      poster: {
        type: String,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      episodeTitle: {
        type: String,
        required: true
      },
      overview: {
        type: String,
        required: true
      },
      ids: {
        type: Object,
        required: true
      },
      homepage: {
        type: String,
        required: true
      },
      airing: {
        type: String,
        required: true
      },
      season: {
        type: Number,
        required: true
      },
      episode: {
        type: Number,
        required: true
      },
      episodeOverview: {
        type: String,
        required: true
      },
      aired: {
        type: Boolean,
        required: true
      }
    },
    emits: ['close'],
    methods: {
      close() {
        this.$emit('close')
      },
      remove() {
        this.removeShow(this.slug)
        this.$emit('close')
      },
      ...mapActions(['removeShow'])
    }
  }
</script>

<style>
  .modal-backdrop {
    @apply fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center transition-opacity duration-200 ease-in-out;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal {
    @apply w-144 bg-white p-4 flex flex-col;

    .modal-header {
      @apply flex items-center content-center justify-between;

      .remove {
        @apply text-red-500 cursor-pointer;

        &:hover {
          @apply text-red-700;
        }

        &:focus {
          @apply text-red-900;
        }
      }
    }

    .modal-body {
      @apply my-4;

      .show-info {
        @apply grid gap-4;

        grid-template-columns: auto auto;

        .poster {
          @apply flex-shrink-0;

          img {
            @apply h-48 object-cover rounded;
          }
        }
      }

      .links {
        @apply my-5 flex flex-row items-center content-center justify-between;

        a {
          @apply font-medium text-xl text-gray-900;

          &:hover {
            @apply underline;
          }
        }
      }

      .next-episode {
        p {
          @apply leading-none;

          &:first-child {
            @apply mt-2;
          }
        }

        .overview {
          /*@apply prose;*/
        }
      }
    }

    .modal-footer {
      @apply flex items-center content-center justify-end;
    }
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    opacity: 0;
  }
</style>
