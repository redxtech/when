<template>
  <div class="box" :class="{ 'p-4': !noPadding }">
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
    @apply rounded shadow overflow-hidden transition duration-150 ease-in-out;

    &:hover {
      @apply shadow-lg;
    }
  }
</style>
