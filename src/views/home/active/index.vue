<template>
  <div class="wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="true"
      @load="getListMore"
    >
      <div class="box" v-for="(item,index) in listbox" :key="index"  @click="$linkTo('/activeDesc',{id:item.id})">
        <div class="imgbox">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            radius="8"
            :src="$formatImg(item.pic)"
          />
          <div class="mask flex-tb">
            <span>活动截止时间</span>
            <van-count-down :time="item.endtime" format="mm:ss">
              <template v-slot="timeData">
                <div class="time flex-sb">
                  <span class="item">{{ timeData.minutes }}</span>:
                  <span class="item">{{ timeData.seconds }}</span>
                </div>
              </template>
            </van-count-down>
          </div>
        </div>
        <div class="name one-row-hide">{{item.title}}</div>
        <div class="other flex-sb">
          <div class="num f-22">
            <span class="f-30">{{item.set_num}}</span>人参与
          </div>
          <div class="btn g-btna">去参与</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>

  export default {
    name: "recommend",
    data() {
      return {
        listbox:'',
        //私有
        loading: false,
        loadMore: true,
        page: 2

      }
    },
    created() {
      this.initPage()
    },
    methods: {
      gotoPage() {
        this.$router.push('/activeDesc');
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Activity/getIndex', {page: 1, pnum: 10}).then(res => {
            this.listbox = res.data
          }).catch((res) => {
            this.$toast.clear()
          })

        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('Activity/getIndex', {page: this.page, pnum: 10}).then(res => {
            if (res.data && res.data.length > 0) {
              this.listbox = this.listbox.concat(res.data)
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
  .wrap {
    padding: 12px;

    .box {
      background: #ffffff;
      margin-bottom: 12px;
      border-radius: 8px;
      padding: 12px 12px 15px;
    }

    .imgbox {
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      font-size: 0px;
      width: 327px;
      height: 183px;

      .mask {
        position: absolute;
        width: 327px;
        height: 25px;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        padding: 0 12px;
        color: #ffffff;
        font-size: 12px;

        .time {
          color: #ffffff;
          margin-left: 2px;

          .item {
            width: 22px;
            height: 15px;
            background: rgba(255, 180, 0, 1);
            border-radius: 2px;
            text-align: center;
            line-height: 15px;
            display: block;
            font-size: 12px;
            margin: 0 6px;
          }
        }
      }
    }

    .name {
      width: 327px;
      font-size: 14px;

      margin: 12px 0 15px;
    }

    .other {
      color: #999999;

      .f-30 {
        color: #FFB400;
        margin-right: 5.5px;
      }

      .btn {
        background: linear-gradient(90deg, rgba(255, 201, 52, 1), rgba(255, 180, 0, 1));
      }
    }
  }

</style>
