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
          <van-field v-model="value" placeholder="请输入用户名"/>
        </div>
        <div class="row codeRow">
          <div class="codeBtn">
            <div>{{codeWord}}</div>
          </div>
          <span class="wIcon wIcon-code"></span>
          <van-field v-model="value" placeholder="短信验证码"/>
        </div>
        <div class="row passwordRow">
          <span class="wIcon wIcon-password"></span>
          <van-field v-model="value"  placeholder="请输入新密码"/>
        </div>
        <div class="row passwordRow">
          <span class="wIcon wIcon-password"></span>
          <van-field v-model="value" placeholder="请确认新密码"/>
        </div>
        <div class="g-btn-ff4" style="margin-top: 50px">确认修改</div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "changePsd",
    data() {
      return {
        imgUrl: require("../../../assets/images/register/logo.png"),
        codeWord: '获取验证码',
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

            div {
              display: flex;
              align-content: center;
              align-items: center;

              padding: 0 7px;
              height: 25px;
              border: 1px solid rgba(255, 180, 0, 1);
              border-radius: 8px;
              font-weight: bold;
              color: rgba(255, 180, 0, 1);
            }

          }
        }
        .agree{
          margin: 40px 0 15px;
          display: flex;
          justify-content: center;
          span{
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
