let loginUrls = [
  {
    path: "/login",
    name: "login",
    meta: {title: '登录', keepAlive: false, tab: false},
    component: () => import("../views/login/index.vue")
  },
  {
    path: "/registe",
    name: "registe",
    meta: {title: '注册', keepAlive: false, tab: false},
    component: () => import("../views/login/page/registe.vue")
  },
  {
    path: "/changePsd",
    name: "changePsd",
    meta: {title: '修改密码', keepAlive: false, tab: false},
    component: () => import("../views/login/page/changePsd.vue")
  },
  {
    path: "/hobby",
    name: "hobby",
    meta: {title: '爱好选择', keepAlive: false, tab: false},
    component: () => import("../views/login/page/hobby.vue")
  }


]
export default loginUrls
