<template>
  <div class="page-wrap">
    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="没有更多了"
      :offset="0"
      :immediate-check="false"
      @load="getListMore"
    >
      <div class="item" v-for="(item,index) in topicList" :key="index" @click.stop="$linkTo('/circleDesc',{id:item.id,type:2})">
        <div class="imgbox">
          <van-image
            round
            width="100%"
            height="100%"
            radius="8px"
            :src="item.pic?$formatImg(item.pic):$formatImg('defaultHeader')"
          />
          <div class="tips">
           {{index+1}}
          </div>
        </div>
        <div class="right">
          <div class="tit">#{{item.title}}</div>
          <div class="desc">{{item.desc}}</div>
          <div class="bottom">{{item.partic}}人正在参与讨论</div>
        </div>
      </div>
    </van-list>

  </div>
</template>

<script>
  export default {
    name: "topic",
    data() {
      return {
        topicList:'',
        loading: false,
        loadMore: true,
        page:2
      }
    },
    created() {
      this.initPage()
    },
    methods:{
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('Find/getTopic', {page: 1, key: this.topicWord,type:1}).then(res => { //获取话题列表
            this.topicList = res.data
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          this.$post('Find/getTopic', {page: this.page, key: this.topicWord,type:1}).then(res => { //获取话题列表
            if (res.data && res.data.length > 0) {
              this.topicList = this.topicList.concat(res.data)
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
    min-height: 100%;
    background: #ffffff;

    .item {
      display: flex;
      border-bottom: 1px solid #EEEEEE;
      padding: 12px 0;
      margin: 0 12px;

      .imgbox {
        border-radius: 8px;
        overflow: hidden;
        margin-right: 12px;
        position: relative;
        width: 80px;
        height: 80px;

        .tips {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #FFB400;
          border-radius: 7px 0px 7px 0px;
          color: #ffffff;
          width: 24px;
          height: 16px;
        }
      }

      .right {
        flex: 1;

        position: relative;

        .tit {
          font-size: 14px;
        }

        .desc {
          line-height: 16px;
          margin: 10px 0 0;
          color: #666666;
        }

        .bottom {
          color: #999999;
          position: absolute;
          left: 0;
          bottom: 0;
        }
      }
    }
  }
</style>
