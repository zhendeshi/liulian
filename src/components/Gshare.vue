<template>
  <div class="share">
    <img :src="imgUrl" alt="" @click="showPop()">
    <van-popup
      v-model="showShare"
      position="bottom"
      @close="closePop"
      round
    >
      <vue-native-share :shareMenu="shareMenu" :config="config"/>
      <div class="btn flex-c" @click="closePop">取消</div>
    </van-popup>
  </div>
</template>

<script>
  import vueNativeShare from 'vue-native-share'

  export default {
    name: "Gshare",
    props: ['config'],
    components: {
      vueNativeShare
    },
    data() {
      return {
        showShare: false,
        imgUrl: require("../assets/images/comm/share.png"),
        shareMenu: [0, 1, 2, 3],
      }
    },
    watch: {},
    methods: {
      showPop() {
        this.showShare = true
        this.$emit('popAnction', '1')
      },
      closePop() {
        this.showShare = false
        this.$emit('popAnction', '2')
      }
    }
  }
</script>

<style scoped lang="less">
  .share {
    position: relative;
    z-index: 1000;

    /deep/ .label {
     display: none;
    }

    /deep/ .list {
      padding: 5px 0;
      border-right: 10px;
    }
    /deep/.list-item{
      width: 24%;
    }
    .btn{
      font-size: 14px;
      padding:5px 0 15px;
    }
  }

  img {
    display: inline-block;
    width: 65px;
  }
</style>
