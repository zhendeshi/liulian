<template>
  <div class="page-wrap">
    <header-status :odata="odata"></header-status>
    <div class="mainbox">
      <addr :odata="odata"></addr>
      <goods-msg :odata="odata"></goods-msg>
      <information :Point="true" :odata="odata"></information>
    </div>
    <v-footer :odata="odata" @btnAction="btnAction" v-if="odata.status==3"></v-footer>
  </div>
</template>

<script>
  import headerStatus from '../components/orderDesc/headerStatusJb'
  import addr from '../components/orderDesc/addr'
  import goodsMsg from '../components/orderDesc/goodsMsgJb'
  import information from '../components/orderDesc/information'
  import coterie from '../components/orderDesc/coterie'
  import vFooter from '../components/orderDesc/vFooterJb'

  export default {
    name: "myorder_desc",
    components: {headerStatus, addr, goodsMsg, information, vFooter, coterie},
    data() {
      return {
        oid: '',//订单id
        odata: {},
      };
    },
    mounted() {
      this.oid = this.$route.query.oid
      this.initPointPage()

    },
    methods: {

      initPointPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Point/orderInfo', {id: this.oid}).then(res => { //商品信息
            this.odata = res.data
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      btnAction(type) {

      },

    }
  }
</script>

<style scoped lang="less">
  .mainbox {
    position: relative;
    margin-top: -53px;
    z-index: 99;
    padding-bottom: 50px;
  }

  /deep/ .van-picker__title {
    display: flex;
    align-items: center;
  }

  /deep/ .van-picker-column__item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
