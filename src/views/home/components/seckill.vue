<template>
  <div class="wrap" :class="[dayStydy?'dayStydy':'nightStydy']">
    <div class="header flex-sb">
      <div class="tit">限时秒杀</div>
      <div class="middle time" v-if="spikeTime.time">
        <van-count-down :time="spikeTime.time*1000" format="HH:mm:ss">
          <template v-slot="timeData">
            <div class="time">
              <div class="item">{{ timeData.hours }}</div>
              :
              <div class="item">{{ timeData.minutes }}</div>
              :
              <div class="item">{{ timeData.seconds }}</div>
            </div>
          </template>
        </van-count-down>
      </div>
      <div class="more flex-c">
        更多<span class="iconfont" @click="$linkTo('/featured_Spike')">&#xe62d;</span>
      </div>
    </div>
    <div class="listbox flex">
      <div class="item" v-for="(item,index) in spikeGoods" :key="index"
           @click="$linkTo('/goodsDesc',{type:3,id:item.goods_id})">
        <div class="imgbox">
          <van-image
            width="100%"
            height="100%"
            :src="$formatImg(item.goods.pic)"
            fit="cover"
            radius="8"
          />
        </div>
        <div class="name one-row-hide">
          {{item.goods.title}}
        </div>
        <div class="numbox flex-sb">
          <div class="f-24">￥<b class="f-32">{{$price(item.price)}}</b></div>
          <span class="iconfont">&#xe642;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "recommend",
    props: ['spikeTime', 'spikeGoods'],
    data() {
      return {}
    },
    computed: {
      ...mapState(['dayStydy'])
    },
    methods: {}
  }

</script>

<style scoped lang="less">
  .wrap {
    padding: 0 12px;

    .header {
      height: 47px;
      background-image: url("../../../assets/images/index-ms-bg.png");
      background-size: 361px 114px;
      padding: 0 12px;

      .tit {
        font-size: 16px;
        font-weight: bold;
      }

      .middle {
        flex: 1;

        .time {
          display: flex;
          align-items: center;
          margin-left: 5px;

          .item {
            width: 18px;
            height: 18px;
            border-radius: 2px;
            margin: 0 7px;
            font-size: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: normal;
          }
        }

      }
    }

    .van-count-down {
      line-height: 18px;
    }

    .listbox {
      padding: 15px 6px 19px;
      border-radius: 0px 0px 8px 8px;

      .item {
        margin: 0 6px;
      }

      .imgbox {
        width: 101px;
        height: 101px;
      }

      .name {
        font-size: 13px;
        margin: 8px 0 12.5px;
        width: 101px;
      }

      .iconfont {
        font-size: 20px;
        margin-right: 5px;
      }
    }
  }

  .dayStydy {
    .header {
      background-position: -5px -62px;

      .tit {
        color: #333333;
      }

      .middle {
        .time {
          color: #FF2D25;
          .item {
            color: #FF2D25;
            border: 1px solid rgba(255, 45, 37, 1);
          }
        }
      }

      .more {
        color: #ffffff;
      }
    }

    .listbox {
      box-shadow: 0px 0px 12px #eeeeee;

      .name {
        color: #333333;
      }

      .numbox {
        color: #FF2D25;

        .iconfont {
          color: #FFC934;
        }
      }
    }
  }

  .nightStydy {
    .header {
      background-position: -5px -5px;

      .tit {
        color: #ffffff;
      }

      .middle {
        .time {
          color: #FFB400;

          .item {
            color: #FFC934;
            border: 1px solid rgba(255, 201, 52, 1);
          }
        }
      }

      .more {
        color: #999999;
      }
    }

    .listbox {
      background: rgba(37, 37, 39, 1);

      .name {
        color: #ffffff;
      }

      .numbox {
        color: #FF2D25;

        .iconfont {
          color: #FFC934;
        }
      }
    }
  }

</style>
