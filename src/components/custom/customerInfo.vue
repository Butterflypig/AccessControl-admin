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
                    <el-button style="height: 40px" type="success">搜索</el-button>
                    
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

                    <!-- 新增的模态框 -->
                    <div class="module">
                        <el-dialog title="编辑" :visible.sync="openNewModal" center width='30%' >
                            <el-form label-width="80px" :model="moduleDataNew" size="mini">
                                <div class="photo" align="center">
                                    <img src="./../../../static/images/photo.jpg" alt="头像">
                                </div>
                                <el-form-item label="姓名">
                                    <el-input v-model="moduleDataNew.Name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号">
                                    <el-input v-model="moduleDataNew.IDCardNO" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="联系方式">
                                    <el-input v-model="moduleDataNew.Phone" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="住址">
                                    <el-input v-model="moduleDataNew.Address" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="级别">
                                    <el-input v-model="moduleDataNew.Important" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-input v-model="moduleDataNew.Sex" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="推荐内容" >
                                    <el-input disabled v-model="moduleDataNew.Sex" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="资料状态">
                                    <el-input v-model="moduleDataNew.Status" autocomplete="off"></el-input>
                                </el-form-item>
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
                        <el-dialog title="编辑" :visible.sync="dialogFormVisible" center width='30%' >
                            <el-form label-width="80px" :model="moduleData" size="mini">
                                <div class="photo" align="center">
                                    <img src="./../../../static/images/photo.jpg" alt="头像">
                                </div>
                                <el-form-item label="姓名">
                                    <el-input v-model="moduleData.Name" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="身份证号">
                                    <el-input v-model="moduleData.IDCardNO" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="联系方式">
                                    <el-input v-model="moduleData.Phone" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="住址">
                                    <el-input v-model="moduleData.Address" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="级别">
                                    <el-input v-model="moduleData.Important" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="性别">
                                    <el-input v-model="moduleData.Sex" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="推荐内容" >
                                    <el-input disabled v-model="moduleData.Sex" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="资料状态">
                                    <el-input v-model="moduleData.Status" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="兴趣点">
                                    <el-input v-model="moduleData.Sex" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="标签">
                                    <el-input v-model="moduleData.Tag" autocomplete="off"></el-input>
                                </el-form-item>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
            sels: [],//选中的值显示
            openNewModal: false, //新增模态框的开关
            dialogFormVisible: false,
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
                Name: '',
                IDCardNO: '',
                Phone: '',
                Address: '',
                Important: '',
                Sex: '',
                Status: '',
                Tag: ''
            },
            moduleDataNew: {
                Name: '',
                IDCardNO: '',
                Phone: '',
                Address: '',
                Important: '',
                Sex: '',
                Status: '',
                Tag: ''
            }
        }
    },
    methods: {

        // 打开新增
        openCreateModal (){
            this.openNewModal = true;
        },

        // 确认新增
        createData (){
            let obj = {};
            obj.Name= this.moduleDataNew.Name;
            obj.IDCardNO= this.moduleDataNew.IDCardNO;
            obj.Phone= this.moduleDataNew.Phone;
            obj.Address= this.moduleDataNew.Address;
            obj.Important= this.moduleDataNew.Important;
            obj.Sex= this.moduleDataNew.Sex;
            obj.Status= this.moduleDataNew.Status;
            obj.Tag= this.moduleDataNew.Tag;
            
            this.$axios.post('http://www.reception.com/api/v1/Custom/Put', qs.stringify(obj)).then(
                (res) => {
                    console.log(res);
                    this.getCustomerData();
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            )

            this.openNewModal = false;
        },

        //打开编辑
        handleEdit(index, row) {
            console.log(index, row);

            this.moduleData.Name = row.Name;
            this.moduleData.IDCardNO = row.IDCardNO;
            this.moduleData.Phone = row.Phone;
            this.moduleData.Address = row.Address;
            this.moduleData.Important = row.Important;
            this.moduleData.Sex = row.Sex;
            this.moduleData.Status = row.Status;
            this.moduleData.Tag = row.Tag;
            console.log(this.moduleData.Name);
            this.dialogFormVisible = true;
        },
        
        // 批量删除
        deleteDataBatch (){

        },

        // 加载初始数据
        getCustomerData(){
            this.$axios.get('http://www.reception.com/api/v1/Custom/GetPageList').then(
                res => {
                    console.log(res);
                    this.tableData = res.data.Data.PageData;
                }
            ).catch(
                err => {
                    console.log(err);
                    
                }
            )
        }

    },
    created () {
        this.getCustomerData();
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

    .photo img{
        width: 100px;
        height: 100px;
    }
</style>
