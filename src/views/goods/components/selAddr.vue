<template>
  <div class="wrap">
    <div class="selAddr flex-c">
      <span class="iconfont icon-dizhi"></span>
      <div class="middle fle1">
        <div class="row mb-20">
          <span class="mr-30">{{value.name}}</span>
          <span>{{value.tel}}</span>
        </div>
        <div class="row two-row-hide">
          {{value.province}} {{value.city}} {{value.area}} {{value.address}}
        </div>
      </div>
      <span class="iconfont icon-dibudaohanglan-"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "addressa",
    props:['value'],
    data() {
      return {
        addr: {}
      }
    },
  }
</script>

<style scoped lang="less">
  .wrap {
    background: rgba(255, 255, 255, 1);
    font-size: 12px;

    .icon-dibudaohanglan- {
      font-size: 22px;
      color: #cccccc;
    }

    .icon-dizhi {
      font-size: 22px;
      color: #666666;
      margin-right: 15px;
    }

    .addAddrBtn {
      height: 73px;
      padding: 0 6px 0 12px;
      font-size: 14px;
    }

    .selAddr {
      padding: 0 6px 0 12px;

      height: 73px;

      .two-row-hide {
        line-height: 16px;
        margin-top: -2px;
      }
    }


  }
</style>
