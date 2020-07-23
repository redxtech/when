<template>
  <div
    class="rounded shadow hover:shadow-lg overflow-hidden transition duration-150 ease-in-out"
    :class="{ 'p-4': !noPadding }"
  >
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
