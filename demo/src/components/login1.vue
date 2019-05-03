<template>
    <div id="app">
        <div class="item">
            <input type="text" v-model="username" placeholder="请输入用户名"/><img src="../assets/images/username.png" alt="">
        </div>
        <div class="item">
            <input type="password" v-model="password" placeholder="请输入密码" /><img src="../assets/images/password.png" alt="">
        </div>
        <div class="item">
            <button @click="login">登陆</button>
        </div>
        <div class="item">
            <router-link to="/register">注册</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            username:'',
            password:'',
        }
    },
    created() {
        
    },
    methods:{
        login() {
            let data = {username:this.username,password:this.password};
            this.$http.get('http://localhost:8090/api/login',{params:data}).then(res=>{
                console.log(res);
                if(res.status == 200) {
                    console.log(res.body)
                    if(res.body.code == 1) {
                        this.$dialog.toast({
                            mes: '登陆成功',
                            timeout: 1500,
                            icon: 'success',
                            callback:()=>{
                                localStorage.setItem('uid',res.body.uid);
                                localStorage.setItem('name',res.body.name);

                                console.log(localStorage.getItem('uid'));
                                // return false;
                                this.$router.push('/index/attr');
                            }
                        });
                    }else {
                        this.$dialog.toast({
                            mes: '用户名或密码错误',
                            timeout: 1500,
                            icon: 'error'
                        });
                    }
                }else {
                     this.$dialog.toast({
                            mes: '网络错误',
                            timeout: 1500,
                            icon: 'error'
                        });
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#app{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 180px;
}
.item{
    margin-top: 20px;
    width: 200px;
    height: 25px;
    // background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img{
        position: absolute;
        left: 5px;
        top: 2px;
        width: 20px;

    }
    input{
        height: 25px;
        width:200px;
        border:none;
        border:1px solid #08979C;
        border-radius: 20px;
        outline: none;
        padding-left:25px;
        box-sizing: border-box;
        font-size: 12px;
    }
    button{
        width: 200px;
        height: 30px;
        border-radius: 20px;
        border:none;
        color:#fff;
        background: #08979C;
        font-size:14px;
        outline:none;
    }
}
</style>
