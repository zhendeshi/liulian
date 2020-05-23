<template>
  <div class="page-wrap">
    <header-status :odata="odata" :groupUser="groupUser" @finishOrder="finishOrder"></header-status>
    <div class="mainbox">
      <coterie
        :odata="odata"
        :groupUser="groupUser"
        v-if="odata.group_status&&odata.group_status!=0"
      ></coterie>
      <addr :odata="odata"></addr>
      <goods-msg :odata="odata"></goods-msg>
      <information :odata="odata"></information>
      <after v-if="odata.after" :odata="odata"></after>
    </div>
    <v-footer :odata="odata" @btnAction="btnAction" v-if="odata.status!=6"></v-footer>
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
import headerStatus from "../components/orderDesc/headerStatus";
import addr from "../components/orderDesc/addr";
import goodsMsg from "../components/orderDesc/goodsMsg";
import information from "../components/orderDesc/information";
import after from "../components/orderDesc/after";
import coterie from "../components/orderDesc/coterie";
import vFooter from "../components/orderDesc/vFooter";

export default {
  name: "myorder_desc",
  components: {
    headerStatus,
    addr,
    goodsMsg,
    information,
    vFooter,
    coterie,
    after
  },
  beforeMount() {
    let that = this;
   
  },
  data() {
    return {
      oid: "", //订单id
      odata: {},
      PointGoods: false,
      groupUser: "",
      PopPayType: false,
      payType: ["余额支付", "支付宝支付", "微信支付"],
      iFdialog: false
    };
  },
  created() {
    this.oid = this.$route.query.oid;
    this.initPage();
    console.log( typeof localStorage.getItem("iFdialog"))
    if (localStorage.getItem("iFdialog") == 1){
      this.$dialog
        .confirm({
          title: "提示",
          message: "请确认支付是否完成",
          confirmButtonText: "已支付",
          cancelButtonText: "重新支付"
        })
        .then(
          res => {
            this.initPage()
        localStorage.setItem("iFdialog", 0);

          },
          () => {
        localStorage.setItem("iFdialog", 0);

          }
        );

    }else {
        localStorage.setItem("iFdialog", 0);
    }
  },
  methods: {
    initPage() {
      this.$nextTick(() => {
        this.$toast.loading("正在加载");
        this.$post("order/getListInfo", { oid: this.oid })
          .then(res => {
            //商品信息
            this.odata = res.data;
            if (res.data.group_status > 0) {
              //拼团订单详情
              this.getGroupUser();
            } else {
              this.$toast.clear();
            }
          })
          .catch(res => {
            this.$toast.clear();
          });
      });
    },
    //订单付款倒计时结束
    finishOrder() {
      this.initPage();
    },
    //获取拼团人数
    getGroupUser() {
      this.$post("order/group_user", { order_id: this.oid })
        .then(res => {
          //商品信息
          this.groupUser = res.data;
          this.$toast.clear();
        })
        .catch(res => {
          this.$toast.clear();
        });
    },
    btnAction(type, id) {
      switch (type) {
        case 99: // 去支付
          this.PopPayType = true;
          break;
        case 1: // 取消订单
          this.cancelOrder(id);
          break;
        case 3: //申请售后
          this.$router.push({ path: "/goodsApplySH", query: { oid: id } });
          break;
        case 4: //4确认收货
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
      console.log("re");
    },
    // 支付
    goPay(index) {
      this.$post("order/setPay", { order_id: this.oid, type: index + 1 })
        .then(res => {
          if (index == 2) {
            localStorage.setItem("iFdialog", 1);
            window.location.href = res.data.url;
          } else {
            this.$toast.loading("支付成功,正在加载");
          }
          this.$router.go(0);
        })
        .catch(res => {
          if (index == 1) {
            localStorage.setItem("iFdialog", 1);
            window.location.href = `http://liulian.kailly.com/api/order/setPay?order_id=${this.oid}&type=2`;
          }
          this.$toast(res.msg);
        });
    }
  }
};
</script>

<style scoped lang="less">
.mainbox {
  position: relative;
  margin-top: -53px;
  z-index: 99;
  padding-bottom: 50px;
}

/deep/ .van-picker__title {
  display: flex;
  align-items: center;
}

/deep/ .van-picker-column__item {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
