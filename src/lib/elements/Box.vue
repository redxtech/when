<template>
  <div class="box" :class="{ 'p-3': !noPadding }">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'Box',
    props: {
      noPadding: {
        type: Boolean,
        required: false,
        default: false
      }
    }
  }
</script>

<style scoped>
  .box {
    @apply rounded shadow-box overflow-hidden transition duration-150 ease-in-out;

    &:hover {
      @apply shadow-hover;
    }
  }
</style>
