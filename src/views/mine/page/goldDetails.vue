<template>
  <div class="page-wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="50"
      :immediate-check="false"
      @load="getListMore"
    >
      <money-details :odata="point" type="2"></money-details>
    </van-list>
  </div>
</template>

<script>
  import moneyDetails from '../components/moneyDetails'
  import axios from "axios";

  export default {
    name: "goldDetails",
    components: {moneyDetails},
    data() {
      return {
        point: [],
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
            this.$post('user/point', {page: 1}),//金币明细
          ]).then(axios.spread((a) => {
            this.point = this.$gDataList(a)
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('user/point', {page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.point = this.point.concat(res.data)
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

    /deep/ .moneyDetails {
      margin-top: 0;
      padding-top: 0;
    }
  }
</style>
