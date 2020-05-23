<template>
  <div class="page-wrap">
    <div class="header">
      <div class="partOne flex-sb">
        <div class="left">
          <div class="flex-tb">
            <div class="icon mr-10"></div>
            <b class="f-32">可用金币</b>
          </div>
          <div class="num">{{$price(UserInfo.point)}}</div>
        </div>
        <div class="g-btnc" @click="$linkTo('/goldDetails')">明细</div>
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
        :offset="50"
        :immediate-check="false"
        @load="getListMore"
      >
        <list class="listbox" :list="odata" :integral="true"></list>
      </van-list>
    </div>

  </div>
</template>

<script>
  import list from '../../../components/list'

  import {mapState} from 'vuex'

  export default {
    name: "mypoint",
    components: {list},
    data() {
      return {
        odata:[],
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    computed: {
      ...mapState(['UserInfo'])
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Point/point', {type: 2, page: 1}).then(res => {
            this.odata = res.data
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
    background-size: 100%;
    padding: 12px 12px 0;

    .partOne {
      width: 351px;
      color: #E2C583;
      height: 120px;
      border-radius: 4px;
      overflow: hidden;
      background-image: url("../../../assets/images/mine/headerbg6.png");
      background-size: 100%;
      padding: 0 60px 0 40px;

      .icon {
        width: 24px;
        height: 24px;
        background-image: url("../../../assets/images/mine/icon12.png");
        background-size: 28px;
        background-position: center 0;
        margin-right: 5px;
      }

      .num {
        font-size: 30px;
        font-weight: bold;
        margin-top: 14px;
        padding-left: 29px;
      }

    }

    .partTwo {
      margin: 25px 0 15px;

      input {
        width: 253px;
        height: 35px;
        background: rgba(238, 238, 238, 1);
        box-shadow: 3px 3px 8px 0px rgba(140, 73, 27, 0.2);
        font-size: 12px;
        font-weight: 500;
        padding: 0 13px;
        color: #333333;
      }

      .btn {
        background-image: url("../../../assets/images/mine/icon14.png");
        background-size: 100%;
        width: 83px;
        height: 35px;
        font-size: 17px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
      }
    }

    .partThree {
      width: 104%;
      margin-left: -2%;

      .item {
        width: 109px;
        height: 82px;
        background: linear-gradient(90deg, rgba(248, 248, 248, 1), rgba(215, 217, 223, 1));
        box-shadow: 3px 3px 8px 0px rgba(140, 73, 27, 0.2);
        border-radius: 8px;
        color: #666666;

        .box {
          text-align: center;
        }
      }

      .active {
        background: linear-gradient(90deg, rgba(255, 195, 0, 1) 0%, rgba(255, 169, 0, 1) 99%);
        color: #333333;
      }
    }


  }
  .otherBox {
    margin-top: 25px;
    padding: 0 12px;

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


</style>
