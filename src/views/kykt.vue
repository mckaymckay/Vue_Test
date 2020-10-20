<template>
  <div class="kykt">
    <!-- 页面标识 -->
    <div class="pages">
      <div class="lll">
        <div><el-page-header @back="goBack"></el-page-header></div>
        <div class="h3">数据集市</div>
      </div>
      <div style="margin-top: 10px;">
        <span class="span_size">{{DBname}}</span>
      </div>
    </div>
    <!-- 表格 -->
    <div class="content" ref="content">
        <div class="content1">
            <!-- 展示左边表格 -->
            <div class="left">
                <template>
                    <el-table
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    :data="tableData"
                    style="width: 90%;margin:5px auto"
                    height="90%">
                    <el-table-column label="数据表">
                      <template slot-scope="scope">
                        <!-- <span></span> -->
                        <el-button type="text" @click="handlechoice(scope.row.SE_ID,scope.row.SE_NAME_EN)">{{ scope.row.SE_NAME_EN }}</el-button>
                      </template>
                    </el-table-column>
                    </el-table>
                </template>
            </div>
            <!-- 展示右边表格内容 -->
            <div class="right">
                <div class="table1">
                    <div class="tablename">{{handle_tablename}}事实数据</div>
                    <template>
                      <el-table
                        :data="tableData1"
                        height="90%"
                        border
                        style="width: 100%">
                        <el-table-column label="字段">
                          <template slot-scope="scope">
                            <span>{{scope.row.SED_FIELD_EN}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="注释">
                          <template slot-scope="scope">
                            <span>{{scope.row.SED_FIELD_CN}}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                </div>
                <div class="table1" @click="show =!show">
                    <div class="tablename">{{handle_tablename}}周期快照</div>
                   <template>
                    <el-table
                        :data="tableData2"
                        height="90%"
                        border
                        style="width: 100%">
                        <el-table-column label="字段">
                          <template slot-scope="scope">
                            <span>{{scope.row.SED_FIELD_EN}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="注释">
                          <template slot-scope="scope">
                            <span>{{scope.row.SED_FIELD_CN}}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                </div>
                <div class="table1">
                    <div class="tablename">{{handle_tablename}}累计快照</div>
                   <template>
                    <el-table
                        :data="tableData1"
                        height="90%"
                        border
                        style="width: 100%">
                        <el-table-column label="字段">
                          <template slot-scope="scope">
                            <span>{{scope.row.SED_FIELD_EN}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="注释">
                          <template slot-scope="scope">
                            <span>{{scope.row.SED_FIELD_CN}}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                </div>
            </div>
        </div>

        <!-- 动画效果 -->
        <transition name="fade">
        <div class="content2" v-if="show">

            <div class="b_left">
                <div class="table2">
                    <div class="tablename">{{handle_tablename}}周期快照</div>
                    <template>
                      <el-table
                        :data="tableData2"
                        height="90%"
                        border
                        :header-cell-style="{background:'#EBEEF5',color:'#606266'}"
                        :cell-style="cellStyle"
                        style="width: 100%">
                        <el-table-column label="字段">
                          <template slot-scope="scope">
                            <span>{{scope.row.SED_FIELD_EN}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column label="注释">
                          <template slot-scope="scope">
                            <span>{{scope.row.SED_FIELD_CN}}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </template>
                </div>
            </div>

            <div class="b_right">
                <div class="b_right1"><el-button class="b_right2" type="primary" @click="choice1">分析维度</el-button></div>
                <div class="b_right1"><el-button class="b_right2" type="primary" @click="choice2">度量指标</el-button></div>
                <div class="b_right1"><el-button class="b_right2" type="primary" @click="choice3">数据服务接口</el-button></div>
            </div>
            <div class="b_last" v-if="show1">
              <div class="bao">
                <div class="nei" @click="closeit"><el-button icon="el-icon-close" circle></el-button></div>
                <div v-if="mychoice==='choice1'">
                  <el-tree
                    :data="data"
                    show-checkbox>
                  </el-tree>
                </div>
                <div v-else-if="mychoice==='choice2'">
                  <template>
                    <el-checkbox-group
                    v-model="checkedlists"
                    :min="0"
                    :max="5"
                    style="display: grid;font-size:">
                      <el-checkbox v-for="measure in measures" :label="measure" :key="measure">{{measure}}</el-checkbox>
                    </el-checkbox-group>
                  </template>
                </div>
                <el-button type="primary" style="margin: 20px 40%;" @click="tijiao">提交</el-button>
              </div>
            </div>

        </div>

        </transition>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      tableData: [],
      DBname: '',
      tableData1: [],
      tableData2: [],
      value: '',
      currentRow: null,
      show: false,
      show1: false,
      handle_tablename: '', // 选中的表
      aa: '',
      bb: '',
      mychoice: '',
      radio: 3,
      checkedlists: [],
      measures: ['立项课题总数', '立项国家级课题总数', '立项市级课题总数', '立项区级课题总数', '立项校级课题总数'],
      data: [{
        label: '学科',
        children: [{
          label: '语文'
        }, {
          label: '数学'
        }, {
          label: '外语'
        }, {
          label: '物理'
        }, {
          label: '化学'
        }, {
          label: '生物'
        }, {
          label: '政治'
        }, {
          label: '历史'
        }, {
          label: '地理'
        }, {
          label: '其他'
        }]
      }, {
        id: 2,
        label: '学段',
        children: [{
          label: '学前教育'
        }, {
          label: '小学'
        }, {
          label: '普通初中'
        }, {
          label: '普通高中'
        }, {
          label: '职业初中'
        }, {
          label: '职业高中'
        }, {
          label: '成人中等专业学校'
        }, {
          label: '成人中学'
        }, {
          label: '特殊教育'
        }, {
          label: '其他'
        }]
      }, {
        id: 3,
        label: '年度',
        children: [{
          label: '2010'
        }, {
          label: '2011'
        }, {
          label: '2012'
        }, {
          label: '2013'
        }, {
          label: '2014'
        }, {
          label: '2015'
        }, {
          label: '2016'
        }, {
          label: '2017'
        }, {
          label: '2018'
        }, {
          label: '2019'
        }, {
          label: '2020'
        }]
      }]
    }
  },
  mounted () {
    // document.body.clientWidth;
    this.clientHeight = `${document.documentElement.clientHeight}`
    console.log(this.clientHeight)
    this.$refs.content.style.height = (this.clientHeight + 1) + 'px'
    // 获取主题库，返回相应的表
    // console.log(this.$route.params)
    this.DBname = this.$route.params.dbname
    this.getdata(this.DBname)
    // 展示xxlxkt周期快照
    // this.handlezhouqi()
  },
  methods: {
    // 获取主题库，返回相应的表
    getdata (db) {
      console.log(db)
      axios
        .get('http://47.94.199.242:5000/api/v1.0/databasetablename?databasename=' + db)
        .then(res => {
          if (res.data.code === '200') {
            console.log(res)
            this.tableData = res.data.data
            this.aa = this.tableData[0].SE_ID
            this.bb = this.tableData[0].SE_NAME_EN
            this.handlechoice(this.aa, this.bb)
          }
        })
    },
    // 展示选中的表的字段
    handlechoice (tableid, tablename) {
      console.log(tablename)
      console.log(tableid)
      this.handle_tablename = tablename
      axios
        .get('http://47.94.199.242:5000/api/v1.0/datamartdetail?tableid=' + tableid)
        .then(res => {
          if (res.data.code === '200') {
            console.log(res)
            this.tableData1 = res.data.data
            if (tablename === 'ADD_KT') {
              this.handlezhouqi()
            } else {
              this.tableData2 = res.data.data
            }
          }
        })
    },
    // 展示xxlxkt周期快照
    handlezhouqi () {
      axios
        .get('http://47.94.199.242:5000/api/v1.0/datamartdetail?tableid=' + 'AiOMerHcgzToe6SMyJ0M4653uphYdJuE')
        .then(res => {
          if (res.data.code === '200') {
            console.log(res)
            this.tableData2 = res.data.data
          }
        })
    },
    // 跳转到展示数据的页面
    tijiao () {
      this.$router.push({ path: '/tijiao/' })
    },
    // 高亮当前行
    handleCurrentChange (val) {
      console.log(val)
      this.currentRow = val
    },
    // 展示树形图
    choice1 () {
      this.mychoice = 'choice1'
      this.show1 = true
      console.log(this.mychoice)
    },
    choice2 () {
      this.mychoice = 'choice2'
      this.show1 = true
      console.log(this.mychoice)
    },
    choice3 () {
      this.mychoice = 'choice3'
      this.show1 = false
      this.$router.push({ path: '/zhanshi/' })
    },
    closeit () {
      this.show1 = false
    },
    cellStyle () {
      return 'background:#F2F6FC'
    },
    goBack () {
      this.$router.back()
    }
  },
  watch: {
    $route: {
      handler: function (val, oldval) {
        const _urlParams = this.$route.params
        console.log(_urlParams)
        this.DBname = _urlParams.dbname
        this.getdata(this.DBname)
      },
      deep: true
    }
  }
}
</script>
<style scoped>
.kykt {
  padding: 10px;
}
.pages {
  padding: 10px;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 10px;
  height: 90px;
  line-height: 24px;
}
.lll{
  display: flex;
}
.h3 {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
  color:#909399;
}
.span_size {
  font-size: 20px;
  color: #303133;
  margin-left: 20px;
}
.content{
  /* width: 100%; */
  background-color: white;
  height: 100%;
  padding: 10px;
}
.content1{
height: 400px;
/* background-color: #dbe2ec; */
display: flex;
padding: 2px;
}
.content2{
height: 400px;
/* background-color: #dbe2ec; */
display: flex;
padding: 2px;
margin-top: 50px;
}
.left{
    height: 100%;
    /* background-color:bisque; */
    width: 20%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.right{
    height: 100%;
    width: 80%;
    margin-left: 10px;
    display: flex;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.table1{
    height: 100%;
    width: 32%;
    margin-left: 10px;
    /* background-color: #909399; */
}
.table2{
    height: 100%;
    /* width: 32%; */
    margin-left: 10px;
    /* background-color: #909399; */
}
.tablename{
height: 10%;
line-height: 35px;
text-align: center;
font-size: medium;
color: dodgerblue;
}
.b_left {
    height: 100%;
    /* background-color:bisque; */
    width: 40%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
.b_right{
    margin-left: 50px;
    width: 20%;
}
.b_last{
  width: 40%;
  height: 140%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.b_right1{
    height: 33%;
}
.b_right2{
    margin:20% 0;
    background: #3a71a8;
    width: 150px;
    height: 60px;
    border-radius: 25px;
}
.bao{
    width: 90%;
    height: 90%;
    margin: 5% 5%
}
.nei{
    margin-bottom: 10px;
}
/* 指就是html中fade名称0.5s动画过渡的时间 */
.fade-enter-active{
  transition: all .5s ease;
}
.fade-leave-active{
transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
