<template>
  <div class="wrap">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <div class="imgbox">
          <van-image :src="image" width="100%" radius="8" height="100%" fit="cover"/>
          <div class="mask">
            <div class="tips flex-c">
              时尚
            </div>
            <div class="tit">榴莲刺客-全球榴莲刺客聚集地</div>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  export default {
    name: "banner",
    data() {
      return {
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ]
      }
    },
  }
</script>

<style scoped lang="less">
  .wrap {
    width: 351px;
    height: 140px;
    border-radius: 8px;
    margin: 0 auto;
    overflow: hidden;
    .imgbox {
      width: 351px;
      height: 140px;
      position: relative;
      z-index: 9;
      .mask {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding:  10px 10px 0;
        background-image:linear-gradient(
          to bottom,
          rgba(0,0,0,0) 0%,
          rgba(0,0,0,0.4) 50%,
          rgba(0,0,0,0.7) 100%
        );

        /*background:rgba(0,0,0,0.6);*/
        .tips{
          width:50px;
          height:16px;
          background:rgba(255,180,0,1);
          box-shadow:0px 3px 2px 0px rgba(255,180,0,0.28);
          border-radius:8px;
          color: #ffffff;
          font-size: 10px;
        }
        .tit{
          color: #ffffff;
          margin: 8px 0 20px;
        }
      }
    }
  }
</style>
