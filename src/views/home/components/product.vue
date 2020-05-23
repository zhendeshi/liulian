<template>
    <div class="wrap" :class="[dayStydy?'dayStydy':'nightStydy']">
        <div class="listbox flex-sb">
            <div class="item" v-for="(item,index) in product" :key="index"
                 @click="$linkTo('/goodsDesc',{type:type,id:item.id})">
                <div class="imgbox">
                    <van-image
                      width="100%"
                      height="100%"
                      :src="$formatImg(item.pic)"
                      fit="cover"
                    />
                </div>
                <div class="name two-row-hide">
                    {{item.title}}
                </div>
                <div class="numbox flex-sb">
                    <div class="f-24 c-ff2">￥<b class="f-36">{{$price(item.price)}}</b></div>
                    <span class="iconfont c-ffc">&#xe642;</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "product",
        props: ['product', 'type'],
        data() {
            return {}
        },
        computed: {
            ...mapState(['dayStydy'])
        },
        methods: {}
    }

</script>

<style scoped lang="less">
    .wrap {
        .listbox {
            flex-wrap: wrap;
            padding: 0 12px;

            .item {
                margin: 0 0 12.5px;
                width: 169px;
                overflow: hidden;
                border-radius: 8px;

                font-size: 0;
                padding: 0 0 19px;
                .imgbox{
                  width:169px;
                  height:169px;
                }
                .name {
                    width: 143px;
                    height: 38px;
                    font-size: 13px;
                    font-weight: 500;
                    color: rgba(51, 51, 51, 1);
                    line-height: 19px;
                    margin: 7px 10px;
                }

                .numbox {
                    padding: 0 10px;

                    b {
                        font-weight: 500;
                    }

                    .iconfont {
                        font-size: 20px;
                    }
                }
            }
        }

    }

    .dayStydy {
        .listbox {
            .item {
                box-shadow: 0px 0px 12px #eeeeee;
            }
        }
    }

    .nightStydy {
        .listbox {
            .item {
                background: rgba(37, 37, 39, 1);

                .name {
                    color: #ffffff;
                }
            }
        }
    }

</style>
