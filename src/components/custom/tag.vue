<template>
    <div>
        <div class="info-bg">

            <!-- 搜索栏 -->
            <div class="search">
                <div>
                    <span>营业部：</span>
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
                                align="center"
                                prop="id"
                                label="序号"
                                width="150">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="title"
                                label="标签名"
                                width="200">
                            </el-table-column>
                            <el-table-column
                                align="center"
                                prop="content"
                                label="等级划分"
                                width="200">
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

    import qs from 'qs'

    export default {
        data () {
            return{
                openNewModal: false,
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
                        title: '标签1',
                        content: '标签1',

                    },{
                        id : 2,
                        title: '风险等级',
                        content: 'C1保守型',

                    },{
                        id : 2,
                        title: '风险等级',
                        content: 'C2谨慎型',

                    },
                ],
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
                );

                this.openNewModal = false;
            },
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
