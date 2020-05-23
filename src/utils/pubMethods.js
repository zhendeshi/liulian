import Vue from 'vue'
import store from '../store/index'
import moment from 'moment'

moment.locale('zh-cn')

const pubMethods = {
  install: function () {
    Vue.prototype.$linkTo = linkTo
    Vue.prototype.$formatImg = formatImg
    Vue.prototype.$price = getPrice
    Vue.prototype.$linkUrl = linkUrl
    Vue.prototype.$percentage = percentage
    Vue.prototype.$gDataList = gDataList
    Vue.prototype.$checkUser = checkUser
    Vue.prototype.$mTime = momentTime
    Vue.prototype.$nTime = normTime
    Vue.prototype.$distance = distance

  }
}

/**
 * 检测用户是否登录
 */
function checkUser() {
  if (store.state.UserInfo.token) {
    return true
  } else {
    return false
  }
}

/**
 * 转换成百分比
 * @param fenzi 分子
 * @param fenmu 分母
 */
function percentage(fenzi, fenmu) {
  if (fenzi == 0) {
    return '0%'
  } else {
    return (Math.round(fenzi / fenmu * 10000) / 100.00 + "%");
  }
}

/**
 * 序列化
 */
function gDataList(res) {
  if (res.data && res.data.length > 0) {
    return res.data
  } else {
    return []
  }
}


/**
 * 跳转
 * @param path 跳转路径
 * @param query 参数
 */
function linkTo(path, query = {}) {
  this.$router.push({
    path,
    query
  })
}

/**
 * 时间格式
 */
function momentTime(time) { //转换成多久多久之前
  // return moment(time * 1000).format("YYYY.DD.MM")
  return moment(time, 'YYYY/MM/DD hh:mm:ss').fromNow()
}

/**
 * 时间格式
 */
function normTime(time) { //转换成标准日期
  return moment(time * 1000).format("YYYY.MM.DD")
}
/**
 * 距离格式
 */
function distance(val) {
  let aa = parseInt(val * 100).toFixed(2) / 100
  if (aa >= 1) {
    return aa + 'km'
  } else if (val < 0.01) {
    return (parseInt(val * 1000)) + 'm'
  } else {
    return (aa * 1000) + 'm'
  }

}

/**
 * 跳转
 * @param img 图片链接
 */
function formatImg(img) {
  var toux = require("../assets/images/comm/toux.png")
  if (img) {
    if (img.indexOf('http') > -1) {
      return img
    } else if (img.indexOf('defaultHeader') > -1) {
      return toux
    } else {
      return 'http://liulian.kailly.com/' + img
    }
  } else {
    return ''
  }
}

/**
 * 链接跳转
 * @param url
 */
function linkUrl(url) {
  if (url && url !== '#') {
    if (url.indexOf('http') > -1) {
      window.location.href = url
    } else {
      this.$router.push(url)
    }
  }
}

/**
 * 价钱转换
 * @param price
 */
function getPrice(price) {
  if (price) {
    price = Number(price)
    let intPrice = parseInt(price)
    if (price - intPrice > 0) {
      return price.toFixed(2)
    } else {
      return intPrice
    }
  } else {
    return 0
  }
}

export default pubMethods
