<template>
  <div class="page-wrap">
    <banner></banner>
    <div class="nav">
      <div :class="['item',navIndex == index ? 'active' : '']" v-for="(item,index) in newsType" :key="index"
           @click="changeNav(index)">
        {{item.title}}
      </div>
    </div>
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="暂无更多资讯~"
      :offset="0"
      :immediate-check="true"
      @load="getListMore"
    >
      <news style="margin: 15.5px 12px 0" :odata="newsList"></news>
    </van-list>
  </div>
</template>

<script>
  import banner from '../components/news/banner'
  import news from '../components/index/news'

  export default {
    name: "index",
    components: {
      banner,
      news,
    },
    data() {
      return {
        navIndex: 0,
        newsList: '',
        newsType: '',

        loading: false,
        loadMore: true,
        type_id: '',
        page: 2
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      changeNav(index) {
        this.navIndex = index
        this.type_id = this.newsType[index].id
        this.loading = false
        this.loadMore = true
        this.$toast.loading('正在加载')
        this.$post('Find/getNews', {type_id: this.type_id, choice: 1, page: 1, pnum: 10}).then(res => {
          this.$toast.clear()
          this.newsList = res.data
        })
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Find/getNewsType').then(res => {
            this.newsType = res.data
            this.type_id = res.data[0].id
            return this.$post('Find/getNews', {type_id: this.type_id, choice: 1, page: 1, pnum: 10})
          }).then(res => {
            this.newsList = res.data
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })

        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('goods/index', {thematic_id: this.thematic_id, type: 1, page: this.page, pnum: 10}).then(res => {
            if (res.data && res.data.length > 0) {
              this.list = this.list.concat(res.data)
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

    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 12px 5px;

      .item {
        width: 60px;
        height: 28px;
        border: 1px solid rgba(153, 153, 153, 1);
        border-radius: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #999999;
      }

      .active {
        border: 1px solid rgba(255, 180, 0, 1);
        background: rgba(255, 180, 0, 1);
        box-shadow: 0px 5px 7px 0px rgba(255, 180, 0, 0.15);
        color: #ffffff;
      }
    }
  }
</style>
