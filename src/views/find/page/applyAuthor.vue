<template>
  <div class="wrap">
    <img class="img2" src="../../../assets/images/find/applyBg2.png" alt="">
    <img class="img3" src="../../../assets/images/find/applyBg3.png" alt="">
    <div class="benefit">
      <div class="tit">
        优质作者专属权益
      </div>
      <div class="item" v-for="(item,index) in odata">
        <img class='imgbox' :src="$formatImg(item.pic)"  alt="">
        <div class="msg">
          <p>{{item.title}}</p>
          <span>{{item.desc}}</span>
        </div>
      </div>
    </div>
    <div class="btn" @click="$linkTo('/applyAuthorInfo')"></div>
  </div>
</template>

<script>
  export default {
    name: "applyAuthor",
    data() {
      return {
        odata: []
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        this.$toast.loading('正在加载')
        this.$post('Find/getWelfare').then(res => {
          this.odata = res.data
          this.$toast.clear()
        }).catch((res) => {
          this.$toast.clear()
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .wrap {
    min-height: 100%;
    background-color: #FFDC54;
    background-image: url("../../../assets/images/find/applyBg1.png");
    background-repeat: no-repeat;
    background-size: 375px 332.5px;
    padding-top: 1px;
    box-sizing: border-box;
    padding-bottom: 15.5px;
    .img2 {
      width: 225px;
      height: 180px;
      margin: 5px auto 20px;
      display: block;
    }

    .img3 {
      width: 351px;
      height: 99px;
      margin: 5px auto 20px;
      display: block;
    }
    .benefit{
      width:351px;
      background:rgba(255,255,255,1);
      border-radius:8px;
      margin: 12px auto 15.5px;
      padding-bottom: 3.5px;
      .tit{
        text-align: center;
        line-height: 45.5px;
        font-size:16px;
        font-family:PingFang;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
      .item{
        width:327px;
        height:80px;
        background:rgba(255,250,247,1);
        border-radius:8px;
        margin:0 auto 12px;
        display: flex;
        align-items: center;
        .imgbox{
          width: 77px;
          height:77px;
        }
        .msg{
          p{
            font-size: 14px;
            font-family:PingFang;
            font-weight:500;
            margin-bottom: 10px;
          }
          span{
            color: #999999;
            font-size: 12px;
          }
        }
      }
    }
    .btn{
      background-image: url("../../../assets/images/find/authorBtn.png");
      width: 202.5px;
      height: 43px;
      margin: 0 auto;
      background-size: 100%;
    }
  }
</style>
