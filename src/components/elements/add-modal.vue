<template>
  <v-modal @close="$emit('close')">
    <template #header>add a show</template>
    <label for="search" class="sr-only">show</label>
    <div class="add-show">
      <label for="search">search for a show:</label>
      <div class="input">
        <input
          id="search"
          ref="search"
          v-model="search"
          class="form-input"
          :placeholder="`ex: ${trending.toLowerCase()}`"
        />
      </div>
      <search-results :search="search" />
    </div>
  </v-modal>
</template>

<script>
  import VModal from './v-modal.vue'
  import SearchResults from './search-results.vue'

  export default {
    name: 'ShowModal',
    components: { SearchResults, VModal },
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    emits: ['close'],
    data() {
      return {
        search: '',
        trending: ''
      }
    },
    watch: {
      show(curr) {
        if (curr) {
          this.$nextTick(() => {
            this.$refs.search.focus()
          })
        }
      }
    },
    async mounted() {
      const trending = await this.trakt.getTrendingShows()

      const { show } = trending[0]

      this.trending = show.title
    }
  }
</script>

<style scoped>
	@reference "../../assets/css/tailwind.css";

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
        @apply block w-full;

        @media (min-width: 640px) {
          @apply text-sm leading-5;
        }
      }
    }
  }
</style>
