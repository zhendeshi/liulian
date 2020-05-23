<template>
  <div class="wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="暂无更多回复~"
      :offset="100"
      :immediate-check="false"
      @load="getListMore"
    >
      <div class="rowbox" v-for="(item,index) in comment" :key="index">
        <div>
          <div class="imgbox">
            <van-image
              width="100%"
              height="100%"
              fit="cover"
              round
              :src="item.user.head_img?$formatImg(item.user.head_img):$formatImg('defaultHeader')"
            />
          </div>
        </div>
        <div class="msg ">
          <div class="name">{{item.user.nickname}} <span>
                                回复了你的评论
                            </span></div>
          <div class="time">{{item.time}}</div>
          <div class="descB two-row-hide">
            {{item.comment}}
          </div>
          <div class="desc two-row-hide">
            我的评论：{{item.title}}
          </div>
        </div>
      </div>

    </van-list>

  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "comment",
    data() {
      return {
        comment: '',
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('notice/comment', {page: 1}),//点评论通知
          ]).then(axios.spread((a) => {
            this.comment = this.$gDataList(a)
            this.$toast.clear()
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          this.$post('notice/comment', { page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.comment = this.comment.concat(res.data)
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
      },
    }

  }
</script>

<style scoped lang="less">
  .wrap {
    min-height: 100%;
    background: #ffffff;
    padding: 0 12px ;

    .rowbox{
      display: flex;

      padding: 15px 0;
      border-bottom: 1px solid #EEEEEE;
      color: #999999;
      .imgbox{
        width:50px;
        height:50px;
        border-radius:50%;
        background:rgba(243,243,243,1);
        overflow: hidden;
        margin-right: 8.5px;
      }
      .msg{
        margin-top: 1.5px;
        flex: 1;
        .name{
          color: #333333;
          font-size: 14px;
          span{
            font-size: 12px;
            color: #999999;
          }
        }
        .time{
          font-size: 12px;
          color: #999999;
          margin: 7px 0 13px;
        }

        .desc{
          width:300px;
          background:rgba(245,245,245,1);
          border-radius:4px;
          padding: 6px 10px;
          line-height: 16px;
        }
        .descB{
          color: #333333;
          margin: -4.5px 0 3.5px;
          line-height: 1.5;
        }
      }
    }
  }
</style>
