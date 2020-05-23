<template>
  <div class="listbox flex-sb">
    <div class="item" v-for="(item,index) in listbox" :key="index" @click="$linkTo('/Homepage',{uid:item.uid})">
      <div class="imgbox g-tipsBox">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          round
          :src="item.user.head_img?$formatImg(item.user.head_img):$formatImg('defaultHeader')"
        />
        <div v-if="item.user.grade_pic" class="g-tips"
             :style="{backgroundImage: 'url(' + $formatImg(item.user.grade_pic) + ')'}"></div>
      </div>
      <div class="name">{{item.name}}</div>
      <div class="c-99 desc two-row-hide">{{item.desc}}</div>
      <Gattent :attent="item.is_attention" :type="type" :model_id="item.id"></Gattent >
    </div>
  </div>
</template>

<script>
  import Gattent from "./Gattent";
  export default {
    name: "manList",
    props:['listbox','type'],
    components:{Gattent},
    data() {
      return {
        show: true,
        banner: require("../assets/images/comm/authorPop.png"),
      }
    },
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
      .c-99{
        line-height: 16px;
        height: 32px;
      }
    }
  }
</style>
