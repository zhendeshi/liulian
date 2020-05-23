<template>
  <div class="page-wrap">
    <banner :banner="banner"></banner>
    <nav-icon :navIcon="navIcon" style="margin: 15px 12px 24px"></nav-icon>
    <cell-title title="达人推荐" path="/talentPage"></cell-title>
    <talent :listbox="talent" :follow-btn="false"></talent>
    <cell-title title="精选动态" path="/alldynamic"></cell-title>
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="暂无更多动态~"
      :offset="0"
      :immediate-check="false"
      @load="getListMore"
    >
      <dynamic-list type="like" :odata="News"></dynamic-list>
    </van-list>
  </div>
</template>

<script>
  import banner from '../../home/components/banner'
  import navIcon from '../commponents/index/navIcon'
  import cellTitle from '../../home/components/cellTitle'
  import talent from '../../find/components/index/author'
  import dynamicList from '../../../components/dynamicList'
  import axios from "axios";
  import {mapMutations} from "vuex";

  export default {
    name: "index",
    components: {banner, navIcon, cellTitle, talent, dynamicList},
    data() {
      return {
        talent:'',
        navIcon:'',
        News: '',
        banner:'',
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      ...mapMutations(['setTabBarIndex']),

      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('Circle/getNews', {type: 0, types: 1, page: 1}),//获取动态
            this.$post('Circle/talent', {type: 1, page: 1}),//获取达人
            this.$post('config/banner', {type: 3}),//轮播图
            this.$post('config/getNav', {type: 3}),//导航
          ]).then(axios.spread((a,b,c,d) => {
            this.News = this.$gDataList(a)
            this.talent = this.$gDataList(b)
            this.banner = this.$gDataList(c)
            this.navIcon = this.$gDataList(d)
            this.$toast.clear()
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          this.$post('Circle/getNews', {type: 1, types: 1, page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.News = this.News.concat(res.data)
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
    background: #ffffff;
    min-height: 100%;
    padding-top: 45px;
  }
</style>
