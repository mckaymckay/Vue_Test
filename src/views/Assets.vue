<template>
  <div class="assets">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="h3">数据集市</div>
      <!-- <div>
        <span class="span_size">数据列表</span>
      </div> -->
    </div>
    <!-- 表格 -->
    <div class="content" ref="content">
      <!-- 第一行数据 -->
      <div class="content1">
        <div class="content3" v-for="(item,index) in items1" :key="index" @click="tokykt(item.DATABASENAME)">
          <el-image :src="url" style="height:42%;width:40%;margin:20% 20px"></el-image>
          <div class="comment">
            <span style="font-size:larger;color: cornflowerblue;">{{item.DATABASENAME}}</span>
            <span style="font-size: smaller;">周期快照：{{item.CYCLESNAPSHOT}}个</span>
            <span style="font-size: smaller;">事实表：{{item.FACTTABLE}}个</span>
            <span style="font-size: smaller;">数据服务接口：{{item.DATASERVICEINTERFACE}}个</span>
            <span style="font-size: smaller;">数据量：{{item.DATASIZE}}条</span>
          </div>
        </div>
      </div>
      <!-- 第二行数据 -->
      <div class="content1">
        <div class="content3" v-for="(item,index) in items2" :key="index" @click="tokykt(item.DATABASENAME)">
          <el-image :src="url" style="height:42%;width:40%;margin:20% 20px"></el-image>
          <div class="comment">
            <span style="font-size:larger;color: cornflowerblue;">{{item.DATABASENAME}}</span>
            <span style="font-size: smaller;">周期快照：{{item.CYCLESNAPSHOT}}个</span>
            <span style="font-size: smaller;">事实表：{{item.FACTTABLE}}个</span>
            <span style="font-size: smaller;">数据服务接口：{{item.DATASERVICEINTERFACE}}个</span>
            <span style="font-size: smaller;">数据量：{{item.DATASIZE}}条</span>
          </div>
        </div>
        <!-- 假一 -->
        <div class="content3">
          <el-image :src="url" style="height:42%;width:40%;margin:20% 20px"></el-image>
          <div class="comment">
            <span style="font-size:larger;color: cornflowerblue;">教学主题库</span>
            <span style="font-size: smaller;">周期快照：14个</span>
            <span style="font-size: smaller;">事实表：14个</span>
            <span style="font-size: smaller;">数据服务接口：30个</span>
            <span style="font-size: smaller;">数据量：102421条</span>
          </div>
        </div>
        <!-- 假二 -->
        <!-- <div class="content3">
          <el-image :src="url" style="height:42%;width:40%;margin:20% 20px"></el-image>
          <div class="comment">
            <span style="font-size:larger;color: cornflowerblue;">学生指导主题库</span>
            <span style="font-size: smaller;">周期快照：8个</span>
            <span style="font-size: smaller;">事实表：8个</span>
            <span style="font-size: smaller;">数据服务接口：26个</span>
            <span style="font-size: smaller;">数据量：123413条</span>
          </div>
        </div> -->

      </div>
    </div>
  </div>
</template>
<script>
// import dayjs from 'dayjs'
import axios from 'axios'
export default {
  data () {
    return {
      dialogVisible: false, // 重置规则的对话框
      input1: '',
      select: '',
      // DBname: '',
      // 获得主题库
      items1: [],
      items2: [],
      tableData: [],
      clientHeight: '',
      url: require('@/assets/icon12.jpg')
    }
  },

  watch: {
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    }
  },

  mounted () {
    this.clientHeight = `${document.documentElement.clientHeight}`// document.body.clientWidth;
    console.log(this.clientHeight)
    // console.log(self.clientHeight);
    // window.onresize = function temp () {
    //   this.clientHeight = `${document.documentElement.clientHeight}`
    // }
    // 获得主题库
    // this.DBname = '科研课题主题库'
    this.getDB()
  },

  methods: {
    // 获得主题库
    getDB () {
      axios
        .get('http://47.94.199.242:5000/api/v1.0/datamart')
        .then(res => {
          if (res.data.code === '200') {
            console.log(res.data.data)
            var len = res.data.data.length
            // 获得主题库数组的长度
            console.log(len)
            for (let i = 0; i < 3; i++) {
              this.items1.push(res.data.data[i])
            }
            for (let j = 3; j < len; j++) {
              this.items2.push(res.data.data[j])
            }
            // console.log(this.items1)
            // console.log(this.items2)
          } else {
            this.$alert('连接超时，请刷新', '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    // 动态修改content的高度
    changeFixed (clientHeight) {
      this.$refs.content.style.height = (clientHeight - 120) + 'px'
    },
    // 跳转到详细页面
    tokykt (dbname) {
      this.$router.push({ path: '/kykt/' + dbname })
    }
  }
}
</script>
<style scoped>
.assets {
  padding: 10px;
}
.pages {
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
  /* margin-top: 10px; */
  height: 60px;
}
.h3 {
  font-weight: bold;
  line-height: 60px;
  text-align: center;
  font-size: xxx-large;
  color: dodgerblue;
}
.content{
  width: 100%;
  background-color: white;
  height: 100%;
  padding: 10px;
}
.content1{
height: 50%;
background-color: #dbe2ec;
display: flex;
padding: 2px;
}
.content3{
  height: 100%;
  width: 33%;
  background-color: white;
  margin-right: 2px;
  display: flex;
}
.comment{
  /* background-color: #99a9bf; */
  height: 60%;
  width:50%;
  color:#303133;
  display: grid;
  margin: 20% 10px;
  /* text-align: center; */
}
.span_size {
  font-size: 20px;
  color: #303133;
}
.search_button {
  margin-top: 15px;
  max-width:500px;
  margin:0 auto
}
.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
.pagination_parent {
  background: white;
  border-radius: 4px;
}
.pagination {
  padding: 5px;
  border-radius: 4px;
  width: 500px;
  margin: 5px auto;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
