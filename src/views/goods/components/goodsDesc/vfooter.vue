<template>
  <div>
    <div class="g-footerBtnBox">
      <div class="main flex-c">
        <div class="iconBox" @click="$linkTo('/liulian')">
          <span class="iconfont">&#xe635;</span>
          <div>首页</div>
        </div>
        <div class="iconBox" @click="collection" v-if="goodsType!=5&&goodsMsg.is_show == 1">
          <span class="iconfont avtive" v-if="goodsMsg.is_keep == 2">&#xe646;</span>
          <span class="iconfont" v-else>&#xe616;</span>
          <div v-if="goodsMsg.is_keep == 2">已收藏</div>
          <div v-else>收藏</div>
        </div>
        <div class="iconBox" @click="$linkTo('/cart')">
          <span class="iconfont">&#xe6e6;</span>
          <div>购物车</div>
        </div>
      </div>
      <!--普通商品-->
      <template v-if="goodsMsg.is_show == 1">

        <div v-if="goodsType==1">
          <div class="btn y-btn" @click="funClick(1)">加入购物车</div>
          <div class="btn o-btn" @click="funClick(2)">立即购买</div>
        </div>
        <!--预售商品-->
        <div v-if="goodsType==2&&goodsMsg.time>0" class="yshou">
          <div class="btn o-btn" @click="funClick(2)">
            <div class="fw-bold">立即购买</div>
            <span class="f-28">预售结束后7天内发货</span>
          </div>
        </div>
        <div v-if="goodsType==2&&goodsMsg.time<=0" class="yshou">
          <div class="btn" style="background-color:#999999">
            <span class="f-28">预售已结束</span>
          </div>
        </div>
        <!--秒杀商品-->
        <div v-if="goodsType==3">
          <div class="btn o-btn" style="width: 220px" @click="funClick(3)">立即抢购</div>
        </div>
        <!--拼团商品-->
        <div v-if="goodsType==4" class="ptuan">
          <div class="btn y-btn" @click="funClick(4)">
            <div>￥{{$price(goodsMsg.single)}}</div>
            单买价格
          </div>
          <div class="btn o-btn" @click="funClick(6)">
            <div>￥{{$price(goodsMsg.price)}}</div>
            2人开团
          </div>
        </div>

        <!--金币商品-->
        <div v-if="goodsType==5">
          <div class="btn o-btn" style="width: 220px"  @click="funClick(5)">立即兑换</div>
        </div>
      </template>
      <template v-else>
        <div class="btn no-btn" style="width: 220px">已下架</div>
      </template>

    </div>
  </div>
</template>

<script>
  export default {
    name: "vfooter",
    props: ['goodsType', 'goodsMsg'],
    data() {
      return {
        is_keep: ''
      }
    },
    mounted() {
      this.goodsMsg.is_keep == 2 ? this.is_keep=true:this.is_keep=false
    },
    methods: {
      funClick(type) {
        this.$emit("footerFun",type);//1,加入购物 2,立即购买
      },
      //商品收藏
      collection() {
        if (!this.$checkUser()) {
          this.$toast('请先登录')
        } else {
          this.$post('common/keep', {type: this.goodsType, id: this.goodsMsg.id}).then(res => {
            if(this.goodsMsg.is_keep != 2){
              this.$toast('收藏成功')
              this.goodsMsg.is_keep=2
            }else {
              this.goodsMsg.is_keep=1
            }
          })
        }

      }
    }
  }
</script>

<style scoped lang="less">
  .g-footerBtnBox {
    .avtive {
      color: #FFB600;
    }

    .main {
      padding-right: 2px;
    }

    > div {
      display: flex;
      height: 100%;
    }

    .yshou {

      width: 220px;

      .btn {
        width: 220px;
        flex-wrap: wrap;
        padding: 5px 0;

        > div {
          width: 100%;
          text-align: center;
        }
      }
    }

    .ptuan {
      font-size: 17px;

      .btn {
        flex-wrap: wrap;
        padding: 6px 0;

        > div {
          width: 100%;
          text-align: center;
        }
      }
    }

    .iconBox {
      flex: 1;
      text-align: center;
      font-size: 11px;
      color: #666666;

      .iconfont {
        font-size: 16px;
        margin-bottom: 5.5px;
        display: inline-block;
      }
    }
  }
</style>
