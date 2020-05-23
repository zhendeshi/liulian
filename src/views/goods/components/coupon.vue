<template>
  <div class="listbox">
    <div class="item avtive" v-for="(item,index) in list" :key="index" @click="fselCoupon(index)">
      <div class="left">
        <div class="tit">{{item.title}}</div>
        <div class="f-22 mt-24 mb-15">有效期：{{item.start_time}}-{{item.end_time}}</div>
        <div class="tips">
          <label>使用规则：</label>
          <div>
            {{item.rule}}
          </div>
        </div>
      </div>
      <div class="right">
        <div class="f-36 fw-bold ">￥{{$price(item.price)}}</div>
        <div class="row2">满{{$price(item.condition)}}可使用</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "coupon",
    props: ['list'],
    data() {
      return {}
    },
    methods: {
      fselCoupon(id){
        this.$emit('selCoupon',id)
      }
    }
  }
</script>

<style scoped lang="less">
  .listbox {
    margin-top: 15px;

    .item.avtive {
      background-image: url("../../../assets/images/mine/couponBg.png");

      .left {
        color: #ffffff;
      }

      .right {
        color: #333333;

        .row2 {
          color: #333333;
        }
      }
    }


    .item {
      width: 356px;
      height: 97px;
      margin: 0 12px 12px;
      border-radius: 5px;
      overflow: hidden;
      background-image: url("../../../assets/images/mine/couponBg2.png");
      background-size: 100%;
      position: relative;
      display: flex;

      .left {
        padding: 14.5px 11px 0;
        width: 248px;

        .tit {
          font-size: 17px;
          font-weight: bold;
        }

        .tips {
          display: flex;

          p {
            margin-bottom: 2px
          }
        }
      }

      .right {
        width: 108px;
        padding: 17px 10px 0;
        text-align: center;
        color: #666666;

        .row2 {
          margin-top: 17.5px;
          padding-top: 15.5px;
          border-top: 1px solid #eeeeee;
          color: #999999;
        }
      }
    }
  }

</style>
