<template>
  <div class="page-wrap">
    <div class="goodsbox">
      <goods-item :odata="odata"></goods-item>
      <div class="row">
        <label>退款金额</label>
        <div class="c-ff2">
          ¥<b class="f-36">{{odata.pay_price}}</b>
        </div>
      </div>
      <div class="row">
        <label>退款原因</label>
        <van-field
          autosize
          v-model="desc"
          rows="1"
          type="textarea"
          placeholder="请填写退款原因"
        />
      </div>
    </div>
    <div class="g-container imginp">
      <div class="f-28 c-99 mb-30">上传照片</div>
      <div class="uploaderImg">
        <van-uploader
          v-model="fileList"
          :max-count="6"
          :after-read="onImgRead"
          @delete="delImg"
        />
      </div>
    </div>
    <div class="btnbox">
      <div class="g-btn-ff4" @click="subimt()">确认</div>
    </div>

  </div>
</template>

<script>
  import goodsItem from '../components/order/goodsItem'

  export default {
    name: "goodsApplySH",
    components: {goodsItem},
    data() {
      return {
        odata: '',
        many_pic: [],
        desc: '',
        fileList: [],
        oid: ''
      }
    },
    created() {
      this.oid = this.$route.query.oid
      this.initPage()
    },
    methods: {
      subimt() {
        let _this = this
        this.$toast.loading('正在提交')
        if(this.many_pic){
          this.many_pic = this.many_pic.join(',')
        }
        this.$post('order/setReturn', {
          id: this.oid,
          desc: this.desc,
          price: this.odata.pay_price,
          pic: this.many_pic || '',
        }).then(res => {
          this.$toast.clear()
          this.$toast('申请成功')
          setTimeout(function () {
            _this.$router.go(-1);
          }, 500);
        }).catch((res) => {
          this.$toast(res.msg)
        })

      },
      //图片上传
      onImgRead(file) {
        this.$uploadFile(file).then(res => {
          this.many_pic.push(res.data)
        }).catch((res) => {
          this.$toast.clear()
        })
      },
      //删除图片
      delImg(flie, detail) {
        this.many_pic.splice(detail.index, 1)
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('order/getListInfo', {oid: this.oid}).then(res => { //商品信息
            this.odata = res.data
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
    }

  }
</script>

<style scoped lang="less">
  .page-wrap {
    padding-top: 12px;

    .goodsbox {
      /deep/ .g-container {
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
        margin-bottom: 0;
      }

      background: #ffffff;
      width: 351px;
      margin: 0 auto 12px;
      border-radius: 8px;
      overflow: hidden;

      .row {
        height: 44px;
        border-top: 1px solid #EEEEEE;
        margin: 0 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        label {
          flex: 1;
          color: #999999;
          font-size: 14px;
          min-width: 80px;
        }

        /deep/ .van-cell {
          padding: 0;
        }

        /deep/ .van-field__label {
          width: 0;
        }

        /deep/ textarea {
          text-align: right;
          height: 30px;
        }
      }
    }

    .g-container.imginp {
      padding: 15px 12px;
    }

    .btnbox {
      margin: 44px 12px 50px;
    }
  }
</style>
