<template>
    <div>
        <div class="info-bg">

            <!-- 搜索栏 -->
            <div class="search">
                <div>
                <span>客户级别：</span>
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
                    <span>风险等级：</span>
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
                    <span>已开通业务：</span>
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
                    <span>交易频率：</span>
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
            <main>
                <div>

                </div>
                <div>
                    
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
            options2: [{
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
            }],
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
    }
</style>
