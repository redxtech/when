<template>
  <sec id="shows" main top>
    <shows />
  </sec>
</template>

<script>
  import Sec from '../lib/layout/Sec.vue'
  import Shows from '../components/sections/Shows.vue'

  export default {
    name: 'Home',
    components: {
      Sec,
      Shows
    }
  }
</script>
