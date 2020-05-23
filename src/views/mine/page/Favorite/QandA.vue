<template>
  <div class="conn-wrap">
    <problem :odata="KeepList"></problem>
  </div>
</template>

<script>

  import problem from '../../../find/components/index/problem'

  export default {
    name: "QandA",
    components: {problem},
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
          this.$post('user/getKeepList', {type: 7, page: 1}).then(res => { //收藏列表
            this.KeepList = res.data
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('user/getKeepList', {type: 7, page: this.page,}).then(res => {
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
  .conn-wrap{
    padding: 12px;
  }
</style>
