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
                             align="center"
                            prop="id"
                            label="序号"
                            width="150">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="title"
                            label="标题"
                            width="200">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="content"
                            label="内容"
                            width="200">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="imgSrc"
                            label="图片"
                            width="200">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="videoSrc"
                            label="videoSrc"
                            width="300">
                            </el-table-column>
                            <el-table-column
                             align="center"
                            prop="order"
                            label="优先级"
                            width="200">
                            </el-table-column>
                                                   
                            <el-table-column  align="center" label="操作">
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
                    title: '盛大开业',
                    content: '开业有礼，大酬宾活动',
                    imgSrc: '',
                    videoSrc: '',
                    order: 'A',
                },{
                    id : 1,
                    title: '盛大开业',
                    content: '开业有礼，大酬宾活动',
                    imgSrc: '',
                    videoSrc: '',
                    order: 'A',
                },{
                  id : 1,
                    title: '盛大开业',
                    content: '开业有礼，大酬宾活动',
                    imgSrc: '',
                    videoSrc: '',
                    order: 'A',
                },
            ]
        }
    }
}
</script>
<style scoped>
    .info-bg{
        height: 850px;
    }
    .el-input{
        width: 150px;
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
</style>
