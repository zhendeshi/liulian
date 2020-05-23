<template>
  <div class="search-wrap flex-c">
    <input type="text" :placeholder="placeholder">
  </div>
</template>

<script>
  export default {
    name: "search",
    props: ['placeholder']
  }
</script>

<style scoped lang="less">

  .search-wrap {
    width: 100%;
    height: 100%;
    background-size: 12px 12px;
    background-image: url('../assets/images/comm/search.png');
    background-repeat: no-repeat;
    background-position: 20px 14px;

    input {
      background-color: transparent;
      width: 100%;
      font-size: 14px;
      padding-left: 40px;
    }
  }
</style>
