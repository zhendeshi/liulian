<template>
    <div class="statusbox">
        <div class="flex-e"> <!--odata.group_status==0 不是拼团订单 -->
            <span class="f-44" v-if="odata.group_status==0">{{status[odata.status-1]}}</span>
            <span class="f-44" v-else>{{gstatus[odata.group_status-1]}}</span>
            <span class="f-28 flex-c" v-if="odata.end_time&&odata.status==1&&odata.group_status==0">
              （剩余：
              <van-count-down :time="odata.end_time*1000"  @finish="finish">
                <template v-slot="timeData">
                  <span class="c-ff">{{ timeData.minutes }}</span><span class="c-ff">:</span><span class="c-ff">{{ timeData.seconds }}</span>

                </template>
              </van-count-down>
              ）
            </span>
            <span class="f-28 flex-c" v-if="odata.group_status==1">
              （剩余：
              <van-count-down :time="odata.group_end_time*1000">
                <template v-slot="timeData">
                  <span class="c-ff">{{ timeData.minutes }}</span><span class="c-ff">:</span><span class="c-ff">{{ timeData.seconds }}</span>
                </template>
              </van-count-down>
              ）
            </span>
        </div>
        <template v-if="odata.group_status==0">
            <div class="c-ff mt-20" v-if="odata.status==1">30分钟内未付款，订单将自动取消</div>
            <div class="c-ff mt-20" v-if="odata.status==2">等待卖家发货</div>
            <div class="c-ff mt-20" v-if="odata.status==3">30分钟内未付款，订单将自动取消</div>
            <div class="c-ff mt-20" v-if="odata.status==6">系统正在审核中，感谢您的耐心等待</div>
            <div class="c-ff mt-20" v-if="odata.status==8">失败原因:{{odata.after.error_msg}}</div>
        </template>
        <template v-else>
            <div class="c-ff mt-20" v-if="odata.group_status==1">好友拼单 · 人满发货 · 人不满退款</div>
            <div class="c-ff mt-20" v-if="odata.group_status==2">拼团成功，等待商家发货</div>
            <div class="c-ff mt-20" v-if="odata.group_status==3">拼团超时，暂无好友参团，请重新开团</div>
        </template>

    </div>
</template>

<script>
    export default {
        name: "headerStatus",
        props: ['odata', 'groupUser'],
        data() {
            return {
                status: ['待支付', '待发货', '待收货', '待评价', '已完成', '售后中', '售后成功', '售后失败', '已取消'],
                gstatus: ['待成团', '已成团,待发货', '拼团失败'],
            };
        },
        methods:{
          finish(){
            this.$emit('finishOrder')
          }
        }

    }
</script>

<style scoped lang="less">
    .statusbox {
        background-image: url("../../../../assets/images/mine/headerbg3.png");
        background-size: 100%;
        width: 375px;
        height: 165px;
        padding: 40px 12px 0;
        color: #ffffff;
    }
</style>
