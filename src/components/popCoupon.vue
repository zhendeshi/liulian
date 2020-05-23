<template>
  <van-overlay :show="showPop" @click="showPop = false" z-index="99999">
    <div class="wrapper flex-c">
      <div class="content">
        <div class="box" @click.stop>
          <div class="tit">
            <div class="f-44">恭喜您</div>
            <div class="f-28 mt-15">
              {{type==2?'获得新用户优惠券':'获得优惠券'}}
            </div>
          </div>

          <van-swipe class="my-swipe" indicator-color="white">
            <van-swipe-item v-for="(item,index) in odata" :key="index">
              <div class="mian flex-sb">
                <div class="left">{{item.price}}元</div>
                <div class="right">
                  <div>优惠券</div>
                  <div>全场通用</div>
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
          <div class="btn" @click="getCoupon()"></div>
        </div>
        <div class="close">
          <span class="iconfont">&#xe612;</span>
        </div>
      </div>
    </div>
  </van-overlay>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "popCoupon",
    props: ['odata', 'type', 'show'],// type 2 新人优惠券
    data() {
      return {
        showPop:false
      }
    },
    computed: {
      ...mapState(['UserInfo'])
    },
    created() {
      if (this.show==1){
        this.showPop=true
      }
      else {
        this.showPop=false
      }
    },
    methods: {
      ...mapMutations(['setUserInfo']),
      getCoupon() {
        let parm = {}
        if (this.type != 2) {
        }
        //不是新人优惠券
        this.$post('coupon/receive', {...parm, type: this.type}).then(res => {
          this.$toast(res.msg)
          let aa = this.UserInfo
          aa.is_receive = 2
          this.setUserInfo(aa)
          this.showPop=false
          this.$emit('getCoupon')
        }).catch((res) => {
          this.$toast.clear()
        })
      }

    }
  }
</script>

<style scoped lang="less">
  .wrapper {
    width: 100%;
    height: 100%;
    position: relative;

    .btn {
      width: 170px;
      height: 36px;
      margin: 0 auto;
    }

    .my-swipe {
      width: 170px;
      margin: 0 auto;
    }

    .box {
      width: 311.5px;
      height: 288.5px;
      background-image: url("../assets/images/index/youhuiqBG.png");
      background-size: 311.5px 288.5px;
      position: relative;
      padding-left: 15px;

      .tit {
        color: #FF5B1B;
        text-align: center;
        padding-top: 95px;

        * {
          font-weight: bold;
        }
      }

      /deep/ .van-swipe-item {
        width: 170px;
      }

      .mian {
        color: #ffffff;
        text-align: center;
        height: 76px;
        width: 170px;
        margin: 11px 0;
        background-image: url("../assets/images/index/youhuiqBG2.png");
        background-size: 100%;
        padding-bottom: 5px;

        .left {
          width: 80px;
          font-size: 22px;
          text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
        }

        .right {
          width: 75px;
          text-align: left;
          padding-left: 7px;
          font-size: 13px;
        }
      }
    }

    .close {
      color: #ffffff;
      text-align: center;
      margin-top: 46px;
      padding-left: 15px;

      .iconfont {
        font-size: 28px;
      }
    }
  }
</style>
