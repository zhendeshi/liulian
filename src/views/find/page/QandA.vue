<template>
  <div class="conn-wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="true"
      @load="getListMore"
    >
      <problem :odata="answers"></problem>
    </van-list>

  </div>
</template>

<script>

  import problem from '../../find/components/index/problem'

  export default {
    name: "QandA",
    components: {problem},
    data() {
      return {
        answers:'',
        type:'',
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.type = this.$route.query.type||1
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Find/answers',{type:this.type,page:1}).then(res => {
            this.answers = res.data
          }).catch((res) => {
            this.$toast.clear()
          })

        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('Find/answers', {type:this.type,page:this.page}).then(res => {
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
  .conn-wrap {
    padding: 12px;
  }
</style>
