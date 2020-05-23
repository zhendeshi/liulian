let homeUrls = [
  {
    path: "/auth",
    name: "auth",
    meta: {title: '授权中···', keepAlive: true},
    component: () => import("../views/home/auth.vue")
  },
  {
    path: "/liulian",
    name: "liulian",
    meta: {title: '首页', tab: true},
    component: () => import("../views/home/index.vue")
  },
  {
    path: "/search",
    name: "search",
    meta: {title: '搜索', tab: false,keepAlive: true},
    component: () => import("../views/home/search/index.vue")
  },
  {
    path: "/message",
    name: "message",
    meta: {title: '信息', tab: false,keepAlive: true},
    component: () => import("../views/home/message/index.vue")
  },
  {
    path: "/letter",
    name: "letter",
    meta: {title: '私信', tab: false,keepAlive: true},
    component: () => import("../views/home/message/letter.vue")
  },
  {
    path: "/content",
    name: "content",
    meta: {title: '私信內容', tab: false,keepAlive: true},
    component: () => import("../views/home/message/content.vue")
  },
  {
    path: "/dianzan",
    name: "dianzan",
    meta: {title: '点赞', tab: false},
    component: () => import("../views/home/message/dianzan.vue")
  },
  {
    path: "/comment",
    name: "comment",
    meta: {title: '评论', tab: false},
    component: () => import("../views/home/message/comment.vue")
  },
  {
    path: "/notice",
    name: "notice",
    meta: {title: '通知详情', tab: false},
    component: () => import("../views/home/message/notice.vue")
  },
  {
    path: "/noticeList",
    name: "noticeList",
    meta: {title: '通知列表', tab: false},
    component: () => import("../views/home/message/noticeList.vue")
  },
  {
    path: "/active",
    name: "active",
    meta: {title: '精彩活动', tab: false},
    component: () => import("../views/home/active/index.vue")
  },
  {
    path: "/recommedList",
    name: "recommedList",
    meta: {title: '商品列表', tab: false}, //首页的底部的精选 更多
    component: () => import("../views/home/page/recommedList.vue")
  },
  {
    path: "/allGoods",
    name: "allGoods",
    meta: {title: '商品列表', tab: false,keepAlive: true}, //所有商品
    component: () => import("../views/home/page/allGoods.vue")
  },
  {
    path: "/youXuanList",
    name: "youXuanList",
    meta: {title: '商品列表', tab: false}, //首页的优选推荐 更多
    component: () => import("../views/home/page/youXuanList.vue")
  },
  {
    path: "/activeDesc",
    name: "activeDesc",
    meta: {title: '活动详情', tab: false,keepAlive: true},
    component: () => import("../views/home/active/activeDesc.vue")
  },
  {
    path: "/activeBaom",
    name: "activeBaom",
    meta: {title: '活动报名', tab: false,keepAlive: true},
    component: () => import("../views/home/active/activeBaom.vue")
  },
  {
    path: "/goodsDesc",
    name: "goodsDesc",
    meta: {title: '商品详情', tab: false, keepAlive: true},
    component: () => import("../views/goods/page/goodsDesc.vue")
  },
  {
    path: "/goodsComment",
    name: "goodsComment",
    meta: {title: '评论列表', tab: false,keepAlive: true},
    component: () => import("../views/goods/page/comment.vue")
  },
  {
    path: "/sureOrder",
    name: "sureOrder",
    meta: {title: '确认订单', tab: false,keepAlive: true},
    component: () => import("../views/goods/page/sureOrder.vue")
  },
  {
    path: "/addrList",
    name: "addrList",
    meta: {title: '收货地址', tab: false,keepAlive: true},
    component: () => import("../views/goods/page/addrList.vue")
  },
  {
    path: "/cart",
    name: "cart",
    meta: {title: '购物车', tab: false, keepAlive: true},
    component: () => import("../views/goods/page/cart.vue")
  },
]
export default homeUrls
