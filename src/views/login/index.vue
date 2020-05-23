<template>
  <div class="wrap" style="justify-content: space-between;">
    <div class="content" style="display:flex;flex-direction: column;">
      <div class="header flex-c">
        <div class="imgbox">
          <van-image width="100%" height="100%" :src="imgUrl" fit="cover" />
        </div>
      </div>
      <div class="mainbox">
        <div class="row phoneRow">
          <span class="wIcon wIcon-phone"></span>
          <van-field v-model="tel" placeholder="手机号码" />
        </div>
        <div class="row passwordRow">
          <span class="wIcon wIcon-password"></span>
          <van-field v-model="password" type="password" placeholder="密 码" />
        </div>
        <div class="forget_psd">
          <router-link :to="{path:'/changePsd'}">忘记密码?</router-link>
        </div>
        <div class="g-btn-ff4 mb-40" @click="setUp">登 录</div>
        <div class="g-btn-fff" @click="$linkTo('/registe')">去注册</div>
      </div>
    </div>
    <!--     
      <div @click="wxlogin()">
        <img :src="wxLogo" alt="">
    </div>-->
    <p class="stip">粤ICP备20028235号-1</p>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex'
  import { iFType } from '../../utils/comment'

  export default {
    name: "login",
    data() {
      return {
        imgUrl: require("../../assets/images/register/logo.png"),
        wxLogo: require("../../assets/images/register/weixin_logo.png"),
        tel: '15310618120',
        password: '123456',
        code: ''
      }
    },
    mounted() {
      this.apptype = iFType()

      if(this.apptype == 1 || this.apptype == 2){
       if(!this.$route.query.code){
          this.wxlogin()
          }else {
            this.code = this.$route.query.code
          }

      }
      else {
        
      }
      this.goback = this.$route.query.goback || false
    },
    methods: {
      //微信登录
      wxlogin(){
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx4bb921c9f957ea88&redirect_uri=http://liulian.kailly.com/dist/login&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
      },
      ...mapMutations(['setUserInfo']),
      setUp() {
        this.$toast.loading('正在登陆')
        this.$post('login/login', {tel: this.tel, password: this.password}).then(res => {
                    this.$toast(res.msg)
                this.setUserInfo(res.data)
          //this.$toast.clear()
          if(this.apptype == 1 || this.apptype == 2){
                 this.$post('weix/getOpenid', {token: res.data.token,code: this.code}).then((rel)=>{
                alert(JSON.stringify(rel))
              
              })
          }
         if (this.goback) {
                  this.$router.go(-1);
                } else {
                  this.$router.push('/liulian')
                }
     
        }).catch(res => {
          this.$toast(res.msg)
        });
      }
    }


  }
</script>

<style scoped lang="less">
.stip {
  position: absolute;
  bottom: 30px;
  /* margin: 0 auto; */
  text-align: center;
  width: 100%;
}
.wrap {
  padding: 40px 0 60px;
  min-height: 100%;
  height: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;

  .imgbox {
    width: 117px;
    height: 106px;
  }

  .wIcon {
    background-size: 100%;
    margin-right: 17px;
    width: 22px;
    height: 18.5px;
    display: flex;
    align-items: flex-end;
    background-repeat: no-repeat;
  }

  .wIcon-phone {
    background-image: url("../../assets/images/register/iocn1.png");
    background-size: 16px 18.5px;
  }

  .wIcon-password {
    background-image: url("../../assets/images/register/iocn3.png");
    background-size: 16px 17.5px;
  }

  .content {
    width: 100%;

    .header {
      padding: 0 0 13px;
    }

    .mainbox {
      padding: 0 40px;

      .row {
        display: flex;
        align-items: flex-end;
        padding-bottom: 9.5px;
        border-bottom: 1px solid #eeeeee;
        margin-top: 30px;
        position: relative;
      }

      .forget_psd {
        color: #999999;
        padding: 14px 0;
        margin-bottom: 25px;
        display: flex;
        justify-content: flex-end;
      }

      /deep/ .van-cell {
        padding: 0;
      }

      /deep/ .van-field__control {
        line-height: 14px;
      }
    }
  }
}
</style>
