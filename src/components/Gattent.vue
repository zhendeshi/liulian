<template>
  <div class="g-followBtn mt-15" :class="sattent?'yet':''" @click.stop="cliAttent"></div>
</template>

<script>
  export default {
    name: "Gattent",
    props: ['attent', 'type', 'model_id'],
    data() {
      return {
        sattent: false
      }
    },
    watch: {
      attent: {//深度监听，可监听到对象、数组的变化
        handler(val) {
          if (val == 2) {
            this.sattent = true
          } else {
            this.sattent = false
          }
        },
        immediate: true
      }
    },
    methods: {
      cliAttent() {
        if (!this.$checkUser()) {
          this.$toast('请先登录')
        } else {
          this.$post('common/attent', {type: this.type, model_id: this.model_id}).then(res => {
            if (!this.sattent) {
              this.$toast('已关注')
            }
            this.sattent = !this.sattent
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
