<template>
  <div class="news-wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="false"
      @load="getListMore"
    >
      <v-news :odata="KeepList"></v-news>
    </van-list>
  </div>
</template>

<script>
  import vNews from '../../../find/components/index/news'

  export default {
    name: "news",
    components: {
      vNews
    },
    data(){
      return{
        KeepList:'',
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
          this.$post('user/getKeepList', {type: 5, page: 1}).then(res => { //收藏列表
            this.KeepList = res.data
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('user/getKeepList', {type: 5, page: this.page,}).then(res => {
            if (res.data && res.data.length > 0) {
              this.KeepList = this.KeepList.concat(res.data)
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
.news-wrap{
  background: #ffffff;
  min-height: 100%;
  padding: 20px 12px 1px;

}
</style>
