<template>
  <div class="page-wrap padTab">
    <banner :banner="banner"></banner>
    <nav-icon style="margin: 15px 12px 24px" :navIcon="navIcon"></nav-icon>
    <cell-title title="推荐作者" path="/author"></cell-title>
    <author :listbox="authorList" :followBtn="true" style="margin: 0 0 10px"></author>
    <cell-title v-if="newsList.length>0" title="精选资讯" path="/news"></cell-title>
    <news :odata="newsList"  style="margin: 15.5px 12px 0"></news>
    <cell-title title="经典问答" path="/QandA"></cell-title>

    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="true"
      @load="getListMore"
    >
      <problem  style="margin: 15.5px 12px 0":odata="answers"></problem>
    </van-list>
  </div>
</template>

<script>
  import banner from '../home/components/banner'
  import cellTitle from '../home/components/cellTitle'
  import navIcon from './components/index/navIcon'
  import author from './components/index/author'
  import news from './components/index/news'
  import problem from './components/index/problem'
  import {mapState, mapMutations} from 'vuex'
  import axios from "axios";

  export default {
    name: "index",
    data(){
      return{
        navIcon:'',
        banner:'',
        authorList:'',
        newsList:'',
        answers:'',
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    components: {
      banner,
      navIcon,
      cellTitle,
      author,
      news,
      problem
    },
    created() {
      this.initPage()
      this.setTabBarIndex(1)
    },
    methods: {
      ...mapMutations(['setTabBarIndex']),

      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('Find/getAuthor', {page: 1,type:1}),//推荐作者
            this.$post('Find/getNews', {choice:2,page: 1,pnum:5,type_id:0}),//获取资讯
            this.$post('Find/answers',{type:2,page:1}),//问答列表
            this.$post('config/banner', {type: 2}),//轮播图
            this.$post('config/getNav', {type: 2}),//导航
          ]).then(axios.spread((a,b,c,d,e) => {
            this.authorList = this.$gDataList(a)
            this.newsList = this.$gDataList(b)
            this.answers = this.$gDataList(c)
            this.banner = this.$gDataList(d)
            this.navIcon = this.$gDataList(e)

          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('Find/answers', {type:2,page:this.page}).then(res => {
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
    min-height: 100%;
    background: #ffffff;
    padding-top: 12px;
  }
</style>
