import {mapState} from 'vuex'
import {resPost} from "../api/base";
import store from "../store";

export const WXJSSDK = {
  data() {
    return {
      SHARE_PARAMS: null
    }
  },
  computed: {
    ...mapState(['userInfo', 'businessInfo', 'systemInfo', 'firstUrl'])
  },
  methods: {
    INIT_PAGE_SHARE(params) {
      this.$nextTick(() => {
        if (process.env.NODE_ENV === 'development') return
        params = {
          imgUrl: this.userInfo.img,
          query: '',
          ...params
        }
        let link = escape(location.href)
        const agent = navigator.userAgent
        const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
        if (isiOS) link = this.firstUrl
        let resParams = {
          appid: this.businessInfo.appid,
          secret: this.businessInfo.secret,
          mchid: this.businessInfo.mchid,
          link
        }
        resPost('GetSharedEncryption', resParams).then(res => {
          if (res.data && res.data.length > 0) {
            let item = res.data[0]
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: item.appId, // 必填，公众号的唯一标识
              timestamp: item.timestamp, // 必填，生成签名的时间戳
              nonceStr: item.nonceStr, // 必填，生成签名的随机串
              signature: item.signature,// 必填，签名
              jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareWeibo', 'closeWindow', 'hideMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
            });
            let shareObj = {
              title: params.title, // 分享标题
              desc: params.desc, // 分享描述
              link: `${this.systemInfo.prodHost}${params.url}?superior=${this.userInfo.pk_id}${params.query}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: params.imgUrl // 分享图标
            }
            const agent = navigator.userAgent
            const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
            wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
              if (isiOS) wx.showAllNonBaseMenuItem()
              wx.updateAppMessageShareData({
                ...shareObj,
                success: function () {
                }
              })
              wx.onMenuShareWeibo({
                ...shareObj,
                success: function () {
                }
              })
              wx.updateTimelineShareData({
                ...shareObj,
                success: function () {
                }
              })
            });
            this.SHARE_PARAMS = shareObj
          }
        })
      })
    },
    WX_PAGE_READY() {
      if (this.SHARE_PARAMS){
        let that = this
        const agent = navigator.userAgent
        const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
          if (isiOS) wx.showAllNonBaseMenuItem()
          wx.updateAppMessageShareData({
            ...that.SHARE_PARAMS,
            success: function () {
            }
          })
          wx.onMenuShareWeibo({
            ...that.SHARE_PARAMS,
            success: function () {
            }
          })
          wx.updateTimelineShareData({
            ...that.SHARE_PARAMS,
            success: function () {
            }
          })
        });
      }
    }
  }
}
