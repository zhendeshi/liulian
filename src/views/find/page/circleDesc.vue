<template>
  <div class="page-wrap">
    <div class="header">
      <div class="banner">
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="$formatImg(info.back_pic)"/>
        <div class="other">
          <div class="mb-24 f-32 flex-c"><span v-if="type==2"># </span>{{info.title}}
            <Gattent v-if="type==1" :attent="info.is_attent" type="2" :model_id="info.id"></Gattent>
          </div>
          <div v-if="type==2">{{info.partic}}人正在参与讨论</div>
          <div v-else>{{info.attention}}人关注</div>
        </div>
      </div>
      <div class="desc">
        {{info.desc}}
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
      <div class="listbox">
        <div class="item" @click="$linkTo('/circleDescMore',{id:item.id})" v-for="(item,index) in odataList"
             :key="index">
          <user-header :item="item">
          </user-header>
          <div class="bottom flex-tb">
            <div class="left">{{$mTime(item.add_time)}}</div>
            <div class="flex-c"><span class="wIcon-pinglun mr-10"></span>{{item.comment}}</div>
            <div class="flex-c">
              <GlikeNum :is_like="item.is_like" :num="item.like" type="3" :id="item.id"/>
            </div>
          </div>
        </div>
      </div>
    </van-list>

    <edit-add></edit-add>
  </div>
</template>

<script>
  import userHeader from '../components/news/userHeader'
  import editAdd from '../components/editAdd'
  import GlikeNum from '../../../components/GlikeNum'
  import Gattent from '../../../components/Gattent'


  export default {
    name: "topicDesc",
    components: {
      userHeader, editAdd, GlikeNum, Gattent
    },
    data() {
      return {
        id: '',
        type: '',
        odataList: '',
        info: '',

        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.id = this.$route.query.id  //圈子或者话题的id
      this.type = this.$route.query.type //类型 1圈子 2话题
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
          this.$post('Circle/info', {type: this.type, id: this.id}).then(res => {
            this.info = res.data
            return this.$post('Circle/getNews', {type: this.type, id: this.id, page: 1,types:2})
          }).then(res => {
            this.$toast.clear()
            this.odataList = res.data
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('Circle/getNews', {type: this.type, id: this.id, page: this.page,types:2}).then(res => {
            if (res.data && res.data.length > 0) {
              this.odataList = this.odataList.concat(res.data)
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

      .banner {
        position: relative;
        width: 375px;
        height: 211px;

        .other {
          position: absolute;
          bottom: 15px;
          left: 12px;
          color: #ffffff;

          /deep/ .g-followBtn {
            margin-top: 0 !important;
            margin-left: 15px;
            background: #FFB400;
            color: #FFFFFF;
          }
          /deep/.yet{
            border: none;
            background: #cccccc;
          }
        }
      }

      .desc {
        padding: 9px 12px;
        line-height: 20px;
        font-size: 14px;
      }
    }

    .listbox {

      .item {
        background: #ffffff;
        margin-top: 12px;
        padding: 15px 12px 0;

        .bottom {
          height: 44px;
          border-top: 1px solid #EEEEEE;

          div {
            flex: 1;
          }

          .left {
            flex: 2;
          }
        }
      }
    }

  }
</style>
