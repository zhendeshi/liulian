<template>
<!--  圈子的列表-->
  <div class="listbox flex-sb">
    <div class="item" v-for="(item,index) in listbox" :key="index" @click="$linkTo('/circleDesc',{type:1,id:item.id})" >
      <div class="imgbox ">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          round
          :src="item.pic?$formatImg(item.pic):$formatImg('defaultHeader')"
        />

      </div>
      <div class="name">{{item.title}}</div>
      <div class="c-99 desc two-row-hide">{{item.desc}}</div>
<!--      <Gattent :attent="item.subscribe" type="2" :model_id="item.id"></Gattent>-->
      <Gattent :attent="item.is_attent" :type="type" :model_id="item.id"></Gattent>
    </div>
  </div>
</template>

<script>
  import Gattent from "../../../components/Gattent";

  export default {
    name: "manList",
    props: ['listbox','type'],//类型 1关注作者 2关注圈子 3关注用户
    components: {Gattent},
    data() {
      return {
        show: true,
        banner: require("../../../assets/images/comm/authorPop.png"),
      }
    },
    mounted () {
      console.log(this.listbox)
    }
  }
</script>

<style scoped lang="less">
  .listbox {
    flex-wrap: wrap;

    .item {
      width: 169px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      padding: 15px 12px;
      text-align: center;
      margin-bottom: 12px;

      .imgbox {
        width: 60px;
        height: 60px;
        margin: 0 auto;
      }

      .name {
        font-size: 14px;
        margin: 10px 0 8px;
      }

      .g-followBtn {
        margin: 13px auto 0;
      }

      .c-99 {
        line-height: 16px;
        height: 32px;
      }
    }
  }
</style>
