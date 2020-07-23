<template>
  <main v-if="main" :id="id" class="section">
    <slot />
  </main>
  <section v-else :id="id" class="section">
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
      }
    }
  }
</script>

<style scoped>
  .section {
    @apply my-6;

    /* Medium (md) */
    @media (min-width: 768px) {
      @apply my-12;
    }

    /* Large (lg) */
    @media (min-width: 1024px) {
      @apply my-18;
    }
  }
</style>
