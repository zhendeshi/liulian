<template>
  <div class="wrap">
    <van-cell-group>
      <van-field
        v-model="odata.name"
        label="姓名"
        placeholder="请填写您的姓名"
      />

      <van-field
        v-model="odata.tel"
        label="手机号码"
        placeholder="请填写您的手机号码"
      />
      <van-field
        v-model="odata.desc"
        label="简介"
        placeholder="请填写您的简介"
      />
    </van-cell-group>
    <div class="other">
      <div class="tit">上传身份证</div>
      <van-uploader
        v-model="fileList"
        :max-count="1"
        :after-read="onImgRead"
        @delete="delImg"
        upload-text="添加图片"
      />
    </div>
    <div class="bottom">
      <div class="tips flex-c">
        <van-checkbox v-model="checked" checked-color="#FFB400">
          同意<span style="color: #0083D3;" @click.stop="protocolShow=true">《作者相关协议》</span>
        </van-checkbox>
      </div>
      <div class="btn flex-c" @click="btnAction()">立即申请</div>
    </div>
    <protocol v-model="protocolShow" title="作者相关协议" type="3"></protocol>

  </div>
</template>

<script>
  import protocol from '../../login/components/protocol'

  export default {
    name: "applyAuthorB",
    components: {
      protocol
    },
    data() {
      return {
        protocolShow: false,
        odata: {
          name: '',
          tel: '',
          desc: '',
        },
        fileList: [],
        checked: true,
        card_pic: ''
      }
    },
    methods: {
      //图片上传
      onImgRead(file) {
        this.$uploadFile(file).then(res => {
          this.card_pic = res.data
        }).catch((res) => {
          this.$toast.clear()
        })
      },
      //删除图片
      delImg(flie, detail) {
        this.card_pic = ''
      },
      btnAction() {
        let _this = this
        this.$toast.loading('正在申请')
        if (this.checked) {
          if (this.card_pic) {
            this.$post('Find/setAuthor', {...this.odata, card_pic: this.card_pic}).then(res => {
              this.$toast(res.msg)
              setTimeout(function () {
                _this.$toast.clear()
                _this.$router.go(-1);
              }, 500);
            }).catch((res) => {
              this.$toast(res.msg)
            })
          } else {
            this.$toast('请上传身份证照片')
          }
        } else {
          this.$toast('请先同意协议')
        }
      }
    }
  }

</script>

<style scoped lang="less">
  .wrap {
    font-size: 14px;

    /deep/ .van-cell {
      padding: 15px 12px;
    }

    /deep/ .van-cell:not(:last-child)::after {
      left: 12px;
      right: 12px;
    }

    /deep/ .van-field__control {
      text-align: right;
    }

    .other {
      margin-top: 12px;
      background: #ffffff;
      padding: 0 12px 10px;

      .tit {
        font-size: 14px;
        font-family: PingFang;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 43px;
      }
    }

    .c-ff2 {
      font-weight: 500;
    }

    .tips {
      margin: 50px 0 15px;
    }

    .btn {
      width: 351px;
      height: 40px;
      background: rgba(255, 74, 3, 1);
      border-radius: 8px;
      margin: 0 auto;
      font-size: 16px;
      font-weight: 800;
      color: rgba(255, 255, 255, 1);
    }
  }

</style>
