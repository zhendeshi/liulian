import {post,uploadFile} from '../utils/request'
//加载收货地址
export const loadAddress = ({commit}) => {
  post('user/getAddress').then(res => {
    commit('setUserAddress',res.data)
  }).catch((res) => {

  })
}

//
//
// export const showLoading = ({commit, state}, text = '正在加载') => {
//   commit('changeLoading', {show: true, text})
// }
// export const hideLoading = ({commit, state}, text = '正在加载') => {
//   commit('changeLoading', {show: false, text})
// }
// //加载商户信息
// export const loadBusinessInfo = ({commit, state}, params = {}) => {
//   return new Promise(((resolve, reject) => {
//     params.pk_id = process.env.PK_ID
//     resPost('GetBusinessInfo', params, false, false).then(res => {
//       if (res.data && res.data.length > 0) {
//         commit('setBusinessInfo', res.data[0])
//         resolve(res)
//       } else {
//         reject(res.message)
//       }
//     }).catch(err => {
//       reject(err)
//     })
//   }))
// }
// //加载用户OpenId信息
// export const loadUserOpenid = ({commit, state}, params = {}) => {
//   return new Promise(((resolve, reject) => {
//     params = {
//       superior: 0,
//       ...params,
//       appid: state.businessInfo.appid,
//       secret: state.businessInfo.secret,
//       pk_id: state.businessInfo.pk_id
//     }
//     resPost('GetUserOpenid', params).then(res => {
//       if (res.data && res.data.length > 0) {
//         commit('setUserInfo', res.data[0])
//         resolve(res)
//       } else {
//         reject()
//       }
//     }).catch(err => {
//       reject(err)
//     })
//   }))
// }
// //加载用户信息
// export const loadUserInfo = ({commit}) => {
//   return new Promise((resolve, reject) => {
//     resPost('GetUsersInfo').then(res => {
//       if (res.data && res.data.length > 0) {
//         commit('setUserInfo', res.data[0])
//         localStorage.setItem('userId', res.data[0].pk_id)
//         resolve(res.data[0])
//       } else {
//         reject()
//       }
//     }).catch((res) => {
//       reject()
//     })
//   })
// }
// //查询微信导航列表
// export const loadWeChatNavNavigationList = ({state}, params) => {
//   return new Promise(((resolve, reject) => {
//     resPost('GetWeChatNavNavigationList', params).then(res => {
//       if (res.data && res.data.length > 0) {
//         resolve(res)
//       }
//     })
//   }))
// }
// //查询活动列表
// export const loadActivityList = ({state}, params) => {
//   return new Promise(((resolve, reject) => {
//     resPost('GetActivityList', params).then(res => {
//       if (res.data && res.data.length > 0) {
//         resolve(res)
//       }
//     })
//   }))
// }
// //查询门票分类
// export const loadTicketTypeList = ({state}, params) => {
//   return new Promise(((resolve, reject) => {
//     resPost('GetTicketTypeList', params).then(res => {
//       if (res.data && res.data.length > 0) {
//         resolve(res)
//       }
//     })
//   }))
// }
// //查询产品列表
// export const loadWebTicketProList = ({state}, params) => {
//   return new Promise(((resolve, reject) => {
//     resPost('GetWebTicketProList', params).then(res => {
//       if (res.data && res.data.length > 0) {
//         resolve(res)
//       } else {
//         reject()
//       }
//     }).catch((err) => {
//       console.log(err);
//       reject()
//     })
//   }))
// }
//
// //查询抢购产品详情
// export const loadWebTicketProInfo = ({state}, id) => {
//   return new Promise(((resolve, reject) => {
//     resPost('GetWebTicketProInfo', {pk_id: id}, false).then(res => {
//       resolve(res.data[0])
//     }).catch((err) => {
//       console.log(err);
//       reject()
//     })
//   }))
// }
//
// //查询产品留言列表
// export const loadCommentList = ({state}, params) => {
//   return new Promise(((resolve, reject) => {
//     resPost('GetCommentList', params, false).then(res => {
//       if (res.data && res.data.length > 0) {
//         resolve(res)
//       } else {
//         reject()
//       }
//     }).catch((err) => {
//       console.log(err);
//       reject()
//     })
//   }))
// }
// // //获取用户余额
// // export const loadUserCount = ({state, commit}) => {
// //   return new Promise((resolve, reject) => {
// //     resPost('GetUsersCount').then(res => {
// //       commit('publicState', {key: 'userCount', value: res.data[0]})
// //     })
// //   })
// // }
//
// //获取支付参数
// export const GetCreateOrderPay = ({state, commit}, params) => {
//   return new Promise((resolve, reject) => {
//     params = {
//       openid: state.userInfo.openid,
//       appid: state.businessInfo.appid,
//       mchid: state.businessInfo.mchid,
//       payment_key: state.businessInfo.payment_key,
//       ...params
//     }
//     resPost('GetCreateOrderPay', params).then(res => {
//       resolve(res)
//     }).catch((res) => {
//       reject()
//     })
//   })
// }
//
// //获取微信JS-SDK配置参数
// export const GetJsSdkParams = ({state}, link) => {
//   return new Promise((resolve, reject) => {
//     let params = {
//       appid: state.businessInfo.appid,
//       secret: state.businessInfo.secret,
//       mchid: state.businessInfo.mchid,
//       link
//     }
//     resPost('GetSharedEncryption', params).then(res => {
//       if (res.data && res.data.length > 0) {
//         resolve(res.data[0])
//       } else {
//         reject()
//       }
//     }).catch((res) => {
//       reject()
//     })
//   })
// }
