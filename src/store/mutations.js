//设置白天黑夜
export const setDayStydy = (state, data) => {
  state.dayStydy = data
}
//控制tabBar的显隐
export const setTabBarVisible = (state, data) => {
  state.tabBarVisible = data
}
//控制tabBar的index
export const setTabBarIndex = (state, data) => {
  state.tabBarIndex = data
}
//设置用户信息
export const setUserInfo = (state, data) => {
  state.UserInfo = data
  localStorage.setItem('token',data.token)
}
//设置用户收货地址
export const setUserAddress = (state, data) => {
  state.dataAddress = data
}
//设置用户订单信息
export const setUserOrder = (state, data) => {
  state.UserOrder = data
}
//设置用户收货地址Id
export const setUserAddressID = (state, data) => {
  state.UserAddrId = data
}
//设置用户订单Id
export const setUserOrderID = (state, data) => {
  state.UserOrderID = data
}

//设置历史搜索
export const sethistory = (state, data) => {
  state.historyList = data
}
