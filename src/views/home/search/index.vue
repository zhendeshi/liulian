<template>
  <div class="wrap">
    <div class="searchBox">
      <van-icon name="search" size="18"/>
      <van-field ref="topicWord" class="inp" @blur="seach()" v-model="key" placeholder="搜索圈子" clearable/>
    </div>
    <div class="main">
      <div class="tit flex-sb">
        <span>热门搜索</span>
      </div>
      <div class="listbox">
        <div class="item flex-c" v-for="(item,index) in hot" :key="index" @click="selHot(item.title)">
          {{item.title}}
        </div>
      </div>
      <div class="tit flex-sb">
        <span>历史搜索</span>
        <span class="history" @click="clearhistory()">
          <span class="iconfont mr-5">&#xe62e;</span>清除历史
        </span>
      </div>
      <div class="listbox">
        <div class="item flex-c" v-for="(item,index) in historyList" :key="index">
          {{item}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "index",
    data() {
      return {
        hot: '',
        key: '',
        history: []
      }
    },
    computed: {
      ...mapState(['historyList']),
    },
    created() {
      this.initPage()
    },
    methods: {
      ...mapMutations(['sethistory']),
      //清除搜索历史
      clearhistory(){

        this.sethistory([])
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('config/search'),//热门搜索
          ]).then(axios.spread((a) => {
            this.hot = this.$gDataList(a)
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //选择热门搜索
      selHot(name) {
        this.key = name
        this.$refs.topicWord.focus()
      },
      //热门搜索
      seach() {
        this.$toast('搜索成功')
        let history = this.historyList
        history.push(this.key)
        this.sethistory(history)
        this.$router.push({path: '/allGoods', query: {key: this.key}})
      }

    }

  }
</script>

<style scoped lang="less">
  .wrap {
    min-height: 100%;
    background: #ffffff;
    padding-top: 12px;

    .searchBox {
      width: 351px;
      height: 40px;
      background: rgba(245, 245, 245, 1);
      opacity: 0.8;
      border-radius: 20px;
      display: flex;
      margin: 0 12px 0;
      align-items: center;
      overflow: hidden;
      padding: 0 10px 0 10px;

      /deep/ .van-search {
        padding: 0;
        width: 100%;
        font-size: 14px;
      }

      /deep/ .van-search__content {
        background-color: #F5F5F5;

      }

      /deep/ .van-cell {
        background-color: transparent;
        padding-left: 5px;
      }
    }

    .main {
      padding: 30px 0;

      .tit {
        font-size: 14px;
        color: #333333;

        margin-bottom: 20px;
        padding: 0 12px;

        .history {
          font-size: 12px;
          color: #999999;
        }
      }

      .listbox {
        display: flex;
        flex-wrap: wrap;
        padding: 0 2px;
        margin-bottom: 30px;

        .item {
          margin: 0 5px 10px;
          background: rgba(247, 247, 247, 1);
          border-radius: 20px;
          line-height: 1.5;
          min-height: 40px;
          min-width: 62px;
          padding: 0 7.5px;
          font-size: 12px;
          color: #333333;
        }
      }
    }

  }
</style>
