<template>
  <div class="g-container">
    <div class="item flex" v-for="(item,index) in odata.goods" :key="index">
      <div class="imgbox">
        <van-image width="100%" height="100%" fit="cover" radius="8" :src="$formatImg(item.pic)"/>
      </div>
      <div class="msgbox fle1">
        <b class="f-28 two-row-hide" style="line-height: 1.3">{{item.title}}</b>
        <div class="flex-sb c-99 mt-10">
          <span>{{item.spec_name?`商品规格：${item.spec_name}`:''}}</span>

        </div>
        <div class="bottem flex-sb flex-e">
          <div class="c-ff2">
            ¥<b class="f-36">{{$price(item.price)}}</b>
          </div>
          <span class="c-66">x{{$price(item.num)}}</span>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goodsItem",
    props: ['odata'],
    mounted() {
    }

  }
</script>

<style scoped lang="less">
  .g-container {
    .item {
      padding: 15px 0;
      border-bottom: 1px solid #eeeeee;

      .imgbox {
        width: 80px;
        height: 80px;
        background: rgba(243, 243, 243, 1);
        border-radius: 8px;
        margin-right: 12px;
      }

      .msgbox {
        position: relative;

        .bottem {
          position: absolute;
          bottom: 0px;
          width: 100%;
        }
      }
    }

    .item:last-child {
      border-bottom: 0px;
    }
  }
</style>
