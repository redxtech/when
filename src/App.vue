<template>
  <router-view />
  <foot />
</template>

<script>
  import Foot from './components/Foot.vue'
  export default {
    name: 'App',
    components: { Foot }
  }
</script>
