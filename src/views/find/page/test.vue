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
      <div class="listbox">
        <div class="item " v-for="(item,index) in study" :key="index" @click="$linkTo('/testQuestion',{id:item.id})">
          <div class="imgbox">
            <van-image
              width="100%"
              height="100%"
              fit="cover"
              radius="8"
              :src="$formatImg(item.pic)"
            />
          </div>
          <div class="title">
            {{item.title}}
          </div>
          <div class="bottom flex-sb">
            <div class="flex-c">
              <span class="c-ffb f-30">{{item.num}}</span>
              <span class="c-99 f-22">人参与</span>
            </div>
            <div class="btn g-btna flex-c">
              立即测试
            </div>
          </div>

        </div>
      </div>
    </van-list>

  </div>
</template>

<script>
  export default {
    name: "test",
    data() {
      return {
        study: [],
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
          this.$post('Find/study', {page: 1}).then(res => {
            this.study = res.data
          }).catch((res) => {
            this.$toast.clear()
          })

        })
      },
      //底部商品推荐上拉加载
      getListMore() {
        if (this.loadMore) {
          this.$post('Find/study', {page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.study = this.study.concat(res.data)
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

    .listbox {
      .item {
        width: 351px;
        height: 278px;
        background: rgba(255, 255, 255, 1);
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 12px;

        .imgbox {
          width: 327px;
          height: 183px;
        }

        .title {
          font-size: 14px;
          margin: 12px 0 15px;
        }

        .btn {
          background: linear-gradient(90deg, rgba(255, 201, 52, 1), rgba(255, 180, 0, 1));

        }
      }
    }
  }
</style>
