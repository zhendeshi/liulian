<template>
  <div class="wrap">
    <div class="listbox">
      <div class="item" v-for="item in odata" @click="$linkTo('/circleDescMore',{id:item.id})">
        <van-image v-if="item.pic.length>0" width="100%" fit="cover" :src="$formatImg(item.pic[0])"/>
        <div class="desc">
          {{item.desc}}
        </div>
        <div class="other flex-c c-66">
          <div class="headerImg g-tipsBox">
            <van-image
              round
              width="100%"
              height="100%"
              :src="item.user.head_img?$formatImg(item.user.head_img):$formatImg('defaultHeader')"
            />
            <div v-if="item.user.grade_pic" class="g-tips"
                 :style="{backgroundImage: 'url(' + $formatImg(item.user.grade_pic) + ')'}"></div>
          </div>
          <div class="fle1  ml-10 one-row-hide">{{item.user.nickname}}</div>
          <div class="flex-c" v-if="type=='like'">
            <span class="wIcon-dianzan mr-10"></span>
            <span class="mt-5">{{item.like}}</span>
          </div>
          <div class="flex-c" v-if="type=='addr'">
            <span class="iconfont icon-dizhi1 mr-5"></span>
            <span>{{$distance(item.distance)}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "dynamicList",
    props: ['type', 'odata']
  }
</script>

<style scoped lang="less">
  .listbox {
    padding: 12px 6px;
    column-count: 2;
    column-gap: 0;

    .item {
      break-inside: avoid;
      background: #ffffff;
      overflow: hidden;
      width: 169px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      padding-bottom: 12px;
      margin: 0 6px 12px;

      .imgbox {

      }

      .desc {
        font-size: 13px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 19px;
        margin: 7px 12px;
      }

      .headerImg {
        width: 24px;
        height: 24px;
      }

      .other {
        margin: 0 12px;
      }
    }
  }
</style>
