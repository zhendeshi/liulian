<template>
  <div class="page-wrap padTab6">
    <div class="listbox">
      <div class="item">
        <user-header :item="odata">
          <div class="time">{{$mTime(odata.add_time)}}</div>
        </user-header>
        <div class="bottom flex-sb">
          <div class="flex-tb">
            <span class="wIcon wIcon-dizhi mr-10"></span>{{odata.address}}
          </div>
          <div class="flex-tb" @click.stop="$linkTo('/circleDesc',{id:odata.circle.id})">
            <span class="wIcon wIcon-quanzi mr-10"></span><span class="iconfont icon-jiantou1"></span>
            {{odata.circle.title}}
          </div>
        </div>
      </div>
    </div>
    <comment class="mt-24"></comment>
    <div class="footer g-footerBtnBox">
      <div class="item flex-c">
        <span class="wIcon-shouCang mr-10"></span><span>收藏</span>
      </div>
      <div class="item flex-c">
        <span class="wIcon-pinglun mr-10"></span><span>评论</span>
      </div>
      <div class="item flex-c">
        <span class="wIcon-dianzan mr-10"></span><span>88</span>
      </div>
    </div>
  </div>
</template>

<script>
  import userHeader from '../components/news/userHeader'
  import comment from '../../../components/comment'

  export default {
    name: "topicDescMore",
    data() {
      return {
        id: '',
        odata: '',

        loading: false,
        loadMore: true,
        page: 2
      }
    },
    components: {
      userHeader,
      comment
    },
    created() {
      this.id = this.$route.query.id
      this.initPage()
    },
    methods: {
      //资讯文章点赞
      clilike(type) {
        type ? this.odata.like++ : this.odata.like--
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Circle/getNewsInfo', {id: this.id, page: 1}).then(res => {
            this.odata = res.data
            return  this.$post('common/getComment', {type: 4, page: 1 ,id:res.data.id})
          }).then(res => {
            this.Comment=res.data
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('common/getComment', {type: 4, id: this.odata.id, page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.Comment = this.Comment.concat(res.data)
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
          .wIcon{
            margin-left: -8px;
          }
          .flex-tb{
            height:16px;
            background:rgba(243,243,243,1);
            border-radius:2px;
            font-size: 10px;
            color: #999999;
            margin-left: 8px;
            padding-right: 10px;
            .icon-jiantou1{
              font-size: 12px;
            }
          }
        }
      }
    }

    .footer {
      border-top: 1px solid #CCCCCC;
      padding: 0 15px;

      .item {
        flex: 1;
      }
    }

  }
</style>
