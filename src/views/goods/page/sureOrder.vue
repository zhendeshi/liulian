<template>
  <div class="wrap-page">
    <div class="f-0" @click="$linkTo('/addrList')">
      <div class="addAddrBtn flex-sb" v-if="dataAddress.length<=0">
        <b>新建收货地址</b>
        <span class="iconfont icon-dibudaohanglan-"></span>
      </div>
      <sel-addr v-else v-model="selOnAddr"></sel-addr>
      <img src="../../../assets/images/comm/fenge.png" />
    </div>
    <div class="goodsMsg" v-if="PointGoods">
      <div>
        <div class="goods flex-sb">
          <div class="imgbox">
            <van-image
              width="100%"
              height="100%"
              radius="8px"
              :src="$formatImg(UserOrder.goodsDesc.images[0])"
              fit="cover"
            />
          </div>

          <div class="box">
            <div class="name one-row-hide w100">{{UserOrder.goodsDesc.title}}</div>
            <div class="bottom flex-sb">
              <span class="c-ff2">
                <b class="f-36">{{$price(UserOrder.goodsDesc.point)}}</b>金币
              </span>
              <span class="c-66">x{{UserOrder.num}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="msgbox">
        <div class="row">
          <span>共{{UserOrder.num}}件商品</span>
          <div>
            合计：
            <span class="c-ff2">
              <b class="f-36">{{$price(UserOrder.goodsDesc.point*UserOrder.num)}}</b>金币
            </span>
          </div>
        </div>
        <div class="row">
          <van-field
            autosize
            v-model="orderNotes"
            rows="1"
            label="订单备注"
            type="textarea"
            placeholder="订单备注"
          />
        </div>
      </div>
    </div>
    <div class="goodsMsg" v-else>
      <div>
        <div class="goods flex-sb" v-for="(item,index) in goods.goods" :key="index">
          <div class="imgbox">
            <van-image
              width="100%"
              height="100%"
              radius="8px"
              :src="$formatImg(item.pic)"
              fit="cover"
            />
          </div>
          <div class="box">
            <div class="name one-row-hide w100">{{item.title}}</div>
            <div class="specs" v-if="item.spec_name">商品规格：{{item.spec_name}}</div>
            <div class="bottom flex-sb">
              <span class="c-ff2">
                ¥
                <b class="f-36">{{$price(item.price)}}</b>
              </span>
              <span class="c-66">x{{item.num}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="msgbox">
        <div class="row">
          <span class="c-99">运费</span>
          <span>{{goods.freight_price==0?'包邮':goods.freight_price}}</span>
        </div>
        <div class="row">
          <span>优惠券</span>
          <span class="flex-c">
            <template v-if="coupon_index==-1">
              <span v-if="couponList.length<=0">暂无可用优惠券</span>
              <span v-else @click="showCouPop=true">选择优惠券</span>
            </template>
            <template v-else>{{`-${$price(couponList[coupon_index].price)}`}}</template>
            <span class="iconfont icon-dibudaohanglan- c-99"></span>
          </span>
        </div>
        <div class="row" v-if="goods.discount_price>0">
          <span>VIP专享折扣</span>
          <span class="c-ff2">
            -¥
            <b class="f-36">{{$price(goods.discount_price)}}</b>
          </span>
        </div>
        <div class="row">
          <span>共{{goods.all_num}}件商品</span>
          <div>
            合计：
            <span class="c-ff2">
              ¥
              <b class="f-36">{{$price(goods.goods_price)}}</b>
            </span>
          </div>
        </div>
        <div class="row remark">
          <van-field
            autosize
            v-model="orderNotes"
            rows="1"
            label="订单备注"
            type="textarea"
            placeholder="订单备注"
          />
        </div>
      </div>
    </div>
    <div class="payType">
      <div class="tit">选择支付方式</div>
      <van-radio-group v-model="payType">
        <div class="row flex-c" v-if="!PointGoods">
          <span class="wIcon-payType1"></span>
          <div class="middle">微信支付</div>
          <van-radio checked-color="#FFB400" name="4"></van-radio>
        </div>
        <div class="row flex-c" v-if="!PointGoods && iFType == 3">
          <span class="wIcon-payType3"></span>
          <div class="middle">支付宝支付</div>
          <van-radio checked-color="#FFB400" name="2"></van-radio>
        </div>
        <div class="row flex-c" v-if="!PointGoods">
          <span class="wIcon-payType2"></span>
          <div class="middle">余额支付</div>
          <van-radio checked-color="#FFB400" name="1"></van-radio>
        </div>
        <div class="row flex-c" v-else>
          <span class="wIcon-payType2"></span>
          <div class="middle">金币支付</div>
          <van-radio checked-color="#FFB400" name="3"></van-radio>
        </div>
      </van-radio-group>
    </div>
    <div class="g-footerBtnBox">
      <div class="main flex-tb">
        <div v-if="!PointGoods">
          合计：
          <span class="c-ff2">
            ¥
            <b class="f-36">{{$price(goods.all_price)}}</b>
          </span>
        </div>
        <div v-else>
          合计：
          <span class="c-ff2">
            <b class="f-36">{{$price(UserOrder.goodsDesc.point*UserOrder.num)}}</b>金币
          </span>
        </div>
      </div>
      <div class="btn o-btn" v-if="!PointGoods" style="width: 150px" @click="testOrder()">去付款</div>
      <div class="btn o-btn" v-else style="width: 150px" @click="payPoint()">确认兑换</div>
    </div>

    <van-popup v-model="showCouPop" position="bottom" :style="{ height: '45%' }">
      <van-list
        v-model="loading"
        :finished="!loadMore"
        finished-text="暂时没有更多优惠券~"
        :offset="0"
        :immediate-check="false"
        @load="getListMore"
      >
        <coupon :list="couponList" @selCoupon="selCoupon"></coupon>
      </van-list>
    </van-popup>
  </div>
</template>

<script>
import selAddr from "../components/selAddr";
import coupon from "../components/coupon";
import { mapState, mapMutations } from "vuex";
// import wx from 'weixin-jsapi'
const wx =
  process.env.NODE_ENV == "development"
    ? require("weixin-js-sdk")
    : window["wx"];
import { GetSignature, iFType } from "../../../utils/comment";

export default {
  name: "sureOrder",
  components: { selAddr, coupon },
  data() {
    return {
      // backUrl: require(''),
      goods: {},
      payType: "1",
      orderNotes: "", //订单备注
      PointGoods: false,
      couponList: "", //可用优惠券列表
      showCouPop: false, //是否显示优惠券弹框
      coupon_index: -1,
      loading: false,
      loadMore: true,
      page: 2,
      UserOrderID: ""
    };
  },

  watch: {
    dataAddress: {
      handler: function(val) {
        if (val.length == 0) {
          this.setUserAddressID(null);
        }
      }
    }
  },
  computed: {
    selOnAddr: function() {
      if (this.dataAddress.length == 0) {
        this.setUserAddressID(null);
      } else {
        if (!this.UserAddrId) {
          //不存在选中地址
          let addrId = this.dataAddress.findIndex(item => item.is_default == 2);
          if (addrId >= 0) {
            this.setUserAddressID(this.dataAddress[addrId]);
            return this.dataAddress[addrId];
          } else {
            this.setUserAddressID(this.dataAddress[0]);
            return this.dataAddress[0];
          }
        } else {
          return this.UserAddrId;
        }
      }
    },
    ...mapState(["UserOrder", "UserAddrId", "dataAddress", "UserOrderID"])
  },
  created() {
    this.PointGoods = this.$route.query.PointGoods || false;
    this.iFType = iFType();
    if (!this.PointGoods) {
      this.initPage();
    } else {
      this.payType = "3";
      this.initPointGoods(); //金币商品
    }
  },
  methods: {
    ...mapMutations(["setUserAddress", "setUserOrderID", "setUserAddressID"]),
    initPage() {
      this.$nextTick(() => {
        this.$toast.loading("正在加载");
        this.$post("order/confirm", { ...this.UserOrder })
          .then(res => {
            this.goods = res.data;
            return this.$post("order/coupon", { price: res.data.all_price });
          })
          .then(res => {
            this.couponList = res.data;
            return this.$post("user/getAddress");
          })
          .then(res => {
            this.setUserAddress(res.data); //把获取的所有地址 放入vuex
          })
          .catch(res => {
            this.$toast.clear();
          });
      });
    },
    //金币商品的基本信息
    initPointGoods() {
      this.$nextTick(() => {
        this.$toast.loading("正在加载");
        this.$post("user/getAddress")
          .then(res => {
            this.setUserAddress(res.data);
          })
          .catch(res => {
            this.$toast.clear();
          });
      });
    },
    //选择可用优惠券
    selCoupon(index) {
      this.coupon_index = index;
      this.UserOrder.coupon_id = this.couponList[index].id;
      this.$post("order/confirm", { ...this.UserOrder })
        .then(res => {
          this.goods = res.data;
        })
        .catch(res => {
          this.$toast.clear();
        });
      this.showCouPop = false;
    },
    //可用优惠券加载更多
    getListMore() {
      if (this.loadMore) {
        return this.$post("order/coupon", { price: this.goods.all_price })
          .then(res => {
            if (res.data && res.data.length > 0) {
              this.couponList = this.couponList.concat(res.data);
              this.page++;
            } else {
              this.loadMore = false;
            }
            this.loading = false;
          })
          .catch(res => {
            this.loadMore = false;
            this.loading = false;
          });
      }
    },
    //检测是否下过单
    testOrder() {
      let that = this;
      console.log("调用");
      // this.$toast.loading('正在下单')
      //微信支付的
      console.log(typeof this.UserOrderID);
      if (this.payType == 4) {
        console.log("1调用");

        // this.payType = 3
        // this.$toast('微信支付功能开发中~')
        // this.orderPay(this.UserOrderID);
        if (!this.UserOrderID) {
          console.log("2调用");

          this.addOrder();
        } else {
          this.orderPay(this.UserOrderID);
        }
        return;
      }
      // 支付宝支付
      if (this.payType == 2) {
        if (!this.UserOrderID) {
          //不存在订单号,没下过
          this.addOrder();
        } else {
          this.$toast("直接支付宝支付");
          window.location.href = `http://liulian.kailly.com/api/order/setPay?order_id=${this.UserOrderID}&type=${that.payType}}`;
        }
        return;
      }
      //余额支付
      this.$dialog
        .confirm({
          message: "确认余额支付?"
        })
        .then(() => {
          if (!this.UserOrderID) {
            //不存在订单号,没下过
            console.log("res");
            this.addOrder();
          } else {
            this.orderPay(this.UserOrderID);
          }
        })
        .catch(res => {
          console.log("取消支付");
        });
    },
    //下单
    addOrder() {
      let that = this;
      console.log("调用");

      if (!this.selOnAddr) {
        this.$toast("请输入正确的收货地址");
      } else {
        this.UserOrder.address_id = this.selOnAddr.id;
        this.UserOrder.remark = this.orderNotes;
        this.$post("order/addOrder", { ...this.UserOrder })
          .then(res => {
            // console.log('调用')

            this.setUserOrderID(res.data.order_id);
            if (this.payType == 2) {
              setTimeout(function() {
                window.location.href = `http://liulian.kailly.com/api/order/setPay?order_id=${that.UserOrderID}&type=${that.payType}}`;
              }, 500);
            } else {
              this.orderPay(res.data.order_id);
            }
            this.$toast.clear();
          })
          .catch(res => {
            this.$toast.clear();
          });
      }
    },
    //支付
    orderPay(id) {
      this.$post("order/setPay", {
        order_id: id,
        type: this.payType == 4 ? 3 : this.payType
      })
        .then(res => {
          console.log(res);
          if (this.payType == 4) {
            // h5支付
            if (this.$appType == 3) {
              window.location.href = res.data.url;
            } else {
              // 微信里
              console.log("这里是微信支付");
              console.log(res);
              console.log(wx);
              GetSignature(this.weixinpay);
            }
          } else {
            this.$toast.loading("支付成功,正在跳转");
            this.$router.push({
              path: "/mine_order_desc",
              query: { oid: res.data.order_id }
            });
          }
        })
        .catch(res => {
          this.$toast(res.msg);
        });
    },
    //金币兑换
    payPoint() {
      if (!this.selOnAddr) {
        this.$toast("请输入正确的收货地址");
      } else {
        this.$toast.loading("正在支付...");
        this.$post("Point/setPay", {
          id: this.UserOrder.goods_id,
          num: this.UserOrder.num,
          address_id: this.selOnAddr.id,
          remark: this.orderNotes
        })
          .then(res => {
            this.$toast.loading("支付成功,正在跳转");
            this.$router.push("/mine_order_point");
          })
          .catch(res => {
            this.$toast(res.msg);
          });
      }
    }, // 微信支付
    weixinpay() {
      wx.chooseWXPay({
        // appId: res.data.appId,
        timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
        package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: res.data.paySign, // 支付签名
        success: function(res) {
          // 支付成功后的回调函数
          console.log("微信支付成功");
        },
        fail: function(res) {
          console.log("支付失败");
        },
        complete: function(res) {
          console.log(res, "complete");
        }
      });
    }
  },

  destroyed() {
    this.$toast.clear();
    this.setUserOrderID(null);
  }
};
</script>

<style scoped lang="less">
.wrap-page {
  padding-bottom: 100px;

  .f-0 {
    font-size: 0px;

    .addAddrBtn {
      height: 73px;
      padding: 0 6px 0 12px;
      font-size: 14px;
      background: #ffffff;
    }

    img {
      height: 3px;
      width: 100%;
    }
  }

  .iconfont.icon-dibudaohanglan- {
    font-size: 22px;
    margin-right: -4px;
  }

  .goodsMsg {
    background-color: #ffffff;
    padding: 15px 12px 0;

    .goods {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #f5f5f5;
      .imgbox {
        width: 101px;
        height: 101px;
      }
    }

    .goods:last-child {
      padding-bottom: 0;
      border-bottom: 0;
    }

    .box {
      width: 238px;
      height: 101px;
      position: relative;

      .specs {
        color: #666666;
        margin-top: 11.5px;
      }

      .name {
        font-size: 14px;
        font-weight: 500;
      }

      .bottom {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        position: absolute;
        bottom: 0;
        width: 100%;
      }
    }

    .msgbox {
      margin-top: 15px;

      .row {
        border-top: 1px solid #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 44.5px;
        font-size: 14px;

        /deep/ .van-cell {
          padding: 0;
        }

        /deep/ .van-field__control {
          text-align: right;
        }
      }
      .remark {
        height: auto;
        min-height: 42px;
        /deep/.van-cell__title {
          display: flex;
          align-items: center;
        }
        /deep/.van-cell__value textarea {
          padding: 5px 0;
          line-height: 1.2;
        }
      }
    }
  }

  .payType {
    margin-top: 12px;
    padding: 15px 12px 0;
    background-color: #ffffff;

    .tit {
      font-size: 14px;
    }

    .row {
      height: 52px;
      border-bottom: 1px solid #eeeeee;
    }

    .row:last-child {
      border-bottom: none;
    }

    .middle {
      margin-left: 9.5px;
      flex: 1;
    }
  }

  .g-footerBtnBox {
    .main {
      padding-left: 12px;
    }
  }
}
</style>
