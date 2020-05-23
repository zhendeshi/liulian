<template>
  <div class="addrBox">
<!--    <b class="f-28 tit" v-if="odata.status!=3">收货地址</b>-->
<!--    <div class="item itemA flex-c"  @click="$linkTo('/delivery')" v-else >-->
<!--      <div class="icon iconfont icon-qiache flex-c"></div>-->
<!--      <div class="fle1" >-->
<!--        <div class="one-row-hide f-28 pr-20" style="width: 266px">-->
<!--          [广州市] 快件已在东圃镇  已签收  签收人快件已在东圃镇-->
<!--        </div>-->
<!--        <div class="c-99 one-row-hide mt-15">2018-11-14  16:15:18</div>-->
<!--      </div>-->
<!--      <span class="iconfont icon-dibudaohanglan-"></span>-->
<!--    </div>-->
    <b class="f-28 tit" >收货地址</b>

    <div class="item itemB flex-c">
      <div class="icon iconfont icon-dizhi2 flex-c"></div>
      <div class="fle1">
        <div class="flex-e">
          <b class="f-28">{{odata.name}}</b>
          <div class="c-99 f-26 ml-40">{{odata.tel}}</div>
        </div>
        <div class="c-66  mt-10 addrDesc">{{odata.province}} {{odata.city}} {{odata.area}} {{odata.address}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "addr",
    props: ['odata']
  }
</script>

<style scoped lang="less">
  .addrBox {
    padding: 0px 8px 0 12px;
    width: 351px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin: 0 auto 12px;
    overflow: hidden;
    .addrDesc{
      width: 297px;
      line-height: 1.4;
    }
    .tit {
      margin-top: 15px;
      display: block;
    }

    .item {
      padding: 15px 0;
      .icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        font-size: 18px;
        color: #ffffff;
        margin-right: 5.5px;
      }
    }

    .itemB .icon {
      background: rgba(255, 180, 0, 1);
    }

    .itemA .icon-qiache {
      background: #39AC26 ;
    }
  }
</style>
