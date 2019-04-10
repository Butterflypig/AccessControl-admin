<template>
    <div class="login-bg">
        <div>
            <div class="login-show">
                <div>
                    <img src="./../../../static/images/hxlogo.png" alt="logo">
                </div>
                <div>
                    <form action="">
                        <div>
                            <label for="userName">
                                <img src="./../../../static/icon/zhanghao.png" alt="">
                            </label>
                            <input id="userName" type="text" placeholder="点击输入账号"/>
                        </div>
                        <div>
                            <label for="passWord">
                                <img src="./../../../static/icon/mima.png" alt="">
                            </label>
                            <input id="passWord" type="password" placeholder="点击输入密码"/>
                        </div>
                        <div>
                            <label for="verificationCode">
                                <img src="./../../../static/icon/yanzhengma.png" alt="">
                            </label>
                            <input id="verificationCode" type="text" placeholder="请输入验证码"/>
                        </div>
                        <button type="submit">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data (){
        return {

        }
    },
    methods: {
        login (){
            
        }
    },
    created (){

    }
}
</script>
<style scoped>
    .login-bg{
        width: 1920px;
        height: 1080px;
        background-image: url('./../../../static/images/beijing1.png');
        background-position: center;
        background-size: cover;
    }
    .login-bg > div{
        width: 1042px;
        height: 570px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -521px;
        margin-top: -285px; 
    }
    .login-show{
        display: flex;

    }
    .login-show > div:first-child{
        width: 616px;
        height: 570px;
        background-image: url('./../../../static/images/beijing2.png');
        background-position: center;
        background-size: cover;
     }
     .login-show > div:last-child{
         position: relative;
        width: 426px;
        height: 570px;
        background-color: #60a0a7;
     }
     .login-show > div > img{
         margin-top: 75px;
     }
    form{
        width: 300px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -150px;
        margin-top: -133px;

    }

    form > div{
        width: 300px;
        height: 40px;
        line-height: 40px;
        border: 1px solid #fff;
        margin-top: 20px;
        border-radius: 5px;
    }

    form input{
        border-left: 1px solid #fff; 
        margin-left: 10px;
        padding-left: 26px;
        caret-color:#fff;
        color: #e6e6e6;
        font-size: 14px;
    }

    form > button{
        width: 300px;
        height: 40px;
        border: 1px solid #fff;
        margin-top: 20px;
        color: #f7f7f7;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }
     ::-webkit-input-placeholder{
        color: rgba(237, 237, 237, .5);
        font-size: 14px;
     }

     ::selection {
        background:#357d85; 
        color:#fff;
    }

    
</style>
