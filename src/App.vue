<template>
  <page-header />
  <container grow>
    <router-view />
  </container>
  <foot />
</template>

<script>
  import Container from './lib/layout/Container.vue'
  import Foot from './components/sections/Foot.vue'
  import PageHeader from './components/sections/PageHeader.vue'

  export default {
    name: 'App',
    components: { Container, Foot, PageHeader }
  }
</script>

<style>
  html,
  body,
  #app {
    min-height: 100vh;
  }
  #app {
    @apply flex flex-col;
  }
</style>
