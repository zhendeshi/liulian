<template>
  <div class="page-wrap">
    <div class="navbox">
      <nav-tab :navList="navList" :navIndex="navIndex" @fchangeNav="changeNav"></nav-tab>
    </div>
    <div class="listbox">
      <van-list
        v-model="loading"
        :finished="!loadMore"
        finished-text="暂无更多订单"
        :offset="0"
        :immediate-check="true"
        @load="getListMore"
      >
        <order-item v-for="(item,index) in list" :odata="item" :key="index" @btnAction="btnAction"></order-item>
      </van-list>
    </div>
    <van-popup v-model="PopPayType" position="bottom">
      <van-picker
        show-toolbar
        :columns="payType"
        @cancel="PopPayType = false"
        @confirm="selPayType"
        title="选择付款方式"
      />
    </van-popup>
  </div>
</template>

<script>
import navTab from "../../../components/navTab";
import orderItem from "../components/order/orderItem";

export default {
  name: "myorder",
  components: { navTab, orderItem },
  data() {
    return {
      navList: [
        { title: "全部" },
        { title: "待付款" },
        { title: "待收货" },
        { title: "待评价" },
        { title: "已完成" },
        { title: "售后" }
      ],
      navIndex: 0,
      orderId: null,
      parm: {},
      type: "",

      PopPayType: false,
      payType: ["余额支付", "支付宝支付", "微信支付"],

      list: [],
      loading: false,
      loadMore: true,
      page: 2
    };
  },
  mounted() {
    this.navIndex = this.$route.query.status || 0;
    this.type = this.$route.query.type;
    if (this.$route.query.type != 2) {
      //普通订单或者秒杀订单
      this.parm.status = 0;
    } else {
      // type==2 拼团订单
      this.parm.group_status = 0;
      this.parm.status = 0;
      this.navList = [
        { title: "全部", group_status: 0, status: 0 }, // group_status=0  status 0
        { title: "待付款", group_status: 0, status: 1 }, // group_status=0  status 1
        { title: "待成团", group_status: 1, status: 2 }, // group_status=1  status 2
        { title: "待收货", group_status: 2, status: 2 }, // group_status=2  status 2
        { title: "拼团失败", group_status: 3, status: 0 }, // group_status=3  status 0
        { title: "售后", group_status: 0, status: 5 } // group_status=0  status 5
      ];
    }
    this.initPage();
  },
  methods: {
    changeNav(index) {
      this.list = [];
      this.navIndex = index;
      if (this.type != 2) {
        this.parm.status = index;
      } else {
        this.parm.group_status = this.navList[index].group_status;
        this.parm.status = this.navList[index].status;
      }
      this.loading = false;
      this.loadMore = true;
      this.$toast.loading("正在加载");
      this.$post("order/getList", {
        type: this.type,
        page: 1,
        pnum: 10,
        ...this.parm
      })
        .then(res => {
          this.list = res.data;
          this.$toast.clear();
        })
        .catch(res => {
          this.$toast.clear();
        });
    },
    initPage() {
      this.$nextTick(() => {
        this.$toast.loading("正在加载");
        return this.$post("order/getList", {
          type: this.type,
          page: 1,
          pnum: 10,
          ...this.parm
        })
          .then(res => {
            this.list = res.data;
            this.$toast.clear();
          })
          .catch(res => {
            this.$toast.clear();
          });
      });
    },
    getListMore() {
      if (this.loadMore) {
        return this.$post("order/getList", {
          type: this.type,
          page: this.page,
          pnum: 10,
          ...this.parm
        })
          .then(res => {
            if (res.data && res.data.length > 0) {
              this.list = this.list.concat(res.data);
              this.page++;
            } else {
              this.loadMore = false;
            }
            this.loading = false;
          })
          .catch(res => {
            this.loadMore = false;
            this.loading = false;
          });
      }
    },
    btnAction(type, id) {
      // 1 取消订单 2 去支付 3 去售后 4确认收货
      this.orderId = id;
      switch (type) {
        case 1:
          this.cancelOrder(id);
          break;
        case 2:
          this.PopPayType = true;
          break;
        case 3:
          this.$router.push({ path: "/goodsApplySH", query: { oid: id } });
          break;
        case 4:
          this.receiptOrder(id);
          break;
        case 5: //删除订单
          this.delOrder(id);
          break;
      }
    },
    //删除订单
    delOrder(id) {
      this.$dialog
        .confirm({
          message: "确认删除此订单吗?"
        })
        .then(() => {
          this.$post("order/delete", { id: id })
            .then(res => {
              this.$toast.loading("订单已删除");
              this.initPage();
            })
            .catch(res => {
              this.$toast(res.msg);
            });
        })
        .catch(() => {});
    },
    //确认收货
    receiptOrder(id) {
      this.$dialog
        .confirm({
          message: "此订单确认到货吗?"
        })
        .then(() => {
          this.$post("order/receipt", { id: id })
            .then(res => {
              this.$toast.loading("收货成功");
              this.initPage();
            })
            .catch(res => {
              this.$toast(res.msg);
            });
        })
        .catch(() => {});
    },
    //取消订单
    cancelOrder(id) {
      this.$dialog
        .confirm({
          message: "确定取消此订单吗?"
        })
        .then(() => {
          this.$post("order/cancel", { id: id })
            .then(res => {
              this.$toast.loading("取消成功");
              this.initPage();
            })
            .catch(res => {
              this.$toast(res.msg);
            });
        })
        .catch(() => {});
    },
    //选择付款方式
    selPayType(val, index) {
      this.PopPayType = false;
      this.goPay(index);
      console.log(index);
    },
    goPay(index) {
      this.$post("order/setPay", { order_id: this.orderId, type: index + 1 })
        .then(res => {
          if (index == 2) {
            window.location.href = res.data.url;
          } else {
            this.$toast.loading("支付成功,正在加载");
          }
          this.$router.go(0);
        })
        .catch(res => {
          if (index == 1) {
            window.location.href = `http://liulian.kailly.com/api/order/setPay?order_id=${this.orderId}&type=2`;
          }
          console.log(res);
          this.$toast(res.msg);
        });
    }
  }
};
</script>

<style scoped lang="less">
/deep/ .van-picker__title {
  display: flex;
  align-items: center;
}

/deep/ .van-picker-column__item {
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbox {
  position: fixed;
  width: 100%;
  background: #ffffff;
  z-index: 999;
  display: flex;
  justify-content: center;
}

.listbox {
  padding-top: 56px;
}
</style>
