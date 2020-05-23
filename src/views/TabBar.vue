<template>
  <div class="TabBar-box" :class="[dayStydy?'dayStydy':'nightStydy']">
    <div v-for="(item,index) in navList" :class="['item',currentTab==index?'active':'']"
         @click="tabChange(index,item.path)">
      <div class="icon" :class="['icon',index==2?'iconThree':'']"></div>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'

  export default {
    name: "TabBar",
    data() {
      return {
        tabList: [],
        currentTab:0,
        navList: [
          {title: '首页', path: '/liulian'},
          {title: '发现', path: '/find'},
          {title: '社区', path: '/communityDongtai'},
          {title: '精选', path: '/featured'},
          {title: '我的', path: '/mine'}
        ]
      }
    },
    mounted() {
      this.currentTab=this.tabBarIndex
    },
    computed: {
      ...mapState(['dayStydy', 'tabBarIndex',])
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
    height: 50px;
    display: flex;
    justify-content: space-around;
    background: #ffffff;
    z-index: 999;

    .item {
      text-align: center;
      font-size: 10px;
      padding-top: 7px;
      .icon {
        background-image: url("../assets/images/index/iconNav1.png");
        width: 32px;
        height: 22px;
        background-size: 32px 96px;
        background-position-x: center;
        background-position-y: -5px;
        margin-bottom: 5px;
      }
    }
    .item:nth-child(2) .icon{
      background-image: url("../assets/images/index/iconNav2.png");
    }
    .item:nth-child(3) .icon{
      margin-top: -21px;
      width: 58px;
      height:48px;
      margin-bottom: 0;
      background-size: 58px 116px;
      background-position-x: center;
      background-position-y: -63px;
      background-image: url("../assets/images/index/iconNav3.png");
    }
    .item:nth-child(4) .icon{
      background-image: url("../assets/images/index/iconNav4.png");
    }
    .item:nth-child(5) .icon{
      background-image: url("../assets/images/index/iconNav5.png");
    }
    .item.active {
      color: #FFB400;
      .icon {
        background-position-y: -69px;
      }
    }
    .item.active .iconThree.icon {
      background-position-y: -63px;
    }

  }
  .item:nth-child(3).active{
    color: #FFB400!important;
  }
  .nightStydy.TabBar-box{
    background-color: #252527;
    .item.active .iconThree.icon {
      background-position-y: -5px;
    }
    .item{
      color: #ffffff;
      .icon{
        background-position-y: -37px;
      }
    }
    .item:nth-child(3) .icon{
      background-position-y: -5px;
    }
    .item.active {
      color: #FFB400;
      .icon {
        background-position-y: -69px;
      }
    }

  }
</style>
