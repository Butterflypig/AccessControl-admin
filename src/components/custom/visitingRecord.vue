<template>
    <div>
        <div class="info-bg">

            <!-- 搜索栏 -->
            <div class="search">
                <div>
                    <span>日期选择：</span>
                    <el-date-picker
                    v-model="value2"
                    format="yyyy-MM-dd"
                    @change="formatTime"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                    </el-date-picker>
                </div>
                <div>
                    <el-col :span="18">
                        <el-input
                            placeholder="请输入搜索内容"
                            v-model="input10"
                            clearable>
                        </el-input>
                    </el-col>
                    <el-button type="success" @click="search">搜索</el-button>
                </div> 
            </div>

            <!-- 内容部分 -->
            <main class="contain">
                <div>

                    <!-- 表格 -->
                    <div class="table">
                        <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                            <el-table-column
                            prop="Number"
                            label="序号"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="Visitor"
                            label="姓名"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="ScheduledTime"
                            label="预约时间"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="VisitTime"
                            label="到访时间"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="ReceptTime"
                            label="接待时间"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="Intention"
                            label="到访意图"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="Receptor"
                            label="接待者"
                            width="100">
                            </el-table-column>
                            <el-table-column
                                prop="Result"
                                label="接待结果"
                                width="100">
                            </el-table-column>
                            <el-table-column
                            prop="Description"
                            label="备注">
                            </el-table-column>
                        </el-table>

                        <!-- 分页 -->
                        <div class="pagination">
                            <el-pagination
                                background
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="pageNo"
                                :page-sizes="[7, 8, 9, 10]"
                                :page-size="size"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="total">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return{
            pageNo: 1,
            size: 10,
            total: 0,
            openNewModal: false, //新增模态框的开关
            editModal: false, //编辑模态框的开关
            input10: '',
            value2: '',
            options2: [
                {
                    value: '新登记',
                    label: '新登记'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            tableData: [ ],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            }
        }
    },
    methods: {

        //定义每页多少条
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.size = val;
            //this.handleCurrentChange();
        },

        //点击哪页显示哪条
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);

            this.$axios.get(this.$api.visit.getVisitData, {
                params: {
                    StartTime: '',
                    EndTime: '',
                    name : '',
                    pageSize : this.size,
                    pageIndex : val,
                }
            } ).then(
                res => {
                    console.log("加载初始数据：",res);
                    this.tableData = res.data.Data.PageData;
                    this.total = res.data.Data.TotalCount;
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        },

        //
        formatTime( val ){
            this.value2 = val;
        },

        //日期转换
        dateTurn ( time ){
            let year = time.getFullYear();
            let month =(time.getMonth() + 1).toString();
            let day = (time.getDate()).toString();
            if(month<10){
                month = 0+month
            }
            if(day<10){
                day = 0+day;
            }
            return year+"-"+month+"-"+day;
        },

        //搜索
        search (){
            let a = '';
            let b = '';

            console.log( 'zhi',this.value2);

            // a = this.dateTurn( this.value2[0] );
            // b = this.dateTurn( this.value2[1] );

            console.log(a,b);
            this.$axios.get(this.$api.visit.getVisitData, {
                params: {
                    StartTime: a,
                    EndTime: b,
                    name : this.input10,
                    pageSize : this.size,
                    pageIndex : 1,
                }
            } ).then(
                res => {
                    console.log("搜索结果",res);

                    this.tableData = res.data.Data.PageData;
                    this.total = res.data.Data.TotalCount;
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )

        },

        // 获取访问记录
        getInitData () {
            this.$axios.get(this.$api.visit.getVisitData).then(
                res => {
                    console.log("获取访问记录",res);

                    this.tableData = res.data.Data.PageData;
                    this.total = res.data.Data.TotalCount;
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        }
    },
    created (){
        this.getInitData();

    }
}
</script>
<style scoped>
    .info-bg{
        height: 850px;
    }
    .el-input{
        color: #fff;
    }
    .search{
        background-color: #314057;
        padding: 10px 80px;
        display: flex;
        flex-flow: row nowrap;
        color: white;
    }
    .el-button{
        background-color: #639fa9;
        border: #639fa9;
        color: white;
    }

    .search>div:nth-child(2){
        margin-left: 134px;
    }
    /* 内容部分 */
   
    .contain >div { 
        padding-top: 40px;
        margin-top: 15px;
        height: 600px;
        background: white;
        position: relative;
    }
     .contain >div>h3{
         font-weight: normal;
         font-size: 28px;
         color: #333333
     }
      .table{
        
        width: 98%;
        margin: 20px auto;
    }

    /* 分页 */
    .pagination{
        position: absolute;
        bottom: 20px;
        left: 589px;
    }

    .info-bg{
        background: #fff;
        height: 850px;
        padding: 25px;
    }
</style>
