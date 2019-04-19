<template>
    <div>
        <div class="info-bg">

            <!-- 搜索栏 -->
            <div class="search">
                <div>
                    <span>日期选择：</span>
                    <el-date-picker
                    v-model="value2"
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
                    <el-input
                    placeholder="请输入搜索内容"
                    v-model="input10"
                    clearable>
                    </el-input>
                    <el-button type="success">搜索</el-button>
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
                            prop="id"
                            label="序号"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="name"
                            label="姓名"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="appointment"
                            label="预约时间"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="visitTime"
                            label="到访时间"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="receptionTime"
                            label="接待时间"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="visitingIntention"
                            label="到访意图"
                            width="200">
                            </el-table-column>
                            <el-table-column
                            prop="receptionist"
                            label="接待者"
                            width="100">
                            </el-table-column>
                            <el-table-column
                            prop="remarks"
                            label="备注"
                            width="300">
                            </el-table-column>
                            <el-table-column label="操作">
                                <template>
                                    <el-button
                                    size="mini"
                                    >编辑</el-button>
                                    <el-button
                                    size="mini"
                                    type="danger"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <!-- 分页 -->
                        <div class="pagination">
                            <el-pagination
                            background
                            layout="prev, pager, next"
                            :total="1000">
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
            tableData: [
                {
                    id : 1,
                    name: 'Jack',
                    appointment: '2019-04-22 10:00',
                    visitTime: '2019-04-22 11:00',
                    receptionTime: '2019-04-22 11:10',
                    visitingIntention: '办事',
                    receptionist: 'Jackson',
                    remarks: '1111'
                },{
                     id : 1,
                    name: 'Jack',
                    appointment: '2019-04-22 10:00',
                    visitTime: '2019-04-22 11:00',
                    receptionTime: '2019-04-22 11:10',
                    visitingIntention: '办事',
                    receptionist: 'Jackson',
                    remarks: '1111'
                },{
                     id : 1,
                    name: 'Jack',
                    appointment: '2019-04-22 10:00',
                    visitTime: '2019-04-22 11:00',
                    receptionTime: '2019-04-22 11:10',
                    visitingIntention: '办事',
                    receptionist: 'Jackson',
                    remarks: '1111'
                },
            ],
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
    }
}
</script>
<style scoped>
    .info-bg{
        background: #fff;
        height: 850px;
        padding: 25px;
    }
    .el-input{
        width: 150px;
    }
    .search{
        background-color: #efefef;
        padding: 25px 80px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
    }
    .el-button{
        background-color: #639fa9;
        border: #639fa9;
        color: white;
    }

    /* 内容部分 */
   
    .contain >div { 
        padding-top: 40px;
        margin-top: 15px;
        height: 600px;
        background: #efefef;
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

</style>
