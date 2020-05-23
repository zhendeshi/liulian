<template>
  <div class="wrap">
    <div class="headerbox flex-c">
      <router-link class="item" :to="{path:'/letter'}">
        <div class="imgbox">
          <span v-if="odata.letter>0">{{odata.letter}}</span>
        </div>
        私信
      </router-link>
      <router-link class="item" :to="{path:'/comment'}">
        <div class="imgbox">
          <span v-if="odata.comment>0">{{odata.comment}}</span>
        </div>
        评论
      </router-link>
      <router-link class="item" :to="{path:'/dianzan'}">
        <div class="imgbox">
          <span v-if="odata.like>0">{{odata.like}}</span>
        </div>
        点赞
      </router-link>
      <router-link class="item" :to="{path:'/noticeList'}">
        <div class="imgbox">
          <span v-if="odata.notice>0">{{odata.notice}}</span>
        </div>
        通知
      </router-link>
    </div>

    <van-list
      v-model="loading"
      :finished="!loadMore"
      finished-text="暂无更多私信~"
      :offset="100"
      :immediate-check="true"
      @load="getListMore"
    >
      <div class="rowbox flex-sb" v-for="(item,index) in letter" :key="index" @click="$linkTo('/content',{letter_id:item.id})">
        <div class="imgbox">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="item.head_img?$formatImg(item.head_img):$formatImg('defaultHeader')"
          />
        </div>
        <div class="msg ">
          <div class="flex-sb row1">
            <div class="name">{{item.nickname}}</div>
            <div class="time">{{item.time}}</div>
          </div>
          <div class="flex-sb">
            <div class="desc one-row-hide">{{item.news}}</div>
            <div class="num" v-if="item.look_num!=0">{{item.look_num}}</div>
          </div>
        </div>
      </div>

    </van-list>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "index",
    data() {
      return {
        odata: '',
        letter:'',
        loading: false,
        loadMore: true,
        page: 2
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('notice/index'),//消息未读数
            this.$post('notice/getLetter', {page: 1}),//获取私信列表
          ]).then(axios.spread((a,b) => {
            this.odata = a.data
            this.letter = this.$gDataList(b)

            this.$toast.clear()
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      getListMore() {
        if (this.loadMore) {
          this.$post('notice/getLetter', {page: this.page}).then(res => {
            if (res.data && res.data.length > 0) {
              this.letter = this.letter.concat(res.data)
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
  .wrap {
    min-height: 100%;
    background: #ffffff;
    padding: 14px 12px 0;

    .headerbox {
      height: 101px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      box-shadow: 0px 0px 12px #eeeeee;
      margin-bottom: 15px;

      .item {
        flex: 1;
        text-align: center;
        color: #333333;

        .imgbox {
          width: 59px;
          height: 59px;
          margin: 0 auto 2px;
          background-size: 138px 138px;
          background-image: url('../../../assets/images/index/message.png');

          span {
            text-align: right;
            display: inline-block;
            margin-left: 60%;
            margin-top: 10%;
            width: 16px;
            height: 16px;
            background: rgba(255, 45, 37, 1);
            border-radius: 50%;
            font-size: 10px;
            color: #ffffff;
            line-height: 16px;
            text-align: center;
          }
        }
      }

      .item:nth-child(1) .imgbox {
        background-position: -74px -5px;
      }

      .item:nth-child(2) .imgbox {
        background-position: -5px -74px;
      }

      .item:nth-child(3) .imgbox {
        background-position: -5px -5px;
      }

      .item:nth-child(4) .imgbox {
        background-position: -74px -74px;
      }


    }

    .rowbox {

      padding: 15px 0;
      border-bottom: 1px solid #EEEEEE;
      color: #999999;

      .imgbox {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(243, 243, 243, 1);
        overflow: hidden;
        margin-right: 8.5px;
      }

      .msg {
        flex: 1;

        .name {
          color: #333333;
          font-size: 14px;
        }

        .row1 {
          margin-bottom: 13px;
        }

        .desc {
          width: 248px;
        }

        .num {
          width: 16px;
          height: 16px;
          background: rgba(255, 45, 37, 1);
          border-radius: 50%;
          font-size: 10px;
          color: #ffffff;
          line-height: 16px;
          text-align: center;
        }
      }
    }
  }
</style>


