<template>
  <div class="coterie-wpap">
    <div class="tit">
      {{num}}人在拼单，可直接参与
    </div>
    <div class="listbox">
      <div class="item flex-c" v-for="(item,index) in odata" :key="index">
        <div class="col1">
          <van-image width="100%" height="100%" fit="cover" radius="16"
                     :src="item.head_img?$formatImg(item.head_img):$formatImg('defaultHeader')"
          />
        </div>
        <div class="name">
          如果这是一场梦
        </div>
        <div class="col3">
          <div>还差<span class="c-fd0">{{item.set_num}}人</span>拼成</div>
          <div class="f-20 c-99 mt-10 time">剩余 <van-count-down :time="item.end_time*1000" format="HH:mm:ss" /></div>
        </div>
        <div class="g-btna ml-20 flex-c" @click="btnFight(item.order_id)">去拼单</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['num', 'odata'],
    name: "coterie",
    data() {
      return {}
    },
    methods: {
      btnFight(id){
        this.$emit("btnFight",id)
      }
    }
  }
</script>

<style scoped lang="less">
  .coterie-wpap {
    padding: 15px 12px;
    background: #ffffff;
    margin: 12px 0;

    .tit {
      font-size: 14px;
    }

    .item {
      padding: 15px 0 0;

    }

    .col1 {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    .name {
      flex: 1;
      padding: 0 5.5px;
    }

    .time{
      display: flex;
      align-items: center;
      *{
        font-size: 10px;
        color: #999999;
      }

    }
    /deep/.van-count-down{
      line-height: 1;
    }
  }

</style>
