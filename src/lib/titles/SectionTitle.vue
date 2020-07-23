<template>
  <h2
    class="font-bold text-gray-900 text-lg sm:text-xl leading-7 sm:leading-9 sm:truncate"
  >
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
