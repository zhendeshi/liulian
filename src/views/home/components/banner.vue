<template>
    <div class="wrap">
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item, index) in banner" :key="index">
                <div class="imgbox">
                    <van-image v-if="item.pic" :src="$formatImg(item.pic)" width="100%" radius="8" height="100%" fit="cover">

                    </van-image>
                </div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
    export default {
        name: "banner",
      props: ['banner'],
        data() {
            return {}
        },
    }
</script>

<style scoped lang="less">
    .wrap {
        width: 351px;
        height: 140px;
        border-radius: 8px;
        margin: 0 auto;
        overflow: hidden;

        .imgbox {
            width: 351px;
            height: 140px;
        }
    }
</style>
