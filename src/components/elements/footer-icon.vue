<template>
  <a
    :href="href"
    :target="targetNotBlank ? '' : '_blank'"
    class="mx-3 text-gray-400 hover:text-gray-500"
  >
    <span class="sr-only" v-text="name" />
    <svg class="h-6 w-6" fill="currentColor" :viewBox="viewbox">
      <path fill="currentColor" :d="path" />
    </svg>
  </a>
</template>

<script>
  export default {
    name: 'FooterIcon',
    props: {
      name: {
        type: String,
        required: true
      },
      href: {
        type: String,
        required: true
      },
      targetNotBlank: {
        type: Boolean,
        required: false,
        default: false
      },
      path: {
        type: String,
        required: true
      },
      viewbox: {
        type: String,
        required: true
      }
    }
  }
</script>
