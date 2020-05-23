<template>
  <div class="comm-wrap">
    <div class="goodsDetails">
      <div class="row">商品详情</div>
      <div class="row"><label>品牌：</label>{{goodsDesc.brand}}</div>
      <div class="row"><label>重量：</label>{{goodsDesc.weight}}</div>
      <div class="row"><label>产地：</label>{{goodsDesc.origin}}</div>
      <div class="row"><label>保质期：</label>{{goodsDesc.shelf}}</div>
    </div>
    <div class="goodsDetailsImg" v-html="goodsDesc.desc">
      <!--<img v-for="item in images" :src="item" width="100%" height="100%" fit="center"/>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "imgdesc",
    props:['goodsDesc'],
    data() {
      return {
      }
    },
  }
</script>

<style scoped lang="less">
  .goodsDetails {
    margin-top: 12px;
    background: #ffffff;
    padding: 0 12px;
    font-size: 14px;

    .row {
      height: 43px;
      line-height: 43px;
      border-bottom: 1px solid #EEEEEE;
      font-size: 14px;

      label {
        display: inline-block;
        width: 65px;
        color: #999999;
      }
    }
  }
  .goodsDetailsImg /deep/ img, .goodsDetailsImg /deep/ image{
    width: 100%!important;
  }
</style>
