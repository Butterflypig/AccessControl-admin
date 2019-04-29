<template>
    <div class="companyInfo">
        <div class="content" align="left">
            <el-form :model="form" >
                <el-form-item label="公司名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.FullName" autocomplete="off"  placeholder="请输入公司名称"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" :label-width="formLabelWidth">
                    <el-input v-model="form.LinkMan" autocomplete="off" placeholder="请输入企业类型"></el-input>
                </el-form-item>
                <el-form-item label="主要业务：" :label-width="formLabelWidth">
                    <el-input v-model="form.Domain" autocomplete="off" placeholder="请输入主要业务"></el-input>
                </el-form-item>
                <el-form-item label="联系方式：" :label-width="formLabelWidth">
                    <el-input v-model="form.LinkPhone" autocomplete="off" placeholder="请输入联系方式"></el-input>
                </el-form-item>
                <el-form-item label="公司邮箱：" :label-width="formLabelWidth">
                    <el-input v-model="form.LineEmail" autocomplete="off" placeholder="请输入公司邮箱"></el-input>
                </el-form-item>
                <el-form-item label="公司地址：" :label-width="formLabelWidth">
                    <el-input v-model="form.Address" autocomplete="off" placeholder="请输入公司地址"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" align="center" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editCompanyData">确 定</el-button>
            </div>
        </div>
    </div>
</template>
<script>

    import qs from 'qs'
export default {
    data () {
        return {
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                FullName: '',
                LinkMan: '',
                Domain: '',
                LinkPhone: '',
                LineEmail: '',
                Address: ''
            },
        }
    },
    methods: {

        //获取公司信息
        getCompanyData (){
            this.$axios.get(this.$api.companyInfo.getCompanyData).then(
                res => {
                    console.log("获取公司信息",res);
                    this.form = res.data.Data
                }
            ).catch(
                err => {
                    console.log(err);
                }

            )
        },

        //修改公司信息
        editCompanyData (){
            let obj = {  };
            obj.FullName = this.form.FullName;
            obj.LinkMan = this.form.LinkMan;
            obj.Domain = this.form.Domain;
            obj.LinkPhone = this.form.LinkPhone;
            obj.LineEmail = this.form.LineEmail;
            obj.Address = this.form.Address;

            console.log("查看obj",obj);
            this.$axios.post(this.$api.companyInfo.editCompanyData, qs.stringify( obj )).then(
                res => {
                    console.log('修改公司信息的res',res);
                    this.getCompanyData();
                    if ( res ){
                        this.$message({
                            message: '公司信息修改成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '公司信息修改失败',
                            type: 'success'
                        });
                    }
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
