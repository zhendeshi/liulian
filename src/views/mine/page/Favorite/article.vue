<template>
  <div class="listbox">
    <div class="item"  @click="$linkTo('/topicDescMore')">
      <user-header>
      </user-header>
      <div class="bottom flex-tb">
        <div class="left">31分钟前</div>
        <div class="flex-c"><span class="wIcon-pinglun mr-10"></span>99</div>
        <div class="flex-c"><span class="wIcon-dianzan mr-10"></span>99</div>
      </div>
    </div>
  </div>
</template>

<script>
  import userHeader from '../../../find/components/news/userHeader'

  export default {
    name: "article",
    components: {userHeader}
  }
</script>

<style scoped lang="less">
  .listbox{
    background: #ffffff;
    padding: 15px 12px 0;
  }
  .bottom{
    height: 44px;
    border-top: 1px solid #EEEEEE;
    div{
      flex: 1;
    }
    .left{
      flex: 2;
    }
  }
</style>
