<template>
  <div class="page-wrap padTab">
    <div class="searchbox" @click="$linkTo('/search')">
      <div class="wIcon-search mr-10"></div>
      <input class="inp" placeholder="搜索关键字">
    </div>
    <banner :banner="banner"></banner>
    <nav-icon :navIcon="navIcon" style="margin: 12px 15px 24px"></nav-icon>
    <cell-title title="精选推荐" path="recommedList"></cell-title>
    <div class="goodbox">
      <van-list
        v-model="loading"
        :finished="!loadMore"
        finished-text="没有更多了"
        :offset="0"
        :immediate-check="false"
        @load="getListMore"
      >
        <list :list="product" type="1" style="margin: 15px 12px"></list>
      </van-list>
    </div>

  </div>
</template>

<script>
  import banner from '../home/components/banner'
  import navIcon from './components/index/navIcon'
  import cellTitle from '../home/components/cellTitle'
  import list from '../../components/list'
  import {mapMutations} from 'vuex'

  import axios from 'axios'

  export default {
    name: "index",
    components: {
      banner, navIcon, cellTitle, list
    },
    data() {
      return {
        navIcon: '',
        product: [],
        banner: '',
        //私有
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.initPage()
      this.setTabBarIndex(3)

    },
    methods: {
      ...mapMutations(['setTabBarIndex']),
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('config/getNav', {type: 4}),//导航
            this.$post('config/banner', {type: 4}),//轮播图
            this.$post('goods/index', {type: 2, page: 1, pnum: 10}),
            this.$post('config/banner', {type: 4}),//轮播图
          ]).then(axios.spread((a, b, c, d) => {
            this.navIcon = this.$gDataList(a)
            this.banner = this.$gDataList(b)
            this.product = this.$gDataList(c)
            this.banner = this.$gDataList(d)
            this.$toast.clear()
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
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
  .page-wrap {
    min-height: 100%;
    background: #ffffff;
    padding-top: 12px;
  }

  .searchbox {
    width: 351px;
    height: 30px;
    background: rgba(245, 245, 245, 1);
    opacity: 0.8;
    border-radius: 15px;
    margin: 0 auto 12px;
    display: flex;
    align-items: center;
    padding: 0 20px;

    input {
      background: transparent;
      flex: 1;
    }
  }

  .goodbox /deep/ .listbox .item {
    box-shadow: 0px 0px 12px #eeeeee;
  }
</style>
