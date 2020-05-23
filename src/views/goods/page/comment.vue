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
      <commentItem :odata="list"></commentItem>

    </van-list>

  </div>
</template>

<script>
  import commentItem from "../components/goodsDesc/commentItem";

  export default {
    name: "comment",
    components: {commentItem},
    data() {
      return {
        goodsId: '',
        list: '',

        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.goodsId = this.$route.query.id
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('common/getComment', {type: 3, id: this.goodsId, page: 1}).then(res => { //商品信息
            this.list = res.data
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          this.$post('common/getComment', {type: 3, id: this.goodsId, page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.list = this.list.concat(res.data)
              this.page++
            } else {
              this.loadMore = false
            }
            this.loading = false
          }).catch((res) => {
            console.log(res);
            this.loadMore = false
            this.loading = false
          })
        }
      },

    }
  }
</script>

<style scoped lang="less">
  .wrap {
    background: #ffffff;
    min-height: 100%;
    padding: 0 12px;
  }
</style>
