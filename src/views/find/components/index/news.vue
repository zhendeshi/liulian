<template>
  <div class="wrap">
    <div class="listbox">
      <div class="item flex-sb" v-for="(item,index) in odata" :key="index"  @click="$linkTo('/newsDesc',{id:item.id})">
        <div class="imgbox">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="$formatImg(item.pic)"
          />
        </div>
        <div class="msg">
          <div class="name one-row-hide">{{item.title}}</div>
          <div class="desc two-row-hide">{{item.summary}}</div>
          <div class="tips flex-c">{{item.type_name.title}}</div>
          <div class="bottom flex-sb">
            <span>{{item.add_time}}</span>
            <span>{{item.scan}}人阅读</span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "news",
    props:['odata'],
    data() {
      return {

      }
    },
  }
</script>

<style scoped lang="less">
.listbox{
  .item{
    margin-bottom: 20px;
    .imgbox{
      width:130px;
      height:98px;
      margin-top: 1.5px;
      border-radius:8px;
      overflow: hidden;
    }
    .msg{
      flex: 1;
      margin-left: 8px;

      width: 213px;
      .name{
        font-size: 14px;
      }
      .desc{
        color: #999999;
        line-height: 14px;
        height: 40px;
        display: flex;
        align-items: center;
      }
      .tips{
        width:50px;
        height:16px;
        border:1px solid rgba(255,180,0,1);
        border-radius:8px;
        font-size:10px;
        font-weight:500;
        color:rgba(255,180,0,1);
      }
      .bottom{
        font-size: 10px;
        color: #999999;
        margin-top: 12px;
      }
    }
  }
}
</style>
