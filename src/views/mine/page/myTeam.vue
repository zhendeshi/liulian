<template>
  <div class="myTeam">
    <van-sticky>
      <div class="tit">
        我的团队 <span class="c-ffb fw-bold"> {{count}} </span> 人
      </div>
    </van-sticky>
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="暂无更多数据"
      :offset="0"
      :immediate-check="true"
      @load="getListMore"
    >
      <div class="row flex-c" v-for="(item,index) in MyTeam" :key="index">
        <div class="imgbox g-tipsBox">
          <van-image width="100%" height="100%" fit="cover" round
                     :src="item.head_img?$formatImg(item.head_img):$formatImg('defaultHeader')"
          />
          <div v-if="item.grade_pic" class="g-tips"
               :style="{backgroundImage: 'url(' + $formatImg(item.grade_pic) + ')'}"></div>
        </div>
        <div class="fle1">
          <div class="f-28 mb-15">{{item.nickname}}</div>
          <div class="c-99">{{item.tel}}</div>
        </div>
        <div class="c-99">{{item.add_time}}</div>
      </div>
    </van-list>

  </div>
</template>

<script>
  export default {
    name: "myTeam",
    data() {
      return {
        MyTeam: [],
        count:'',
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
          this.$post('user/getMyTeam', {page: 1}).then(res => { //我的团队
            this.MyTeam = res.data.list
            this.count = res.data.count
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          return this.$post('user/getMyTeam', {page: this.page}).then(res => {
            if (res.data.list && res.data.list.length > 0) {
              this.MyTeam = this.MyTeam.concat(res.data.list)
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
  .myTeam {
    min-height: 100%;
    background: #ffffff;

    .tit {
      padding: 0 12px;

      line-height: 44px;
      font-weight: bold;
      font-size: 16px;
      background: #FFFFFF;

    }

    .row {
      .imgbox {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 7px;
      }
      border-top: 1px solid #EEEEEE;
      padding: 15px 0px;
      margin: 0 12px;
    }
  }

</style>
