<template>
  <div class="page-warp">
    <goods-item></goods-item>
    <div class="g-container msgbox">
      <div class="header">
        <div class="flex">
          <label>物流公司</label>顺丰快递
        </div>
        <div class="flex">
          <label>运单号</label>123456789
        </div>
        <div class="flex">
          <label>状态</label>签收
        </div>
      </div>

      <van-steps direction="vertical" :active="0">
        <van-step>
          <div class="stepbox">
            <div class="tit">
              [广州市] 快件已在东圃镇 已签收 签收人：他人代
              收 [感谢使用顺丰快递]
            </div>
            <div class="c-99">2018-11-14 16:15:18</div>
          </div>
        </van-step>
        <van-step>
          <div class="stepbox">
            <div class="tit">
              [广州市] 快件已在东圃镇 已签收 签收人：他人代
              收 [感谢使用顺丰快递]
            </div>
            <div class="c-99">2018-11-14 16:15:18</div>
          </div>
        </van-step>
        <van-step>
          <div class="stepbox">
            <div class="tit">
              广东省广州市某公司已揽入
            </div>
            <div class="c-99">2018-11-14 16:15:18</div>
          </div>
        </van-step>
      </van-steps>
    </div>
  </div>
</template>

<script>
  import goodsItem from '../components/order/goodsItem'

  export default {
    name: "delivery",
    components: {goodsItem}
  }
</script>

<style scoped lang="less">
  .page-warp {
    padding-top: 12px;

    .msgbox {
      .header {
        padding: 15px 0 5px;
        border-bottom: 1px solid #eeeeee;
        font-size: 14px;
        margin-bottom: 15px;

        label {
          width: 70px;
          color: #999999;
          margin-bottom: 10px;
          display: block;
        }
      }

      .stepbox {
        margin-top: -2px;

        .tit {
          line-height: 18px;
          font-size: 14px;
          color: #333333;
          font-weight: 500;
          margin-bottom: 8px;
        }

      }
    }

    /deep/ .van-step--vertical:not(:last-child)::after {
      border-bottom-width: 0px
    }

    /deep/ .van-step--vertical {
      padding: 0 0 30px 0;
    }
    /deep/.van-icon-checked:before{
      content: '';
      width:9px;
      height:9px;
      background:rgba(255,45,37,1);
      border-radius:50%;
    }
    /deep/.van-step__circle{
      width:9px;
      height:9px;
      background:rgba(255,180,0,1);
      border-radius:50%;
    }
  }
</style>
