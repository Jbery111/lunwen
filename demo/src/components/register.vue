<template>
    <div id="app">
        <div class="item">
            <input type="text" v-model="username" placeholder="请输入用户名"/><img src="../assets/images/username.png" alt="">
        </div>
        <div class="item">
            <input type="password" v-model="password" placeholder="请输入密码" /><img src="../assets/images/password.png" alt="">
        </div>
        <div class="item">
            <button @click="login">注册</button>
        </div>
        <div class="item">
            <router-link to="/login">登陆</router-link>
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
            if(this.username.length == 0 || this.password.length == 0) {
                 this.$dialog.toast({
                    mes: '用户名和密码必填',
                    timeout: 1500,
                    icon: 'error'
                });
                return false;
            }
            let data = {username:this.username,password:this.password};
            this.$http.get('http://localhost:8090/api/register',{params:data}).then(res=>{
                console.log(res);
                if(res.status == 200) {
                    console.log(res.body)
                    if(res.body.code == 1) {
                         this.$dialog.confirm({
                            title: '注册成功',
                            mes: '现在去登陆？',
                            opts: [
                                {
                                    txt: '取消',
                                    color: false,
                                },
                                {
                                    txt: '确定',
                                    color: true,
                                    callback: () => {
                                    this.$router.push('/login');
                                    }
                                }
                            ]
                        });
                        // this.$router.push('/index');
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
