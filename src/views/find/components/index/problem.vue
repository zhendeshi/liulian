<template>
  <div class="listbox">
    <div class="item"  v-for="(item,index) in odata" :key="index"  @click="$linkTo('/QandAdesc',{id:item.id})">
      <div class="title one-row-hide">
        Q:{{item.title}}
      </div>
      <div class="imgbox">
        <van-image width="100%" height="100%" fit="cover" radius="8" :src="$formatImg(item.pic)" />
      </div>
      <div class="desc">
        {{item.desc}}
      </div>
      <div class="bottom">
        <span class="c-99">{{item.comment}}人参与讨论</span>
        <div class="c-ffb"><span class="iconfont icon-bianji mr-5"></span>我来回答</div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "problem",
    props:['odata']
  }
</script>

<style scoped lang="less">
  .listbox {
    .item {
      width: 351px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      box-shadow: 0px 0px 12px #eeeeee;
      margin-bottom: 12px;
      padding: 14.5px 12px 15px;

      .title {
        font-size: 14px;
      }

      .imgbox {
        margin: 14px 0 12px;
        width:327px;
        height:109px;
      }

      .desc {
        line-height: 18px;
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        margin-top: 13px;
      }
    }
  }
</style>
