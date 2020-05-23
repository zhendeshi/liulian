<template>
  <div class="goodsMsg">
    <!--商品信息-->
    <div class="name">{{goodsMsg.title}}</div>
    <div class="desc">{{goodsMsg.old_title}}</div>
    <div class="other flex-e">
      <span v-if="goodsMsg.price"><label class="f-24 c-ff2" >¥</label><b class="f-36 c-ff2 mr-5">{{$price(goodsMsg.price)}}</b></span>
      <span  v-else>
        <b class="f-36 c-ff2 mr-5 flex-c">{{$price(goodsMsg.point)}}<span class="f-24">金币</span></b>
      </span>

      <div class="middle ml-5 flex">
        <div class="old"> ¥{{$price(goodsMsg.old_price)}}</div>
        <div class="tips" v-if="false">秒杀立省￥11</div>
      </div>
      <div class="f-24 c-99" v-if="goodsMsg.sales">已抢{{goodsMsg.sales}}件</div>
    </div>
    <div class="bottem" v-if="goodsMsg.price">购买可得{{$price(goodsMsg.point)}}金币</div>
  </div>
</template>

<script>
  export default {
    name: "goodsMsg",
    props: ['goodsMsg'],
    data() {
      return {}
    },
  }
</script>

<style scoped lang="less">
  .goodsMsg {
    background: #ffffff;
    padding: 12px 12px 21px;
    /*border-bottom: 12px solid #F3F3F3;*/

    .name {
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      font-size: 16px;
      line-height: 22px;
      margin-top: -3px;
    }

    .desc {
      font-size: 12px;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      margin: 6.5px 0 12px;
      line-height: 17px;
    }

    .other {
      .middle {
        flex: 1;
        display: flex;

        .old {
          position: relative;
          color: #999999;
          font-size: 10px;
          padding-bottom: 1px;
        }

        .old:before {
          position: absolute;
          content: '';
          height: 1px;
          width: 100%;
          border-bottom: 1px solid #999999;
          bottom: 6px;
        }

        .tips {
          font-size: 10px;
          color: #ffffff;
          height: 15px;
          background: #FFB400;
          border-radius: 2px;
          position: relative;
          margin-left: 15px;
          line-height: 15px;
          padding-left: 3px;
          padding-right: 10px;
          border-bottom-right-radius: 0px;
          border-top-right-radius: 0px;
        }

        .tips:before {
          position: absolute;
          content: '';
          width: 0;
          height: 0;
          border-top: 7.5px solid transparent;
          border-bottom: 7.5px solid transparent;
          border-right: 7.5px solid #FFB400;
          left: -6.5px;

        }
      }
    }

    .bottem {
      color: #FFB400;
      font-size: 12px;
      margin-top: 12px;
    }
  }
</style>
