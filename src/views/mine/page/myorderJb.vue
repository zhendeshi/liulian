<template>
  <div class="page-wrap">
    <div class="navbox">
      <nav-tab :navList="navList" :navIndex="navIndex" @fchangeNav="changeNav"></nav-tab>
    </div>

    <div class="listbox">
      <van-list
        v-model="loading"
        :finished="!loadMore"
        finished-text="暂无更多订单~"
        :offset="0"
        :immediate-check="false"
        @load="getListMore"
      >
        <order-item v-for="(item,index) in list" :odata="item" :key="index" @btnAction="btnAction"></order-item>
      </van-list>
    </div>
  </div>
</template>

<script>
  import navTab from '../../../components/navTab'
  import orderItem from '../components/order/orderItemJb'

  export default {
    name: "mine_order_point",
    components: {navTab, orderItem},
    data() {
      return {
        navList: [
          {title: '全部'},
          {title: '待发货'},
          {title: '待收货'},
          {title: '已完成'},
        ],
        navIndex: 0,
        orderId: null,

        list: [],
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.navIndex = this.$route.query.type || 0
      this.initPage()
    },
    methods: {
      changeNav(index) {
        this.list = []
        this.navIndex = index
        this.loading = false
        this.loadMore = true
        this.$toast.loading('正在加载')
        this.$post('Point/order', {type: this.navIndex, page: 1, pnum: 10}).then(res => {
          this.list = res.data
          this.$toast.clear()
        }).catch((res) => {
          this.$toast.clear()
        })
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          return this.$post('Point/order', {type: this.navIndex, page: 1, pnum: 10}).then(res => {
            this.list = res.data
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })

        })
      },
      getListMore() {
        if (this.loadMore) {
          return this.$post('Point/order', {type: this.navIndex, page: this.page, pnum: 10}).then(res => {
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
      },
    },
  }
</script>

<style scoped lang="less">
  /deep/ .van-picker__title {
    display: flex;
    align-items: center;
  }

  /deep/ .van-picker-column__item {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .navbox {
    position: fixed;
    width: 100%;
    background: #ffffff;
    z-index: 999;
    display: flex;
    justify-content: center;
  }

  .listbox {
    padding-top: 56px;
  }
</style>
