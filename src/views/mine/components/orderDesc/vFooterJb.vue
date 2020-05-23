<template>
  <div class="footerbox flex-tb">
    <div  class="step2 flex-fe fle1">
      <div class="g-btna g-btn" @click.stop="btnAction">确认收货</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "vFooter",
    props: ['odata',],
    methods:{
      btnAction(type,id){
        this.$emit("btnAction",type,id)
      },
    }
  }
</script>

<style scoped lang="less">
  .footerbox {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #ffffff;
    z-index: 999;

    .step1 {
      .fle1 {
        padding-left: 12px;
      }

      .btn {
        width: 150px;
        height: 50px;
        background: rgba(255, 74, 3, 1);
        font-size: 17px;
        font-weight: 800;
        color: rgba(255, 255, 255, 1);
      }
    }

    .g-btn {
      margin-right: 12px;
    }
  }
</style>
