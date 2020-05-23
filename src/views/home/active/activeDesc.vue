<template>
  <div class="wrap">
    <div class="banner">
      <van-image
        width="100%"
        height="100%"
        :src="$formatImg(listbox.pic)"
      />
    </div>
    <div class="partOne">
      <div class="tit one-row-hide">{{listbox.title}}</div>
      <div class="box">

        <p>报名时间：</p>
        <span>{{$nTime(listbox.sign_time)}}-{{$nTime(listbox.sign_end_time)}}</span>
        <p>活动时间：</p>
        <span>{{$nTime(listbox.start_time)}}-{{$nTime(listbox.end_time)}}</span>
        <p>活动地点：</p>
        <span>{{listbox.address}}</span>
        <div class="btn flex-c" @click="$linkTo('/activeBaom',{id:listbox.id,price:listbox.price})"
             v-if="listbox.num!=0&&listbox.set_num<listbox.num&&listbox.start_name.code==2">立即报名
        </div>
        <div class="btnb flex-c" v-else>{{listbox.start_name.msg}}</div>
      </div>
    </div>
    <div class="partTwo">
      <div class="tit">活动详情</div>
      <video-player v-if="listbox.video" class="video-player vjs-custom-skin mt-30"
                    ref="videoPlayer"
                    :playsinline="true"
                    :options="playerOptions"
      ></video-player>
      <div class="desc" v-html="listbox.centent"></div>
    </div>
  </div>
</template>

<script>
  import {videoPlayer} from 'vue-video-player'
  import 'video.js/dist/video-js.css'

  let moment = require("moment");
  export default {
    name: "recommend",
    data() {
      return {
        listbox: '',
        id: '',
        playerOptions: {
          playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "" //url地址
          }],
          poster: "", //你的封面地址
          width: document.documentElement.clientWidth, //播放器宽度
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true  //全屏按钮
          }
        }
      }
    },
    components:{videoPlayer},
    created() {
      this.id = this.$route.query.id
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Activity/getInfo', {id: this.id}).then(res => {
            this.listbox = res.data
            this.playerOptions.sources[0].src = this.$formatImg(res.data.video)
            this.playerOptions.poster = this.$formatImg(res.data.video_pic)
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })

        })
      },
    }
  }

</script>

<style scoped lang="less">
  .wrap {
    /deep/ .video-js .vjs-big-play-button {
      top: 50%;
      left: 50%;
      width: 100px;
      height: 60px;
      margin-top: -30px;
      margin-left: -50px;
    }

    /deep/.vjs-big-play-button .vjs-icon-placeholder:before {
      top: 12.5px!important;
    }

    .banner {
      position: relative;
      z-index: 1;
      height: 211px;
    }

    .partOne {
      position: relative;
      z-index: 2;
      width: 351px;
      background: rgba(255, 255, 255, 1);
      border-radius: 5px;
      margin: -40px auto 12px;
      padding: 15px 12px 1px;

      .box {
        position: relative;
        padding-top: 27.5px;
        font-size: 14px;

        p {
          display: block;
          margin-bottom: 10px;
          color: #999999;
        }

        span {
          display: block;
          margin-bottom: 12px;
        }

        .btn {
          width: 70px;
          height: 28px;
          background: linear-gradient(90deg, rgba(255, 201, 52, 1), rgba(255, 180, 0, 1));
          border-radius: 14px;
          font-size: 12px;
          color: #ffffff;
          position: absolute;
          top: 27.5px;
          right: 0px;
        }

        .btnb {
          min-width: 70px;
          padding: 0 8px;
          height: 28px;
          background: #EEEEEE;
          border-radius: 14px;
          font-size: 12px;
          color: #ffffff;
          position: absolute;
          top: 27.5px;
          right: 0px;
        }
      }
    }

    .partTwo {
      width: 351px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      padding: 15px 12px;
      font-size: 14px;

      color: #666666;

      .desc {
        margin: 13px 0 20px;
        line-height: 18px;
      }
    }

    .tit {
      font-size: 16px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      width: 100%;
    }

  }

</style>
