<template>
  <span class="wIcon-dianzan mr-10":class="like?'yet':''"   @click="clilike"></span>
</template>

<script>
  export default {
    name: "Glike",
    props: ['is_like', 'type', 'id'],
    data() {
      return {
        like: false,
      }
    },
    watch: {
      is_like: {//深度监听，可监听到对象、数组的变化
        handler(val) {
          if (val == 2) {
            this.like = true
          } else {
            this.like = false
          }
        },
        immediate: true
      }
    },
    methods: {
      clilike() {
        if (!this.$checkUser()) {
          this.$toast('请先登录')
        } else {
          this.$post('common/addLike', {type: this.type, id: this.id}).then(res => {
            if (!this.like) {
              this.$toast('已点赞')
            }
            this.like = !this.like
            this.$emit('clilike', this.like)
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
