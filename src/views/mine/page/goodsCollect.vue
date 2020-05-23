<template>
  <div class="page-wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="true"
      @load="getListMore"
    >
      <list :list="Goods" style="margin:0 12px"></list>
    </van-list>
  </div>
</template>

<script>
  import list from '../components/list'
  import axios from "axios";

  export default {
    name: "goodsCollect",
    components: {list},
    data() {
      return {
        Goods: [],
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
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('user/keepGoods', {page: 1}),//导航
          ]).then(axios.spread((a) => {
            this.Goods = this.$gDataList(a)
            this.$toast.clear()
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          this.$post('user/keepGoods', {page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.Goods = this.Goods.concat(res.data)
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

<style scoped >
.page-wrap{
  padding: 12px 0;
}

</style>
