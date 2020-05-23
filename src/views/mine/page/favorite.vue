<template>
  <div class="page-wrap">
    <div class="nav">
      <div class="item">
        <router-link :to="{path:'/favorite_dynamic'}">动态</router-link>
      </div>
      <div class="item">
        <router-link :to="{path:'/favorite_news'}">资讯</router-link>
      </div>
      <!--      <div class="item">-->
      <!--        <router-link :to="{path:'/favorite_topic'}">话题</router-link>-->
      <!--      </div>-->
      <div class="item">
        <router-link :to="{path:'/favorite_QandA'}">问答</router-link>
      </div>
      <!--      <div class="item">-->
      <!--        <router-link :to="{path:'/favorite_article'}">帖子</router-link>-->
      <!--      </div>-->
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "favorite"
  }
</script>

<style scoped lang="less">
  .content {
    flex: 1
  }

  .page-wrap {
    min-height: 100%;
    display: flex;
  }

  .nav {
    display: flex;
    justify-content: space-between;
    padding: 5px 25px 0;
    background: #ffffff;
    height: 32px;
    font-size: 16px;
    color: #666666;
    position: fixed;
    z-index: 999;
    width: 100%;

    .router-link-active {
      padding-bottom: 7px;
      border-bottom: 2px solid #FFB400;
      color: #FFB400;
      font-weight: bold;

    }
  }

  .content {
    padding-top: 32px;
  }
</style>
