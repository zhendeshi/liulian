let mineUrls = [
  {
    path: "/mine",
    name: "mine",
    meta: {title: '我的', tab: true,keepAlive: true},
    component: () => import("../views/mine/index.vue")
  },
  {
    path: "/Homepage",
    name: "Homepage",
    meta: {title: '个人主页', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/Homepage.vue")
  },
  {
    path: "/fan",
    name: "fan",
    meta: {title: '粉丝', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/Fan.vue")
  },
  {
    path: "/attention",
    name: "attention",
    meta: {title: '关注', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/attention.vue")
  },
  {
    path: "/favorite",
    name: "favorite",
    meta: {title: '收藏', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/favorite.vue"),
    children: [
      {
        path: "/favorite_dynamic",
        name: "favorite_dynamic",
        meta: {title: '收藏-动态', tab: false, keepAlive: true},
        component: () => import("../views/mine/page/Favorite/dynamic.vue"),
      },
      {
        path: "/favorite_news",
        name: "favorite_news",
        meta: {title: '收藏-资讯', tab: false, keepAlive: true},
        component: () => import("../views/mine/page/Favorite/news.vue"),
      }, {
        path: "/favorite_topic",
        name: "favorite_topic",
        meta: {title: '收藏-话题', tab: false, keepAlive: true},
        component: () => import("../views/mine/page/Favorite/topic.vue"),
      }, {
        path: "/favorite_QandA",
        name: "favorite_QandA",
        meta: {title: '收藏-问答', tab: false, keepAlive: true},
        component: () => import("../views/mine/page/Favorite/QandA.vue"),
      }, {
        path: "/favorite_article",
        name: "favorite_article",
        meta: {title: '收藏-帖子', tab: false,keepAlive: true},
        component: () => import("../views/mine/page/Favorite/article.vue"),
      },
    ]
  },
  {
    path: "/mine_order",
    name: "mine_order",
    meta: {title: '我的订单', tab: false, keepAlive: true},
    component: () => import("../views/mine/page/myorder.vue")
  },
  {
    path: "/mine_order_point",
    name: "mine_order_point",
    meta: {title: '我的订单-金币订单', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/myorderJb.vue")
  },
  {
    path: "/mine_order_pt",
    name: "mine_order_pt",
    meta: {title: '我的订单-拼团订单', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/myorderPt.vue")
  },
  {
    path: "/mine_order_ms",
    name: "mine_order_ms",
    meta: {title: '我的订单-秒杀订单', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/myorderMs.vue")
  }, {
    path: "/mine_order_desc",
    name: "mine_order_desc",
    meta: {title: '订单详情', tab: false, keepAlive: true},
    component: () => import("../views/mine/page/myorder_desc.vue")
  }, {
    path: "/mine_order_descjb",
    name: "mine_order_descjb",
    meta: {title: '金币订单详情', tab: false, keepAlive: true},
    component: () => import("../views/mine/page/myorder_descJb.vue")
  }, {
    path: "/delivery",
    name: "delivery",
    meta: {title: '查看物流', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/delivery.vue")
  }, {
    path: "/goodsReview",
    name: "goodsReview",
    meta: {title: '商品评价', tab: false, keepAlive: true},
    component: () => import("../views/mine/page/goodsReview.vue")
  }, {
    path: "/goodsApplySH",
    name: "goodsApplySH",
    meta: {title: '申请售后', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/goodsApplySH.vue")
  }, {
    path: "/myPurse",
    name: "myPurse",
    meta: {title: '我的钱包', tab: false, keepAlive: true},
    component: () => import("../views/mine/page/myPurse.vue")
  }, {
    path: "/mypoint",
    name: "mypoint",
    meta: {title: '我的金币', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/mypoint.vue")
  }, {
    path: "/takeCash",
    name: "takeCash",
    meta: {title: '红包提现', tab: false, keepAlive: true},
    component: () => import("../views/mine/page/takeCash.vue")
  }, {
    path: "/coupon",
    name: "coupon",
    meta: {title: '优惠券', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/coupon.vue")
  }, {
    path: "/goodsCollect",
    name: "goodsCollect",
    meta: {title: '商品收藏', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/goodsCollect.vue")
  }, {
    path: "/goldDetails",
    name: "goldDetails",
    meta: {title: '金币明细', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/goldDetails.vue")
  }, {
    path: "/vipRight",
    name: "vipRight",
    meta: {title: '会员权益', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/vipRight.vue")
  }, {
    path: "/vipCenter",
    name: "vipCenter",
    meta: {title: '会员中心', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/vipCenter.vue")
  }, {
    path: "/myTeam",
    name: "myTeam",
    meta: {title: '我的团队', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/myTeam.vue")
  }, {
    path: "/brokerageDetail",
    name: "brokerageDetail",
    meta: {title: '分销明细', tab: false,keepAlive: true},
    component: () => import("../views/mine/page/brokerageDetail.vue")
  }, {
    path: "/InvitaCode",
    name: "InvitaCode",
    meta: {title: '邀请码', tab: false, keepAlive: true},
    component: () => import("../views/mine/page/InvitaCode.vue")
  }, {
    path: "/college",
    name: "college",
    meta: {title: '学院', tab: false, keepAlive: true},
    component: () => import("../views/mine/page/college.vue")
  }, {
    path: "/collegeDesc",
    name: "collegeDesc",
    meta: {title: '详情', tab: false, keepAlive: true},
    component: () => import("../views/mine/page/collegeDesc.vue")
  }, {
    path: "/guide",
    name: "guide",
    meta: {title: '分销指南', tab: false, keepAlive: true},
    component: () => import("../views/mine/page/guide.vue")
  }, {
    path: "/setUp",
    name: "setUp",
    meta: {title: '设置', tab: false, keepAlive: true},
    component: () => import("../views/mine/page/setUp.vue")
  }, {
    path: "/sign",
    name: "sign",
    meta: {title: '签到', tab: false, keepAlive: true},
    component: () => import("../views/mine/page/sign.vue")
  },
]
export default mineUrls
