<template>
  {{ countdown }}
</template>

<script>
  export default {
    name: 'Countdown',
    props: {
      airing: {
        type: String,
        required: true
      },
      aired: {
        type: Boolean,
        required: true
      }
    },
    emits: ['aired'],
    data() {
      return {
        currentDate: new Date(),
        interval: undefined
      }
    },
    computed: {
      countdown() {
        const difference = +new Date(this.airing) - +this.currentDate

        if (difference > 0) {
          const parts = {
            d: Math.floor(difference / (1000 * 60 * 60 * 24)),
            h: Math.floor((difference / (1000 * 60 * 60)) % 24),
            m: Math.floor((difference / 1000 / 60) % 60),
            s: Math.floor((difference / 1000) % 60)
          }

          return Object.keys(parts)
            .map(part => {
              if (!parts[part]) return
              return `${parts[part]}${part}`
            })
            .join(' ')
        } else {
          if (!this.aired) {
            this.$emit('aired')
          }

          return 'the episode has aired.'
        }
      }
    },
    mounted() {
      this.interval = setInterval(() => {
        this.currentDate = new Date()
      }, 1000)
    },
    beforeUnmount() {
      clearInterval(this.interval)
    }
  }
</script>
