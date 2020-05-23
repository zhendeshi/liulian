<template>
  <div class="goodsMsg">
    <div class="goods">
      <div class="item flex" v-for="(item,index) in odata.goods" :key="index" @click="$linkTo('/goodsDesc',{type:item.type,id:item.goods_id})">
        <div class="imgbox">
          <van-image width="100%" height="100%" fit="cover" radius="8" :src="$formatImg(item.pic)"/>
        </div>
        <div class="msg fle1" v-if="odata.status==4">
          <div class="f-28 one-row-hide fw-500 ">{{item.title}}</div>
          <div class="c-66 mt-24 flex-sb">
            <span v-if="item.spec_name">{{item.spec_name}}</span>
            <span>x{{item.num}}</span>
          </div>
          <div class="c-ff2 flex-e mt-30">
            <span>¥</span><span class="fw-bold f-36">{{$price(item.price)}}</span>
          </div>
          <div class="bottom flex-fe">
            <div class="g-btna" v-if="item.is_evaluate==1" @click="goReview(item)">去评价</div>
            <div class="g-btnb" v-else>已评价</div>
          </div>
        </div>
        <div class="msg fle1" v-else>
          <div class="f-28 one-row-hide fw-500 ">{{item.title}}</div>
          <div class="flex-sb  mt-24">
            <div class="c-66" v-if="item.spec_name">{{item.spec_name}}</div>
          </div>
          <div class="bottom flex-sb flex-e">
            <div class="flex-e c-ff2">
              ¥<span class="f-36 fw-500">{{$price(item.price)}}</span>
            </div>
            <span class="c-66">x{{item.num}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="msgbox">
      <div class="row">
        <label>运费</label>
        <div>{{odata.freight_price>0?`¥${$price(odata.freight_price)}`:"包邮"}}</div>
      </div>
      <div class="row" v-if="odata.coupon_price>0">
        <label>优惠券</label>
        <div class="flex-e c-ff2"><span class="f-24">-¥</span><b class="f-36">{{$price(odata.coupon_price)}}</b></div>
      </div>
      <div class="row" v-if="odata.discount_price>0">
        <label>会员折扣</label>
        <div class="flex-e c-ff2"><span class="f-24">-¥</span><b class="f-36">{{$price(odata.discount_price)}}</b></div>
      </div>
      <div class="row">
        <label>共{{odata.all_num}}件商品</label>
        <div>实付：<span class="f-24 c-ff2">¥</span><span class="f-36 c-ff2">{{$price(odata.pay_price)}}</span></div>
      </div>
      <div class="row">
        <label>订单备注</label>
        <div class="one-row-hide remark">{{odata.remark}}</div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "goodsMsg",
    props: ['odata', 'showBtn'],
    methods:{
      goReview(item){
        localStorage.setItem('goodsReview', JSON.stringify(item));
        this.$router.push('/goodsReview');
      }
    }
  }
</script>

<style scoped lang="less">
  .goodsMsg {
    width: 351px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin: 0 auto 12px;

    .remark {
      width: 240px;
      text-align: right;
    }

    .goods {
      padding: 0 12px;

      .item {
        padding: 15px 0;
        border-bottom: 1px solid #EEEEEE;

        .imgbox {
          width: 101px;
          height: 101px;
          background: #F3F3F3;
          border-radius: 8px;
          margin-right: 12px;
        }

        .msg {
          position: relative;

          .bottom {
            position: absolute;
            width: 100%;
            bottom: 0;
          }
        }
      }

    }

    .fw-500.f-28 {
      width: 214px;
    }

    .msgbox {
      font-size: 14px;
      padding: 0 12px;

      .row {
        height: 45px;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;

        label {
          color: #666666;
        }
      }

      .row:last-child {
        border-bottom: 0;
      }
    }
  }
</style>
