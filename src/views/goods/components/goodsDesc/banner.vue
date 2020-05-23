<template>
  <div class="imgbox">
    <van-swipe @change="onChange" class="item">
      <van-swipe-item v-for="(item, index) in banner" :key="index">
        <div class="img">
          <van-image width="100%" height="100%" fit="cover" :src="$formatImg(item)"   @click="PreviewImg(index, banner)"
          />
        </div>
      </van-swipe-item>
      <div class="custom-indicator" slot="indicator">
        <span class="flex-c">{{ current + 1 }}/{{banner.length}}</span>
      </div>
    </van-swipe>
  </div>
</template>

<script>
  import {ImagePreview} from 'vant'

  export default {
    name: "banner",
    props:['banner'],
    data() {
      return {
        current: 0,
        images: [
          'https://img.yzcdn.cn/vant/apple-1.jpg',
          'https://img.yzcdn.cn/vant/apple-2.jpg'
        ],
      }
    },
    mounted(){

    },
    methods: {
      //展示图片
      PreviewImg(current, list, prefix = true) {
        let imglist = list.map(item => this.$formatImg(item))
        if (prefix) {
          ImagePreview({
            images: imglist,
            startPosition: current,
            closeOnPopstate:true
          })
        }
      },
      onChange(index) {
        this.current = index;
      }
    }
  }
</script>

<style scoped lang="less">

  .imgbox {
    background: #ffffff;

    .item {
      font-size: 0;
      position: relative;

      .img {
        width: 375px;
        height: 375px;
      }
      .custom-indicator {
        font-size: 10px;
        position: absolute;
        overflow: hidden;
        bottom: 15px;
        right: 12px;
        span {
          width: 35px;
          height: 16px;
          background: rgba(0, 0, 0, 1);
          opacity: 0.4;
          border-radius: 8px;
          float: right;
          color: #ffffff;
        }
      }
    }

  }
</style>
