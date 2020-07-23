<template>
  <sec id="shows" main top>
    <shows />
  </sec>
</template>

<script>
  import Sec from '../lib/layout/Sec.vue'
  import Shows from '../components/shows.vue'

  export default {
    name: 'Home',
    components: {
      Sec,
      Shows
    }
  }
</script>
