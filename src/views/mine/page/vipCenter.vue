<template>
  <div class="page-wrap">
    <div class="header">
      <div class="box" :style="{backgroundImage: 'url(' + $formatImg(personal.geade_pic) + ')'}">
        <div class="row1 flex-tb">
          <div class="imgbox">
            <van-image width="100%" height="100%" fit="cover" round
                       :src="UserInfo.headimgurl?$formatImg(UserInfo.headimgurl):$formatImg('defaultHeader')"/>

          </div>
          <div class="f-32 fw-bold">{{UserInfo.nickname}}</div>
        </div>
        <div>再推荐{{personal.gap}}位VIP升级为{{personal.grade_name}}</div>
        <div class="schedule">
          <div :style="{width:`${personal.scale}%`}"></div>
        </div>
        <div class="scheduleWord flex-sb">
          <div>铂金</div>
          <div>钻石</div>
          <div class="c-99">黑金</div>
        </div>
        <div class="f-28 fw-bold">NO.{{personal.number}}</div>
      </div>
    </div>
    <div class="team g-container">
      <div class="f-32 fw-bold">团队分销</div>
      <div class="listbox">
        <div class="item" @click="$linkTo('/myTeam')">
          <p>我的团队</p>
          <span>团队{{UserInfo.team}}人</span>
        </div>
        <div class="item" @click="$linkTo('/brokerageDetail')">
          <p>分销明细</p>
          <span>返佣{{UserInfo.all_point}}积分</span>
        </div>
        <div class="item" @click="$linkTo('/InvitaCode')">
          <p>我的邀请码</p>
          <span>一键分享</span>
        </div>
        <div class="item" @click="$linkTo('/guide')">
          <p>分销指南</p>
          <span>玩转分销</span>
        </div>
      </div>
    </div>
    <div class="right g-container">
      <div class="f-32 fw-bold ml-20">会员权益</div>
      <img :src="$formatImg(personal.inter)" class="mt-20" style="width: 100%"/>

    </div>
    <div class="discountRight g-container">
      <cell-title title="会员专享折扣"></cell-title>
      <van-list
        v-model="loading"
        :finished="!loadMore"
        finished-text="没有更多了"
        :offset="0"
        :immediate-check="false"
        @load="getListMore"
      >
        <list style="margin: 0 12px" type="1" :discount="personal.rebate" :list="UserGoods"></list>
      </van-list>
    </div>
  </div>
</template>

<script>
  import cellTitle from '../../home/components/cellTitle'
  import list from '../../../components/list'
  import {mapState} from 'vuex'

  export default {
    name: "vipCenter",
    components: {cellTitle, list},
    computed: {
      ...mapState(['UserInfo'])
    },
    data() {
      return {
        personal: '',
        UserGoods: '',
        loading: false,
        loadMore: true,
        page: 2,
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('user/personal').then(res => { //个人中心
            this.personal = res.data
            return this.$post('goods/index', {type: 4})
          }).then(res => {
            this.$toast.clear()
            this.UserGoods = res.data

          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          this.$post('goods/index', {page: this.page, type: 4}).then(res => {
            if (res.data && res.data.length > 0) {
              this.UserGoods = this.UserGoods.concat(res.data)
              this.page++
            } else {
              this.loadMore = false
            }
            this.loading = false
          }).catch((res) => {
            this.loadMore = false
            this.loading = false
          })
        }
      },
    }
  }
</script>

<style scoped lang="less">
  .header {
    width: 375px;
    height: 153px;
    background-image: url("../../../assets/images/mine/vipCenterBg.png");
    background-size: 100%;
    background-position: 0 -64px;
    position: relative;
    padding-top: 40px;

    .box {
      width: 351px;
      height: 194px;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.4);
      border-radius: 10px;
      background-image: url("../../../assets/images/mine/vipCenterBg1.png");
      background-size: 100%;
      margin: 0 auto;
      padding: 15px 0 0 23px;
      color: #E2C583;

      .imgbox {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: 1px solid rgba(232, 203, 161, 1);
        margin-right: 12px;
        margin-bottom: 17.5px;
      }

      .schedule {
        width: 185px;
        height: 4px;
        background: rgba(91, 91, 91, 0.68);
        border-radius: 2px;
        margin: 12.5px 0 7.5px;

        div {
          position: relative;
          height: 4px;
          background: linear-gradient(262deg, rgba(249, 232, 190, 1), rgba(189, 149, 86, 1));
          border-radius: 2px;
          max-width: 100%;
        }

        div:before {
          position: absolute;
          content: '';
          width: 6px;
          height: 6px;
          background: rgba(249, 232, 190, 1);
          border-radius: 50%;
          right: -3px;
          top: -1px;
        }

        div:after {
          position: absolute;
          content: '';
          width: 10px;
          height: 10px;
          background: rgba(249, 232, 190, 0.3);
          border-radius: 50%;
          right: -5px;
          top: -3px;
        }
      }

      .scheduleWord {
        width: 185px;
        font-weight: 500;
        margin-bottom: 29px;
      }
    }
  }

  .team {
    margin: 93px auto 0;
    padding: 15px 12px;

    .listbox {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 3px;

      .item:nth-child(2) {
        background-image: url("../../../assets/images/mine/vipicon2.png");
      }

      .item:nth-child(3) {
        background-image: url("../../../assets/images/mine/vipicon3.png");
      }

      .item:nth-child(4) {
        background-image: url("../../../assets/images/mine/vipicon4.png");
      }

      .item {
        width: 158px;
        height: 63px;
        background: rgba(250, 250, 250, 1);
        border-radius: 8px;
        margin-top: 12px;
        padding: 14px 0 0 24.5px;
        background-image: url("../../../assets/images/mine/vipicon1.png");
        background-position: 0;
        background-repeat: no-repeat;
        background-size: 100%;

        p {
          font-size: 16px;
          font-weight: bold;
          color: rgba(71, 45, 11, 1);
          margin-bottom: 7.5px;
        }

        span {
          color: #999999;
        }
      }
    }
  }

  .right {
    padding: 15px 0;
    margin-top: 12px;
  }

  .discountRight {
    padding: 15px 0 0;

    /deep/ .listbox .item {
      border-bottom: 1px solid #eeeeee;
      border-radius: 0;
      padding: 15px 0;
    }
  }
</style>
