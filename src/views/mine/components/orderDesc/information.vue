<template>
  <div class="information">
    <div class="tit">订单信息</div>
    <div class="row">
      <label>订单编号：</label>{{odata.ordercode}}
    </div>
    <div class="row">
      <label>下单时间：</label>{{odata.add_time}}
    </div>
    <div class="row" v-if="odata.status!=1&&!Point">
      <label>支付方式：</label>{{odata.pay_type==1?'支付宝支付':odata.pay_type==2 ? '余额支付':'微信支付'}}
    </div>
    <div class="row" v-if="Point">
      <label>支付方式：</label>金币支付
    </div>
    <div class="row" v-if="Point">
      <label>支付时间：</label>{{odata.add_time}}
    </div>
    <div class="row" v-if="odata.status!=1&&!Point">
      <label>支付时间：</label>{{odata.pay_time}}
    </div>
    <div class="row" v-if="false">
      <label>成交时间：</label>{{odata.pay_time}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "information",
    props:['odata','Point'],//Point 是否是金币
  }
</script>

<style scoped lang="less">
  .information {
    width: 351px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    margin: 0 auto 12px;
    padding: 15px 12px;

    .tit {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 3px;
    }

    .row {
      margin-top: 12px;
      display: flex;
      align-items: center;

      label {
        color: #999;
        width: 70px;
        display: inline-block;
      }
    }
  }
</style>
