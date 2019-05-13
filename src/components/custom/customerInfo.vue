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
                    <span>筛选条件：</span>
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
                        class="ss"
                        placeholder="请输入名字"
                        v-model="input10"
                        clearable>
                        </el-input>
                    </el-col>
                    <el-button style="height: 40px" type="success" @click="search">搜索</el-button>
                    
                </div> 
            </div>

            <!-- 内容部分 -->
            <main class="contain">
                <div>

                    <!-- 表格 -->
                    <div class="table">
                        <el-table
                        :data="tableData"
                        @selection-change="selsChange"
                        border
                        style="width: 100%">
                            <el-table-column
                            type="selection"
                            width="55">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="Number"
                            label="序号"
                            width="100">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="Name"
                            label="姓名"
                            width="100">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="IDCardNO"
                            label="身份证号"
                            width="250">
                            </el-table-column>
                             <el-table-column
                             align="center"
                            prop="Phone"
                            label="联系方式"
                            width="200">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="Address"
                            label="地址"
                            width="300">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="Important"
                            label="级别"
                            width="100">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="Sex"
                            label="性别"
                            width="100">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="Status"
                            label="状态"
                            width="100">
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
                                    @click="handleDelete(scope.$index, scope.row)"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>

                        <!-- 分页 -->
                        <div>
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
                        <el-dialog title="新增" :visible.sync="openNewModal" center width='70%' >
                            <el-form label-width="80px" :model="moduleDataNew" size="mini">
                                <el-row>
                                    <el-col :span="6">
                                        <div class="photo" align="center">
                                            <img src="./../../../static/images/photo.jpg" alt="头像">
                                        </div>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item label="姓名">
                                                    <el-input v-model="moduleDataNew.Name" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="性别">
                                                    <el-input v-model="moduleDataNew.Sex" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="年龄">
                                                    <el-input v-model="moduleDataNew.Age" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item label="联系方式">
                                                    <el-input v-model="moduleDataNew.Phone" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="职业">
                                                    <el-input v-model="moduleDataNew.Profession" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <!--<el-form-item label="学历">-->
                                                    <!--<el-input v-model="moduleDataNew.Phone" autocomplete="off"></el-input>-->
                                                <!--</el-form-item>-->
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item label="e-mail">
                                                    <el-input v-model="moduleDataNew.Email" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <!--<el-form-item label="特征">-->
                                                    <!--<el-input v-model="moduleDataNew.Phone" autocomplete="off"></el-input>-->
                                                <!--</el-form-item>-->
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="称呼">
                                                    <el-input v-model="moduleDataNew.Title" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                            <el-row>
                                            <el-col :span="8">
                                                <el-form-item label="级别">
                                                    <el-input v-model="moduleDataNew.Important" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="身份证号">
                                                    <el-input v-model="moduleDataNew.IDCardNO" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="居住地">
                                                    <el-input v-model="moduleDataNew.Address" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                                <el-form-item label="兴趣点">
                                    <el-input v-model="moduleDataNew.Sex" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="标签">
                                    <el-input v-model="moduleDataNew.Tag" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="openNewModal = false">取 消</el-button>
                                <el-button type="primary" @click="createData">确 定</el-button>
                            </div>
                        </el-dialog>
                    </div>   

                    <!-- 编辑的模态框 -->
                    <div class="module">
                        <el-dialog title="编辑" :visible.sync="dialogFormVisible" center width='70%' >
                            <el-form label-width="80px" :model="moduleData" size="mini">
                                <el-row>
                                    <el-col :span="6">
                                        <div class="photo" align="center">
                                            <img src="./../../../static/images/photo.jpg" alt="头像">
                                        </div>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item label="姓名">
                                                    <el-input v-model="moduleData.Name" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="性别">
                                                    <el-input v-model="moduleData.Sex" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                    <el-form-item label="年龄">
                                                        <el-input v-model="moduleData.Age" autocomplete="off"></el-input>
                                                    </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item label="联系方式">
                                                    <el-input v-model="moduleData.Phone" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="职业">
                                                    <el-input v-model="moduleData.Profession" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="状态">
                                                    <el-input v-model="moduleData.Status" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item label="e-mail">
                                                    <el-input v-model="moduleData.Email" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="特征">
                                                    <el-input v-model="moduleData.Phone" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="称呼">
                                                    <el-input v-model="moduleData.Title" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item label="级别">
                                                    <el-input v-model="moduleData.Important" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="身份证号">
                                                    <el-input v-model="moduleData.IDCardNO" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item label="居住地">
                                                    <el-input v-model="moduleData.Address" autocomplete="off"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                                <el-form-item label="兴趣点">
                                    <el-input v-model="moduleData.Sex" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="标签">
                                    <el-input v-model="moduleData.Tag" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="editData">确 定</el-button>
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
            sels: [],//选中的值显示
            openNewModal: false, //新增模态框的开关
            dialogFormVisible: false, //编辑模态框的开关
            formLabelWidth: '180',
            input10: '',
            value2: '',
            options2: [
                {
                    value: '1',
                    label: '新登记'
                }, {
                    value: '2',
                    label: '新拜访'
                }, {
                    value: '3',
                    label: '一周'
                }, {
                    value: '4',
                    label: '一月'
                }, {
                    value: '5',
                    label: '一年'
                }
            ],
            tableData: [],
            moduleData: {
                CustID: '',
                Name: '',
                Sex: '',
                Age: '',
                Phone: '',
                Profession: '',
                Status: '',
                Email: '',
                Important: '',
                IDCardNO: '',
                Address: '',
                Title: '',
                InterID: '',
                Tag: ''
            },
            moduleDataNew: {
                Name: '',
                Sex: '',
                Age: '',
                Phone: '',
                Profession: '',
                Email: '',
                Important: '',
                IDCardNO: '',
                Address: '',
                Title: '',
                InterID: '',
                Tag: ''
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

            this.$axios.get(this.$api.customer.getCustomerData, {
                params: {
                    Status : 0,
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
            this.$axios.get( this.$api.customer.getCustomerData, {
                params: {
                    name: 'Lucy',
                    Status: 5   ,
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

        // 多选
        selsChange(sels) {
            this.sels = sels;
            console.log("多个选中",this.sels);
        },

        // 打开新增
        openCreateModal (){
            this.openNewModal = true;
        },

        // 新增
        createData (){
            let obj = {};
            obj.Name = this.moduleDataNew.Name;
            obj.Sex = this.moduleDataNew.Sex;
            obj.Age = this.moduleDataNew.Age;
            obj.Phone = this.moduleDataNew.Phone;
            obj.Profession = this.moduleDataNew.Profession;
            obj.Email = this.moduleDataNew.Email;
            obj.Important = this.moduleDataNew.Important;
            obj.IDCardNO = this.moduleDataNew.IDCardNO;
            obj.Address = this.moduleDataNew.Address;
            obj.Title = this.moduleDataNew.Title;

            obj.InterID = '1|2';
            obj.Tags = '1|2';

            this.$axios.post('http://www.reception.com/api/v1/Custom/Put', qs.stringify(obj)).then(
                (res) => {
                    console.log("确认新增：",res);

                    if ( res.data.Result ){
                        this.$message({
                            type: 'success',
                            message: '添加成功!'
                        });
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '添加失败!'
                        });
                    }

                    //重新渲染数据
                    this.getCustomerData();
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );

            this.openNewModal = false;
        },

        //获取编辑的内容
        getEditData (id){
            this.$axios.get(this.$api.customer.getEditData+'?id='+ id ).then(
                res => {
                    console.log('编辑的内容:',res);
                    this.moduleData.CustID = res.data.Data.info.CustID;
                    this.moduleData.Name = res.data.Data.info.Name;
                    this.moduleData.Sex = res.data.Data.info.Sex;
                    this.moduleData.Age = res.data.Data.info.Age;
                    this.moduleData.Phone = res.data.Data.info.Phone;
                    this.moduleData.Profession = res.data.Data.info.Profession;
                    this.moduleData.Status = res.data.Data.info.Status;
                    this.moduleData.Email = res.data.Data.info.Email;
                    this.moduleData.Important = res.data.Data.info.Important;
                    this.moduleData.IDCardNO = res.data.Data.info.IDCardNo;
                    this.moduleData.Address = res.data.Data.info.Address;
                    this.moduleData.Title = res.data.Data.info.Title;
                    this.moduleData.InterID = res.data.Data.info.InterID;
                    this.moduleData.Tag = res.data.Data.info.Tag;
                }
            ).catch(
                err => {
                    console.log(err);
                }
            )

        },

        //打开编辑
        handleEdit(index, row) {
            console.log(index, row);
            this.getEditData( row.CustID );

            this.dialogFormVisible = true;
        },

        // 确认编辑
        editData() {
            let obj = {};
            obj.ID = this.moduleData.CustID;
            obj.Name = this.moduleData.Name;
            obj.Sex = this.moduleData.Sex;
            obj.Age = this.moduleData.Age;
            obj.Phone = this.moduleData.Phone;
            obj.Profession = this.moduleData.Profession;
            obj.Status = this.moduleData.Status;
            obj.Email = this.moduleData.Email;
            obj.Important = this.moduleData.Important;
            obj.IDCardNO = this.moduleData.IDCardNO;
            obj.Address = this.moduleData.Address;
            obj.Title = this.moduleData.Title;

            obj.InterID = '1|2';
            obj.Tags = '1|2';

            this.$axios.post('http://www.reception.com/api/v1/Custom/Put', qs.stringify(obj)).then(
                (res) => {
                    console.log("确认编辑：",res);

                    if ( res.data.Result ){
                        this.$message({
                            type: 'success',
                            message: '编辑成功!'
                        });
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '编辑失败!'
                        });
                    }

                    //重新渲染数据
                    this.getCustomerData();
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );

            this.dialogFormVisible = false;

        },

        // 批量删除
        deleteDataBatch (){
            let ids = this.sels.map(item => item.CustID).join('|');
            console.log("aaaaaa",ids);

            this.$confirm('是否删除选中文件', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {

                this.$axios.post( this.$api.customer.delCustomerData, "ids=" + ids ).then(
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
                        this.getCustomerData();
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

        //单个删除数据
        handleDelete(index, row) {
            console.log("id", row.CustID);


            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {

                this.$axios.post( this.$api.customer.delCustomerData, 'ids='+ row.CustID ).then(
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
                        this.getCustomerData();
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

        // 加载初始数据
        getCustomerData(){
            this.$axios.get(this.$api.customer.getCustomerData).then(
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
        }
    },

    beforeUpdate () {
        localStorage.setItem('pagination', this.pageNo);
    },

    beforeDestroy () {
        localStorage.setItem('pagination', '1');
    },

    created () {
        this.getCustomerData();
        this.pageNo = Number(localStorage.getItem('pagination')) || 1;
        this.pageChange(this.pageNo);
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
    .el-pagination{
        position: absolute;
        bottom: 20px;
        left: 589px;
    }

    .photo img{
        width: 100px;
        height: 100px;
    }
</style>
