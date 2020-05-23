<template>
  <div class="page-wrap">
    <div class="navbox">
      <nav-tab :navList="navList" :navIndex="navIndex" @fchangeNav="changeNav"></nav-tab>
    </div>

    <div class="listbox">
      <van-list
        v-model="loading"
        :finished="!loadMore"
        finished-text="没有更多了"
        :offset="0"
        :immediate-check="false"
        @load="getListMore"
      >
        <order-item v-for="(item,index) in list" :odata="item" :key="index" @btnAction="btnAction"></order-item>
      </van-list>
    </div>
    <van-popup v-model="PopPayType" position="bottom">
      <van-picker
        show-toolbar
        :columns="payType"
        @cancel="PopPayType = false"
        @confirm="selPayType"
        title="选择付款方式"
      />
    </van-popup>
  </div>
</template>

<script>
  import navTab from '../../../components/navTab'
  import orderItem from '../components/order/orderItem'

  export default {
    name: "myorder",
    components: {navTab, orderItem},
    data() {
      return {
        navList: [
          {title: '全部'},
          {title: '待付款'},
          {title: '待发货'},
          {title: '待收货'},
          {title: '售后'},
        ],
        navIndex: 0,
        orderId:null,

        PopPayType: false,
           payType: ["余额支付", "支付宝支付", "微信支付"],

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
        this.list=[]
        this.navIndex = index
        this.loading = false
        this.loadMore = true
        this.$toast.loading('正在加载')
        this.$post('order/getList', {type: this.navIndex, page: 1, pnum: 10}).then(res => {
          this.list = res.data
          this.$toast.clear()
        }).catch((res) => {
          this.$toast.clear()
        })
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          return this.$post('order/getList', {type: this.navIndex, page: 1, pnum: 10}).then(res => {
            this.list = res.data
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })

        })
      },
      getListMore() {
        if (this.loadMore) {
          return this.$post('order/getList', {type: this.navIndex, page: this.page, pnum: 10}).then(res => {
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
      btnAction(type, id) { //1 去支付
        this.orderId=id
        switch (type) {
          case 1:
            this.PopPayType = true
            break;
        }

        // this.goPay()
      },
      //选择付款方式
      selPayType(val, index) {
        this.PopPayType = false
        this.goPay(index)
      },
      goPay(index) {
        this.$post('order/setPay', {order_id: this.orderId,type: index+1}).then(res => {
          this.$toast.loading('支付成功,正在加载')
          this.$router.go(0)
        }).catch((res) => {
          this.$toast(res.msg)
        })
      }
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
