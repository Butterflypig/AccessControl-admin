<template>
    <div>
        <div class="info-bg">

            <!-- 搜索栏 -->
            <div class="search">
                <div>
                    <el-button type="primary" icon="el-icon-plus" @click="openCreateModal">新增</el-button>
                </div>
                <div>
                    <el-col :span="18">
                        <el-input
                            placeholder="请输入搜索内容"
                            v-model="input10"
                            clearable>
                        </el-input>
                    </el-col>
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
                             align="center"
                            prop="ID"
                            label="序号"
                            width="150">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="BranchName"
                            label="部门名称"
                            width="150">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="Abbreviation"
                                label="部门简称"
                                width="150">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="Address"
                                label="部门地址"
                                width="250">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="Creator"
                                label="创建人"
                                width="150">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="entryTime"
                            label="创建时间"
                            width="150">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="Modifier"
                                label="修改人"
                                width="150">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="separationTime"
                            label="修改时间"
                            width="150">
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
                                    @click="delDepartmentData(scope.$index, scope.row)"
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

                    <!-- 新增的模态框 -->
                    <div class="module">
                        <el-dialog title="编辑" :visible.sync="openNewModal" center width='30%' >
                            <el-form label-width="80px" :model="moduleDataNew" size="mini">
                                <el-form-item label="部门名称">
                                    <el-input v-model="moduleDataNew.BranchName" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="部门简称">
                                    <el-input v-model="moduleDataNew.Abbreviation" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码">
                                    <el-input v-model="moduleDataNew.ZipCode" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="地址">
                                    <el-input v-model="moduleDataNew.Address" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="openNewModal = false">取 消</el-button>
                                <el-button type="primary" @click="increaseData">确 定</el-button>
                            </div>
                        </el-dialog>
                    </div>

                    <!-- 编辑的模态框 -->
                    <div class="module">
                        <el-dialog title="编辑" :visible.sync="editModal" center width='30%' >
                            <el-form label-width="80px" :model="editModuleData" size="mini">
                                <el-form-item label="部门名称">
                                    <el-input v-model="editModuleData.BranchName" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="部门简称">
                                    <el-input v-model="editModuleData.Abbreviation" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码">
                                    <el-input v-model="editModuleData.ZipCode" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="地址">
                                    <el-input v-model="editModuleData.Address" autocomplete="off"></el-input>
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
            pageNo: 1,
            size: 10,
            total: 0,
            input10: '',
            value2: '',
            openNewModal: false, //新增模态框的开关
            editModal: false, //编辑模态框的开关
            tableData: [ ],
            moduleDataNew: {
                BranchName: '',
                Abbreviation: '',
                ZipCode: '',
                Address: ''
            },
            editModuleData: {
                ID: 0,
                BranchName: '',
                Abbreviation: '',
                ZipCode: '',
                Address: ''
            }
        }
    },
    methods: {

        pageChange (pageNo) {
            // this.loading = true;
            this.pageNo = pageNo;
        },

        //点击哪页显示哪条
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);

            this.$axios.get(this.$api.department.getPageList, {
                params: {
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

        //定义每页多少条
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.size = val;
            //this.handleCurrentChange();
        },

        //搜索
        search (){

            this.$axios.get( this.$api.department.getPageList, {
                params: {
                    name: this.input10,
                    pageIndex: 1,
                    pageSize: 20
                }
            } ).then(
                res => {
                    console.log( "搜索结果" ,res);
                    this.tableData = res.data.Data.PageData;
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        },

        // 打开新增
        openCreateModal (){
            this.openNewModal = true;
        },

        //新增部门
        increaseData(){
            let obj = { };

            obj.ID = 0;
            obj.PID = 0;
            obj.Ordinal = 0;
            obj.BranchName = this.moduleDataNew.BranchName;
            obj.Abbreviation = this.moduleDataNew.Abbreviation;
            obj.ZipCode = this.moduleDataNew.ZipCode;
            obj.Address = this.moduleDataNew.Address;
            console.log("obj的数据",obj);

            this.$axios.post( this.$api.department.editDepartmentData , qs.stringify( obj )).then(
                res => {
                    console.log(res);

                    //重新渲染数据
                    this.getAnnouncementData();
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );

            this.openNewModal = false;
        },

        //打开编辑
        handleEdit(index, row) {

            console.log(index, row);

            this.editModuleData.ID = row.ID;
            this.editModuleData.BranchName = row.BranchName;
            this.editModuleData.Abbreviation = row.Abbreviation;
            this.editModuleData.ZipCode = row.ZipCode;
            this.editModuleData.Address = row.Address;

            this.editModal = true;
        },

        //编辑提交的信息
        putEditData (){
            let obj = { };
            obj.ID = this.editModuleData.ID;
            obj.PID = 0;
            obj.Ordinal = 0;
            obj.BranchName = this.editModuleData.BranchName;
            obj.Abbreviation = this.editModuleData.Abbreviation;
            obj.ZipCode = this.editModuleData.ZipCode;
            obj.Address = this.editModuleData.Address;
            console.log("obj的数据",obj);

            this.$axios.post(this.$api.department.editDepartmentData, qs.stringify( obj ) ).then(
                res => {
                    console.log(res);

                    this.getAnnouncementData();
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );

            this.editModal = false;
        },

        //单挑删除部门信息
        delDepartmentData ( index,row ){

            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {

                this.$axios.post( this.$api.department.delDepartmentData, 'id='+ row.ID ).then(
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
                        this.getAnnouncementData();
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

        // 获取部门信息
        getAnnouncementData () {
            this.$axios.get( this.$api.department.getDepartmentData ).then(
                res => {
                    console.log("获取部门信息",res);
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
    created() {
        this.getAnnouncementData()
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
        margin-left: 134px;
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
</style>
