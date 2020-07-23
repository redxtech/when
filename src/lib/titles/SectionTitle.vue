<template>
  <h2 class="section-title">
    <slot />
  </h2>
</template>

<script>
  // TODO: potentially add subtitle option
  // TODO: add margins

  export default {
    name: 'SectionTitle'
  }
</script>

<style scoped>
  .section-title {
    @apply font-bold text-gray-900 text-lg leading-7;

    /* Small (sm) */
    @media (min-width: 640px) {
      @apply text-xl leading-9 truncate;
    }
  }
</style>
