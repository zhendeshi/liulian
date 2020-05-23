let communityUrls = [
  {
    path: "/community",
    name: "community",
    meta: {title: '社区', tab: true},
    component: () => import("../views/community/index.vue"),
    children: [
      {
        path: "/communityDongtai",
        name: "communityDongtai",
        meta: {title: '社区-动态', tab: true},
        component: () => import("../views/community/page/indexDongtai.vue"),
      },
      {
        path: "/communityGuanzhu",
        name: "communityGuanzhu",
        meta: {title: '社区-关注', tab: true},
        component: () => import("../views/community/page/indexGuanzhu.vue"),
      }
    ]
  },
  {
    path: "/nearby",
    name: "nearby",
    meta: {title: '附近', tab: false},
    component: () => import("../views/community/page/nearby.vue"),

  },
  {
    path: "/circlePage",
    name: "circlePage",
    meta: {title: '圈子', tab: false},
    component: () => import("../views/community/page/circlePage.vue"),
  },
  {
    path: "/talentPage",
    name: "talentPage",
    meta: {title: '达人列表', tab: false},
    component: () => import("../views/community/page/talentPage.vue"),
  },
  {
    path: "/postNews",
    name: "postNews",
    meta: {title: '发布动态', tab: false,},
    component: () => import("../views/community/page/postNews.vue"),
  },
  {
    path: "/alldynamic",
    name: "alldynamic",
    meta: {title: '全部动态', tab: false,},
    component: () => import("../views/community/page/alldynamic.vue"),
  },
  {
    path: "/postNewsTopic",
    name: "postNewsTopic",
    meta: {title: '添加话题', tab: false,keepAlive: true},
    component: () => import("../views/community/page/postNewsTopic.vue"),
  },
  {
    path: "/postNewsCircle",
    name: "postNewsCircle",
    meta: {title: '添加圈子', tab: false,keepAlive: true},
    component: () => import("../views/community/page/postNewsCirCle.vue"),
  }, {
    path: "/forum",
    name: "forum",
    meta: {title: '论坛', tab: false,keepAlive: true},
    component: () => import("../views/community/page/forum.vue"),
  }, {
    path: "/selMap",
    name: "selMap",
    meta: {title: '选择位置', tab: false,keepAlive: true},
    component: () => import("../components/selMap"),
  },


]
export default communityUrls
