<template>
  <div class="page-wrap">
    <goods-item :odata="odata"></goods-item>
    <div class="g-container">
      <van-field
        v-model="desc"
        type="textarea"
        placeholder="有没有想说点什么？快告诉我们吧"
      />
    </div>
    <div class="g-container star flex-c">
      <div class="fle1 f-28">综合评价</div>
      <van-rate v-model="score"/>
    </div>
    <div class="btnbox">
      <div class="g-btn-ff4" @click="subimt()">确认</div>
    </div>
  </div>
</template>

<script>
  import goodsItem from '../components/order/goodsItem'

  export default {
    name: "goodsReview",
    components: {goodsItem},
    data() {
      return {
        odata: {
          goods: []
        },
        info:'',
        desc: '',
        score: 0
      }
    },
    mounted() {
      this.odata.goods.push(JSON.parse(localStorage.getItem('goodsReview')))
      this.info = JSON.parse(localStorage.getItem('goodsReview'))
      console.log(this.info);
    },
    methods: {
      subimt() {
        let _this = this
        if (this.score <= 0) {
          this.$toast('请评分')
        } else {
          this.$toast.loading('正在提交')
          this.$post('common/setComment', {
            type: 3,
            model_id: this.info.goods_id,
            desc: this.desc,
            pid: 0,
            score: this.score,
            order_id: this.info.order_id,
          }).then(res => {
            this.$toast.clear()
            this.$toast('评价成功,正在跳转')
            setTimeout(function () {
              _this.$router.go(-1);
            }, 500);
          }).catch((res) => {
            this.$toast(res.msg)
          })
        }


      },

    }
  }
</script>

<style scoped lang="less">
  .page-wrap {
    padding-top: 12px;
    min-height: 100%;
    position: relative;

    /deep/ .van-cell {
      padding: 11px 0;

      textarea {
        line-height: 20px;
        font-size: 14px;
        min-height: 80px;
      }

    }

    .star {
      height: 60px;
    }

    .btnbox {
      position: absolute;
      bottom: 15px;
      left: 12px;
      right: 15px;
    }
  }
</style>
