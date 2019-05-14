<template>
    <div>
        <div class="info-bg">

            <!-- 搜索栏 -->
            <!--<div class="search">-->
                <!--<div>-->
                    <!--<el-button type="primary" icon="el-icon-plus" @click="openCreateModal">新增</el-button>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<el-col :span="18">-->
                        <!--<el-input-->
                            <!--class="ss"-->
                            <!--placeholder="请输入名字"-->
                            <!--v-model="input10"-->
                            <!--clearable>-->
                        <!--</el-input>-->
                    <!--</el-col>-->
                    <!--<el-button style="height: 40px" type="success">搜索</el-button>-->
                <!--</div>-->
            <!--</div>-->

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
                                align="center"
                                prop="Number"
                                label="序号"
                                width="150">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="Visitor"
                                label="姓名"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="ScheduledTime"
                                label="预约时间"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="Intention"
                                label="到访意图"
                                width="200">
                            </el-table-column>
                            <el-table-column  align="center" label="操作">
                                <template slot-scope="scope">
                                    <el-button
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)"
                                    >编辑</el-button>
                                    <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.row)"
                                    >删除</el-button>
                                </template>
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



                    <!-- 编辑的模态框 -->
                    <div class="module">
                        <el-dialog title="编辑" :visible.sync="editModal" center width='30%' >
                            <el-form label-width="80px" :model="editModuleData" size="mini">
                                <el-form-item label="到访时间">
                                    <el-date-picker
                                        v-model="editModuleData.ScheduledTime"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </el-form-item>
                                <el-form-item label="到访意图">
                                    <el-select v-model="itemList" @change="aaa" clearable placeholder="请选择意图">
                                        <el-option
                                            v-for="item in reservationList"
                                            :key="item.ID"
                                            :label="item.Title"
                                            :value="item.ID+ ' ' +item.Title">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="editModal = false">取 消</el-button>
                                <el-button type="primary" @click="putEditData">确 定</el-button>
                            </div>
                        </el-dialog>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
<script>

    import qs from 'qs'

    export default {
        data () {
            return{
                reservationList: [],
                itemList: '',
                pageNo: 1,
                size: 10,
                total: 0,
                openNewModal: false,
                editModal: false,
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

                editModuleData: {
                    ID:'',
                    CustID: '',
                    ScheduledTime: '',
                    IssueID: '',
                    Title: ''
                }
            }
        },
        methods: {


            //定义每页多少条
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageNo = val;
                //this.handleCurrentChange();
            },

            //点击哪页显示哪条
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);

                this.$axios.get(this.$api.reservation.getReservationData, {
                    params: {
                        branchID: this.value2,
                        name : this.input10,
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

            //单条删除
            handleDelete ( row ){

                console.log('row',row);
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {

                    this.$axios.post( this.$api.reservation.delReservationData, 'ID='+ row.ID ).then(
                        (res) => {
                            console.log("单个删除数据：",res);
                            if ( res.data.Result ){
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: '删除失败!'
                                });
                            }
                            this.getInitData();
                        }
                    ).catch(
                        (error) => {
                            console.log(error);
                        }
                    );

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },

            //获取到访意图列表
            getReservationList(){
                this.$axios.get( this.$api.reservation.getReservationList ).then(
                    res => {
                        console.log( '下拉',res);
                        this.reservationList = res.data.Data;
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
            },

            aaa(){
                console.log("aaa",this.itemList);
                if ( this.itemList != null ){
                    console.log(this.itemList);
                    let arrList = this.itemList.split(' ');

                    this.editModuleData.IssueID = arrList[0];
                    this.editModuleData.Title = arrList[1];

                    console.log('IssueID',this.editModuleData.IssueID);
                    console.log('Title',this.editModuleData.Title)
                }

            },

            //日期转换
            dateTurn ( time ){
                if ( time !== '' ){
                    if ( time === time ){
                        return time;
                    } else {
                        console.log(time);
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
                    }

                } else {
                    return ''
                }
            },

            // 打开编辑
            handleEdit (index, row ){
                console.log(index,row);
                this.editModuleData.ID = row.ID;
                this.itemList = row.Intention;
                this.editModuleData.ScheduledTime = row.ScheduledTime;

                this.getReservationList();
                this.editModal = true;
            },

            // 确认编辑
            putEditData (){
                let obj = {};

                obj.ID = this.editModuleData.ID;
                obj.CustID = '';
                obj.ScheduledTime = this.dateTurn( this.editModuleData.ScheduledTime );
                obj.IssueID = this.editModuleData.IssueID;
                obj.Title = this.editModuleData.Title;

                this.$axios.post( this.$api.reservation.addReservationData, qs.stringify(obj)).then(
                    (res) => {
                        console.log(res);
                        this.getInitData();
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                );

                this.editModal = false;
            },

            //获取初始数据
            getInitData () {
                this.$axios.get(this.$api.reservation.getReservationData).then(
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
        created () {
            this.getInitData();
        }
    }
</script>
<style scoped>
    .info-bg{
        height: 850px;
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
        margin-left: 80px;
    }
    .search>div:nth-child(3){
        margin-left: 80px;
    }
    /* 内容部分 */

    .contain >div {
        padding-top: 40px;
        margin-top: 15px;
        height: 800px;
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
    .photo img{
        width: 100px;
        height: 100px;
    }
</style>
