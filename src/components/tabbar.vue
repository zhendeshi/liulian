<template>
  <div class="TabBar-box">
    <div class="item">首页</div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "TabBar",
    data() {
      return {
        tabList: [],
        currentTab: 0,
        actColor: '#00a6f8',
        colorList: {
          '/chaotian': '#8b6b55',
          '/dishu': '#8b6b55',
          '/jijinhui': '#8b6b55',
        }
      }
    },
    mounted() {
      if (this.colorList[this.systemInfo.homePath]) {
        this.actColor = this.colorList[this.systemInfo.homePath]
      }
      this.currentTab = this.tabBarIndex
    },
    computed: {
      ...mapState(['tabBarIndex', 'tabListOne', 'systemInfo'])
    },
    methods: {
      ...mapMutations(['setTabBarIndex']),
      //tab切换
      tabChange(index, link) {
        if (this.currentTab !== index) {
          this.currentTab = index
          this.setTabBarIndex(index)
          this.$router.push(link)
        }
      }
    },
    watch: {
      tabBarIndex(val) {
        this.currentTab = val
      },
      tabListOne(val) {
        this.tabList = val
      }
    }
  }
</script>

<style scoped lang="less">
  .TabBar-box {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .item{
      text-align: center;
      font-size: 10px;
      padding-top: 68px;
      background-image: url("");
    }

  }
</style>
