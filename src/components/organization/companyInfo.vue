<template>
    <div class="companyInfo">
        <div class="content" align="left">
            <!-- <div>
                <span>公司名称：</span>
            </div>
            <div>
                <span>企业类型：</span>
            </div>
            <div>
                <span>主要业务：</span>
            </div>
            <div>
                <span>联系方式：</span>
            </div>
            <div>
                <span>公司地址：</span>
            </div> -->
            <el-form :model="form" >
                <el-form-item label="公司名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"  placeholder="请输入公司名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入企业类型"></el-input>
                </el-form-item>
                <el-form-item label="主要业务：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入主要业务"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入联系方式"></el-input>
                </el-form-item>
                <el-form-item label="公司邮箱：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入公司邮箱"></el-input>
                </el-form-item>
                <el-form-item label="公司地址：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" placeholder="请输入公司地址"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" align="center" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </div>
        <!--<div>-->
            <!--<el-button  @click="dialogFormVisible = true">-->
                <!--编辑-->
            <!--</el-button>-->
        <!--</div>-->


        <el-dialog title="公司信息修改" :visible.sync="dialogFormVisible" center>
            <el-form :model="form" size="mini">
                <el-form-item label="公司名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item label="主要业务：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="on"></el-input>
                </el-form-item>
                <el-form-item label="公司地址：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="on"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
        }
    },
    methods: {

        //获取公司信息
        getCompanyData (){
            this.$axios.get(this.$api.companyInfo.getAnnouncementData).then(
                res => {
                    console.log("获取公司信息",res);
                }
            ).catch(
                err => {
                    console.log(err);
                }

            )
        }
    },
    created() {
        this.getCompanyData();
    }
}
</script>
<style scoped>
    .companyInfo{
        height: 700px;
        background-color: #fff;
        padding: 60px 0;
    }
    .content{
        width: 800px;
        margin: 0 auto;
    }
     .companyInfo > div > div{
         font-size: 18px;
         margin: 30px 0;
     }
     .el-button{
         margin: 60px 0;
         width: 100px;
         background-color: #639fa9;
         color: white;
     }
     .el-dialog__wrapper{
         width: 100%;
     }
     .el-form-item__label{
         font-size: 24px;
     }
</style>
