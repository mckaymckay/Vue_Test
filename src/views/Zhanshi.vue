<template>
  <div class="zhanshi">
    <el-page-header @back="goBack" style="margin-bottom:10px"></el-page-header>
    <iframe id="inlineFrameExample"
        title="Inline Frame Example"
        src="/index_with_tree.html">
    </iframe>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>
<style lang='scss'>
  .zhanshi {
    padding: 10px;
  border-radius: 4px;
//   background-color: white;
  margin-bottom: 10px;
  margin-top: 60px;
  height: 660px;
}
iframe{
width: 100%;
height: 100%;
}
</style>
