<template>
  <div class="cartWrap">
    <div v-if="list.length>0">
      <van-checkbox-group class="card-goods" v-model="checkedGoods">
        <van-checkbox
          class="card-goods__item"
          v-for="(item,index) in list"
          :checked='true'
          :key="index"
          :name="item"
          icon-size="17px"
          checked-color="#FFB400"
          v-model='checked'
        >
          <div class="goodItem flex-c">
            <div class="imgbox">
              <van-image
                width="100%"
                height="100%"
                fit="cover"
                :src="$formatImg(item.pic)"
              />
            </div>
            <div class="msg fle1">
              <div class="f-28 flex-sb mb-24">
                <div class="name one-row-hide">{{item.title}}</div>
                <span class="iconfont" @click="remove($event,index,item.id)">&#xe62e;</span>
              </div>
              <div class="f-24 c-99 one-row-hide" style="width: 210px">
                商品规格：{{item.spec_name}}
              </div>
              <div class="bottom flex-sb flex-e">
                <div class="c-ff2 flex-e">
                  <span class="f-24">¥</span>
                  <b class="f-36">{{$price(item.price)}}</b>
                </div>
                <div class="flex-c">
                  <div class="numbtnA flex-c" @click="cartNum($event,index,item.cart_id,2)"> -</div>
                  <div class="middle">{{item.num}}</div>
                  <div class="numbtnB flex-c" @click="cartNum($event,index,item.cart_id,1)"> +</div>
                </div>
              </div>
            </div>
          </div>
        </van-checkbox>
      </van-checkbox-group>
      <van-submit-bar
        :price="totalPrice"
        :disabled="!checkedGoods.length"
        :button-text="submitBarText"
        @submit="onSubmit(totalPrice)">
        <van-checkbox @click="tap()" checked-color="#FFB400" icon-size="17px" class="allcheck" v-model="checked">全选
        </van-checkbox>
      </van-submit-bar>
    </div>
    <div v-else>
      <div class="partOne">
        <div class="imgbox"></div>
        <span class="c-99">购物车竟然是空的</span>
        <div class="btn flex-c">去逛逛</div>
      </div>
      <div class="partTwo">
        <div class="header flex-c">
          <span></span>
          <div class="fw-bold">推荐购买</div>
          <span></span>
        </div>
        <van-list
          v-model="loading"
          :finished="!loadMore"
          finished-text="没有更多了"
          :offset="0"
          :immediate-check="false"
          @load="getListMore"
        >
          <list :list="recommend"></list>
        </van-list>

      </div>
    </div>
  </div>
</template>

