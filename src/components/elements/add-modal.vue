<template>
  <v-modal @close="$emit('close')">
    <template #header>add a show</template>
    <label for="slug" class="sr-only">show</label>
    <div class="add-show">
      <label for="slug">add a show</label>
      <div class="input">
        <div>
          <input
            id="slug"
            v-model="slug"
            class="form-input"
            :placeholder="trendingSlug"
          />
        </div>
        <button class="add-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              fill="currentColor"
              d="M368 224H224V80c0-8.84-7.16-16-16-16h-32c-8.84 0-16 7.16-16 16v144H16c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h144v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V288h144c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16z"
            ></path>
          </svg>
          <span @click="add">add</span>
        </button>
      </div>
    </div>
  </v-modal>
</template>

<script>
  import { mapActions } from 'vuex'

  import VModal from './v-modal.vue'

  export default {
    name: 'ShowModal',
    components: { VModal },
    emits: ['close'],
    data() {
      return {
        slug: '',
        trendingSlug: ''
      }
    },
    async mounted() {
      const trending = await this.trakt.getTrendingShows()

      const { show } = trending[0]

      this.trendingSlug = show.ids.slug
    },
    methods: {
      async add() {
        try {
          await this.trakt.getShow(this.slug)

          this.slug = ''

          return this.addShow(this.slug)
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
  .add-show {
    label {
      @apply block text-sm font-medium leading-5 text-gray-700;
    }

    .input {
      @apply mt-1 flex rounded-md shadow-sm;

      div {
        @apply relative flex-grow;

        &:focus-within {
          @apply z-10;
        }
      }

      .form-input {
        @apply block w-full rounded-none rounded-l-md transition ease-in-out duration-150;

        @media (min-width: 640px) {
          @apply text-sm leading-5;
        }
      }

      .add-button {
        @apply -ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 transition ease-in-out duration-150;

        &:hover {
          @apply text-gray-500 bg-white;
        }

        &:focus {
          @apply outline-none shadow-outline-blue border-blue-300;
        }

        &:active {
          @apply bg-gray-100 text-gray-700;
        }

        svg {
          @apply h-5 w-5 text-gray-400;
        }

        span {
          @apply ml-2;
        }
      }
    }
  }
</style>
