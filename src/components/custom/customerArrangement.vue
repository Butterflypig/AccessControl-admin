<template>
    <div>
        <div class="info-bg">

            <!-- 搜索栏 -->
            <div class="search">
                <div>
                    <el-button type="primary" icon="el-icon-plus" @click="openCreateModal">新增</el-button>
                </div>
            </div>

            <!-- 内容部分 -->
            <main class="contain">
                <div>
                    <h3>客户安排</h3>
                    <div class="table">
                        
                        <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                        <el-table-column
                        prop="TipsID"
                        label="序号"
                        width="100">
                        </el-table-column>
                        <el-table-column
                        prop="Title"
                        label="标题"
                        width="100">
                        </el-table-column>
                         <el-table-column
                        prop="Content"
                        label="内容"
                        width="300">
                        </el-table-column>
                         <el-table-column
                        prop="Tags"
                        label="标签"
                        width="500">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template  slot-scope="scope">
                                <el-button
                                size="mini"
                                >编辑</el-button>
                                <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)"
                                >删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    </div>

                    <!-- 新增的模态框 -->
                    <div class="module">
                        <el-dialog title="新增" :visible.sync="openNewModal" center width='30%' >
                            <el-form label-width="80px" :model="moduleDataNew" size="mini">

                                <el-form-item label="标题">
                                    <el-input v-model="moduleDataNew.Title" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item label="内容">
                                    <el-input type="textarea" :rows="4"  v-model="moduleDataNew.Content" autocomplete="off"></el-input>
                                </el-form-item>
                                <div class="tags one">
                                    <div v-for="(item,index) in addTagsList" :key="index">
                                        <span>{{item.name}}</span>
                                        <span @click="reduceTags(index)">x</span>
                                    </div>
                                </div>
                                <div class="tags two">
                                    <div v-for="(item,index) in tags" :key="index">
                                        <span>{{item.name}}</span>
                                        <span @click="addTags(item)">+</span>
                                    </div>
                                </div>
                            </el-form>
                            <div slot="footer" class="dialog-footer">
                                <el-button @click="openNewModal = false">取 消</el-button>
                                <el-button type="primary" @click="createData">确 定</el-button>
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
            addTagsList: [],
            pageNo: 1,
            size: 10,
            total: 0,
            openNewModal: false,
            editModal: false,
            input10: '',
            value2: '',
            options2: [
                {
                    value: '选项1',
                    label: '黄金糕'
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
            tags: [
                {
                    id: 1,
                    name: '活泼'
                },
                {
                    id: 2,
                    name: '阳光'
                },
                {
                    id: 3,
                    name: '诚实'
                }
            ],
            tableData: [ ],
            moduleDataNew: {

            }
        }
    },
    methods: {

        //获取初始标签
        getTagsList (){
            this.$axios.get( this.$api.recommend.getTagData ).then(
                res => {
                    console.log(res);
                }
            ).catch(
                err => {
                    console.log(err);
                }

            )
        },

        //减少标签
        reduceTags( start ){
            this.addTagsList.splice( start,1);
            console.log(start);
        },

        //addTags
        addTags ( tags ){
            console.log(tags);
            this.addTagsList.push(tags);
            console.log(this.addTagsList);
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

                this.$axios.post( this.$api.recommend.delRecommendData, 'ID='+ row.TipsID ).then(
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

        // 打开新增
        openCreateModal (){
            this.openNewModal = true;
        },

        // 确认新增
        createData (){
            let obj = {};
            obj.Title = this.moduleDataNew.Title;
            obj.BranchID = this.moduleDataNew.BranchID;
            obj.PID = 0;
            obj.Ordinal = 0;
            obj.LinkMan = '';
            obj.Phone = '';
            obj.Email = '';


            this.$axios.post( this.$api.matter.addMatterData, qs.stringify( obj )).then(
                (res) => {
                    console.log( '新增返回',res);
                    this.getInitData();
                }
            ).catch(
                (error) => {
                    console.log(error);
                }
            );

            this.openNewModal = false;
        },

        // 渲染数据
        getInitData () {
            this.$axios.get(this.$api.recommend.getRecommendData).then(
                res => {
                    console.log("内容推荐",res);

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
        this.getTagsList();
    }
}
</script>
<style scoped>
    /*标签*/
    .tags{
        background-color: aliceblue;
        box-sizing: border-box;
        margin-left: 80px;
        width: calc( 100% - 80px );
        padding: 5px 2px;
        display: flex;
        flex-flow: row wrap;
    }
    .one{
        border-bottom: 1px solid white;
    }
    .tags>div{
        border-radius: 8px;
        margin-top: 10px;
        font-size: 14px;
        color: #3b8262;
        padding: 0 15px;
        height: 25px;
        line-height: 25px;
        margin-left: 10px;
        background-color: rgba(153,200,177,.6);
        border: 1px solid #3b8262;
    }
    .two>div{
        background-color: transparent;
        color: #333;
        border: 1px solid #333;
    }

    .tags>div>span:last-child{
        cursor: pointer;
    }


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
    .info-bg{
        background: #fff;
        height: 850px;
        padding: 25px;
    }
    .el-input{
        width: 150px;
    }
    .search{
        background-color: #314057;
        color: white;
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
    }
     .contain >div>h3{
         font-weight: normal;
         font-size: 28px;
         color: #333333
     }
      .table{
        width: 98%;
        height: 800px;
        margin: 20px auto;
    }
</style>
