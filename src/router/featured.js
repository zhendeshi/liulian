let featuredUrls = [
  {
    path: "/featured",
    name: "featured",
    meta: {title: '精选', tab: true},
    component: () => import("../views/featured/index.vue")
  },
  {
    path: "/featured_PTgoodsList",
    name: "featured_PTgoodsList",
    meta: {title: '拼团商品列表', tab: false},
    component: () => import("../views/featured/page/PinTuanGoodsList.vue")
  },
  {
    path: "/featured_gitGoodsList",
    name: "featured_gitGoodsList",
    meta: {title: '礼包列表', tab: false},
    component: () => import("../views/featured/page/gitGoodsList.vue")
  },
  {
    path: "/featured_YshouGoodsList",
    name: "featured_YshouGoodsList",
    meta: {title: '预售商品列表', tab: false},
    component: () => import("../views/featured/page/YshouGoodsList.vue")
  },
  {
    path: "/featured_Spike",
    name: "featured_Spike",
    meta: {title: '秒杀', tab: false},
    component: () => import("../views/featured/page/Spike.vue")
  },
  {
    path: "/dynamic",
    name: "dynamic",
    meta: {title: '动态', tab: false},
    component: () => import("../views/mine/page/Favorite/dynamic.vue"),
  },


]
export default featuredUrls
