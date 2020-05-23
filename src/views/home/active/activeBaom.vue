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
        v-model="odata.company_name"
        label="公司名称"
        placeholder="请填写您的公司名称"
      />
    </van-cell-group>
    <div class="other flex-sb">
      <span>报名费用</span>
      <span class="f-36 c-ff2"><span class="f-24">¥</span> {{$price(money)}}</span>
    </div>
    <div class="bottom">
      <div class="tips flex-c">
        <van-checkbox v-model="checked" checked-color="#FFB400">
          同意<span style="color: #0083D3;" @click.stop="protocolShow=true">《活动协议》</span>
        </van-checkbox>
      </div>
      <div class="btn flex-c" @click="btnAction()">立即报名</div>
    </div>
    <protocol v-model="protocolShow" title="活动协议" type="2"></protocol>
  </div>
</template>

<script>
  import protocol from '../../login/components/protocol'

  export default {
    name: "activeBaom",
    components: {
      protocol
    },
    data() {
      return {
        protocolShow: false,

        odata: {
          name: '',
          tel: '',
          company_name: ''
        },
        money: 0,
        checked: true,
        id: ''
      }
    },
    mounted() {
      this.id = this.$route.query.id
      this.money = this.$route.query.price
    },
    methods: {
      // gotoPage() {
      //   this.$router.push('/active');
      // }
      btnAction() {
        this.$toast.loading('正在报名')
        if (this.checked) {
          this.$post('Activity/setSing', {...this.odata, id: this.id}).then(res => {
            this.$toast.success('报名成功,正在跳转')
            this.$router.go(-1)
          }).catch((res) => {
            this.$toast(res.msg)
          })
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
      padding: 0 12px;
      height: 50px;
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
