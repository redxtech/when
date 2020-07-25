<template>
  <div class="container" :class="{ 'flex-1': grow }">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'Container',
    props: {
      grow: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>

<style scoped>
  .container {
    @apply max-w-screen-2xl px-4;

    /* Small (sm) */
    @media (min-width: 640px) {
      @apply px-6;
    }

    /* Large (lg) */
    @media (min-width: 1024px) {
      @apply px-8;
    }
  }
</style>
