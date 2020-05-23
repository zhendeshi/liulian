<template>
  <div class="page-wrap">
    <div class="header">
      <div class="title">
        {{odata.title}}
      </div>
      <div class="c-99">
        {{odata.scan}}人阅读
      </div>
      <div class="msgbox flex-sb">
        <div class="imgbox g-tipsBox">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            round
            :src="odata.type==1&&odata.user&&odata.user.head_img?$formatImg(odata.user.head_img):$formatImg('defaultHeader')"
          />
          <div v-if="odata.user&&odata.user.grade_pic" class="g-tips"
               :style="{backgroundImage: 'url(' + $formatImg(odata.user.grade_pic) + ')'}"></div>
        </div>
        <div class="msg">
          <div class="f-28">{{odata.user?odata.user.nickname:'平台发布'}}</div>
          <div class="c-99 f-20 mt-12">{{odata.add_time}}<span class="ml-20">{{odata.user?odata.user.desc:''}}</span>
          </div>
        </div>
        <Gattent v-if="odata.type==1" :attent="odata.is_attent" type="1" :model_id="odata.user.id"></Gattent>
      </div>
      <div class="center">
        <video-player v-if="odata.video" class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      :options="playerOptions"
        ></video-player>
        <div class="mt-20 mb-30">{{odata.summary}}</div>
        <div v-html="odata.desc"></div>
      </div>
    </div>
    <cell-title style="margin: 15px 0" title="相关推荐" path="/news"></cell-title>
    <news style="margin:0 12px 15px" :odata="newsList"></news>
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="false"
      @load="getListMore"
    >
      <comment ref="comment" style="border-top: 12px solid #e3e3e3" type="1" :model_id="odata.id" :num="odata.comment"
               :odata="commentList" @succReply="succReply"/>
    </van-list>
    <div class="footer">
      <div class="item flex-c">
        <span class="wIcon-zhuanfa mr-10"></span>
        转发
      </div>
      <div class="item flex-c">
        <Gkeep :is_keep="odata.is_keep" type="5" :id="odata.id"></Gkeep>
      </div>
      <div class="item flex-c" @click="focusInp()">
        <span class="wIcon-pinglun mr-10"></span>
        评论
      </div>
      <div class="item flex-c">
        <Glike :is_like="odata.is_like" type="1" :id="odata.id" @clilike="clilike"/>
        {{odata.like}}
      </div>
    </div>
  </div>
</template>

<script>
  import cellTitle from '../../home/components/cellTitle'
  import news from '../components/index/news'
  import comment from '../../../components/comment'
  import Gattent from "../../../components/Gattent";
  import Gkeep from "../../../components/Gkeep";
  import Glike from "../../../components/Glike";
  import {videoPlayer} from 'vue-video-player'
  import 'video.js/dist/video-js.css'

  export default {
    name: "newsDesc",
    data() {
      return {
        id: '',
        odata: '', //资讯基础信息
        commentList: '',//评论列表
        newsList: '',

        loading: false,
        loadMore: true,
        page: 2,
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
    components: {
      cellTitle,
      news,
      comment,
      Gattent,
      Gkeep,
      Glike,
      videoPlayer

    },
    created() {
      this.id = this.$route.query.id;
      this.initPage()
    },
    watch: {
      "$route"(to, from) { //监听路由是否变化
        this.id = this.$route.query.id;
        this.initPage()
      }

    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Find/getNewsInfo', {id: this.id}).then(res => {
            this.odata = res.data
            this.playerOptions.sources[0].src = this.$formatImg(res.data.video)
            this.playerOptions.poster = this.$formatImg(res.data.video_pic)
            return this.$post('common/getComment', {page: 1, type: 1, id: res.data.id})
          }).then(data => {
            this.commentList = data.data
            return this.$post('Find/getReco', {id: this.id})
          }).then(data => {
            this.$toast.clear()
            this.newsList = data.data
          }).catch((res) => {
            console.log(res);
            this.$toast.clear()
          })

        })
      },
      // 底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('common/getComment', {page: this.page, type: 1, id: this.odata.id || 0}).then(res => {
            if (res.data && res.data.length > 0) {
              this.commentList = this.commentList.concat(res.data)
              this.page++
            } else {
              this.loadMore = false
            }
            this.loading = false
          }).catch((res) => {
            console.log(res);
            this.loadMore = false
            this.loading = false
          })
        }
      },
      //资讯文章点赞
      clilike(type) {
        type ? this.odata.like++ : this.odata.like--
      },
      //点击评论
      focusInp() {
        this.$refs.comment.focusInp()
      },
      //一级回复评论成功
      succReply(data, itemId) {
        if (itemId < 0) { //没有展开遮罩层 也没有选中楼层评论
          this.commentList.unshift(data)
        } else { //没有展开遮罩层 但是选中了 楼层评论
          let index = this.commentList.findIndex(item => item.id == itemId)
          this.commentList[index].num++
        }
      }
    }
  }
</script>

<style scoped lang="less">
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

  .page-wrap {
    padding-bottom: 45px;
    min-height: 100%;
    background: #ffffff;


    .header {
      padding: 10px 12px;
      border-bottom: 12px solid #F3F3F3;
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      color: rgba(51, 51, 51, 1);
      line-height: 30px;
      margin-bottom: 5.5px;
    }

    .msgbox {
      margin-top: 15px;

      .imgbox {
        width: 40px;
        height: 40px;
        margin-right: 8px;
        position: relative;
      }

      .msg {
        flex: 1;
      }


    }

    .center {
      margin: 10px 0 20px;
    }

    .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      display: flex;
      align-items: center;
      border-top: 1px solid #CCCCCC;
      height: 44px;
      background: #ffffff;

      .item {
        flex: 1;
        color: #666666;
      }

      .active {
        color: #FFB400;
      }
    }
  }
</style>
