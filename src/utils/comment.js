const wx =  process.env.NODE_ENV == "development" ? require("weixin-js-sdk") : window["wx"];
console.log(wx)
console.log(post)
import {
  post
} from './request'
var AppId = ''
var Timestamp = ''
var Signature = ''
var Noncestr = ''
console.log(wx)
export function GetSignature (callback) {
  // qryWxSignature 这个是调用后台获取签名的接口
      console.log('执行了注册')
  post('weix/wxconfig', {
    url: window.location.href.split('#')[0]
  }).then((data) => {
    
	 
  },(data)=>{
    console.log(data)
    AppId = data.APPID
    Timestamp = data.time
    Signature = data.sign
    Noncestr = data.nonceStr
    console.log('执行了注册')

    wx.config({
      beta: true,
      debug: true,
      appId: AppId,
      timestamp: Timestamp,
      nonceStr: Noncestr,
      signature: Signature,
      // 这里是把所有的方法都写出来了 如果只需要一个方法可以只写一个
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'hideMenuItems',
        'showMenuItems',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'translateVoice',
        'startRecord',
        'stopRecord',
        'onRecordEnd',
        'playVoice',
        'pauseVoice',
        'stopVoice',
        'uploadVoice',
        'downloadVoice',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'downloadImage',
        'getNetworkType',
        'openLocation',
        'getLocation',
        'hideOptionMenu',
        'showOptionMenu',
        'closeWindow',
        'scanQRCode',
        'chooseWXPay',
        'openProductSpecificView',
        'addCard',
        'chooseCard',
        'openCard',
        'openWXDeviceLib',
        'closeWXDeviceLib',
        'configWXDeviceWiFi',
        'getWXDeviceInfos',
        'sendDataToWXDevice',
        'startScanWXDevice',
        'stopScanWXDevice',
        'connectWXDevice',
        'disconnectWXDevice',
        'getWXDeviceTicket',
        'WeixinJSBridgeReady',
        'onWXDeviceBindStateChange',
        'onWXDeviceStateChange',
        'onScanWXDeviceResult',
        'onReceiveDataFromWXDevice',
        'onWXDeviceBluetoothStateChange'
      ]
    })
    wx.ready(function () {
      console.log(callback, 'callback')
      if (callback) callback()
    })
  })
}

// 判断当前环境
export function iFType(){
      var appType;
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //ios的ua中无miniProgram，但都有MicroMessenger（表示是微信浏览器）
        wx.miniProgram.getEnv((res) => {
          if (res.miniprogram) {
            appType = 1;
            console.log("在小程序里");
          } else {
            appType = 2;
            console.log("不在小程序里,在微信浏览器里");
          }
        })
      } else {
        appType = 3;
        console.log('不在微信里，在浏览器里');
      }
return appType;
}







