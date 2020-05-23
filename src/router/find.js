let loginUrls = [
  {
    path: "/find",
    name: "find",
    meta: {title: '发现', tab: true},
    component: () => import("../views/find/index.vue")
  }, {
    path: "/news",
    name: "news",
    meta: {title: '资讯', tab: false},
    component: () => import("../views/find/page/news.vue")
  }, {
    path: "/newsDesc",
    name: "newsDesc",
    meta: {title: '资讯详情', tab: false, keepAlive: true,},
    component: () => import("../views/find/page/newsDesc.vue")
  }, {
    path: "/topic",
    name: "topic",
    meta: {title: '热门话题', tab: false,keepAlive: true,},
    component: () => import("../views/find/page/topic.vue")
  }, {
    path: "/topicDesc",
    name: "topicDesc",
    meta: {title: '话题详情', tab: false,keepAlive: true,},
    component: () => import("../views/find/page/topicDesc.vue")
  }, {
    path: "/circleDesc",
    name: "circleDesc",
    meta: {title: '圈子详情', tab: false,keepAlive: true,},
    component: () => import("../views/find/page/circleDesc.vue")
  }, {
    path: "/topicDescMore",
    name: "topicDescMore",
    meta: {title: '话题动态详情', tab: false,keepAlive: true,},
    component: () => import("../views/find/page/topicDescMore.vue")
  }, {
    path: "/circleDescMore",
    name: "circleDescMore",
    meta: {title: '圈子动态详情', tab: false,keepAlive: true,},
    component: () => import("../views/find/page/circleDescMore.vue")
  },
  {
    path: "/QandAdesc",
    name: "QandAdesc",
    meta: {title: '问答详情', tab: false,keepAlive: true,},
    component: () => import("../views/find/page/QandAdesc.vue")
  }, {
    path: "/QandA",
    name: "QandA",
    meta: {title: '问答', tab: false},
    component: () => import("../views/find/page/QandA.vue")
  },
  {
    path: "/test",
    name: "test",
    meta: {title: '测试', tab: false},
    component: () => import("../views/find/page/test.vue")
  },
  {
    path: "/testQuestion",
    name: "testQuestion",
    meta: {title: '测试-答题', tab: false},
    component: () => import("../views/find/page/testQuestion.vue")
  },
  {
    path: "/author",
    name: "author",
    meta: {title: '作者', tab: false, keepAlive: true},
    component: () => import("../views/find/page/author.vue")
  },
  {
    path: "/applyAuthor",
    name: "applyAuthor",
    meta: {title: '招募作者', tab: false},
    component: () => import("../views/find/page/applyAuthor.vue")
  },
  {
    path: "/applyAuthorInfo",
    name: "applyAuthorInfo",
    meta: {title: '申请作者', tab: false},
    component: () => import("../views/find/page/applyAuthorB.vue")
  },


]
export default loginUrls
