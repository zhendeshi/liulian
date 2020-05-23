<template>
  <div class="wrap" :class="[dayStydy?'dayStydy':'nightStydy']">
    <div class="flex-sb flex-e">
      <div class="tit">{{title}}</div>
      <div class="other">
        <slot></slot>
      </div>
      <div class="more flex-c" @click="$linkTo(path)">
        更多<span class="iconfont">&#xe62d;</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "cellTitle",
    props: {
      title: {
        type: String,
        default: '标题'
      },
      path: {
        type: String,
        default: '/liulian'
      }
    },
    computed: {
      ...mapState(['dayStydy'])
    },
  }
</script>

<style scoped lang="less">
  .wrap {
    padding: 0 12px;

    .tit {
      font-size: 16px;
      font-weight: bold;
    }

    .more {
      font-size: 12px;
      color: #999999;
      height: 12px;
      line-height: 12px;
    }

    .other {
      flex: 1;
    }
  }

  .dayStydy {
    color: #333333;
  }

  .nightStydy {
    color: #ffffff;
  }
</style>
