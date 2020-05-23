<template>
  <div class="wrap">
    <!--商品轮播图-->
    <banner v-if="goodsDesc" :banner="goodsDesc.images"></banner>
    <!--秒杀时间-->
    <div class="miaoshaTop" v-if="goodsDesc.time>-1&&(goodsType==2||goodsType==3)">
      <vTime :time="goodsDesc.time" :goodsType="goodsType"></vTime>
    </div>
    <!--商品信息-->
    <goods-msg :goodsMsg="goodsDesc"></goods-msg>
    <!--拼团-->
    <coterie :num="staycount" :odata="stay" v-if="goodsType==4" @btnFight="btnFight"></coterie>
    <!--选择商品规格-->
    <selSpecs v-if="goodsSpec.length>0&&goodsType!=3&&goodsType!=4&&!integral" ref="selSpec" :goodsDesc="goodsDesc"
              v-model="goodsSpec"></selSpecs>

    <!--商品评价 integral 积分商品不显示评价-->
    <div class="comment mt-24" v-if="!integral">
      <div class="titbox flex-sb">
        <label>商品评价</label>
        <span class="c-99 f-24 flex-c" v-if="commentList.length>0"
              @click="$linkTo('/goodsComment',{id:goodsId})"> 查看全部<span class="iconfont right">&#xe62d;</span></span>
        <span class="c-99 f-24 flex-c" v-else> 暂无评论<span class="iconfont right">&#xe62d;</span></span>
      </div>
      <comment-item :odata="commentList"></comment-item>
    </div>
    <!--商品详情-->
    <imgdesc :goodsDesc="goodsDesc"></imgdesc>
    <!--商品底部-->
    <v-footer v-if="showFooter" @footerFun="footerFun" :goodsType="goodsType" :goodsMsg="goodsDesc"></v-footer>
    <div class="Gshare">
      <Gshare :config="shareConfig" @popAnction="popAnction"></Gshare>
    </div>
    <div class="haibao" v-show="!showFooter">
      <img :src="posterImg" width="100%" alt="">
    </div>
    <div class="hbWrap">
      <div class="hb" id="posterHtml">
        <div class="header flex-c">
          <img src="../../../assets/images/register/logo.png">
          <span>全球榴莲刺客聚集地</span>
        </div>
        <div class="cen">
          <div class="f-32">好物推荐</div>
          <div class="f-24 c-99 mt-15">来自{{UserInfo.nickname}}的分享</div>
          <div class="imgbox" v-if="goodsDesc">
            <van-image width="100%" height="100%" fit="cover" :src="$formatImg(goodsDesc.images[0])"/>
          </div>
          <div class="bottom flex-sb">
            <div class="left">
              <div class="f-28 lin_n" style="height: 42px">
                {{goodsDesc.title | ellipsis}}
              </div>
              <div class="money flex-e">
                <span class="f-20 c-ff2">¥</span>
                <span class="f-36 c-ff2 mr-10 pt-2">{{$price(goodsDesc.price)}}</span>
                <span class="f-20 c-99">￥{{$price(goodsDesc.old_price)}}</span>
              </div>
            </div>
            <div class="right">
              <!--              <img :src="previews.url" :style="previews.img">-->
              <img :src="goodsType==3?goodsDesc.spike_qrcode:goodsType==4?goodsDesc.group_qrcode:goodsDesc.qrcode">
              <span class="f-20 c-99">扫码抢购</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import html2canvas from 'html2canvas'

  import commentItem from "../components/goodsDesc/commentItem";
  import banner from "../components/goodsDesc/banner";
  import goodsMsg from "../components/goodsDesc/goodsMsg";
  import goodsSpecs from "../components/goodsDesc/goodsSpecs";
  import selSpecs from "../components/goodsDesc/selSpecs";
  import imgdesc from "../components/goodsDesc/imgdesc";
  import vTime from "../components/goodsDesc/time";
  import coterie from "../components/goodsDesc/coterie";
  import VFooter from "../components/goodsDesc/vfooter";
  import Gshare from '../../../components/Gshare'

  import {Toast} from "vant";

  export default {
    name: "goodsDesc",
    components: {commentItem, goodsSpecs, banner, goodsMsg, selSpecs, imgdesc, vTime, coterie, VFooter, Gshare},
    data() {
      return {
        goodsId: '',//商品id  url传参
        goodsType: '',//商品类型 url传参
        goodsDesc: '',//商品详情
        goodsSpec: '',//商品规格
        commentList: '',//商品评论
        integral: '',
        showFooter: true,//是否显示底部
        stay: '',//待成团列表
        staycount: '',//几人正在拼团
        pid: '',//拼团id
        posterImg: '',//海报地址
        shareConfig: {}
      }
    },
    filters: {
      ellipsis: function (value) {
         return value.substring(0,23)+'...'
      }
    },
    computed: {
      ...mapState(['UserInfo'])
    },
    mounted() {
      this.goodsId = this.$route.query.id
      this.goodsType = this.$route.query.type || -1 //商品类型 1普通,2预售,3秒杀,4拼团,5金币
      this.integral = this.$route.query.integral || false //是否为积分商品详情
      if (this.integral) {
        this.goodsType = 5
        this.JFinitPage()
      } else {
        this.initPage()
      }
      this.shareConfig = {
        title: this.goodsDesc.title,
        desc: this.goodsDesc.old_title,
        img: this.$formatImg(this.goodsDesc.images[0]),
        img_title: this.goodsDesc.title,
        link: 'www.baidu.com',
        success: () => {
          console.log('success')
        }, //成功回调
        cancel: () => {
          console.log('cancel')
        }, //取消回调
      }
      if (this.goodsType == 4) {
        this.initPageStay()
      }

    },
    methods: {
      ...mapMutations(['setUserOrder']),
      //生成海报
      createPoster() {
        // 生成海报
        const vm = this
        const domObj = document.getElementById('posterHtml')
        html2canvas(domObj, {
          useCORS: true,
          allowTaint: false,
          logging: false,
          letterRendering: true,
          onclone(doc) {
            let e = doc.querySelector('#posterHtml')
            e.style.display = 'block'
          }
        }).then(function (canvas) {
          vm.posterImg = canvas.toDataURL('image/jpg')
          vm.$toast.clear()
        })
      },
      //分享操作
      popAnction(type) {
        type == 1 ? this.showFooter = false : this.showFooter = true //1 打开弹框,2关闭
      },
      //获取待成团列表
      initPageStay() {
        this.$post('group/stay', {id: this.goodsId}).then(res => {
          this.stay = res.data
          this.staycount = res.count
        }).catch((res) => {
          this.$toast.clear()
        })
      },
      //获取普通商品的详情
      initPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('goods/info', {goods_id: this.goodsId, type: this.goodsType}).then(res => { //商品信息
            this.goodsDesc = res.data
            this.shareConfig.title = res.data.title
            this.shareConfig.desc = res.data.old_title
            this.shareConfig.img = this.$formatImg(res.data.images[0])
            this.shareConfig.img_title = res.data.title
            this.shareConfig.link = this.$route.path

            return this.$post('goods/spec', {goods_id: this.goodsId})//商品规格
          }).then(res => {
            res.data.forEach(function (value) {
              value.selSpecId = -1
            });
            res.data.sel = ''
            res.data.num = 1
            this.goodsSpec = res.data
            return this.$post('common/getComment', {type: 3, id: this.goodsId, page: 1, pnum: 3})//商品评论
          }).then(res => {
            this.commentList = res.data
            this.createPoster()
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //去拼团
      btnFight(id) {
        this.pid = id
        this.footerFun(7)
      },
      //获取积分商品的详情
      JFinitPage() {
        this.$nextTick(() => {
          this.$toast.loading('正在加载')
          this.$post('goods/pointInfo', {id: this.goodsId}).then(res => { //商品信息
            this.goodsDesc = res.data
            return this.$post('goods/spec', {goods_id: this.goodsId})//商品规格
          }).then(res => {
            res.data.forEach(function (value) {
              value.selSpecId = -1
            });
            res.data.sel = ''
            res.data.num = 1
            this.goodsSpec = res.data
            return this.$post('common/getComment', {type: 3, id: this.goodsId, page: 1, pnum: 3})//商品评论
          }).then(res => {
            this.commentList = res.data
            this.createPoster()
            this.$toast.clear()
          }).catch((res) => {
            this.$toast.clear()
          })
        })
      },
      //加入购物车
      footerFun(type) {

        if (this.$checkUser()) {
          switch (type) {
            case 1:  //普通商品加入购物车
              if (this.goodsSpec.length > 0 && !this.goodsSpec.attr) { //有商品属性 并且 没有选择
                if(this.$refs.selSpec.showSpesc){//第一次弹出不提示
                  this.$toast('请选择规格~')
                }
                this.$refs.selSpec.showSprcs()
                
              } else {
                this.$post('cart/addCart', {
                  goods_id: this.goodsId,
                  attr_id: this.goodsSpec.attr,
                  num: this.goodsSpec.num,
                  type: this.goodsType
                }).then(res => {
                  this.$toast('加入购物车成功~')
                  this.$refs.selSpec.hideSprcs()
                })
              }
              break;
            case 2: //普通商品立即购买
              if (this.goodsSpec.length > 0 && !this.goodsSpec.attr) { //有商品属性 并且 没有选择
                 if(this.$refs.selSpec.showSpesc){//第一次弹出不提示
                  this.$toast('请选择规格~')
                }
                this.$refs.selSpec.showSprcs()
              } else {
                let orderInfo = {}
                orderInfo.source = 1,//是否购物车 1否 2是
                  orderInfo.num = this.goodsSpec.num,
                  orderInfo.attr_id = this.goodsSpec.attr,
                  orderInfo.goods_id = this.goodsId,
                  orderInfo.type = this.goodsType,
                  orderInfo.coupon_id = 0,//优惠券id 没有传0
                  this.setUserOrder(orderInfo)
                this.$router.push('/sureOrder');
              }
              break;
            case 3: //秒杀商品立即购买  不可选规格
              if (this.$checkUser()) {
                let orderInfo = {}
                orderInfo.source = 1,//是否购物车 1否 2是
                  orderInfo.num = this.goodsSpec.num,
                  orderInfo.attr_id = this.goodsDesc.old_attr_id,
                  orderInfo.goods_id = this.goodsId,
                  orderInfo.type = this.goodsType,
                  orderInfo.coupon_id = 0,//优惠券id 没有传0
                  this.setUserOrder(orderInfo)
                this.$router.push('/sureOrder');
              } else {
                this.$toast('请登录')
              }
              break;
            case 4: //拼团商品单买价格  当做普通商品处理   不可选规格
              if (this.$checkUser()) {
                let orderInfo = {}
                orderInfo.source = 1,//是否购物车 1否 2是
                  orderInfo.num = this.goodsSpec.num,
                  orderInfo.attr_id = this.goodsDesc.old_attr_id,
                  orderInfo.goods_id = this.goodsId,
                  orderInfo.type = 1, //普通商品
                  orderInfo.coupon_id = 0,//优惠券id 没有传0
                  this.setUserOrder(orderInfo)
                this.$router.push('/sureOrder');
              } else {
                this.$toast('请登录')
              }
              break;
            case 5: //金币上购买
              if (this.$checkUser()) {
                let orderInfo = {}
                orderInfo.num = this.goodsSpec.num,
                  orderInfo.goods_id = this.goodsId,
                  orderInfo.goodsDesc = this.goodsDesc
                this.setUserOrder(orderInfo)
                this.$router.push({path: '/sureOrder', query: {PointGoods: true}})
              } else {
                this.$toast('请登录')
              }
              break;
            case 6: //拼团  单人开团
              if (this.$checkUser()) {
                let orderInfo = {}
                orderInfo.source = 1,//是否购物车 1否 2是
                  orderInfo.num = this.goodsSpec.num,
                  orderInfo.attr_id = this.goodsDesc.old_attr_id,
                  orderInfo.goods_id = this.goodsId,
                  orderInfo.type = 4, //拼团商品
                  orderInfo.coupon_id = 0,//优惠券id 没有传0
                  this.setUserOrder(orderInfo)
                this.$router.push('/sureOrder');
              } else {
                this.$toast('请登录')
              }
              break;
            case 7: //拼团  参团
              if (this.$checkUser()) {
                let orderInfo = {}
                orderInfo.source = 1,//是否购物车 1否 2是
                  orderInfo.num = this.goodsSpec.num,
                  orderInfo.attr_id = this.goodsDesc.old_attr_id,
                  orderInfo.goods_id = this.goodsId,
                  orderInfo.type = 4, //拼团商品
                  orderInfo.pid = this.pid, //拼团id
                  orderInfo.coupon_id = 0,//优惠券id 没有传0
                  this.setUserOrder(orderInfo)
                this.$router.push('/sureOrder');
              } else {
                this.$toast('请登录')
              }
              break;

          }
        } else {
          this.$toast.loading('请登录,正在跳转');
          let _this = this
          setTimeout(function () {
            _this.$toast.clear()
            _this.$router.push({
              path: '/login',
              query: {goback: true}
            })
          }, 1500);

        }

      },
    },
  }
</script>

<style scoped lang="less">
  .wrap {
    padding-bottom: 50px;

    b {
      font-weight: 500;
    }

    .iconfont.right {
      font-size: 20px;
      color: #969799;
    }

    .comment {
      padding: 0 12px;
      background: #ffffff;

      .titbox {
        height: 43px;
        font-size: 14px;
      }
    }

    .haibao {
      width: 225px;
      height: 401px;
      background: none;
      border-radius: 8px;
      position: fixed;
      left: 75px;
      z-index: 999999;
      top: 80px;
      overflow: hidden;
    }

    .hbWrap {
      position: fixed;
      top: 0;
      z-index: -1;

      .hb {
        width: 225px;
        height: 401px;
        border-radius: 8px;
        background: rgba(255, 197, 43, 1);

        .header {
          font-size: 14px;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          padding: 10px 0;

          img {
            width: 42px;
            height: 38px;
            margin-right: 12px;
          }
        }

        .cen {
          width: 215px;
          height: 337px;
          background: rgba(255, 255, 255, 1);
          border-radius: 8px;
          margin: 0 auto;
          padding: 14.5px 12px 0;

          .money {
            margin-top: 5px;

            span:last-child {
              position: relative;
            }

            span:last-child:before {
              content: '';
              position: absolute;
              border-top: 1px solid #999;
              top: 5px;
              width: 105%;
            }
          }

          .imgbox {
            width: 191px;
            height: 191px;
            margin: 10px auto 12px;
          }

          .bottom {
            .left {
              width: 150px;
              margin-right: 15px;
            }

            .right {
              width: 45px;
              text-align: center;

              img {
                width: 40px;
                height: 40px;
                margin-bottom: 8px;
              }
            }
          }
        }
      }
    }
  }
</style>
