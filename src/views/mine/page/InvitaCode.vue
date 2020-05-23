<template>
  <div class="wrap">
    <div class="InvitaCode" >
      <div class="box" id="posterHtml">
        <img class="imgBg" :src="bgimgUrl" width="100%" alt="">
        <div class="main">
          <div class="erimg">
            <img :src="$formatImg(UserInfo.qrcode)"  width="100%" alt="">
          </div>
          <div class="code">
            {{UserInfo.invit_code}}
          </div>
        </div>
      </div>
    </div>
    <div class="hbbox">
      <img  :src="posterImg" width="100%" alt="">
    </div>
  </div>
</template>

<script>
  import html2canvas from 'html2canvas'
  import {mapState} from 'vuex'

  export default {
    name: "InvitaCode",
    data() {
      return {
        bgimgUrl: require("../../../assets/images/mine/InvitaCode3.png"),
        posterImg:''
      }
    },
    computed: {
      ...mapState(['UserInfo'])
    },
    mounted() {
      this.$toast.loading('正在加载')
      this.createPoster()
    },
    methods:{
      //生成海报
      createPoster() {
        // 生成海报
        const vm = this
        const domObj = document.getElementById('posterHtml')
        html2canvas(domObj, {
          useCORS: true,
          allowTaint: false,
          logging: false,
          letterRendering: true,
          onclone(doc) {
            let e = doc.querySelector('#posterHtml')
            e.style.display = 'block'
          }
        }).then(function (canvas) {
          vm.posterImg = canvas.toDataURL('image/jpg')
          vm.$toast.clear()
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .wrap{
    position: relative;
    width: 100%;
    height: 100%;
    line-height: 1;
    overflow: hidden;
  }
  .hbbox{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  .InvitaCode {
    position: absolute;
    top: 0;
    bottom: 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    z-index: -1;

    .box {
      width: 375px;
      height: 603px;
      position: relative;

      .imgBg {
        position: absolute;
        width: 100%;
        z-index: 1;
      }

      .main {
        position: relative;
        z-index: 2;
        .erimg{
          width:88px;
          height:88px;
          background-color: #eeeeee;
          position: absolute;
          top: 169px;
          left: 49.5px;
        }
        .code{
          position: absolute;
          top: 173px;
          left: 235px;
          font-size:20px;
          font-weight:bold;
          color:rgba(255,255,255,1);
          line-height:20px;
          text-shadow:0px 1px 2px rgba(207,49,0,0.6);
        }
      }
    }
  }
</style>
