<template>
  <div class="wrap">
    <div class="navbox">
      <nav-tab :navList="nav" :navIndex="navIndex" @fchangeNav="changeNav"></nav-tab>
    </div>
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="true"
      @load="getListMore"
    >
      <list style="margin: 13px 12px 0" :list="list" type="1"></list>
    </van-list>
  </div>
</template>

<script>
  import list from "../../../components/list"
  import navTab from "../../../components/navTab"
  export default {
    name: "youXuanList",
    data() {
      return {
        nav: [],
        navIndex: 0,
        list: [],
        //私有
        loading: false,
        loadMore: true,
        thematic_id: '',
        page: 2
      }
    },
    components: {list, navTab},
    mounted() {
      if (this.$route.query.thematic_id) {
        this.thematic_id = this.$route.query.thematic_id
      }
      this.initPage()
    },
    methods: {
      changeNav(index) {
        this.navIndex = index
        this.thematic_id = this.nav[index].id
        this.loading = false
        this.loadMore = true
        this.$post('goods/index', {thematic_id: this.thematic_id, type: 1, page:1, pnum: 10}).then(res => {
          this.list = res.data
        })
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('config/getThematic').then(res => {
            this.nav = res.data
            if (!this.thematic_id) {
              this.thematic_id=res.data[0].id
            }
            this.navIndex = res.data.findIndex(item => item.id == this.thematic_id)
            return this.$post('goods/index', {thematic_id: this.thematic_id, type: 1, page: 1, pnum: 10})
          }).then(res => {
            this.list = res.data
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
              this.product = this.product.concat(res.data)
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
  .navbox {
    display: flex;
    justify-content: center;
    background: #ffffff;
  }
</style>
