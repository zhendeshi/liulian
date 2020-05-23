<template>
  <div class="page-wrap">
    <div class="header flex-sb">
      <div :class="['item',item.status == 1 ? 'active' : '']" v-for="(item,index) in spikeTime.time">
        {{item.start_time}}
        <div>{{item.status_name}}</div>
      </div>
    </div>
    <div class="listbox">
      <div class="top flex-c">
        <span class="fw-bold">限时秒杀</span>
        <div class="middle time">
          <van-count-down :time="spikeTime.old_time.time*1000">
            <template v-slot="timeData">
              <div class="time flex-c">
                <div class="item">{{ timeData.hours }}</div>:
                <div class="item">{{ timeData.minutes }}</div>:
                <div class="item">{{ timeData.seconds }}</div>
              </div>
            </template>
          </van-count-down>
        </div>
      </div>
      <div class="box">
        <van-list
          v-model="loading"
          :finished="!loadMore"
          finished-text="没有更多了"
          :offset="0"
          :immediate-check="false"
          @load="getListMore"
        >
        <spike-goods-list :spikeGoods="spikeGoods"></spike-goods-list>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
  import spikeGoodsList from '../components/spikeGoodsList'

  export default {
    name: "Spike",
    components: {spikeGoodsList},
    data() {
      return {
        spikeTime: '',
        spikeGoods: '',
        page: 2,
        loading: false,
        loadMore: true,

      }
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('spike/time').then(res => { //抢购时间段
            this.spikeTime = res.data
            return this.$post('spike/index', {time_id: res.data.old_time.id, type: 1,page:1,pnum:10})//获取抢购商品
          }).then(res => {
            this.spikeGoods = res.data
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          this.$post('spike/index', {time_id: this.spikeTime.old_time.id, type: 1, page: this.page,pnum:10}).then(res => {
            if (res.data && res.data.length > 0) {
              this.spikeGoods = this.spikeGoods.concat(res.data)
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
  .page-wrap {
    padding: 12px;

    .header {
      .item {
        width: 61px;
        height: 52px;
        background: rgba(255, 255, 255, 1);
        border-radius: 5px;
        text-align: center;
        font-size: 18px;
        padding-top: 11.5px;

        div {
          font-size: 11px;
          margin-top: 4.5px;

        }

      }

      .active {
        position: relative;
        background: #FFB400;
        color: #ffffff;
      }

      .active:before {
        content: '';
        position: absolute;
        width: 0;
        height: 0;
        border-right: 7px solid transparent;
        border-left: 7px solid transparent;
        border-top: 7px solid #FFB400;
        bottom: -7px;
        left: 24px;
      }
    }

    .listbox {
      .top {
        height: 47px;
        background-image: url("../../../assets/images/index-ms-bg.png");
        background-size: 361px 114px;
        padding: 0 12px;
        background-position: -5px -62px;
        margin-top: 22px;
        font-size: 16px;

        .time {
          color: #ffffff;
          margin-left: 2px;

          .item {
            width: 18px;
            height: 18px;
            background: #333333;
            border-radius: 2px;
            justify-content: center;
            line-height: normal;
            align-items: center;
            display: flex;
            font-size: 12px;
            margin: 0 6px;
            color: #ffffff;
          }
        }
      }

      .box {

      }
    }
  }
</style>
