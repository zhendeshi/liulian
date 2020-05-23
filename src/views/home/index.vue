<template>
  <div class="pages padTab" :class="[dayStydy?'dayStydy':'nightStydy']">
    <!--搜索框-->
    <search-box>
      <remind></remind>
    </search-box>
    <!--轮播图-->
    <banner :banner="banner"></banner>
    <!--五个导航-->
    <nav-icon :navIcon="navIcon" style="margin: 21px 0 27px"></nav-icon>
    <!--优选推荐-->
    <cell-title title="优选推荐" path="/youXuanList"></cell-title>
    <recommend :recommend="recommend"></recommend>
    <!--限时秒杀-->
    <seckill :spikeTime="spikeTime" v-if="spikeGoods.length>0" :spikeGoods="spikeGoods" style="margin: 10px 0 25px"></seckill>

    <!--精彩活动-->
    <cell-title title="精彩活动" path="/active"></cell-title>
    <activity style="margin: 15px 0 24.5px 12px" :odata="Activity"></activity>

    <!--热门话题-->
    <cell-title title="热门话题" path="/topic"></cell-title>
    <topic style="margin: 15px 0  12px" :odata="TopicList"></topic>

    <!--精选产品-->
    <cell-title style="margin: 24.5px 0  15px" path="/recommedList" title="精选产品"></cell-title>
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="false"
      @load="getListMore"
    >
      <product :product="product" type="1"></product>
    </van-list>
    <!--优惠券弹框-->
    <pop-coupon :odata="coupon" type="2" :show="UserInfo.is_receive"></pop-coupon>
    <div class="changeStydy icon" @click="changeStydy"></div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState, mapMutations} from 'vuex'
  import SearchBox from "./components/SearchBox";
  import banner from "./components/banner";
  import navIcon from "./components/navIcon"
  import recommend from "./components/recommend";
  import cellTitle from "./components/cellTitle";
  import seckill from "./components/seckill";
  import activity from "./components/activity";
  import topic from "./components/topic";
  import product from "./components/product";
  import popCoupon from "../../components/popCoupon";
  import remind from '../../components/remind'


  export default {
    name: "index",
    data() {
      return {
        //组件
        loc: '',
        navIcon: '',
        banner: '',
        recommend: '',
        spikeTime: '',//秒杀时间
        spikeGoods: '',//秒杀商品
        product: '',
        Activity: '',
        TopicList: '',
        coupon: '',
        //私有
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    components: {
      SearchBox,
      banner,
      navIcon,
      recommend,
      cellTitle,
      seckill,
      activity,
      topic,
      product,
      popCoupon,
      remind
    },
    created() {
      this.initPage()
      this.setTabBarIndex(0)


    },
    computed: {
      ...mapState(['dayStydy', 'UserInfo'])
    },
    methods: {
      ...mapMutations(["setDayStydy", 'setTabBarIndex']),
      changeStydy() {
        this.setDayStydy(!this.dayStydy)
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('config/getNav', {type: 1}),//导航
            this.$post('config/banner', {type: 1}),//轮播图
            this.$post('config/getThematic'),//优选推荐
            this.$post('goods/index', {type: 2, page: 1, pnum: 10}),//底部商品推荐
            this.$post('Activity/getIndex', {page: 1, pnum: 5}),//精彩活动
            this.$post('Find/getTopic', {page: 1, type: 2}),//获取话题
            this.$post('coupon/index', {type: 2}),//获取优惠劵
          ]).then(axios.spread((a, b, c, d, e, f, g) => {
            this.navIcon = this.$gDataList(a)
            this.banner = this.$gDataList(b)
            this.recommend = this.$gDataList(c)
            this.product = this.$gDataList(d)
            this.Activity = this.$gDataList(e)
            this.TopicList = this.$gDataList(f)
            this.coupon = this.$gDataList(g)

          })).catch((res) => {
            this.$toast.clear()
          })
          this.$post('spike/time').then(res => { //抢购时间段
            this.spikeTime = res.data.old_time
            return this.$post('spike/index', {time_id: res.data.old_time.id, type: 1})//获取抢购商品
          }).then(res => {
            this.spikeGoods = res.data
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('goods/index', {type: 2, page: this.page, pnum: 10}).then(res => {
            if (res.data && res.data.length > 0) {
              this.product = this.product.concat(res.data)
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
  .pages {
    .icon {
      background-size: 132px 66px;
      background-image: url('../../assets/images/style.png');
    }

    .changeStydy {
      width: 56px;
      height: 56px;
      position: fixed;
      bottom: 90px;
      right: 12px;
    }
  }

  .dayStydy {
    background: #ffffff;

    .changeStydy {
      background-position: -5px -5px;
    }
  }

  .nightStydy {
    background: #000000;

    .changeStydy {
      background-position: -71px -5px;
    }
  }
</style>
