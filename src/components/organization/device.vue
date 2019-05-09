<template>
    <div>
        <div class="info-bg">

            <!-- 搜索栏 -->
            <div class="search">
                <div>
                    <el-button type="primary" icon="el-icon-plus" @click="openCreateModal">新增</el-button>
                </div>
                <div>
                    <span>部门：</span>
                    <el-select v-model="value2" clearable  placeholder="请选择">
                        <el-option
                        v-for="item in options2"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                        </el-option>
                    </el-select>
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
                             align="center"
                            prop="Number"
                            label="序号"
                            width="150">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="Name"
                            label="设备名称"
                            width="200">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="TermNo"
                            label="设备编号"
                            width="200">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="IPAddress"
                            label="IP编号"
                            width="200">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="Config"
                            label="配置信息"
                            width="300">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="BarnchName"
                            label="所属营业部"
                            width="200">
                            </el-table-column>
                         
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
                            <el-form label-width="100px" :model="moduleDataNew" size="mini">
                                <el-form-item label="设备名称">
                                    <el-input v-model="moduleDataNew.Name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="设备编号">
                                    <el-input v-model="moduleDataNew.TermNo" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="IP编号">
                                    <el-input v-model="moduleDataNew.IPAddress" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="配置信息">
                                    <el-input v-model="moduleDataNew.Config" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="所属营业部">
                                    <el-input v-model="moduleDataNew.BranchID" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="code">
                                    <el-input v-model="moduleDataNew.Code" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="目的">
                                    <el-input v-model="moduleDataNew.Purpose" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="状态">
                                    <el-input v-model="moduleDataNew.Status" autocomplete="off"></el-input>
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
                            <el-form label-width="100px" :model="editModuleData" size="mini">
                                <el-form-item label="设备名称">
                                    <el-input v-model="editModuleData.Name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="设备编号">
                                    <el-input v-model="editModuleData.TermNo" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="IP编号">
                                    <el-input v-model="editModuleData.IPAddress" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="配置信息">
                                    <el-input v-model="editModuleData.Config" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="所属营业部">
                                    <el-input v-model="editModuleData.BranchID" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="code">
                                    <el-input v-model="editModuleData.Code" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="目的">
                                    <el-input v-model="editModuleData.Purpose" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="状态">
                                    <el-input v-model="editModuleData.Status" autocomplete="off"></el-input>
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
            moduleDataNew: {
                Name: '',
                TermNo: '',
                IPAddress: '',
                Config: '',
                BranchID: '',
                Code: '',
                Purpose: '',
                Status: ''
            },
            editModuleData: {
                id: '',
                Name: '',
                TermNo: '',
                IPAddress: '',
                Config: '',
                BranchID: '',
                Code: '',
                Purpose: '',
                Status: ''
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

            this.$axios.get(this.$api.device.getDeviceData, {
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

        //打开编辑
        handleEdit(index, row) {

            console.log(index, row);
            this.$axios.get( this.$api.device.getListData+'?id='+ row.TermID ).then(
                res =>{
                    console.log('编辑的数据',res);
                    this.editModuleData.id = res.data.Data.TermID;
                    this.editModuleData.Name = res.data.Data.Name;
                    this.editModuleData.TermNo = res.data.Data.TermNo;
                    this.editModuleData.IPAddress = res.data.Data.IPAddress;
                    this.editModuleData.Config = res.data.Data.Config;
                    this.editModuleData.BranchID = res.data.Data.BranchID;
                    this.editModuleData.Code = res.data.Data.Code;
                    this.editModuleData.Purpose = res.data.Data.Purpose;
                    this.editModuleData.Status = res.data.Data.Status;

                }
            ).catch(
                err => {
                    console.log(err);
                }
            );


            this.editModal = true;
        },

        //编辑
        putEditData (){
            let obj = { };

            obj.TermID = this.editModuleData.id;
            obj.Name = this.editModuleData.Name;
            obj.TermNo = this.editModuleData.TermNo;
            obj.IPAddress = this.editModuleData.IPAddress;
            obj.Config = this.editModuleData.Config;
            obj.BranchID = this.editModuleData.BranchID;
            obj.BranchName = '';
            obj.Code = this.editModuleData.Code;
            obj.Purpose = this.editModuleData.Purpose;
            obj.Status = this.editModuleData.Status;

            this.$axios.post( this.$api.device.addDeviceData, this.$qs.stringify( obj )).then(
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
            obj.TermNo = this.moduleDataNew.TermNo;
            obj.IPAddress = this.moduleDataNew.IPAddress;
            obj.Config = this.moduleDataNew.Config;
            obj.BranchID = this.moduleDataNew.BranchID;
            obj.BranchName = '';
            obj.Code = this.moduleDataNew.Code;
            obj.Purpose = this.moduleDataNew.Purpose;
            obj.Status = this.moduleDataNew.Status;

            console.log("obj的数据",obj);

            this.$axios.post( this.$api.device.addDeviceData, this.$qs.stringify( obj )).then(
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


        //单个删除
        handleDelete ( row ){
            console.log('row',row);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {

                this.$axios.post( this.$api.device.delDeviceData, 'ids='+ row.TermID ).then(
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
            this.$axios.get(this.$api.device.getDeviceData).then(
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
