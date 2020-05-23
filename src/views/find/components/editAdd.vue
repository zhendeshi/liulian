<template>
  <div class="editBox" @click="$linkTo('/postNews')"></div>
</template>

<script>
  export default {
    name: "editAdd",
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="less">
    .editBox{
      position: fixed;
      z-index: 999;
      right: 12px;
      bottom: 84px;
      width:55px;
      height:55px;
      background-image: url("../../../assets/images/comm/editAdd.png");
      background-size: 100%;
    }
</style>
