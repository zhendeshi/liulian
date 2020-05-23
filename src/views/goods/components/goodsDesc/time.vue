<template>
    <div class="wrap-time" :class="goodsType==2?'ys':'ms'">
        <div class="box">
            <div class="tit">{{goodsType==2?'距预售结束还有':'距活动结束还有'}}</div>
            <div class="bottom">
                <van-count-down :time="time*1000" class="flex-c">
                    <template v-slot="timeData">
                        <span>{{ timeData.days }}</span>天
                        <span class="item">{{ timeData.hours }}</span>时
                        <span class="item">{{ timeData.minutes }}</span>分
                        <span class="item">{{ timeData.seconds }}</span>秒
                    </template>
                </van-count-down>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "timeModel",
        props: ['time', 'goodsType'],
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less">
    .wrap-time {
        height: 44px;
        display: flex;
        justify-content: flex-end;

        .box {
            width: 125px;
            margin-right: 11px;
            color: #FFB400;
            text-align: center;

            .tit {
                margin: 7px 0 3px;
            }

            .flex-c {
                color: #FFB400;
                font-size: 11px;

                .item {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    background: #FFB600;
                    border-radius: 2px 2px 2px 2px;
                    color: #ffffff;
                    line-height: 16px;
                    font-size: 11px;
                    margin: 0 2.5px;
                }

            }
        }
    }

    .ms {
        background: url("../../../../assets/images/index/xsms.png");
        background-size: 100%;
    }

    .ys {
        background: url("../../../../assets/images/index/spys.png");
        background-size: 100%;
    }
</style>
