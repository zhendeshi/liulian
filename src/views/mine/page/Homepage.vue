<template>
  <div class="page-wrap">
    <div class="header">
      <div class="imgbox g-tipsBox">
        <van-image width="100%" height="100%" fit="cover" round
                   :src="Info.headimgurl?$formatImg(Info.headimgurl):$formatImg('defaultHeader')"/>
        <div v-if="Info.grade_pic" class="g-tips"
             :style="{backgroundImage: 'url(' + $formatImg(Info.grade_pic) + ')'}"></div>
      </div>
      <div class="msgbox">
        <div class="name">{{Info.nickname}}</div>
        <div class="c-99">{{Info.describe||'该用户暂无描述'}}</div>
        <div class="listbox flex-c" v-if="!parm.uid">
          <div class="item" @click="$linkTo('/attention')">
            <div>{{Info.follow}}</div>
            <span>关注</span>
          </div>
          <div class="item" @click="$linkTo('/fan')">
            <div>{{Info.attention}}</div>
            <span>粉丝</span>
          </div>
          <div class="item" @click="$linkTo('/favorite_dynamic')">
            <div>{{Info.coupon}}</div>
            <span>收藏</span>
          </div>

        </div>
        <div class="listbox flex-c" v-else>
          <div class="item">
            <div>{{Info.follow}}</div>
            <span>关注</span>
          </div>
          <div class="item">
            <div>{{Info.attention}}</div>
            <span>粉丝</span>
          </div>
          <div class="item">
            <div>{{Info.like}}</div>
            <span>获赞</span>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 82px">
      <div class="navtab flex-c" v-if="News.length>0">
        <div v-for="(item,index) in nav" :class="navIndex==index?'item active':'item'" @click="changeNav(index)">
          <span>
            {{item}}
          </span>
        </div>
      </div>
      <van-list
        v-model="loading"
        :finished="!loadMore"
        finished-text="没有更多了"
        :offset="0"
        :immediate-check="false"
        @load="getListMore"
      >
        <dynamicList v-if="navIndex==0" type="like" :odata="CircleNews"></dynamicList>
        <news class="newsList" :odata="CircleNews" v-else ></news>

      </van-list>
    </div>

    <div class="footer flex f-28 c-ffb" v-if="otherUser">
      <div class="fle1 flex-c">
        <Gattent :attent="Info.is_attent" type="3" :model_id="Info.id"></Gattent>
      </div>
      <div class="fle1 flex-c" @click="$linkTo('/content',{old_uid:parm.uid})">私信</div>
    </div>
  </div>
</template>

<script>
  import dynamicList from '../../../components/dynamicList'
  import news from '../../find/components/index/news'
  import Gattent from "../../../components/Gattent";
  import {mapState, mapActions, mapMutations} from 'vuex'
  import axios from "axios";

  export default {
    name: "Homepage",
    data() {
      return {
        Info: '',//用户信息
        CircleNews: '',//动态列表
        News: '',//动态列表
        uid: '',//其他用户的id
        parm: { //接口参数
          choice: 1
        },
        otherUser: false,//是否为别人主页
        nav: ['动态', '文章'],
        navIndex: 0,

        loading: false,
        loadMore: true,
        page: 2,
      }
    },
    components: {dynamicList, Gattent, news},
    computed: {
      ...mapState(['UserInfo'])
    },
    created() {
      this.initPage()
      if (this.$route.query.uid) { //存在uid  为别人主页
        this.parm.uid = this.$route.query.uid
        this.uid = this.$route.query.uid
        this.otherUser = true
      }

    },
    methods: {
      ...mapMutations(['setTabBarIndex', 'setUserInfo']),
      //改变nav
      changeNav(index) {
        this.navIndex = index
        this.CircleNews = []
        this.page = 1
        if (index == 0) { //动态
          this.parm = {
            uid: this.uid
          }
        } else {
          this.parm = {
            choice: 1,

            uid: this.uid
          }
        }
        this.getListMore()

      },
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          axios.all([
            this.$post('user/getUserInfo', {...this.parm}),//获取用户资料
            this.$post('user/getCircleNews', {page: 1, ...this.parm}),
            this.$post('Find/getNews', {page: 1, choice: 1, ...this.parm})
          ]).then(axios.spread((a, b, c) => {
            this.Info = a.data
            this.CircleNews = b.data.list
            this.News = c.data
          })).catch((res) => {
            this.$toast.clear()
          })
        })
      },

      //底部商品推荐上拉加载
      getListMore() {
        let url = ''
        if (this.navIndex == 0) {
          url = 'user/getCircleNews'
        } else {
          url = 'Find/getNews'
        }
        if (this.loadMore) {
          this.$post(url, {page: this.page, ...this.parm}).then(res => {
            if (res.data && res.data.length > 0) {
              if (this.navIndex == 0) {
                this.CircleNews = this.CircleNews.concat(res.data.list)
              } else {
                this.CircleNews = this.CircleNews.concat(res.data)
                console.log(res.data);
              }
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
  .newsList{
    /deep/.item{
      background: #FFFFFF;
      padding: 15px 12px;
    }
  }
  .footer {
    width: 375px;
    height: 50px;
    padding: 10px 0;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    bottom: 0;

    .fle1:last-child {
      color: #999999;
      border-left: 1px solid #eeeeee;
    }

    /deep/ .g-followBtn {
      border: none;
      font-size: 14px;
    }
  }

  .header {
    height: 150px;
    background-image: url("../../../assets/images/mine/headerbg2.png");
    background-size: 375px 214px;
    background-position: 0 -54px;
    background-repeat: no-repeat;
    padding-top: 38px;

    .imgbox {
      z-index: 99;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin: 0 auto;
      border: 1px solid rgba(232, 203, 161, 1);
    }

    .msgbox {
      position: relative;
      z-index: 10;
      width: 351px;
      height: 158px;
      background: rgba(255, 255, 255, 1);
      border-radius: 8px;
      margin: -30px auto 0;
      text-align: center;
      padding-top: 43px;

      .name {
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 7px;
      }

      .listbox {
        margin-top: 25px;

        .item {
          flex: 1;
          text-align: center;

          div {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 12px;
          }
        }
      }
    }
  }

  .navtab {
    .item {
      padding: 16px 30px 8px;
      position: relative;

      span {
        font-size: 16px;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        position: relative;
        z-index: 2;
      }
    }

    .active:before {
      content: "";
      position: absolute;
      width: 28px;
      height: 6px;
      background: rgba(255, 180, 0, 1);
      left: 32px;
      bottom: 6px;
      z-index: 1;
    }
  }

  /deep/ .van-list {
    padding-bottom: 50px;
  }
</style>
