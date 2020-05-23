<!--预售列表-->
<template>
  <div class="wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="true"
      @load="getListMore"
    >
      <list style="margin: 0 12px 0" :list="list" type="2"></list>
    </van-list>
  </div>
</template>

<script>
  import list from "../../../components/list"

  export default {
    name: "YshouGoodsList",
    data() {
      return {
        list: [],
        //私有
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    components: {list},
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('goods/index', {page: 1,type:5}).then(res => {
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
          this.$post('goods/index', {page: this.page,type:5}).then(res => {
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
  .wrap{
    padding-top: 5px;
  }
  .navbox {
    display: flex;
    justify-content: center;
    background: #ffffff;
  }
</style>
