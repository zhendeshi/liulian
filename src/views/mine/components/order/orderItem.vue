<template>
  <div class="item" @click="$linkTo('/mine_order_desc',{oid:odata.id})">
    <div class="flex-sb">
      <b class="c-99">订单编号{{odata.ordercode}}</b>
      <b class="c-ffb">{{status[odata.status-1]}}</b>
    </div>
    <div class="mt-30 row2 flex" v-for="(item,index) in odata.goods" :key="index">
      <div class="imgbox">
        <van-image width="100%" height="100%" fit="cover" radius="8" :src="$formatImg(item.pic)"/>
      </div>
      <div class="msg fle1">
        <div class="name one-row-hide">{{item.title}}</div>
        <div class="c-66 mt-24" v-if="item.spec_name">{{item.spec_name}}</div>
        <div class="num flex-sb c-66">
          <span>¥{{$price(item.price)}}</span><span>x{{item.num}}</span>
        </div>
      </div>

    </div>
    <div class="bottom ">
      <div class="money flex-sb">
        <span class="c-99">共{{odata.all_num}}件商品</span>
        <div class="flex-e">
          实付：<span class="f-24 c-ff2">¥</span><span class="f-36 c-ff2">{{$price(odata.pay_price)}}</span>
        </div>
      </div>
      <div class="btnbox">
        <div class="g-btnb" v-if="odata.status==1" @click.stop="btnAction(1,odata.id)">取消订单</div>
        <!-- <div class="g-btna" v-if="odata.status==1" @click.stop="btnAction(2,odata.id)">去付款</div> -->
        <div class="g-btna" v-if="odata.status==1" @click.stop="$linkTo('/mine_order_desc',{oid:odata.id})">去付款</div>
        
        <div class="g-btnb" v-if="odata.status!=1&&odata.status<6&&odata.is_return!=1" @click.stop="btnAction(3,odata.id)">申请售后</div>
        <div class="g-btna" v-if="odata.status==3" @click.stop="btnAction(4,odata.id)">确认收货</div>
        <div class="g-btna" v-if="odata.status==4" >去评价</div>
        <div class="g-btnb" v-if="odata.status>=4&&odata.status!=6" @click.stop="btnAction(5,odata.id)">删除订单</div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "orderItem",
    props: ['odata'],
    data() {
      return {
        status: ['待支付', '待发货', '待收货', '待评价', '已完成', '售后中', '售后成功', '售后失败', '已取消']
      }
    },
    methods:{
      btnAction(type,id){
        this.$emit("btnAction",type,id)
      },
    }

  }
</script>

<style scoped lang="less">
  .item {
    margin: 0 12px 12px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    font-size: 14px;
    padding: 15px 12px;

    .imgbox {
      width: 80px;
      height: 80px;
      margin-right: 12px;
    }

    .name {
      font-weight: 500;
      width: 235px;
    }

    .row2 {
      padding-bottom: 15px;
      border-bottom: 1px solid #eeeeee;
      margin-bottom: 13px;

      .msg {
        position: relative;

        .num {
          position: absolute;
          bottom: 0;
          width: 100%;
        }
      }

    }

    .btnbox {
      display: flex;
      justify-content: flex-end;

      div {
        margin-top: 10px;
        margin-left: 10px;
      }
    }
  }
</style>
