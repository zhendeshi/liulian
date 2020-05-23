<template>
  <div class="wrap">
    <van-popup v-model="popupVisible" round :close-on-click-overlay="false">
      <div class="content">
        <div class="tit flex-c">《{{title}}》</div>
        <div class="main" v-html="pact">

        </div>
        <div class="bottom">
          <div class="g-btn-ff4" @click="close">{{btnWord}}</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "protocol",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      title:{
        type: String,
      },
      btnWord: {
        type: String,
        default: '已阅读并同意'
      },
      type: {
        type: String,
        default: '1'
      },
    },
    data() {
      return {
        popupVisible: false,
        pact:''
      }
    },
    created() {
      this.initPage()
    },
    methods:{
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('config/getPact',{type:this.type}).then(res => { //获取网站协议
            this.pact = res.data
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      close:function () {
        this.$emit('input', !this.value)
      }
    },
    watch: {
      'value': {
        immediate: true,
        handler(value) {
          this.popupVisible = value
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .wrap{
    /deep/.van-popup--center.van-popup--round{
      border-radius: 6px;
    }
  }
  .content {
    width: 265px;
    height: 395px;
    background: #F6FDFF;
    position: relative;
    .tit{
      height: 55.5px;
      font-size: 16px;
      color: #FFB400;
      font-weight: bold;
    }
    .main{
      height: 290px;
      padding: 0 13px;
      overflow-y: auto;
    }
    .bottom{
      height:49px;
      background:rgba(255,255,255,1);
      border:1px solid rgba(240,240,240,1);
      border-radius:6px;
      padding:8px 57px;
      .g-btn-ff4{
        height:32px;
        font-size:14px
      }
    }
  }
</style>
