<template>
  <div class="tijiao">
    <el-page-header @back="goBack" style="margin-bottom:10px"></el-page-header>
    <div class="wai">
      <div class="kuang">您选择的 <span class="ziti">学段：普通初中、学科：语文、年度：2018年</span>，<span class="ziti">立项课题总数</span>为 <span class="ziti">69</span>。</div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    axios
      .get('http://127.0.0.1:5000/api/v1.0/kykt')
      .then(res => {
        if (res.data.code === '200') {
          console.log(res)
          this.tableData = res.data.data
          this.items = this.tableData[0]
          Object.keys(this.items).forEach(key => {
            console.log(key)
          })
        }
      })
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>
<style lang='scss'>
  .tijiao {
    padding: 10px;
  border-radius: 4px;
//   background-color: white;
  margin-bottom: 10px;
  margin-top: 60px;
  height: 660px;
}
.wai{
    background-color: white;
}
.kuang{
    width: 80%;
    height: 100px;
    margin: 2% 10%;
    color: #303133;
    /* text-align: center; */
    line-height: 100px
}
.ziti{
    color: cornflowerblue;
    font-style: italic;
    text-decoration: underline;
}
</style>
