<!--拼团商品列表-->
<template>
  <div class="wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="false"
      @load="getListMore"
    >
      <list style="margin: 13px 12px 0" :list="list" type="4"></list>
    </van-list>
  </div>
</template>

<script>
  import list from "../../..//components/listB"

  export default {
    name: "index",
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
          this.$post('group/index', {page: 1, pnum: 10}).then(res => {
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
          this.$post('group/index', {page: this.page, pnum: 10}).then(res => {
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
  .navbox {
    display: flex;
    justify-content: center;
    background: #ffffff;
  }
</style>
