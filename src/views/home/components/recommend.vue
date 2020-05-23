<template>
  <div class="wrap" :class="[dayStydy?'dayStydy':'nightStydy']">
    <div class="listbox">
      <div class="item" v-for="(item,index) in recommend" :key="index"
           @click="$linkTo('/youXuanList',{thematic_id:item.id})">
        <van-image
          width="100%"
          height="100%"
          radius="8"
          fit="cover"
          :src="$formatImg(item.pic)"
        />
      </div>
    </div>
    <img :src="banner" class="banner"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "recommend",
    props: ['recommend','banner'],
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
  .wrap {
    .listbox {
      margin: 15.5px 0 0;
      padding: 0 12px;
      position: relative;
      width: 100%;
      height: 168px;

      .item {
        position: absolute;
        border-radius: 8px;
        width: 205px;
        height: 81px;

      }

      .item:nth-child(1) {
        width: 140px;
        height: 168px;
      }

      .item:nth-child(2) {
        right: 12px;
      }

      .item:nth-child(3) {
        bottom: 0;
        right: 12px;
      }
    }

    .banner {
      width: 370px;
      display: block;
      margin: 12px auto 0;
    }
  }

  .dayStydy {
    .listbox {
      .item {
        box-shadow: 0px 0px 12px #eeeeee;
      }
    }
  }
</style>
