<template>
  <div id="app" style="height: 100%;">
    <keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!--    不缓存页面-->
    <router-view v-if="$route.meta.keepAlive"></router-view>
    <tab-bar v-show="tabBarVisible && !tabType"></tab-bar>
  </div>
</template>
<script>
  import TabBar from "./views/TabBar";
  import {mapState,mapActions,mapMutations} from 'vuex'
  export default {
    name: 'app',
    components: {
      TabBar
    },
    data() {
      return {
        tabType: false,
        btnFlag: false
      }
    },
    computed: {
      ...mapState(['tabBarVisible',])
    },
    mounted() {
      //wsm
      //获取用户位置信息
      //wsm

      window.addEventListener('scroll', this.watchScroll, true);
    },
    destroyed() {
      window.removeEventListener('scroll', this.watchScroll, true);
    },
    methods: {
     ...mapMutations(['setTabBarVisible', 'setTabBarIndex', 'setTabBarTwoIndex', 'setScrollVisible']),

      watchScroll() {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop; //变量windowHeight是可视区的高度
        let windowHeight =
          document.documentElement.clientHeight || document.body.clientHeight; //变量scrollHeight是滚动条的总高度
        let scrollHeight =
          document.documentElement.scrollHeight || document.body.scrollHeight; //滚动条到底部的条件
        if (scrollTop > 0 && scrollTop + windowHeight === scrollHeight) {
          // 写后台加载数据的函数
          // console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
          // this.publicState({
          //   key: 'reachBottom',
          //   value: !this.reachBottom
          // })
        }
        this.scrollTop = scrollTop
        if (this.scrollVisible) {
          if (scrollTop > 60) {
            this.btnFlag = true
          } else {
            this.btnFlag = false
          }
        }
      },
      //点击图片回到顶部方法，加计时器是为了过渡顺滑
      backTop() {
        let timer = setInterval(() => {
          let ispeed = Math.floor(-this.scrollTop / 5)
          document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + ispeed
          if (this.scrollTop === 0) {
            clearInterval(timer)
          }
        }, 16)
      }
    },
    watch: {
      '$route'(item) {
        if (item.meta.tab) {
          this.setTabBarVisible(true)
          // if (item.meta.type) {
          //   this.tabType = true
          //   this.setTabBarTwoIndex(item.meta.index)
          // } else {
          //   let index = this.tabListOne.findIndex(item => item.url === this.$route.path)
          //   if (index > -1) {
          //     this.setTabBarIndex(index)
          //   } else {
          //     this.setTabBarIndex(-1)
          //   }
          //   this.tabType = false
          // }
        } else {
          this.setTabBarVisible(false)
        }
      },
      'scrollVisible'(val) {
        if (!val) {
          this.btnFlag = false
        }
      }
    }
  }
</script>
<style lang="less">
</style>
