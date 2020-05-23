<template>
  <div class="nav">
    <div :class="['item',navIndex == index ? 'active' : '']" v-for="(item,index) in navList" :key="index"
         @click="changeNav(index)">
      {{item.title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "navTab",
    props: ['navList', 'navIndex'],
    data() {
      return {}
    },
    methods: {
      changeNav: function (index) {
        this.$emit('fchangeNav', index)
      }
    }

  }
</script>

<style scoped lang="less">
  ::-webkit-scrollbar {
    display: none;
  }

  .nav {
    background: #ffffff;
    height: 42px;
    font-size: 16px;
    color: #666666;
    padding-top: 10px;
    overflow-y: hidden;
    overflow-x: scroll;
    white-space: nowrap;

    .item {
      display: inline-block;
      margin: 0 12px;
      padding: 5px 0 0;
      position: relative;
    }

    .active {
      color: #FFB400;
    }

    .active:before {
      position: absolute;
      content: '';
      height: 2px;
      background: rgba(255, 180, 0, 1);
      border-radius: 1px;
      left: 0px;
      right: 0px;
      bottom: -11.5px;
    }
  }
</style>
