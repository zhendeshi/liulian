<template>
  <div class="information">
    <div class="tit">退款信息</div>
    <div class="row">
      <label>退款金额：</label>{{odata.pay_price}}
    </div>
    <div class="row">
      <label>售后原因：</label>{{odata.after.desc}}
    </div>
    <div class="row">
      <label>申请时间：</label>{{odata.after.add_time}}
    </div>
    <div class="row">
      <label>售后状态：</label>{{status[odata.after.status-1]}}
    </div>
    <div class="row" v-if="odata.after.pic.length>0">
      <label>售后图片：</label>
      <div class="box">
        <div class="imgbox" v-for="(item,index) in odata.after.pic" :key="index">
          <van-image width="100%" height="100%" fit="cover" radius="8" :src="$formatImg(item)"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "information",
    props: ['odata', 'Point'],//Point 是否是金币
    data() {
      return {
        status: ['待审核', '通过', '拒绝']
      }
    }
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
    .box{
      width: 250px;
      display: flex;
      flex-wrap: wrap;
    }
    .imgbox{
      width: 60px;
      height: 60px;
      margin: 0 10px 10px 0;
    }
  }
</style>
