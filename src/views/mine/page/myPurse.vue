<template>
  <div class="page-wrap">
    <div class="header">
      <div class="partOne flex-sb">
        <div class="left">
          <div class="flex-tb">
            <div class="icon mr-10"></div>
            <b class="f-32">我的余额</b>
          </div>
          <div class="num">{{$price(UserInfo.money)}}</div>
        </div>
        <div class="g-btnc" @click="$linkTo('/takeCash')">提现</div>
      </div>
<!--      <div class="partTwo flex-sb">-->
<!--        <input type="number" v-model="price" placeholder="手动输入充值金额">-->
<!--        <div class="btn flex-c" @click="actionRecharge()">充值</div>-->
<!--      </div>-->
<!--      <div class="partThree flex-sa">-->
<!--        <div class="item flex-c" :class="[selRe == index ? 'active':'']" v-for="(item, index) in Recharge"-->
<!--             @click="selRecharge(index,item.id,item.price)">-->
<!--          <div class="box">-->
<!--            <div class="f-40">{{$price(item.price)}}元</div>-->
<!--            <div class="f-28 mt-15 fw-500">充{{$price(item.price)}}送{{$price(item.give_price)}}元</div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="暂无更多记录~"
      :offset="50"
      :immediate-check="false"
      @load="getListMore"
    >
      <money-details :odata="RechargeList">
        <div class="f-32 fw-bold">钱包明细</div>
      </money-details>
    </van-list>

  </div>
</template>

<script>
  import moneyDetails from '../components/moneyDetails'
  import {mapState, mapActions, mapMutations} from 'vuex'
  import axios from "axios";

  export default {
    name: "myPurse",
    components: {moneyDetails},
    data() {
      return {
        Recharge: '',
        RechargeList: '',
        selRe: 0,//选中的充值包下标
        price: '',//充值金额

        loading: false,
        loadMore: true,
        page: 2
      }
    },
    computed: {
      ...mapState(['UserInfo'])
    },
    created() {
      this.initPage()
    },
    methods: {
      //充值
      actionRecharge() {
        let price = this.price || 0
        if (parseInt(price) < 1) {
          this.$toast('最低充值一元噢~')
        } else {
          this.$post('user/addRecharge', {price: this.price}).then(res => {
            this.$toast(res.msg)

          }).catch((res) => {
            this.$toast(res.msg)
          })
        }

      },
      //选择充值包
      selRecharge(index, id, price) {
        this.selRe = index
        this.price = price
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('user/getRecharge'),//获取充值包列表
            this.$post('user/getRechargeList', {page: 1}),//钱包明细
          ]).then(axios.spread((a, b) => {
            this.Recharge = this.$gDataList(a)
            this.RechargeList = this.$gDataList(b)
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('user/getRechargeList', {page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.RechargeList = this.RechargeList.concat(res.data)
              this.page++
            } else {
              this.loadMore = false
            }
            this.loading = false
          }).catch((res) => {
            this.loadMore = false
            this.loading = false
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .header {
    height:145px;
    background-image: url("../../../assets/images/mine/headerbg4.png");
    background-size: 100%;
    padding: 12px;
    overflow: hidden;
    .partOne {
      width: 351px;
      color: #E2C583;
      height: 120px;
      border-radius: 4px;
      overflow: hidden;
      background-image: url("../../../assets/images/mine/headerbg6.png");
      background-size: 100%;
      padding: 0 60px 0 40px;

      .icon {
        width: 24px;
        height: 24px;
        background-image: url("../../../assets/images/mine/icon12.png");
        background-size: 28px;
        background-position: center 0;
        margin-right: 5px;
      }

      .num {
        font-size: 30px;
        font-weight: bold;
        margin-top: 14px;
        padding-left: 29px;
      }

    }

    .partTwo {
      margin: 25px 0 15px;

      input {
        width: 253px;
        height: 35px;
        background: rgba(238, 238, 238, 1);
        box-shadow: 3px 3px 8px 0px rgba(140, 73, 27, 0.2);
        font-size: 12px;
        font-weight: 500;
        padding: 0 13px;
        color: #333333;
      }

      .btn {
        background-image: url("../../../assets/images/mine/icon14.png");
        background-size: 100%;
        width: 83px;
        height: 35px;
        font-size: 17px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }

    .partThree {
      width: 104%;
      margin-left: -2%;

      .item {
        width: 109px;
        height: 82px;
        background: linear-gradient(90deg, rgba(248, 248, 248, 1), rgba(215, 217, 223, 1));
        box-shadow: 3px 3px 8px 0px rgba(140, 73, 27, 0.2);
        border-radius: 8px;
        color: #666666;

        .box {
          text-align: center;
        }
      }

      .active {
        background: linear-gradient(90deg, rgba(255, 195, 0, 1) 0%, rgba(255, 169, 0, 1) 99%);
        color: #333333;
      }
    }
  }


</style>
