<template>
  <div class="postNewsTopic-page">
    <van-sticky>
      <div class="header flex-tb">
        <van-field ref="topicWord" @input="findTopic" class="inp" v-model="topicWord" placeholder="搜索圈子" clearable/>
        <div class="btn" @click="$linkTo('/postNews')">取消</div>
      </div>
      <div class="historyTit flex-tb">热门圈子 </div>
    </van-sticky>

    <div class="historyList">
      <van-list
        v-model="loading"
        :finished="!loadMore"
        finished-text="没有更多了"
        :offset="0"
        :immediate-check="false"
        @load="getListMore"
        v-if="topicList.length>0"
      >
        <div class="item" v-for="(item,index) in topicList" :key="index"
             @click="selTopic(item.id,item.title)">
          <span>{{item.title}}</span>
          <label>{{item.partic}}人参与</label>
        </div>

      </van-list>
      <div v-else class="noData">
        暂无相关话题
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "postNewsTopic",
    data() {
      return {
        topicList: [],
        topicWord: '',//搜索话题文字
        //私有
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      //搜索关键字
      findTopic(e) {
        this.topicWord = e
        this.initPage()
      },
      //选择话题
      selTopic(id, name) {
        this.$emit('global:selCirCle', {id, name});
        this.$refs.topicWord.focus();
        this.topicWord = name
        this.$toast.loading('正在跳转...')
        let _this = this
        setTimeout(function () {
          _this.$toast.clear()
          _this.$router.go(-1);
        }, 500);

      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Circle/setCircle', {page: 1, key: this.topicWord}).then(res => { //获取话题列表
            this.topicList = res.data
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //话题列表上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('Circle/setCircle', {page: this.page, key: this.topicWord}).then(res => {
            if (res.data && res.data.length > 0) {
              this.topicList = this.topicList.concat(res.data)
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
  .postNewsTopic-page {
    min-height: 100%;
    background: #ffffff;
    font-size: 14px;

    .header {
      height: 50px;
      padding-left: 12px;
      background: #fff;

      .inp {
        height: 30px;
        margin-left: 6px;
        border-right: 1px solid #eeeeee;
        line-height: 30px;
        flex: 1;
        padding: 0 5px 0 0;
      }

      .van-cell:not(:last-child)::after {
        border-bottom: 0px
      }

      /deep/ .van-field__body {
        height: 100%;
      }

      .btn {
        padding: 0 12px;
      }
    }

    .noData {
      text-align: center;
      font-size: 14px;
      line-height: 5;
      color: #999999;
    }

    .historyTit {
      height: 42px;
      background: #F3F3F3;
      color: #999999;
      font-size: 12px;
      padding-left: 12px;
    }

    .historyList {
      padding: 0 12px;

      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        border-bottom: 1px solid #eeeeee;

        label {
          color: #999999;
          font-size: 12px;
        }
      }
    }
  }
</style>
