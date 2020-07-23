<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <show
      v-for="show in shows"
      :key="show.slug"
      :title="show.title"
      :countdown="show.countdown"
      :poster="show.poster"
    />
  </div>
</template>
<script>
  import Show from '../elements/show.vue'

  export default {
    name: 'Shows',
    components: { Show },
    data() {
      return {
        shows: [
          {
            slug: 'mr-robot',
            title: 'Mr. Robot',
            poster:
              'https://fanart.tv/fanart/tv/289590/tvposter/mr-robot-56d567a4a9e94.jpg',
            countdown: '13d 20h 14m 48s'
          },
          {
            slug: 'dave',
            title: 'Dave',
            poster:
              'https://fanart.tv/fanart/tv/354905/tvposter/dave-5e5d4c0541589.jpg',
            countdown: '13d 20h 14m 48s'
          },
          {
            slug: 'rick-and-morty',
            title: 'Rick and Morty',
            poster:
              'https://fanart.tv/fanart/tv/275274/tvposter/rick-and-morty-55baa82690863.jpg',
            countdown: '13d 20h 14m 48s'
          },
          {
            slug: 'euphoria-2019',
            title: 'Euphoria',
            poster:
              'https://fanart.tv/fanart/tv/360261/tvposter/euphoria-2019-5cf0f0e0b72bc.jpg',
            countdown: '13d 20h 14m 48s'
          },
          {
            slug: 'it-s-always-sunny-in-philadelphia',
            title: "It's Always Sunny in Philadelphia",
            poster:
              'https://fanart.tv/fanart/tv/75805/tvposter/its-always-sunny-in-philadelphia-5d63f8a60021a.jpg',
            countdown: '13d 20h 14m 48s'
          }
        ]
      }
    }
  }
</script>
