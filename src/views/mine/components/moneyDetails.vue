<template>
  <div class="moneyDetails">
    <slot></slot>
    <!--    <van-collapse v-model="activeNames">-->
    <!--      <van-collapse-item title="2019-11" name="1">-->
    <!--        <div class="listbox">-->
    <!--          <div class="item" v-for="item in 2">-->
    <!--            <div class="row1 mb-20 flex-sb f-28">-->
    <!--              <span class="f-28">充值</span>-->
    <!--              <span class="c-ffb">+520</span>-->
    <!--            </div>-->
    <!--            <div class="c-99 mb-30">2019/11/16</div>-->
    <!--          </div>-->
    <!--          <div class="item" v-for="item in 2">-->
    <!--            <div class="row1 mb-20 flex-sb f-28">-->
    <!--              <span class="f-28">充值</span>-->
    <!--              <span>+520</span>-->
    <!--            </div>-->
    <!--            <div class="c-99 mb-30">2019/11/16</div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </van-collapse-item>-->
    <!--      <van-collapse-item title="2019-11" name="2">内容</van-collapse-item>-->
    <!--      <van-collapse-item title="2019-11" name="3">内容</van-collapse-item>-->
    <!--    </van-collapse>-->
    <div class="listbox">
      <div class="item" v-for="(item,index) in odata" :key="index">
        <div class="row1 mb-20 flex-sb f-28">
          <span class="f-28">{{item.desc}}</span>
          <div v-if="type==2">
            <span class="c-ffb" v-if="item.status==1">+{{$price(item.point)}}</span>
            <span v-else>-{{$price(item.point)}}</span>
          </div>
          <div v-else>
            <span class="c-ffb" v-if="item.status==1">+{{$price(item.money)}}</span>
            <span v-else>-{{$price(item.money)}}</span>
          </div>

        </div>
        <div class="c-99 mb-30">{{item.add_time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "moneyDetails",
    props: ['odata', 'type'],
    data() {
      return {}
    }
  }
</script>

<style scoped lang="less">
  .moneyDetails {
    margin-top: 12px;
    padding: 15px 12px 0;
    background: #ffffff;

    .listbox {
      color: #333333;
      padding-top: 15px;
      padding-bottom: 1px;
    }

    /deep/ .van-hairline--top-bottom::after, /deep/ .van-hairline-unset--top-bottom::after {
      border-width: 0;
    }

    /deep/ .van-cell {
      padding: 0;
    }

    /deep/ .van-collapse-item__title {
      display: flex;
      align-items: center;
      height: 47px;
      padding: 16px 0;
    }

    /deep/ .van-cell__title {
      height: 16px;
      line-height: 16px;
      border-left: 2px solid #E2C583;
      padding-left: 6px;
      font-size: 15px;
      font-weight: bold;
    }

    /deep/ .van-collapse-item__content {
      padding: 0;
    }

    /deep/ .van-cell:not(:last-child)::after {
      left: 0;
    }
  }
</style>
