<template>
  <header id="page-title" class="my-6 md:my-12 lg:my-18">
    <h1
      class="font-bold text-gray-900 text-2xl sm:text-3xl leading-7 sm:leading-9 sm:truncate"
    >
      <slot />
    </h1>
    <h3
      v-if="$slots.subtitle"
      class="text-gray-700 text-lg sm:text-xl leading-7 sm:leading-9 sm:truncate"
    >
      <slot name="subtitle" />
    </h3>
  </header>
</template>

<script>
  export default {
    name: 'PageTitle'
  }
</script>
