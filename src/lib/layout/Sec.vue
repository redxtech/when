<template>
  <main v-if="main" :id="id" class="section" :class="{ top }">
    <slot />
  </main>
  <section v-else :id="id" class="section" :class="{ top }">
    <slot />
  </section>
</template>

<script>
  export default {
    name: 'Sec',
    props: {
      id: {
        type: String,
        required: true
      },
      main: {
        type: Boolean,
        required: false,
        default: false
      },
      top: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>

<style scoped>
	@reference "../../assets/css/tailwind.css";

  .section {
    @apply my-6;

    /* Medium (md) */
    @media (min-width: 768px) {
      @apply my-12;
    }

    &.top {
      margin-top: 0;
    }
  }
</style>
