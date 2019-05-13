<template>
    <div class="index">
        <!-- 搜索栏 -->
        <div class="search" align="left">
            <div>
                <h5>尊敬的客户</h5>
            </div>
            <div>
                <span>您好，您今天有10条消息需要处理</span>
                <el-button style="height: 40px" type="success">立即处理</el-button>
            </div>
        </div>

        <main class="contain">
            <div>

            </div>
        </main>

    </div>
</template>

<script>
    export default {
        name: "myIndex"
    }
</script>

<style scoped>
    .index{
        height: 850px;
    }
    .search{
        background-color: #314057;
        padding: 10px 80px;

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

    .contain >div {
        padding-top: 40px;
        margin-top: 15px;
        height: 800px;
        background: white;
        position: relative;
    }
</style>
