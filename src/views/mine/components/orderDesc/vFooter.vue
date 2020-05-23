<template>
  <div class="footerbox flex-tb">
    <div v-if="odata.status==1" class="step1 flex-c fle1">
      <div class="fle1 flex-e">实付金额：<span class="c-ff2">¥<b class="f-36">{{$price(odata.pay_price)}}</b></span></div>
      <div class="btn flex-c"  @click.stop="btnAction(99,odata.id)">去付款</div>
    </div>
    <div class="step2 flex-fe fle1" v-else>
      <div class="g-btnb" v-if="odata.status!=1&&odata.status<6&&odata.is_return!=1" @click.stop="btnAction(3,odata.id)">申请售后</div>
      <div class="g-btna" v-if="odata.status==3" @click.stop="btnAction(4,odata.id)">确认收货</div>
<!--      <div class="g-btna" v-if="odata.status==4">去评价</div>-->
      <div class="g-btnb" v-if="odata.status>=4&&odata.status!=6" @click.stop="btnAction(5,odata.id)">删除订单</div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "vFooter",
    props: ['odata'],
    methods:{
      btnAction(type,id){
        this.$emit("btnAction",type,id)
      },
    }
  }
</script>

<style scoped lang="less">
  .footerbox {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #ffffff;
    z-index: 999;

    .step1 {
      .fle1 {
        padding-left: 12px;
      }

      .btn {
        width: 150px;
        height: 50px;
        background: rgba(255, 74, 3, 1);
        font-size: 17px;
        font-weight: 800;
        color: rgba(255, 255, 255, 1);
      }
    }

    .g-btn {
      margin-right: 12px;
    }
    .step2 >div{
      margin-right: 15px;
    }
  }
</style>
