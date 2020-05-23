<template>
  <div class="page-wrap">
    <div class="header">
      <div class="row1 flex-fe">
        <span class="icon iconA" @click="$linkTo('/sign')"></span>
        <span class="icon iconB" @click="$linkTo('/setUp')"></span>
      </div>
      <div class="row2 flex-c">
        <div class="imgbox g-tipsBox">
          <van-image width="100%" height="100%" fit="cover" round
                     :src="Info.headimgurl?$formatImg(Info.headimgurl):$formatImg('defaultHeader')"
          />
          <div v-if="Info.grade_pic" class="g-tips"
               :style="{backgroundImage: 'url(' + $formatImg(Info.grade_pic) + ')'}"></div>
        </div>
        <div class="fle1">
          <b class="f-32 ">{{Info.nickname}}</b>
          <div class="mt-20">{{Info.describe||'该用户暂无描述'}}</div>
        </div>
        <div class="flex-c f-28" @click="$linkTo('/Homepage')">
          个人主页 <span class="iconfont icon-dibudaohanglan-"></span>
        </div>
      </div>
      <div class="row3 flex-c">
        <span class="icon"></span>
        <div class="fle1">vip会员,立即升级</div>
        <b class="flex-c" @click="$linkTo('/vipRight')">
          去开通<span class="iconfont icon-dibudaohanglan-"></span>
        </b>
      </div>
    </div>
    <div class="partTwo flex-c">
      <div class="item" @click="$linkTo('/coupon')">
        <span>{{Info.coupon}}</span>
        <b>卡劵</b>
      </div>
      <div class="item" @click="$linkTo('/mypoint')">
        <span>{{$price(Info.point)}}</span>
        <b>积分</b>
      </div>
      <div class="item" @click="$linkTo('/myPurse')">
        <span>{{$price(Info.money)}}</span>
        <b>我的钱包</b>
      </div>
      <div class="item" @click="$linkTo('/goodsCollect')">
        <span>{{Info.keep}}</span>
        <b>商品收藏</b>
      </div>
    </div>
    <div class="part partThree">
      <div class="tit">我的订单</div>
      <div class="listbox flex-sb">
        <div class="item" @click="$linkTo('/mine_order',{type:'1'})">
          普通订单
        </div>
        <div class="item" @click="$linkTo('/mine_order',{type:'2'})">
          拼团订单
        </div>
        <div class="item" @click="$linkTo('/mine_order',{type:'3'})">
          秒杀订单
        </div>
        <div class="item" @click="$linkTo('/mine_order_point')">
          金币订单
        </div>
      </div>
    </div>
    <div class="part partfour">
      <div class="tit">我的服务</div>
      <div class="listbox flex-sb">
        <div class="item" @click="$linkTo('/vipCenter')" v-if="Info.grade_id!=0">
          会员中心
        </div>
        <div class="item" @click="vipAnction()" v-else>
          会员中心
        </div>

        <div class="item">
          客服
        </div>
        <div class="item" @click="$linkTo('/addrList',{source:'mine'})">
          收货地址
        </div>
        <div class="item" @click="$linkTo('/message')">
          消息
        </div>
        <div class="item" @click="$linkTo('/college')">
          学院
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import axios from "axios";

  export default {
    name: "index",
    computed: {
      ...mapState(['UserInfo'])
    },
    data() {
      return {
        Info: ''
      }
    },
    created() {
      this.setTabBarIndex(4)
      this.initPage()
    },

    methods: {
      ...mapMutations(['setTabBarIndex', 'setUserInfo']),
      vipAnction() {
        this.$toast('请先成为会员')
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('user/getUserInfo'),//获取用户资料
          ]).then(axios.spread((a) => {
            this.Info = a.data
            this.setUserInfo(this.Info)
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
    }

  }
</script>

<style scoped lang="less">
  .header {
    position: relative;
    height: 160px;
    background-image: url("../../assets/images/mine/headerbg1.png");
    background-size: 375px 214px;
    background-position: 0 -54px;
    background-repeat: no-repeat;
    padding: 15px 10px 0 12px;
    color: #ffffff;

    .row1 {
      padding-right: 2px;

      .icon {
        display: inline-block;
        width: 21px;
        height: 21px;
        background-size: 21px;
      }

      .iconA {
        background-image: url("../../assets/images/mine/iocn1.png");
        margin-right: 24px;
      }

      .iconB {
        background-image: url("../../assets/images/mine/iocn2.png");
      }
    }

    .row2 {
      margin: 7px 0 0;

      .imgbox {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 12.5px;

        /deep/ .van-image__img {
          border: 1px solid #E8CBA1;
        }

      }
    }

    .row3 {
      color: #000000;
      width: 351px;
      height: 50px;
      background: linear-gradient(90deg, rgba(241, 234, 201, 1) 0%, rgba(255, 212, 112, 1) 100%);
      box-shadow: 1px 1px 5px 0px rgba(255, 212, 113, 0.3);
      border-radius: 8px;
      margin-top: 33px;
      padding: 0 8px 0 12px;

      .icon {
        width: 22px;
        height: 21px;
        display: inline-block;
        background-image: url("../../assets/images/mine/icon3.png");
        background-size: 100%;
        margin-right: 5px;
      }

      .fle1 {
        font-weight: bold;
        font-size: 14px;
      }
    }
  }

  .partTwo {
    margin: 28px auto 12px;
    width: 351px;
    height: 75px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;

    .item {
      text-align: center;
      flex: 1;

      span {
        font-weight: bold;
        font-size: 16px;
        margin-bottom: 11.5px;
        display: block;
      }
    }
  }

  .part {
    width: 351px;
    height: 136px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin: 0 auto 12px;
    padding: 16px 12px 20px;

    .tit {
      padding-bottom: 16px;
      font-weight: bold;
      font-size: 14px;
      border-bottom: 1px solid #EEEEEE;
    }

    .item {
      text-align: center;
      position: relative;
      margin-top: 20px;
    }

    .item {
      background-size: 26px 26px;
      background-repeat: no-repeat;
      background-position: center 0;
      height: 50px;
      padding-top: 38px;
    }
  }

  .partThree {
    .item:nth-child(1) {
      background-image: url("../../assets/images/mine/index-nav1.png");
    }

    .item:nth-child(2) {
      background-size: 30px 26px;
      background-image: url("../../assets/images/mine/index-nav2.png");
    }

    .item:nth-child(3) {
      background-size: 27px 26px;
      background-image: url("../../assets/images/mine/index-nav3.png");
    }

    .item:nth-child(4) {
      background-size: 30px 26px;
      background-image: url("../../assets/images/mine/index-nav4.png");
    }

  }

  .partfour {
    .item:nth-child(1) {
      background-size: 23px 22px;
      background-image: url("../../assets/images/mine/index-nav6.png");
    }

    .item:nth-child(2) {
      background-size: 23px 22px;
      background-image: url("../../assets/images/mine/index-nav7.png");
    }

    .item:nth-child(3) {
      background-size: 19px 23px;
      background-image: url("../../assets/images/mine/index-nav8.png");
    }

    .item:nth-child(4) {
      background-size: 22px 19px;
      background-image: url("../../assets/images/mine/index-nav9.png");
    }

    .item:nth-child(5) {
      background-size: 22px 20px;
      background-image: url("../../assets/images/mine/index-nav10.png");
    }
  }
</style>
