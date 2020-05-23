<template>
  <div class="wIconbox" @click="$linkTo('/message')">
    <div class="wIcon-xinxi" :class="num>0?'yet':''"></div>
  </div>
</template>

<script>
  export default {
    name: "remind",
    data() {
      return {
        num: 0
      }
    },
    created() {
      this.initPage()
    },
    methods: {
      initPage(){
        this.$post('notice/index').then(res => {
          for (let  i in res.data)
          {
            this.num+=res.data[i]
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