<script>
  import {Dialog} from 'vant';
  import list from '../../../components/list'
  import {mapMutations} from 'vuex'

  export default {
    components: {list},
    data() {
      return {
        checkedGoods: [],
        list: [],
        checked: false,
        recommend: '',
        //私有
        loading: false,
        loadMore: true,
        page: 2
      };
    },
    created() {
      this.initPage()
    },
    computed: {
      submitBarText: {
        get: function () {
          var count = this.checkedGoods.length;
          return '结算' + (count ? `(${count})` : '');
        },
        set: function (val) {
        }

      }, totalPrice: {
        get: function () {
          return this.list.reduce(
            (total, item) => total +
              (this.checkedGoods.indexOf(item) !== -1 ? item.price * 100 * item.num : 0)
            , 0);
        },

      }
    },
    methods: {
      ...mapMutations(['setUserOrder']),
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('cart/getCartList').then(res => {
            this.list = res.data
            this.$toast.clear()
          }).catch((res) => {
            if (res.code == 400) {
              this.getRecommend()
            }
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('goods/index', {type: 2, page: this.page, pnum: 10}).then(res => {
            if (res.data && res.data.length > 0) {
              this.recommend = this.recommend.concat(res.data)
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
      },
      getRecommend() {
        this.$post('goods/index', {type: 2, page: 1, pnum: 10}).then(res => {
          this.recommend = res.data
        })
      },
      onSubmit(a) {
        let orderInfo={}
        orderInfo.source=2
        orderInfo.coupon_id=0
        let arr = [];
        this.checkedGoods.forEach(function (item) {
          arr.push(item.cart_id);//拼接 购物车id
        });
        orderInfo.cart_id = arr.join(",");
        this.setUserOrder(orderInfo)
        this.$router.push('/sureOrder');
      },
      tap() {
        if (this.checked) {
          this.checkedGoods = [];
        } else {
          this.checkedGoods = [];
          this.list.forEach((item) => {
            this.checkedGoods.push(item);
          });
        }
      },
      remove(e, a, id) {
        e.cancelBubble = true;
        Dialog.confirm({
          title: '确定删除?',
        }).then(() => {
          this.$post('cart/delCart', {cart_id: id}).then(res => {
            let delGoods = this.checkedGoods.findIndex(item => item.id == id)
            if (delGoods >= 0) {
              this.checkedGoods.splice(a, 1);
            }
            this.list.splice(a, 1);
            this.$toast('已删除')
            if (this.list.length <= 0) {
              this.getRecommend()
            }
          }).catch((res) => {
            this.$toast('删除失败,请重试')
          })
        }).catch((res) => {
          // on cancel
        });

      },

      cartNum(e, index, id, type) {
        e.cancelBubble = true;
        if (this.list[index].num <= 1 && type == 2) {
          this.$toast('不能再少啦~')
        } else {
          this.$post('cart/cartNum', {cart_id: id, type: type}).then(res => {
            if (type == 1) {//++++
              this.list[index].num++;
            } else { //------
              this.list[index].num--;
            }
          })
        }
      }
    },
    watch: {
      checkedGoods: {
        handler: function () {
          if (this.checkedGoods.length == this.list.length) {
            this.checked = true;
          } else {
            this.checked = false;
          }
        },
      }
    },

  };
</script>
<style lang="less">
  .cartWrap {
    padding: 12px;

    .card-goods .van-checkbox__label {
      margin-left: 12px;
      flex: 1;
    }

    .van-checkbox__icon .van-icon {
      font-size: 12px;
      line-height: 15px;
    }

    .card-goods__item {
      width: 351px;
      height: 110px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      margin-bottom: 12px;
      padding: 15px 12px;

      .imgbox {
        width: 80px;
        height: 80px;
        background: rgba(243, 243, 243, 1);
        border-radius: 8px;
        overflow: hidden;
        margin-right: 12px;
      }

      .msg {
        height: 80px;
        position: relative;

        .name {
          width: 190px;
        }

        .bottom {
          margin-top: 26.5px;
          font-size: 14px;

          .numbtnA {
            width: 17px;
            height: 17px;
            border: 1px solid rgba(153, 153, 153, 1);
            border-radius: 50%;
          }

          .middle {
            width: 20px;
            text-align: center;
          }

          .numbtnB {
            width: 17px;
            height: 17px;
            background: rgba(255, 180, 0, 1);
            border-radius: 50%;
            color: #ffffff;
          }
        }
      }
    }

    .allcheck {
      padding: 0 0 0 12px;
    }

    .van-submit-bar__text {
      text-align: left;
      padding-left: 25px;
    }

    .van-button--danger {
      background-color: #FF4A03;
      border: 1px solid #FF4A03;

    }

    .partOne {
      text-align: center;

      .imgbox {
        width: 91px;
        height: 71px;
        margin: 84px auto 20.5px;
        background-image: url("../../../assets/images/comm/noGoods.png");
        background-size: 100%;
      }

      .btn {
        width: 103px;
        height: 30px;
        background: rgba(255, 74, 3, 1);
        border-radius: 15px;
        margin: 15px auto;
        font-size: 14px;
        font-weight: 800;
        color: #ffffff;
      }
    }

    .partTwo {
      .header {
        font-size: 16px;
        margin: 78px 0 15px;

        div {
          padding: 0 10px;
        }

        span {
          display: block;
          width: 86.5px;
          height: 3.5px;
          margin-top: 1px;
          background-image: url("../../../assets/images/comm/icon4.png");
          background-size: 100%;
        }

        span:last-child {
          transform: rotate(180deg);
        }
      }
    }
  }

</style>
