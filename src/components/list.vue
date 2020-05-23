<template>
    <div class="wrap">
        <div class="listbox">
            <div class="item flex-sb" v-for="(item,index) in list" :key="index"
                 @click="$linkTo('/goodsDesc',{type:type,id:item.id,integral:integral})">
                <div class="imgbox">
                    <van-image
                            width="100%"
                            height="100%"
                            :src="$formatImg(item.pic)"
                            fit="cover"
                            radius="8"
                    />
                </div>
                <div class="msg">
                    <div class="name two-row-hide">{{item.title}}</div>
                    <div class="desc one-row-hide">{{item.old_title}}</div>
                    <div v-if="discount" class="discount flex-c">
                        会员专享{{discount}}折
                    </div>
                    <div class="other f-24 flex-e">
                        <span class="f-36 c-ff2" v-if="integral"><span
                                class="fw-500 flex-c">{{$price(item.point)}} <span class="f-24">金币</span> </span></span>
                        <span class="f-36 c-ff2" v-else><label class="f-24">¥</label><span class="fw-500">{{$price(item.price)}}</span></span>
                        <span class="old"><span>¥ {{$price(item.old_price)}}</span></span>
                        <div class="btn g-btna flex-c" v-if="integral">立即兑换</div>
                        <div class="btn g-btna flex-c" v-else>立即购买</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "list",
        props: ['list', 'type', 'integral', 'discount'],//integral是否是积分商城
        data() {
            return {}
        },

    }
</script>

<style scoped lang="less">
    .listbox {
        .item {
            padding: 15px 12px;
            background: rgba(255, 255, 255, 1);
            border-radius: 8px;
            margin-bottom: 12px;
            height: 133px;
            .imgbox{
              width: 101px;
              height: 101px;
            }
            .msg {
                height: 101px;
                margin-left: 12.5px;
                flex: 1;
                position: relative;
                width: 214px;

                .discount {
                    display: inline-block;
                    height: 15px;
                    background: rgba(228, 203, 137, 1);
                    border-radius: 2px;
                    font-size: 10px;
                    font-weight: 500;
                    color: rgba(75, 65, 49, 1);
                    margin-top: 8px;
                    padding: 0 10px;
                }

                .name {
                    font-weight: bold;
                    font-size: 14px;
                    line-height: 20px;
                    margin: -3px 0 8.5px;
                }

                .desc {
                    font-size: 12px;
                    color: #999999;
                }

                .other {
                    position: absolute;
                    width: 100%;
                    bottom: 0;

                    .btn {
                        background: linear-gradient(90deg, rgba(255, 201, 52, 1), rgba(251, 177, 4, 1));
                    }

                    .old {
                        flex: 1;
                        margin-bottom: 2px;

                        span {
                            margin-left: 5px;
                            font-size: 12px;
                            position: relative;
                            color: #999999;
                        }
                    }

                    .old span:before {
                        content: '';
                        position: absolute;
                        height: 1px;
                        background: #999999;
                        width: 100%;
                        bottom: 5px
                    }
                }
            }
        }
    }
</style>
