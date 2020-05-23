<template>
  <div class="page-wrap">
    <van-sticky>
      <van-search v-model="nickname" @input="search()" placeholder="搜索昵称" shape="round"/>
    </van-sticky>
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="false"
      @load="getListMore"
    >
      <div class="listbox" v-if="FansList.length>0">
        <div class="item flex-c" v-for="(item,index) in FansList" :key="index" @click="$linkTo('/Homepage',{uid:item.uid})">
          <div class="imgbox g-tipsBox">
            <van-image
              width="100%"
              height="100%"
              fit="cover"
              round
              :src="item.user.head_img?$formatImg(item.user.head_img):$formatImg('defaultHeader')"
            />
            <div v-if="item.user.grade_pic" class="g-tips"
                 :style="{backgroundImage: 'url(' + $formatImg(item.user.grade_pic) + ')'}"></div>
          </div>
          <div class="fle1">
            <div class="f-28 ">{{item.user.nickname}}</div>
            <span class="c-99 mt-10">{{item.user.describe}}</span>
          </div>
          <Gattent :attent="item.is_follow" type="3" :model_id="item.user.id"></Gattent>
        </div>
      </div>
      <div class="nodeta flex-c" v-else>
        暂无更多数据
      </div>
    </van-list>

  </div>
</template>

<script>
  import Gattent from "../../../components/Gattent";

  export default {
    name: "Fan",
    components: {Gattent},
    data() {
      return {
        FansList: '',
        nickname: '',
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      search() {
        this.FansList = []
        this.initPage()
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('user/getFansList', {page: 1, type: 1, nickname: this.nickname}).then(res => {
            this.FansList = res.data
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('user/getFansList', {page: this.page, type: 1, nickname: this.nickname}).then(res => {
            if (res.data && res.data.length > 0) {
              this.FansList = this.CircleNews.concat(res.data)
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
    background: #ffffff;
    min-height: 100%;

    .van-search .van-cell {
      padding: 8px;
    }

    /deep/ .van-field__left-icon {
      margin-top: 3px;
    }

    .nodeta {
      height: 100px;
      color: #999999;
    }

    .searchbox {
      width: 351px;
      height: 40px;
      background: rgba(245, 245, 245, 0.8);
      border-radius: 20px;
      margin: 0 auto;
    }

    .listbox {
      padding: 0 12px;

      .item {
        border-bottom: 1px solid #EEEEEE;
        padding: 15px 0;

        .fle1 {
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          * {
            width: 100%;
          }
        }

        .imgbox {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(232, 203, 161, 1);
          margin-right: 7px;
        }
      }
    }

  }

</style>
