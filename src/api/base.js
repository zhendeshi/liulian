import request from '@/utils/request'
import store from '@/store/index'

export function resGet(url, params = {}, token = true, user = true) {
  url = getUrl(url, params, token, user)
  return request({
    url,
    method: 'get'
  })
}

export function resPost(url, data = {}) {
  console.log(data);
  return request({
    url,
    method: 'POST',
    data,
  })
}


