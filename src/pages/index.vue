<template>
  <sec id="shows" main>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <show
        v-for="item in items"
        :key="item"
        title="Show Title"
        countdown="13d 20h 14m 48s"
        poster="https://fanart.tv/fanart/tv/289590/tvposter/mr-robot-56d567a4a9e94.jpg"
      />
    </div>
  </sec>
</template>

<script>
  import Sec from '../lib/layout/Sec.vue'
  import Show from '../components/show.vue'

  export default {
    name: 'Home',
    components: {
      Show,
      Sec
    },
    data() {
      return {
        items: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    }
  }
</script>
