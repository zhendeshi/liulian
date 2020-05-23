<template>
 <div class="wrap">
    <div class="title">{{odata.title}}</div>
   <div class="time">{{odata.add_time}}</div>
   <div class="desc" v-html="odata.desc"></div>
 </div>
</template>

<script>
  export default {
    name: "notice",
    data() {
      return {
        id:'',
        odata:'',

      }
    },
    created() {
      this.id = this.$route.query.id
      this.initPage()
    },
    methods:{
      initPage(){
        this.$toast.loading('正在加载')
        this.$post('notice/noticeInfo', {id: this.id}).then(res => {
          this.odata=res.data
        }).catch((res) => {
          this.$toast.clear()
        })
      }
    }
  }
</script>

<style scoped lang="less">
.wrap{
  min-height: 100%;
  background: #ffffff;
  padding: 12px;

  .title{
    font-size: 16px;
    color: #333333;
  }
  .time{
    font-size: 12px;
    color: #999999;
    margin: 11.5px 0 24px;
  }
  .desc{
    color:rgba(153,153,153,1);
    line-height:21px;
  }
}
</style>
