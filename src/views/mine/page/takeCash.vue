<template>
  <div class="page-wrap">
    <div class="header">
      <div class="flex-tb borbot f-28">
        可提现金额:<span class="c-ff2">{{$price(Info.money)}}元</span>
      </div>
      <div class="flex-tb">
        <span class="iconfont icon-tishi c-ffb mr-10"></span>
        <span class="c-99" @click.stop="protocolShow=true">提现说明</span>
      </div>
    </div>
    <div class="mian">
      <div class="row flex-c borbot">
        提现金额:<input class="fle1 ml-20" type="number" v-model="parm.price" placeholder="请输入提现金额">
      </div>
      <div class="row f-24 c-ffb borbot" style="line-height: 16px;margin-top: -2px">          
        提示：提现之前，请核实您的个人信息是否正确，以免耽误您的提现申请!
      </div>
      <!-- <div class="row flex-sb borbot" @click="showSelBank= true">
        <div>银行名称：{{parm.bank_title||'请选择银行'}}</div>
        <span class="iconfont icon-dibudaohanglan-"></span>
      </div> -->
      <div class="row borbot ">
        <!-- <div class="flex-c">银行卡号： -->
        <div class="flex-c">
          <span class="flex_c_lable">支付宝账号</span>：
          <!-- <van-field v-model="parm.card_num" type="digit" placeholder="请输入银行卡号"/> -->
          <van-field v-model="parm.alipay" type="digit" placeholder="请输入支付宝账号"/>

        </div>
      </div>
      <div class="row">
        <div class="flex-c">
          <span class="flex_c_lable">姓名</span>：
          <van-field v-model="parm.name" placeholder="请输入姓名"/>
        </div>
      </div>
    </div>
    <div class="btnbox">
      <div class="g-btn-ff4" @click="withdraw()">确定</div>
    </div>

    <van-popup v-model="showSelBank" position="bottom">
      <van-picker
        show-toolbar
        :columns="bank"
        @cancel="showSelBank = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <protocol v-model="protocolShow" title="提现说明" type="4"></protocol>

  </div>
</template>

<script>
  import axios from "axios";
  import {mapState, mapActions, mapMutations} from 'vuex'
  import protocol from '../../login/components/protocol'

  export default {
    name: "takeCash",
    components: {
      protocol
    },
    data() {
      return {
        Info: '',
        showSelBank: false,//显示选择银行弹框
        protocolShow: false,//
        bank: '',
        parm: {
          price: '',
          bank_title: '',
          bank_id: -1,
          // card_num: '',
          alipay: "",
          name: ''
        }

      }
    },
    created() {
      this.initPage()
    },
    methods: {
      ...mapMutations(['setUserInfo']),

      //提现
      withdraw() {
        // if (this.parm.bank_id < 0) {
        //   this.$toast('请选择提现银行')
        // } else 
        if (!this.parm.alipay || this.parm.alipay == '') {
          // this.$toast('请输入银行卡号')
          this.$toast('请输入支付宝账号')
        } else if (!this.parm.name || this.parm.name == '') {
          this.$toast('请选择支付宝用户姓名')
        } else {
          this.$toast.loading('正在加载')
          this.$post('user/withdraw', {...this.parm}).then(res => { //我的团队
            return this.$post('user/getUserInfo')
          }).then(res => {
            this.setUserInfo(res.data)
            let _this = this
            this.$toast('提现成功,正在跳转')

            setTimeout(function () {
              _this.$router.go(-1);
            }, 500);
          }).catch((res) => {
            this.$toast(res.msg)
          })
        }

      },
      //选择银行
      onConfirm(value) {
        this.parm.bank_title = value.text
        this.parm.bank_id = value.id
        this.showSelBank = false;
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('user/getUserInfo'),//获取用户资料
            this.$post('user/bank'),//提现->银行列表
          ]).then(axios.spread((a, b) => {
            this.Info = a.data
            this.bank = b.data
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
    }

  }
</script>

<style scoped lang="less">
  .page-wrap {
    /deep/ .van-picker-column__item {
      display: flex;
      align-items: center;
      justify-content: center;
    }

  }

  .header {
    background: #ffffff;
    padding: 0 12px;
    margin-bottom: 21px;
    

    div {
      height: 44px;
    }
  }

  .mian {
    background: #ffffff;
    padding: 0 15px;
    font-size: 14px;

    .row {
      padding: 20px 0;

      .van-cell {
        padding: 0;
        flex: 1;
      }
    }
  }

  .btnbox {
    margin: 40px 12px;
  }
  .flex_c_lable {
    width: 70px;
    text-align: justify;
    text-align-last: justify;
  }

</style>
