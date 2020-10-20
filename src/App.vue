<template>
  <div id="app">
    <div class="nav">

      <!-- logo -->
      <div class="logo">
        闵行教师数据集市
      </div>
      <!-- 侧栏 -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#041528"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
      >
        <el-menu-item index="/">
        <i class="el-icon-data-analysis"></i>
          <span slot="title">数据集市</span>
        </el-menu-item>
        <el-menu-item index="/kykt/科研主题库">
          <i class="el-icon-menu"></i>
          <span slot="title">科研主题库</span>
        </el-menu-item>
        <el-menu-item index="/kykt/教学主题库">
          <i class="el-icon-reading"></i>
          <span slot="title">教学主题库</span>
        </el-menu-item>
        <el-menu-item index="/kykt/教研主题库">
        <i class="el-icon-edit"></i>
          <span slot="title" >教研主题库</span>
        </el-menu-item>
        <el-menu-item index="/kykt/绩效(学校)主题库">
        <i class="el-icon-finished"></i>
          <span slot="title">绩效(学校)主题库</span>
        </el-menu-item>
        <el-menu-item index="/kykt/教师发展（含培训）主题库">
        <i class="el-icon-notebook-1"></i>
          <span slot="title">教师发展(含培训)主题库</span>
        </el-menu-item>
        <el-menu-item index="/kykt/学生指导主题库">
        <i class="el-icon-question"></i>
          <span slot="title">学生指导主题库</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      activeIndex: '/measure'
    }
  },
  methods: {
    getJob () {
      axios
        .get('http://localhost:38080/api/v1/jobs')
        .then(res => {
          // console.log(res)
        })
    }
  },
  watch: {
    $route: {
      handler: function (val, oldval) {
        // const _urlParams = this.$route.params
        // console.log(_urlParams)
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  background-color: #f2f2f2;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
#app {
  display: flex;
  height: 100vh;
}
.top{
  line-height: 60px;
  height: 60px;
    /* color: white; */
    /* text-align: center; */
    font-size: x-large;
  margin-left: 30px;
  color: #041528;
}
.el-menu-vertical-demo {
  width: 200px;
  flex: 1 1 auto;
}
.nav{
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1 1 auto;
  overflow: auto;
  // height: 60px;
  // background-color: #041528;
  // display: flex;
}
.logo{
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: white;
  background-color:#041528 ;
  font-size: larger;
}
</style>
