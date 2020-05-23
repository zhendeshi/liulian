<template>
  <div class="list">
    <div class="item flex" v-for="(item,index) in spikeGoods" :key="index" @click="$linkTo('/goodsDesc',{type:3,id:item.goods_id})">
      <div class="imgbox">
        <van-image width="100%" height="100%" fit="cover" radius="8" :src="$formatImg(item.goods.pic)"/>
        <div class="no" v-if="item.sales==item.stock"></div>
      </div>
      <div class="right">
        <div class="name one-row-hide">{{item.goods.title}}</div>
        <div class="desc one-row-hide">{{item.goods. old_title}}</div>
        <div class="flex-tb">
          <div class="solidbox">
            <div class="solid"></div>
            <div class="num">{{$percentage(item.sales,item.stock)}}</div>
          </div>
          <span class="c-99 ml-20">已抢{{item.sales}}件</span>
        </div>
        <div class="other flex-e">
          <label class="f-24 c-ff2">¥</label><b class="f-36 c-ff2 mr-5">{{$price(item.price)}}</b>
          <div class="middle ml-5"><span>¥{{$price(item.goods.old_price)}}</span></div>
          <div class="btn g-btna flex-c no" v-if="item.sales==item.stock">立即抢购</div>
          <div class="btn g-btna flex-c" v-else>立即抢购</div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "spikeGoodsList",
    props: ['spikeGoods'],
    data() {
      return {}
    },
    methods: {},


  }
</script>

<style scoped lang="less">
  .list {
    padding: 0 12px;
    background: #ffffff;
  }

  .item {
    padding: 15px 0;
    border-bottom: 1px solid #EEEEEE;

    .imgbox {
      width: 101px;
      height: 101px;
      position: relative;
      margin-right: 12px;
      overflow: hidden;

      .no {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: url("../../../assets/images/comm/soldAll.png");
        background-size: 100%;
      }
    }

    .right {
      flex: 1;
      width: 215px;

      .name {
        font-size: 14px;
        font-weight: bold;

      }

      .desc {
        margin: 11px 0;
        color: #999999;
      }

      .solidbox {
        position: relative;
        width: 100px;
        height: 12px;
        background: rgba(255, 180, 0, 0.3);
        border-radius: 6px;

        .solid {
          position: absolute;
          z-index: 99;
          left: 0px;
          height: 12px;
          background: rgba(255, 180, 0, 1);
          border-radius: 6px;
        }

        .num {
          position: absolute;
          z-index: 100;
          left: 0px;
          top: 0;
          width: 100%;
          text-align: center;
          font-size: 11px;
          line-height: 12px;
        }
      }

      .other {
        margin-top: 13px;

        .btn {
          background: linear-gradient(90deg, rgba(255, 201, 52, 1), rgba(251, 177, 4, 1));
        }

        .btn.no {
          background: rgba(153, 153, 153, 1);
        }

        .middle {
          flex: 1;
          color: #999999;
          padding-bottom: 1px;
        }

        .middle span {
          position: relative;
        }

        .middle span:before {
          content: "";
          position: absolute;
          width: 100%;
          bottom: 5px;
          border-bottom: 1px solid #999999;
        }
      }
    }
  }

</style>
