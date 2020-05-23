<template>
  <div class="flex-c">
    <span class="wIcon-shouCang mr-10" :class="keep?'yet':''" @click.stop="clikeep"></span>
    <span class="mt-5"> {{keep?'已收藏':'收藏'}}</span>
  </div>
</template>

<script>
  export default {
    name: "Gkeep",
    props: ['is_keep', 'type', 'id'],
    data() {
      return {
        keep: false,

      }
    },
    watch: {
      is_keep: {//深度监听，可监听到对象、数组的变化
        handler(val) {
          if (val == 2) {
            this.keep = true
          } else {
            this.keep = false
          }
        },
        immediate: true
      }
    },
    methods: {
      clikeep() {
        if (!this.$checkUser()) {
          this.$toast('请先登录')
        } else {
          this.$post('common/keep', {type: this.type, id: this.id}).then(res => {
            if (!this.keep) {
              this.$toast('已收藏')
            }
            this.keep = !this.keep
          }).catch((res) => {
            console.log(res);
          })
        }

      }
    }
  }
</script>

<style scoped>

</style>
