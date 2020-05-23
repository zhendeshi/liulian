<template>
  <div class="page-wrap padTab">
    <div class="headerBox">
      <div class="header">
        <div class="navbox">
          <router-link :to="{path:'/communityDongtai'}" class="item">动态</router-link>
          <router-link :to="{path:'/communityGuanzhu'}" class="item">关注</router-link>
        </div>
        <remind></remind>
      </div>
    </div>
    <router-view></router-view>

  </div>
</template>

<script>
  import banner from '../home/components/banner'
  import navIcon from './commponents/index/navIcon'
  import cellTitle from '../home/components/cellTitle'
  import author from '../find/components/index/author'
  import dynamicList from '../../components/dynamicList'
  import remind from '../../components/remind'
  import {mapMutations} from 'vuex'


  export default {
    name: "index",
    components: {banner, navIcon, cellTitle, author, dynamicList,remind},
    data(){
      return{
      }
    },
    mounted() {
      this.setTabBarIndex(2)
    },
    methods: {
      ...mapMutations(['setTabBarIndex']),
    },

  }
</script>

<style scoped lang="less">
  .headerBox {
    position: fixed;
    z-index: 999;
    width: 100%;
  }

  .header {
    background: #ffffff;
    position: relative;

    .navbox {
      border-bottom: 1px solid #CCCCCC;
      display: flex;
      justify-content: center;

      .item {
        font-size: 16px;
        margin: 5px 31px 0;
        color: #666666;
        position: relative;
        padding-bottom: 11px;
      }

      .router-link-active {
        font-weight: bold;
        color: rgba(255, 180, 0, 1);
        border-bottom: 2px solid #FFB400;

      }

    }

    .wIconbox {
      position: absolute;
      bottom: 11px;
      right: 12px;
    }
  }
</style>
