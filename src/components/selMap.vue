<template>
  <iframe id="mapPage" width="100%" height="100%" frameborder=0 
          src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=4XMBZ-PEMKX-YUR4H-TJTGE-FSRWK-Q2BVJ&referer=myapp">
  </iframe>
  <!-- <div></div> -->
</template>

<script>
  export default {
    name: "selMap",
    mounted() {
      console.log('res')
      this.map()
    },
    methods: {
      map() {
        let _this = this
        window.addEventListener('message', function (event) {
          // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
          var loc = event.data;
          if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
            _this.$emit('global:selAddr', {loc});
            setTimeout(function () {
              _this.$toast.clear()
              _this.$router.push('/postNews');

            }, 500);
          }
        }, false);
      }
    }
  }
</script>

<style scoped lang="less">
  iframe {
    height: 100%;
  }
</style>
