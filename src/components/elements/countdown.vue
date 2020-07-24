<template>
  {{ airing }}
</template>

<script>
  export default {
    name: 'Countdown',
    props: {
      airing: {
        type: String,
        required: true
      }
    }
  }
</script>
