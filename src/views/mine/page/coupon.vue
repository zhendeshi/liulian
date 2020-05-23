<template>
  <div class="page-wrap">
    <div class="navbox">
      <nav-tab :navList="navList" :navIndex="navIndex" @fchangeNav="changeNav"></nav-tab>
    </div>
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="暂时没有更多优惠券~"
      :offset="0"
      :immediate-check="true"
      @load="getListMore"
    >
      <div class="listbox">
        <div :class="classArr[navIndex]" v-for="(item,index) in list" :key="index">
          <div class="left">
            <div class="tit">{{item.title}}</div>
            <div class="f-22 mt-24 mb-15">有效期：{{item.start_time}}-{{item.end_time}}</div>
            <div class="tips">
              <label>使用规则：</label>
              <div>
                {{item.rule}}
              </div>
            </div>
          </div>
          <div class="right">
            <div class="f-36 fw-bold ">￥{{$price(item.price)}}</div>
            <div class="row2">满{{$price(item.condition)}}可使用</div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import navTab from '../../../components/navTab'

  export default {
    name: "coupon",
    components: {navTab},
    data() {
      return {
        navList: [{title: '可使用'}, {title: '已使用'}, {title: '已过期'}],
        classArr: ['item avtive', 'item yet', 'item'],
        navIndex: 0,
        list: [],
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      changeNav(index) {
        this.list = []
        this.navIndex = index
        this.loading = false
        this.loadMore = true
        this.$toast.loading('正在加载')
        this.$post('user/getCouponList', {type: this.navIndex + 1, page: 1}).then(res => {
          this.list = res.data
          this.$toast.clear()
        }).catch((res) => {
          this.$toast.clear()
        })
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          return this.$post('user/getCouponList', {type: this.navIndex + 1, page: 1}).then(res => {
            this.list = res.data
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })

        })
      },
      getListMore() {
        if (this.loadMore) {
          return this.$post('user/getCouponList', {type: this.navIndex + 1, page: this.page}).then(res => {
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
    }
  }
</script>

<style scoped lang="less">
  .navbox {
    display: flex;
    justify-content: center;
    background: #ffffff;
  }

  .listbox {
    margin-top: 15px;

    .item.avtive {
      background-image: url("../../../assets/images/mine/couponBg.png");

      .left {
        color: #ffffff;
      }

      .right {
        color: #333333;

        .row2 {
          color: #333333;
        }
      }
    }

    .item.yet {
      background-image: url("../../../assets/images/mine/couponBg3.png");
    }

    .item {
      width: 356px;
      height: 97px;
      margin: 0 12px 12px;
      border-radius: 5px;
      overflow: hidden;
      background-image: url("../../../assets/images/mine/couponBg2.png");
      background-size: 100%;
      position: relative;
      display: flex;

      .left {
        padding: 14.5px 11px 0;
        width: 248px;

        .tit {
          font-size: 17px;
          font-weight: bold;
        }

        .tips {
          display: flex;

          p {
            margin-bottom: 2px
          }
        }
      }

      .right {
        width: 108px;
        padding: 17px 10px 0;
        text-align: center;
        color: #666666;

        .row2 {
          margin-top: 17.5px;
          padding-top: 15.5px;
          border-top: 1px solid #eeeeee;
          color: #999999;
        }
      }
    }
  }

</style>
