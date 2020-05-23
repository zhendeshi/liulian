// 引入安装的axios插件
import axios from 'axios'
import qs from 'qs'
import store from '../store/index'
import {Toast} from 'vant'

axios.defaults.baseURL = 'https://liulian.kailly.com/api'

export function post(url, params = {}) {
  if (store.state.UserInfo) {
    Object.assign(params, {token: store.state.UserInfo.token}); //合并两个对象
  }
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params)).then(res => { //序列化字符串
      if (res.status === 200) {
        Toast.clear()
        if (res.data.code == 200) {
          resolve(res.data);
        } else if (res.data.code == 401) {
          Toast.loading('请登录,正在跳转');
          let _this = this
          setTimeout(function () {
            _this.$toast.clear()
            _this.$router.push({
              path: '/login',
              query: {goback: true}
            })
          }, 1500);
        } else {
          reject(res.data);
        }
      } else {
        reject(res.msg)
      }
    }).catch(err => {
      // / reject(err)
      console.log(err);
    })
  })
}

export function uploadFile(file) {
  let fd = new FormData()
  fd.append('file', file.file)
  return new Promise((resolve, reject) => {
    axios.post('common/fileUp', fd, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      if (res.status === 200) {
        if (res.data.code == 200) {
          resolve(res.data);
        } else if (res.data.code == 401) {
          Toast.loading('请登录,正在跳转');
          this.$router.push({
            path: '/login',
            query: {goback: true}
          })
        } else {
          reject(res.data);
        }
      } else {
        reject(res.msg)
      }
    }).catch(err => {
      // / reject(err)
      console.log(err);
    })
  })

}
