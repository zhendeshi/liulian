<template>

  <div class="wrap">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="listbox" id="gundong" >
        <div v-for="(item,index) in msglist" :key="index" :class="['box',item.is_my == 2 ? 'boxA' : 'boxB']">
          <div class="time" v-if="index>0&&msglist[index].time-msglist[index-1].time>300">
            {{item.add_time}}
          </div>
          <div class="time" v-if="index==0">{{item.add_time}}</div>
          <div class="descbox">
            <div class="imgbox" @click="item.is_my == 2 ?$linkTo('/Homepage',{uid:old_uidB}):''">
              <van-image
                width="100%"
                height="100%"
                fit="cover"
                :src="$formatImg(item.user.headimgurl)"
              />
            </div>
            <div class="desc">
              <div class="main">
                {{item.desc}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <div id="aa"></div>
    <div class="bottom flex-sb">
      <van-field
        v-model="desc"
        rows="1"
        autosize
        type="textarea"
        placeholder="回复..."
      />
      <a href="#aa" class="right flex-c" @click="Reply()">发送</a>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "contentPage",
    data() {
      return {
        letter_id: '',
        old_uid: '',
        old_uidB: '',
        page: 2,
        parm: {},
        msglist: '',
        desc: '',
        isLoading: false,
        myheaderImg: ''
      }
    },
    computed: {
      ...mapState(['UserInfo'])


    },
    mounted() {
      if (this.$route.query.letter_id) {
        this.parm.letter_id = this.$route.query.letter_id
      }
      if (this.$route.query.old_uid) {
        this.parm.old_uid = this.$route.query.old_uid
      }
      this.initPage()
    },
    methods: {
      onRefresh() {
        this.$post('notice/letter_list', {...this.parm, page: this.page}).then(res => {
          if (res.data.list && res.data.list.length > 0) {
            this.msglist = this.msglist.unshift(res.data.list)
            this.page++
          }
          this.isLoading = false
        }).catch((res) => {

        })
      },
      //回复私信
      Reply() {
        if (this.desc) {
          let aa = this.old_uidB || this.parm.old_uid
          this.$post('notice/setLetter', {old_uid: aa, desc: this.desc}).then(res => {
            let news = {
              desc: this.desc,
              is_my: 1,
              add_time: '刚刚',
              user: {
                headimgurl: this.UserInfo.headimgurl
              }
            }
            this.msglist.push(news)
            this.desc = ''

          }).catch((res) => {

          })
        }
      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('notice/letter_list', {...this.parm, page: 1}).then(res => { //收藏列表
            this.msglist = res.data.list
            this.old_uidB = res.data.old_uid
            this.myheaderImg = res.data.list[0].user.headimgurl
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },

    }
  }
</script>

<style scoped lang="less">
  .wrap {
    height: 100%;

    .listbox {
      min-height: 100%;
      padding-bottom: 60px;
      padding-top: 14px;
    }

    .box {
      margin-bottom: 14.5px;

      .descbox {
        position: relative;

      }

      .desc {
        width: 281px;
        margin: 0 auto;
        position: relative;
      }

      .imgbox {
        position: absolute;
        width: 32px;
        height: 32px;
        background: rgba(187, 149, 76, 1);
        border-radius: 50%;
        overflow: hidden;
        top: -8.5px;

      }

      .time {
        font-size: 10px;
        text-align: center;
        padding: 0 0 14.5px;
        color: #999999;
      }
    }

    .boxA {
      .imgbox {
        left: 12px;
      }

      .desc {
        position: relative;
        padding-left: 6px;

        .main {
          position: relative;
          background: #ffffff;
          margin-left: 7px;
          z-index: 2;
          border-radius: 0px 8px 8px 8px;
          padding: 8px 10px;
          font-size: 14px;
          line-height: 17px;
        }
      }

      .desc:before {
        position: absolute;
        content: '';
        width: 16.5px;
        height: 10px;
        background-image: url("../../../assets/images/index/msgB.png");
        background-size: 100%;
        z-index: 1;
      }
    }

    .boxB {
      .imgbox {
        right: 12px;
      }

      .desc {
        position: relative;
        padding-right: 6px;

        .main {
          position: relative;
          margin-right: 7px;
          z-index: 2;
          padding: 8px 10px;
          font-size: 14px;
          line-height: 17px;
          background: rgba(255, 180, 0, 1);
          border-radius: 8px 0px 8px 8px;
        }
      }

      .desc:before {
        position: absolute;
        content: '';
        width: 16.5px;
        height: 10px;
        background-image: url("../../../assets/images/index/msgA.png");
        background-size: 100%;
        right: 7px;
        z-index: 1;
      }
    }

    /deep/ .van-pull-refresh__track {
      padding-bottom: 20px;
    }

    .bottom {
      position: fixed;
      bottom: 0px;
      left: 0px;
      right: 0px;
      min-height: 50px;
      background: rgba(255, 255, 255, 1);
      max-height: 110px;
      z-index: 999;

      /deep/ .van-cell:not(:last-child)::after {
        border-bottom: none
      }

      /deep/ .van-field__control {
        max-height: 90px;

      }

      .left {
        width: 285px;
        min-height: 35px;
        background: rgba(234, 234, 234, 1);
        border-radius: 8px;

        input {
          background: transparent;
          width: 100%;
          height: 100%;
          padding: 0 12px;
        }
      }

      .right {
        width: 55px;
        height: 35px;
        background: rgba(255, 180, 0, 1);
        border-radius: 8px;
        color: #ffffff;
        margin-right: 12px;
      }
    }
  }
</style>
