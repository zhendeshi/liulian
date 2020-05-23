<template>
  <div class="wrap" :class="[dayStydy?'dayStydy':'nightStydy']">
    <div class="listbox flex-sb">
      <div class="item" v-for="(item,index) in navIcon" :key="index"  @click="$linkUrl(item.url)">
          <img :src="$formatImg(item.pic)" >
          <div>{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "navIcon",
    props:['navIcon'],
    data() {
      return {
      }
    },
    computed: {
      ...mapState(['dayStydy'])
    },
  }
</script>

<style scoped lang="less">
  .wrap{
    .listbox{
      padding: 0 12px;
      .item{
        text-align: center;

        img{
          width: 48px;
          height: 48px;
        }
        div{
          margin-top: 8px;
          font-size: 12px;
        }
      }
    }
  }
  .dayStydy{
    color: #333333;
  }
  .nightStydy{
    color: #ffffff;
  }
</style>
