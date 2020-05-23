<template>
  <div class="specswrap">
    <span class="iconfont colse">&#xe690;</span>
    <div class="msgbox flex">
      <van-image
        width="74px"
        height="74px"
        radius="2px"
        :src="goods.imgUrl"
      />
      <div class="right">
        <div class="name one-row-hide">{{goods.title}}</div>
        <div class="f-20 c-ff2">¥<b class="f-30">{{goods.num}}</b></div>
        <div >已选：{{goods.num}}片</div>
      </div>
    </div>
    <div class="sepcsbox">
      <b class="tit">规格</b>
      <div class="selItem">
        <div :class="['flex-c',sepcsIndex == index ? 'active' : '']" v-for="(item,index) in sepcs" :key="index" @click="changeSpecs(index)">
          {{item}}
        </div>
      </div>
    </div>
    <div class="sepcsbox">
      <b class="tit">数量</b>
      <van-stepper v-model="value" input-width="52px" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "goodsSpecs",
    data() {
      return {
        goods: {
          title: "春雨面膜 黄色经典版蜂蜜面膜10片/盒",
          desc: '韩国进口 补水保湿 舒缓滋润 无添加面膜 敏感肌可用',
          num: '148',
          imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg',
        },
        sepcsIndex:0,
        sepcs:['10片','20片']
      }
    },
    methods:{
      changeSpecs:function (index) {
        this.sepcsIndex=index
      }
    }
  }
</script>

<style scoped lang="less">
  .specswrap {
    position: relative;
    background: #ffffff;
    padding: 14.5px 12px;

    .colse {
      position: absolute;
      font-size: 16px;
      color: #999999;
      top: 13px;
      right: 10.5px;
      font-weight: bold;
    }
    .right{
      margin-left: 8px;
      flex: 1;

      .name{
        font-size: 14px;
        font-weight:bold;
        color: #333333;
        width: 245px;
      }
      .f-20{
        margin: 11px 0 26px;
      }
    }
    .sepcsbox{
      margin: 26px 0 0;

      .selItem{
        width: 366px;
        display: flex;
        .flex-c{
          padding: 0 10px;
          min-width:80px;
          height:24px;
          border-radius:2px;
          margin-right: 10px;
          margin-top: 10px;
          border:1px solid #CCCCCC;
          font-size:12px;
          font-weight:500;
        }
        .active{
          background:#FFB400;
          border:1px solid #FFB400;
          color: #ffffff;
        }
      }
      .tit{
        font-size: 14px;
      }
      /deep/ .van-stepper{
        margin-top: 8px;
      }
      /deep/.van-stepper__input{
        margin: 0 ;
        background-color:#ffffff;
        border-top: 1px solid #B3B3B3;
        border-bottom: 1px solid #B3B3B3;
      }
      /deep/.van-stepper__minus, /deep/ .van-stepper__plus{
        background-color:#ffffff;
        border: 1px solid #B3B3B3;
        width: 37px;
        color: #999999;
        font-weight: bold;
      }
      /deep/.van-stepper__minus--disabled{
        color:#E0E0E0;
      }
      /deep/.van-stepper__plus{
        border-radius:0px 2px 2px 0px;
      }
      /deep/.van-stepper__minus{
        border-radius: 2px 0px 0px 2px;
      }
    }

  }

</style>
