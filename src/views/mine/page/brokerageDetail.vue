<template>
  <div class="brokerageDetail">
    <div class="header">
      返佣 <span class="c-ffb fw-bold">{{count}}</span> 积分
    </div>
    <div class="listbox">

      <van-list
        v-model="loading"
        :finished="!loadMore"
        finished-text="暂无更多数据"
        :offset="0"
        :immediate-check="true"
        @load="getListMore"
      >
        <div class="item" v-for="(item,index) in distrib" :key="index">
          <div class="row">
            <label>订单编号</label>{{item.order.ordercode}}
          </div>
          <div class="row ">
            <label>订单时间</label>{{item.order.add_time}}
          </div>
          <div class="row">
            <label>价格</label>￥{{$price(item.order.pay_price)}}
          </div>
          <div class="row">
            <label>所属用户</label>
            <div class="imgbox">
              <van-image width="100%" height="100%" fit="cover" round
                         :src="item.user.head_img?$formatImg(item.user.head_img):$formatImg('defaultHeader')"
              />
            </div>
            <div class="">{{item.user.nickname}}</div>
          </div>
          <div class="bottom flex-sb">
            <span>返佣积分</span>
            <span class="fw-bold c-ffb">+{{$price(item.point)}}</span>
          </div>
        </div>
      </van-list>

    </div>
  </div>
</template>

<script>
  export default {
    name: "brokerageDetail",
    data() {
      return {
        distrib: [],
        count: '',
        loading: false,
        loadMore: true,
        page: 2,
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('user/distrib', {page: 1}).then(res => { //我的团队
            this.distrib = res.data
            this.count = res.count
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          return this.$post('user/distrib', {page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.distrib = this.distrib.concat(res.data)
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
    }
  }
</script>

<style scoped lang="less">
  .header {
    font-size: 16px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    padding: 15px 12px;
    background: #ffffff;
    margin-bottom: 12px;
  }

  .listbox {
    .item {
      background: #ffffff;
      margin-bottom: 12px;
      padding: 15px 12px 0;
      font-size: 14px;

      .row {
        margin-bottom: 14px;
        display: flex;
        align-items: center;

        label {
          color: #666666;
          width: 80px;
        }

        .imgbox {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin-right: 7px;
        }
      }

      .bottom {
        margin-top: 15px;
        font-size: 16px;
        padding: 15px 0;
        border-top: 1px solid #eeeeee;
      }
    }
  }
</style>
