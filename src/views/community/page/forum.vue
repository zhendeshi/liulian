<template>
  <div class="forum-page">
    <div class="header flex-sb ">
      <div v-for="(item,index) in navList" :class="['item flex-c',navIndex == index ? 'active' : '']" @click="navIndex=index">
        {{item}}
      </div>
    </div>
    <v-article></v-article>
  </div>
</template>

<script>
  import vArticle from '../../mine/page/Favorite/article'

  export default {
    name: "forum",
    components: {vArticle},
    data(){
      return{
        navList:['推荐','科技','时尚','影视','游戏',],
        navIndex:0
      }
    }
  }
</script>

<style scoped lang="less">
.header{
  padding: 12px 12px 0;
  background-color: #ffffff;
  .item{
    width:60px;
    height:28px;
    border:1px solid rgba(153,153,153,1);
    border-radius:14px;
    color: #999999;
  }
  .active{
    background:rgba(255,180,0,1);
    box-shadow:0px 5px 7px 0px rgba(255,180,0,0.15);
    border:1px solid rgba(255,180,0,1);
    color: #ffffff;
  }
}
</style>
