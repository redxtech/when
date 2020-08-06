<template>
  <h3 class="element-title" :class="fontStyle">
    <slot />
  </h3>
</template>

<script>
  export default {
    name: 'ElementTitle',
    props: {
      size: {
        type: String,
        required: false,
        default: 'base',
        validator: val =>
          [
            'xs',
            'sm',
            'base',
            'lg',
            'xl',
            '2xl',
            '3xl',
            '4xl',
            '5xl',
            '6xl'
          ].some(s => s === val)
      },
      bold: {
        type: Boolean,
        required: false,
        default: false
      }
    },
    computed: {
      fontStyle() {
        const sizes = [
          'xs',
          'sm',
          'base',
          'lg',
          'xl',
          '2xl',
          '3xl',
          '4xl',
          '5xl',
          '6xl'
        ]
        const index = sizes.indexOf(this.size)

        return [`text-${sizes[index]}`, this.bold ? 'font-bold' : 'font-medium']
      }
    }
  }
</script>

<style scoped>
  .element-title {
    @apply text-gray-900 leading-5;

    /* Small (sm) */
    @media (min-width: 640px) {
      @apply leading-7;
    }
  }
</style>
