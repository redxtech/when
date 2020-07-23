<template>
  <header id="page-title" class="page-title">
    <h1>
      <slot />
    </h1>
    <h3 v-if="$slots.subtitle">
      <slot name="subtitle" />
    </h3>
  </header>
</template>

<script>
  export default {
    name: 'PageTitle'
  }
</script>

<style scoped>
  .page-title {
    @apply my-6;

    /* Medium (md) */
    @media (min-width: 768px) {
      @apply my-12;
    }

    h1 {
      @apply font-bold text-gray-900 text-2xl leading-7;

      /* Small (sm) */
      @media (min-width: 640px) {
        @apply text-3xl leading-9 truncate;
      }
    }

    h3 {
      @apply text-gray-700 text-lg leading-7;

      /* Small (sm) */
      @media (min-width: 640px) {
        @apply text-xl leading-9 truncate;
      }
    }
  }
</style>
