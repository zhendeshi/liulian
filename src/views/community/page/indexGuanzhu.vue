<template>
  <div class="page-wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="暂无更多动态~"
      :offset="0"
      :immediate-check="true"
      @load="getListMore"
    >
      <dynamic-list type="like" :odata="News"></dynamic-list>
    </van-list>
  </div>
</template>

<script>
  import dynamicList from '../../../components/dynamicList'
  import axios from "axios";

  export default {
    name: "index",
    components: {dynamicList},
    data() {
      return {
        News: '',
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
            this.$post('Circle/getNews', {type: 3, types: 2, page: 1}),//获取动态
          ]).then(axios.spread((a) => {
            this.News = this.$gDataList(a)
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          this.$post('Circle/getNews', {type: 3, types: 2, page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.News = this.News.concat(res.data)
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
  .page-wrap{
    padding-top: 35px;
  }

</style>
