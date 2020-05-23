<template>
  <div class="signWrap">
    <div class="header">
      <div class="partOne flex-sb">
        <div v-for="(item,index) in odata.week" :class="['item',item.is_sign == 2 ? 'active' : '']">
          <span v-if="item.to_day==2">今日</span>
          <span v-else>{{item.date}}</span>
        </div>
      </div>
      <div class="parttwo flex-sb">
        <div class="left">
          <div class="f-28 ml-15">可用金币数</div>
          <div class="f-72 fw-bold">{{odata.user_point}}</div>
          <div class="tips flex-c">再连续签到{{odata.gap_day}}天可获得{{odata.reward}}金币</div>
        </div>
        <div class="right" @click="cliSign()">
          {{word}}
        </div>
      </div>
    </div>
    <div class="otherBox">
      <div class="top flex-c">
        <span></span>
        <div class="fw-bold">金币好礼等你兑</div>
        <span></span>
      </div>
      <van-list
        v-model="loading"
        :finished="!loadMore"
        finished-text="没有更多了"
        :offset="0"
        :immediate-check="false"
        @load="getListMore"
      >
        <list class="listbox" :list="recommend" :integral="true"></list>
      </van-list>
    </div>
    <van-popup v-model="showPop">
      <div class="signPop">
        <img src="../../../assets/images/mine/sign5.png"/>
        <div class="mt-30 f-32 fw-bold">签到成功！奖励已到账</div>
        <div class="word">+{{reward?reward:'0'}}金币</div>
        <div class="btn flex-c" @click="showPop=false">确定</div>
      </div>
    </van-popup>
    <audio :src="mus" class="media-audio" ref="MusicPlay"></audio>

  </div>
</template>

<script>
  import list from '../../../components/list'

  export default {
    name: "sign",
    components: {list},
    data() {
      return {
        odata: [],
        recommend: '',//商品列表
        showPop: false,
        word: '签到领金币',
        reward: -1,//签到的奖励
        hasQd:false,//是否已签到
        //私有
        loading: false,
        loadMore: true,
        page: 2,
        mus:require('../../../assets/images/get.wav')
      };

    },
    created() {
      this.initPage()

    },
    methods: {
      //点击签到
      cliSign() {
        if (this.hasQd) return
        this.$post('user/sign').then(res => {
          this.reward = res.data
          this.showPop = true
          this.word = '已签到'
          this.$refs.MusicPlay.play();
          this.initPage()
        }).catch((res) => {
          this.$toast.clear()
        })

      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('user/SignCalendar').then(res => {
            this.odata = res.data
            let index = this.odata.week.findIndex(item => item.to_day == 2 && item.is_sign == 2)
            console.log(index);
            if(index>-1){
              this.hasQd=true
              this.word = '已签到'
            }
            return this.$post('Point/point', {type: 2, page: 1})
          }).then(res => {
            this.recommend = res.data
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          this.$post('Point/point', {type: 2, page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.recommend = this.recommend.concat(res.data)
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
      }
    }
  }
</script>

<style scoped lang="less">
  .header {
    position: relative;
    background-image: url("../../../assets/images/mine/sign1.png");
    background-size: 375px 200px;
    background-position-y: -24px;
    padding: 40px 12px 0;
    background-repeat: no-repeat;

    .partOne {
      .item {
        width: 46px;
        height: 55px;
        background-color: rgba(64, 65, 72, 1);
        border-radius: 8px 8px 0px 0px;
        color: #ffffff;
        padding-top: 10px;
        text-align: center;
        background-image: url("../../../assets/images/mine/sign3.png");
        background-size: 31px 31px;
        background-position: center 100%;
        background-repeat: no-repeat;
      }

      .item.active {
        background-color: rgba(226, 197, 131, 1);
        background-image: url("../../../assets/images/mine/sign6.png");

      }
    }

    .parttwo {
      height: 151px;
      background-color: rgba(226, 197, 131, 1);
      border-radius: 0px 0px 8px 8px;
      color: #4B4131;
      padding-left: 15px;
      background-image: url("../../../assets/images/sign.png");
      background-repeat: no-repeat;
      background-size: 130px 111px;
      background-position-x: 220px;
      background-position-y: 25px;

      position: relative;

      .fw-bold {
        margin: 9px 0 16.5px
      }

      .tips {
        height: 20px;
        background: rgba(75, 65, 49, 0.8);
        border-radius: 2px;
        padding: 0 4.5px;
        font-size: 12px;
        color: #E2C583;
      }

      .right {
        position: absolute;
        left: 235px;
        width: 100px;
        height: 101px;
        margin-right: 27.5px;
        color: #ffffff;
        font-size: 14px;
        text-align: center;
        padding-top: 78px;
      }
    }
  }

  .otherBox {
    margin-top: 25px;

    .top {
      font-size: 16px;
      margin: 0 0 15px;

      div {
        padding: 0 10px;
      }

      span {
        display: block;
        width: 86.5px;
        height: 3.5px;
        margin-top: 1px;
        background-image: url("../../../assets/images/comm/icon4.png");
        background-size: 100%;
      }

      span:last-child {
        transform: rotate(180deg);
      }
    }
  }

  .signPop {
    width: 265.5px;
    height: 335px;
    background-image: url("../../../assets/images/mine/sign4.png");
    background-size: 100%;
    text-align: center;
    padding-top: 60px;

    img {
      width: 232px;
    }

    .word {
      font-size: 25px;
      color: #695B41;
      font-weight: bold;
      margin: 12px 0 30px;
    }

    .btn {
      width: 200px;
      height: 36px;
      background: rgba(105, 91, 65, 1);
      border-radius: 18px;
      font-size: 16px;
      color: #FFED8B;
      font-weight: bold;
      margin: 0 auto;
    }
  }

  .van-popup {
    background-color: transparent;
  }

  .listbox {
    padding: 0 12px;
  }
</style>
