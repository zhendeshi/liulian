<template>
  <div class="wrap">
    <div class="listbox flex-sb">
      <div class="item" v-for="(item,index) in navIcon" :key="index" @click="$linkUrl(item.url)">
        <img :src="$formatImg(item.pic)">
        <div>{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "navIcon",
    props: ['navIcon'],
    data() {
      return {}
    },
  }
</script>

<style scoped lang="less">
  .wrap {
    .listbox {
      padding: 0 12px;

      .item {
        text-align: center;

        img {
          width: 48px;
          height: 48px;
        }

        div {
          margin-top: 8px;
          font-size: 12px;
        }
      }
    }
  }
</style>
