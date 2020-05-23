<template>
  <div class="wrap">
    <div class="content">
      <div class="header flex-c">
        <van-image
          width="117px"
          height="106px"
          :src="imgUrl"
          fit="cover"
        />
      </div>
      <div class="mainbox">
        <div class="row phoneRow">
          <span class="wIcon wIcon-phone"></span>
          <van-field v-model="from.tel" type="number" placeholder="请输入手机号"/>
        </div>
        <div class="row codeRow">
          <div class="codeBtn">
            <div v-show="showCountDown">
              <van-count-down
                ref="countDown"
                millisecond
                :time=time
                :auto-start="false"
                format="ss"
                @finish="finish"
              />
              <b>s后可再次获取</b>
            </div>
            <div v-show="!showCountDown" @click="startCountDown">获取验证码</div>
          </div>
          <span class="wIcon wIcon-code"></span>
          <van-field v-model="from.code" placeholder="短信验证码"/>
        </div>
        <div class="row passwordRow">
          <span class="wIcon wIcon-password"></span>
          <van-field v-model="from.password" type="password" placeholder="请输入密码"/>
        </div>
        <div class="row InviteRow">
          <span class="wIcon wIcon-Invite"></span>
          <van-field v-model="from.top_code" placeholder="请输入邀请码"/>
        </div>
        <div class="agree">
          <van-checkbox v-model="agreeChecked" checked-color="#FFB400" icon-size="17px">
            已阅读并同意
          </van-checkbox>
          <span @click="protocolShow=true">《榴莲刺客相关协议》</span>
        </div>
        <div v-if="agreeChecked" class="g-btn-ff4" @click="onsubmit">注册</div>
        <div v-else class="g-btn-ff4 dis">注册</div>
      </div>
    </div>

    <!--用户协议弹框-->
    <protocol v-model="protocolShow" title="榴莲刺客用户协议" type="1"></protocol>
  </div>
</template>

<script>
  import protocol from '../components/protocol'
  import {mapMutations} from 'vuex'

  export default {
    name: "index",
    components: {
      protocol
    },
    data() {
      return {
        imgUrl: require("../../../assets/images/register/logo.png"),
        showCountDown: false,//显示倒计时
        time: 60000,
        agreeChecked: true,
        protocolShow: false,//用户协议弹框
        from: {
          name: '',
          code: '',
          password: '',
          top_code: '',
        }
      }
    },
    mounted() {
      this.from.top_code = this.$route.query.code||''
    },
    methods: {
      ...mapMutations(['setUserInfo']),
      //倒计时开始
      startCountDown() {
        if (!this.from.tel) {
          this.$toast('请输入正确的手机号')
          return
        }
        this.$post('common/getSms', {tel: this.from.tel}).then(res => {
          this.showCountDown = true
          this.$refs.countDown.start();
        })
      },
      //倒计时结束
      finish() {
        this.showCountDown = false;
        this.$refs.countDown.reset();
      },
      //注册
      onsubmit() {
        this.$post('login/reg', this.from).then(res => {
          this.$toast(res.msg)
          this.setUserInfo(res.data)
          this.$router.push('/hobby')
        }).catch(res => {
          console.log(res.msg);
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .wrap {
    padding: 40px 0 60px;
    min-height: 100%;
    height: 100%;
    background-color: #ffffff;
    display: flex;
    align-items: center;

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
      background-image: url("../../../assets/images/register/iocn1.png");
      background-size: 16px 18.5px;
    }

    .wIcon-code {

      background-image: url("../../../assets/images/register/iocn2.png");
      background-size: 18px 16px;
      background-position-y: 2px;
    }

    .wIcon-password {
      background-image: url("../../../assets/images/register/iocn3.png");
      background-size: 16px 17.5px;
    }

    .wIcon-Invite {
      background-image: url("../../../assets/images/register/iocn4.png");
      background-size: 18px 16px;
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

        .codeRow {
          .codeBtn {
            position: absolute;
            z-index: 100;
            right: 0;
            bottom: -1px;
            background: #ffffff;
            padding-left: 10px;

            > div {
              display: flex;
              align-content: center;
              align-items: center;
              padding: 0 7px;
              height: 25px;
              border: 1px solid rgba(255, 180, 0, 1);
              border-radius: 8px;
              font-weight: bold;

            }

            div {
              color: rgba(255, 180, 0, 1);
            }

          }
        }

        .agree {
          margin: 40px 0 15px;
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            color: #0083D3;
          }
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
