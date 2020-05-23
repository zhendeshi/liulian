<template>
  <div class="wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="暂无更多通知~"
      :offset="100"
      :immediate-check="true"
      @load="getListMore"
    >
      <div class="rowbox flex-sb" v-for="(item,index) in notice" :key="index" @click="$linkTo('/notice',{id:item.id})">
        <div class="imgbox">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="$formatImg('defaultHeader')"
          />
        </div>
        <div class="msg ">
          <div class="flex-sb row1">
            <div class="name">{{item.title}}</div>
            <div class="time">{{item.add_time}}</div>
          </div>
          <div class="flex-sb">
            <div class="desc one-row-hide">{{item.summary}}</div>
          </div>
        </div>
      </div>

    </van-list>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "noticeList",
    data() {
      return {
        notice: '',
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
            this.$post('notice/notice', {page: 1}),//点赞通知
          ]).then(axios.spread((a) => {
            this.notice = this.$gDataList(a)
            this.$toast.clear()
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          this.$post('notice/notice', { page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.notice = this.notice.concat(res.data)
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
    padding: 0 12px 0;

    .rowbox{

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
        flex: 1;
        .name{
          color: #333333;
          font-size: 14px;
        }
        .row1{
          margin-bottom: 13px;
        }
        .desc{
          width: 248px;
        }
        .num{
          width:16px;
          height:16px;
          background:rgba(255,45,37,1);
          border-radius:50%;
          font-size: 10px;
          color: #ffffff;
          line-height: 16px;
          text-align: center;
        }
      }
    }
  }
</style>
