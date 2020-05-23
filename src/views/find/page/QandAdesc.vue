<template>
  <div class="page-wrap">
    <div class="header">
      <div class="banner">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="$formatImg(odata.pic)"
        />
      </div>
      <div class="desc">
        {{odata.title}}
      </div>
      <div class="other flex-sb">
        <div class="c-99">{{odata.comment}}人参与讨论</div>
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
      <comment ref="comment" type="2" :model_id="odata.id" :num="odata.comment"
               :odata="commentList" @succReply="succReply"/>
    </van-list>
    <div class="footer">
      <div class="item flex-c">
        <Gkeep :is_keep="odata.is_keep" type="7" :id="odata.id"></Gkeep>
      </div>
      <div class="item flex-c" @click="focusInp()">
        <span class="wIcon-pinglun mr-10"></span>
        评论
      </div>
    </div>

  </div>
</template>

<script>
  import userHeader from '../components/news/userHeader'
  import comment from '../../../components/comment'
  import Gkeep from '../../../components/Gkeep'

  export default {
    name: "QandAdesc",
    components: {
      userHeader,
      comment,
      Gkeep
    },
    data() {
      return {
        id: '',
        odata: '',
        commentList: '',//评论列表
        newsList: '',

        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.id = this.$route.query.id
      this.initPage()

    },
    methods: {
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
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Find/answersInfo', {id: this.id}).then(res => {
            this.odata = res.data
            return this.$post('common/getComment', {id: this.id, type: 2,page: 1})
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
          this.$post('common/getComment', {id: this.id, type: 2,page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.answers = this.answers.concat(res.data)
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
    .header {
      background: rgba(255, 255, 255, 1);
      margin-bottom: 12px;

      .banner {
        position: relative;
        width: 375px;
        height: 211px;
      }

      .desc {
        padding: 9px 12px;
        line-height: 20px;
        font-size: 14px;
      }

      .other {
        padding: 0px 12px 12px;

      }

    }

    .footer {
      border-top: 4px solid #F3F3F3;
      padding: 0 12px;
      font-size: 14px;

      .inpbox {
        width: 285px;
        height: 35px;
        background: rgba(234, 234, 234, 1);
        border-radius: 8px;
        overflow: hidden;
      }

      /deep/ .van-cell {
        background-color: transparent;
        font-size: 14px;
      }

      .btn {
        width: 55px;
        height: 35px;
        background: rgba(255, 180, 0, 1);
        border-radius: 8px;
      }

    }

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
</style>
