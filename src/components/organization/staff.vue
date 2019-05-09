<template>
    <div>
        <div class="info-bg">

            <!-- 搜索栏 -->
            <div class="search">
                <div>
                    <el-button type="primary" icon="el-icon-plus" @click="openCreateModal">新增</el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteDataBatch" :disabled="this.sels.length === 0">批量删除</el-button>
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
                        @selection-change="selsChange"
                        style="width: 100%">
                            <el-table-column
                                type="selection"
                                width="55">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="Number"
                            label="序号"
                            width="150">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="Name"
                            label="名字"
                            width="150">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="BranchName"
                            label="部门"
                            width="150">
                            </el-table-column>
                            <!-- <el-table-column
                             align="center"
                            prop="lev"
                            label="职级"
                            width="150">
                            </el-table-column> -->
                            <el-table-column
                             align="center"
                            prop="Sex"
                            label="性别"
                             :formatter="formatSex"
                            width="150">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="Birth"
                            label="出生日期"
                            width="180">
                            </el-table-column>
                            <!-- <el-table-column
                             align="center"
                            prop="entryTime"
                            label="入职时间"
                            width="150">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="separationTime"
                            label="离职时间"
                            width="150">
                            </el-table-column> -->
                            <el-table-column
                             align="center"
                            prop="Status"
                            label="状态"
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

                    <!-- 新增的模态框 -->
                    <div class="module">
                        <el-dialog title="编辑" :visible.sync="openNewModal" center width='30%' >
                            <el-form label-width="80px" :model="moduleDataNew" size="mini">
                                <el-form-item label="姓名">
                                    <el-input v-model="moduleDataNew.Name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-input v-model="moduleDataNew.Sex" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="所属部门">
                                    <el-input v-model="moduleDataNew.BranchName" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="地址">
                                    <el-input v-model="moduleDataNew.Birth" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="称呼">
                                    <el-input v-model="moduleDataNew.Title" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="简介">
                                    <el-input v-model="moduleDataNew.Brief" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="状态">
                                    <el-input v-model="moduleDataNew.Status" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="专业">
                                    <el-input v-model="moduleDataNew.Profession" autocomplete="off"></el-input>
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
                                <el-form-item label="姓名">
                                    <el-input v-model="editModuleData.Name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-input v-model="editModuleData.Sex" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="所属部门">
                                    <el-input v-model="editModuleData.BranchName" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="地址">
                                    <el-input v-model="editModuleData.Birth" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="称呼">
                                    <el-input v-model="editModuleData.Title" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="简介">
                                    <el-input v-model="editModuleData.Brief" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="状态">
                                    <el-input v-model="editModuleData.Status" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="专业">
                                    <el-input v-model="editModuleData.Profession" autocomplete="off"></el-input>
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
export default {
    data () {
        return{
            pageNo: 1,
            size: 10,
            total: 0,
            sels: [],
            input10: '',
            value2: '',
            openNewModal: false, //新增模态框的开关
            editModal: false, //编辑模态框的开关
            tableData: [ ],
            moduleDataNew: {
                Name: '',
                Sex: '',
                BranchID: '',
                BranchName: '',
                Birth: '',
                Title: '',
                Brief: '',
                Status: '',
                Profession: ''
            },
            editModuleData: {
                id: '',
                Name: '',
                Sex: '',
                BranchID: '',
                BranchName: '',
                Birth: '',
                Title: '',
                Brief: '',
                Status: '',
                Profession: ''
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

            this.$axios.get(this.$api.staff.getEmployeeData, {
                params: {
                    barnchID: '',
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

        //选中多个
        selsChange(sels) {
            this.sels = sels;
            console.log("多个选中",this.sels);
        },

        //性别转换
        formatSex ( row ) {
            return row.Sex == 1 ? '男' : row.Sex == 0 ? '女' : '未知';
        },

        //打开编辑
        handleEdit(index, row) {

            console.log(index, row);

            this.editModuleData.id = row.EmpID;
            this.editModuleData.Name = row.Name;
            this.editModuleData.Sex = row.Sex;
            this.editModuleData.BranchID = row.BranchID;
            this.editModuleData.BranchName = row.BranchName;
            this.editModuleData.Birth = row.Birth;
            this.editModuleData.Title = row.Title;
            this.editModuleData.Brief = row.Brief;
            this.editModuleData.Status = row.Status;
            this.editModuleData.Profession = row.Profession;

            this.editModal = true;
        },

        //编辑
        putEditData (){
            let obj = { };
            obj.EmpID = this.editModuleData.id;
            obj.Name = this.editModuleData.Name;
            obj.Sex = this.editModuleData.Sex;
            obj.BranchID = this.editModuleData.BranchID;
            obj.BranchName = '';
            obj.Birth = this.editModuleData.Birth;
            obj.Title = this.editModuleData.Title;
            obj.ImgUrl = '';
            obj.Brief = this.editModuleData.Brief;
            obj.Status = this.editModuleData.Status;
            obj.Profession = this.editModuleData.Profession;

            this.$axios.post( this.$api.staff.addEmployeeData, this.$qs.stringify( obj )).then(
                res => {
                    console.log(res);

                    //重新渲染数据
                    this.getInitData();
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );

            this.editModal = false;
        },

        // 打开新增
        openCreateModal (){
            this.openNewModal = true;
        },

        //新增
        increaseData(){
            let obj = { };

            obj.Name = this.moduleDataNew.Name;
            obj.Sex = this.moduleDataNew.Sex;
            obj.BranchID = this.moduleDataNew.BranchID;
            obj.BranchName = '';
            obj.Birth = this.moduleDataNew.Birth;
            obj.Title = this.moduleDataNew.Title;
            obj.ImgUrl = '';
            obj.Brief = this.moduleDataNew.Brief;
            obj.Status = this.moduleDataNew.Status;
            obj.Profession = this.moduleDataNew.Profession;
            console.log("obj的数据",obj);

            this.$axios.post( this.$api.staff.addEmployeeData, this.$qs.stringify( obj )).then(
                res => {
                    console.log(res);

                    //重新渲染数据
                    this.getInitData();
                }
            ).catch(
                err => {
                    console.log(err);
                }
            );

            this.openNewModal = false;
        },

        // 批量删除
        deleteDataBatch (){
            let ids = this.sels.map(item => item.EmpID).join('|');
            console.log("aaaaaa",ids);

            this.$confirm('是否删除选中文件', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {

                this.$axios.post( this.$api.staff.delEmployeeData, "EmpIds=" + ids ).then(
                    (res) => {
                        console.log("批量删除：",res);
                        if ( res.data.Result ){
                            this.$message({
                                type: 'success',
                                message: '批量删除成功!'
                            });
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '批量删除失败!'
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

        //单挑删除
        handleDelete ( row ){

            console.log('row',row);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {

                this.$axios.post( this.$api.staff.delEmployeeData, 'EmpIds='+ row.EmpID ).then(
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

        // 获取初始数据
        getInitData (){
            this.$axios.get(this.$api.staff.getEmployeeData).then(
                res => {
                    console.log('获取初始数据',res);
                    this.tableData = res.data.Data.PageData;
                    this.total = res.data.Data.TotalCount;

                    console.log(this.total);
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )
        },


    },
    created (){
            this.getInitData()
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
