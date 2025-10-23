<template>
  <a :href="href" :target="targetNotBlank ? '' : '_blank'" class="icon">
    <span class="sr-only" v-text="name" />
    <svg fill="currentColor" :viewBox="viewbox">
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

<style scoped>
	@reference "../../assets/css/tailwind.css";

  .icon {
    @apply mx-3 text-gray-400;

    &:hover {
      @apply text-gray-500;
    }

    svg {
      @apply h-6 w-6;
    }
  }
</style>
