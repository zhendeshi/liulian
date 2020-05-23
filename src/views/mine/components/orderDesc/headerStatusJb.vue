<template>
  <div class="statusbox">
    <div class="flex-e">
      <span class="f-44" >{{status[odata.status-2]}}</span>

    </div>
    <div class="mt-20">
      {{statusB[odata.status-2]}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "headerStatus",
    props: ['odata', 'groupUser'],
    data() {
      return {
        status: ['待发货', '待收货', '已完成',],
        statusB: ['等待卖家发货', '等待买家收货', '订单已完成',],
      };
    }

  }
</script>

<style scoped lang="less">
  .statusbox {
    background-image: url("../../../../assets/images/mine/headerbg3.png");
    background-size: 100%;
    width: 375px;
    height: 165px;
    padding: 40px 12px 0;
    color: #ffffff;
  }
</style>
