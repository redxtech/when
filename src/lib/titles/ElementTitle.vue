<template>
  <h3 class="text-gray-900 leading-5 sm:leading-7" :class="fontStyle">
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
          ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'].some(
            s => s === val
          )
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

        return [
          `text-${sizes[index]}`,
          `sm:text-${sizes[index + 1]}`,
          this.bold ? 'font-bold' : 'font-medium'
        ]
      }
    }
  }
</script>
