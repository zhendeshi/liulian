<template>
  <div class="news-wrap">
    <v-news></v-news>
  </div>
</template>

<script>
  import vNews from '../../../find/components/index/news'

  export default {
    name: "news",
    components: {
      vNews
    }
  }
</script>

<style scoped lang="less">
  .news-wrap{
    background: #ffffff;
    min-height: 100%;
    padding: 20px 12px 1px;
  }
</style>
