export function onBridgeReady() {
  return new Promise((resolve, reject) => {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        "appId": "wx2421b1c4370ec43b",     //公众号名称，由商户传入
        "timeStamp": "1395712654",         //时间戳，自1970年以来的秒数
        "nonceStr": "e61463f8efa94090b1f366cccfbbb444", //随机串
        "package": "prepay_id=u802345jgfjsdfgsdg888",
        "signType": "MD5",         //微信签名方式：
        "paySign": "70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
      },
      function (res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {

        }
      });
  })
}

import moment from 'moment'

export function createDateObject(date) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  // 总天数
  let days = new Date(year, month, 0).getDate()
  let firDay = new Date(year + '/' + month + '/' + '01').getDay()
  let lasDay = new Date(year + '/' + month + '/' + days).getDay()
  let befDate = ''
  if ((month - 1) > 0) {
    befDate = year + '/' + formatNumber((month - 1)) + '/' + '01'
  } else {
    befDate = (year - 1) + '/' + 12 + '/' + '01'
  }
  let aftDate = ''
  if (month > 11) {
    aftDate = (year + 1) + '/' + '01' + '/' + '01'
  } else {
    aftDate = year + '/' + formatNumber((month + 1)) + '/' + '01'
  }
  let befDay = moment(new Date(date.getTime() - 24 * 60 * 60 * 1000)).format('YYYY/MM/DD')
  let aftDay = moment(new Date(date.getTime() + 24 * 60 * 60 * 1000)).format('YYYY/MM/DD')
  let fullDate = moment(date).format('YYYY/MM/DD')
  return new Object({
    year, //年
    month,//月
    date: date.getDate(),//日
    fullDate,//当前时间 2019/12/01
    days,//本月总天数
    firDay,//第一天是周几，0代表周日
    lasDay,//最后一天是周几
    befDate,//上个月一号日期 2019/12/01
    aftDate,//下个月一号日期
    befDay,//前一天日期
    aftDay //后一天日期
  })
}

function formatNumber(n) {
  if (n < 10) {
    return ('0' + n)
  } else {
    return ('' + n)
  }
}

export function splitToArrFir(str) {
  if (str) {
    return str.split(',')[0]
  } else {
    return ''
  }
}
