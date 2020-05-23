<template>
  <div class="college">
    <div class="pratone">
      <div class="title">
        {{HelpDetail.title}}
      </div>
      <div class="desc" v-html="HelpDetail.content"></div>
    </div>
    <div class="prattwo">
      <div class="tit">未解决还需要</div>
      <van-cell title="联系客服" is-link/>
    </div>
  </div>
</template>

<script>
  import banner from '../../home/components/banner'
  import axios from "axios";

  export default {
    name: "collegeDesc",
    components: {banner},
    data() {
      return {
        HelpDetail: '',
        help_id: ''
      }
    },
    created() {
      this.help_id = this.$route.query.id
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('user/getHelpDetail', {help_id: this.help_id}),//学院详情(帮助详情)
          ]).then(axios.spread((a) => {
            this.HelpDetail = a.data
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
    }
  }
</script>

<style scoped lang="less">
  .college {
    .pratone {
      background-color: #FFFFFF;
      padding: 0 12px 10px;

      .title {
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        line-height: 43px;
        border-bottom: 1px solid #EEEEEE;
        margin-bottom: 10px;
      }
    }

    .prattwo {
      .tit {
        font-size:12px;
        font-weight:500;
        color:rgba(153,153,153,1);
        padding: 15px 12px 7px;
      }
      /deep/ .van-cell__title {
        display: flex;
        align-items: center;
      }
    }


  }
</style>
