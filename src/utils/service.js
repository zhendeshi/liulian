import {resPost} from "../api/base";
import store from '../store/index'

export function PayOrder(that, params) {
  return new Promise((resolve, reject) => {
    params = {
      openid: store.state.userInfo.openid,
      appid: store.state.businessInfo.appid,
      mchid: store.state.businessInfo.mchid,
      payment_key: store.state.businessInfo.payment_key,
      ...params,
      // total_fee: 0.01
    }
    resPost('GetCreateOrderPay', params).then(res => {
      if (res.data && res.data.length > 0) {
        const onBridgeReady = (payParams) => {
          WeixinJSBridge.invoke('getBrandWCPayRequest', {
            "appId": payParams.appId,     //公众号名称，由商户传入
            "timeStamp": payParams.timeStamp,         //时间戳，自1970年以来的秒数
            "nonceStr": payParams.nonceStr, //随机串
            "package": payParams.package,
            "signType": payParams.signType,         //微信签名方式：
            "paySign": payParams.paySign //微信签名
          }, function (res) {
            if (res.err_msg == "get_brand_wcpay_request:ok") {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              resolve(params)
            } else {
              reject()
            }
          });
        }
        if (typeof WeixinJSBridge == "undefined") {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady(res.data[0]), false);
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady(res.data[0]));
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady(res.data[0]));
          }
        } else {
          onBridgeReady(res.data[0]);
        }
      } else {
        reject()
      }
    }).catch(() => {
      reject()
    })
  })
}

export function InitShare(that, params) {
  //params: link, title, desc, url, query, imgUrl
  return new Promise((resolve, reject) => {
    // if (process.env.NODE_ENV === 'development') {
    //   resolve()
    //   return
    // }
  console.log('InitShare')

    const agent = navigator.userAgent
    const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isiOS) params.link = store.state.firstUrl
    let resParams = {
      appid: store.state.businessInfo.appid,
      secret: store.state.businessInfo.secret,
      mchid: store.state.businessInfo.mchid,
      link: params.link //传入参数
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
          link: `${store.state.systemInfo.prodHost}${params.url}?superior=${store.state.userInfo.pk_id}${params.query}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: params.imgUrl // 分享图标
        }
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
        resolve()
      } else {
        resolve()
      }
    }).catch(() => {
      resolve()
    })
  })
}

export function HideMenuItems(list = []) {
  //params: link
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'development') {
      resolve()
      return
    }
    let link = escape(location.href)
    const agent = navigator.userAgent
    const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isiOS) link = store.state.firstUrl
    let resParams = {
      appid: store.state.businessInfo.appid,
      secret: store.state.businessInfo.secret,
      mchid: store.state.businessInfo.mchid,
      link //传入参数
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
        wx.ready(function () {
          if (list.length > 0) {
            wx.hideMenuItems({
              menuList: list // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
          } else {
            wx.hideAllNonBaseMenuItem()
          }
        })
        resolve()
      } else {
        resolve()
      }
    }).catch(() => {
      resolve()
    })
  })
}

export function WxScanQRCode() {
  if (process.env.NODE_ENV === 'development') {
    return
  }
  let link = escape(location.href)
  const agent = navigator.userAgent
  const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isiOS) link = store.state.firstUrl
  return new Promise((resolve, reject) => {
    let resParams = {
      appid: store.state.businessInfo.appid,
      secret: store.state.businessInfo.secret,
      mchid: store.state.businessInfo.mchid,
      link //传入参数
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
          jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
        });
        resolve()
      } else {
        resolve()
      }
    }).catch(() => resolve())
  })
}

export function WxCloseWindow() {
  if (process.env.NODE_ENV === 'development') {
    return
  }
  let link = escape(location.href)
  const agent = navigator.userAgent
  const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isiOS) link = store.state.firstUrl
  return new Promise((resolve, reject) => {
    let resParams = {
      appid: store.state.businessInfo.appid,
      secret: store.state.businessInfo.secret,
      mchid: store.state.businessInfo.mchid,
      link //传入参数
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
          jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'onMenuShareWeibo', 'closeWindow', 'hideMenuItems','getLocation', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem'] // 必填，需要使用的JS接口列表
        });
        resolve()
      } else {
        resolve()
      }
    }).catch(() => resolve())
  })
}
