<template>
  <div class="page-wrap padTab6" v-if="odata">
    <div class="listbox">
      <div class="item">
        <user-header :item="odata" @delAnction="delAnction">
          <div class="time">{{$mTime(odata.add_time)}}</div>
        </user-header>
        <div class="bottom flex-sb">
          <div class="flex-tb">
            <span class="wIcon wIcon-dizhi mr-10"></span>{{odata.address}}
          </div>
          <div class="flex-tb" @click.stop="$linkTo('/circleDesc',{id:odata.circle.id,type:1})">
            <span class="wIcon wIcon-quanzi mr-10"></span><span class="iconfont icon-jiantou1"></span>
            {{odata.circle.title}}
          </div>
        </div>
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="false"
      @load="getListMore"
    >
      <comment ref="comment" class="mt-24" type="4" :model_id="odata.id" :num="odata.comment"
               :odata="commentList" @succReply="succReply"/>
    </van-list>

    <div class="footer ">
      <div class="item flex-c">
        <Gkeep :is_keep="odata.is_keep" type="6" :id="odata.id"></Gkeep>
      </div>
      <div class="item flex-c" @click="focusInp()">
        <span class="wIcon-pinglun mr-10"></span><span>评论</span>
      </div>
      <div class="item flex-c">
        <GlikeNum :is_like="odata.is_like" :num="odata.like" type="3" :id="odata.id"/>
      </div>
    </div>
  </div>
</template>

<script>
  import userHeader from '../components/news/userHeader'
  import comment from '../../../components/comment'
  import GlikeNum from '../../../components/GlikeNum'
  import Gkeep from '../../../components/Gkeep'

  export default {
    name: "circleDescMore",
    data() {
      return {
        id: '',
        odata: '',
        commentList: '',

        loading: false,
        loadMore: true,
        page: 2
      }
    },
    components: {
      userHeader,comment, GlikeNum, Gkeep
    },
    created() {
      this.id = this.$route.query.id
      this.initPage()
    },
    methods: {

      //删除动态
      delAnction() {
        this.$dialog.confirm({
          message: '确定删除此动态吗?'
        }).then(() => {
          this.$post('Circle/delete', {id: this.id}).then(res => {
            let _this = this
            this.$toast.loading('删除成功,正在跳转')
            setTimeout(function () {
              _this.$toast.clear()
              _this.$router.go(-1);
            }, 1500);
          }).catch((res) => {
            this.$toast.clear()
          })
        }).catch(() => {

        });

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
      },
      //资讯文章点赞
      clilike(type) {
        type ? this.odata.like++ : this.odata.like--
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Circle/getNewsInfo', {id: this.id, page: 1}).then(res => {
            this.odata = res.data
            return this.$post('common/getComment', {type: 4, page: 1, id: res.data.id})
          }).then(res => {
            this.commentList = res.data
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('common/getComment', {type: 4, id: this.odata.id, page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.commentList = this.commentList.concat(res.data)
              this.page++
            } else {
              this.loadMore = false
            }
            this.loading = false
          }).catch((res) => {
            this.loadMore = false
            this.loading = false
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .page-wrap {

    .listbox {
      background: #ffffff;
      padding: 12px 12px 0;

      .item {
        .time {
          color: #999999;
          margin-top: 6px;
        }

        .bottom {
          height: 31px;
          padding-bottom: 15px;

          .wIcon {
            margin-left: -8px;
          }

          .flex-tb {
            height: 16px;
            background: rgba(243, 243, 243, 1);
            border-radius: 2px;
            font-size: 10px;
            color: #999999;
            margin-left: 8px;
            padding-right: 10px;

            .icon-jiantou1 {
              font-size: 12px;
            }
          }
        }
      }
    }

    .footer {
      border-top: 1px solid #CCCCCC;
      padding: 0 15px;
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
      }
    }

  }
</style>
