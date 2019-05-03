<template>
    <div class="app">
         <yd-navbar title="游记详情">
            <router-link to="/topic" slot="left">
                <yd-navbar-back-icon></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <p class="title">{{topic.title}}</p>
        <img :src="host+topic.img" v-if="topic.img" alt="">
        <p class="con1">{{topic.content}}</p>
        <div class="fill">
             <yd-button class="btn" @click.native="show2 = true" type="danger">评论</yd-button>
        </div>
        <div class="com">
            <div v-for="(item,i) in comment1" :key="i">
                <p v-if="item.t==0"><span class="span"  @click="com(item.f)">{{item.f}}：</span><span>{{item.content}}</span></p>
                <p v-else>
                    <span class="span">
                        <span @click="com(item.f)">{{item.f}}</span>回复
                        <span @click="com(item.t)">{{item.t}}</span>：</span>
                        <span>{{item.content}}</span>
                </p>

            </div>
        </div>
        <yd-popup v-model="show2" position="bottom" height="60%">
            <yd-cell-group title="评论内容">
                <p style="text-align:left;padding-left:20px;color:red;" v-if="t">回复{{t}}</p>
                <yd-cell-item>
                    <yd-textarea slot="right" v-model="content" placeholder="请输入评论内容" maxlength="100"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>
            <yd-button type="primary" style="margin: 30px;" @click.native = "comment">提交</yd-button>
            <yd-button type="warning" style="margin: 30px;" @click.native="show2 = false">关闭</yd-button>
        </yd-popup>
    </div>
</template>
<script>
import host from "../router/host.js";
export default {
    data() {
        return {
            topic:{},
            host:host,
            show2: false,
            id:0,
            content:'',
            name:'',
            t:'',
            comment1:[]
        }
    },
    mounted() {
       this.name = localStorage.getItem('name');
       let id =  this.$route.query.id;
       this.id = id;
       let url = host+'api/selOneTravel';
       let data = {id:id};
       this.getData(url,data);
      
    },
    methods:{
        getData(url,data) {
            this.$http.get(url,{params:data}).then(res=>{
                 this.topic = res.body[0];
            })
            let data1 = {id:this.id};
            let url1 = host+'api/selTravelComment';
            this.$http.get(url1,{params:data1}).then(res=>{
                this.comment1 = res.body;
                console.log(this.comment1);
            })
        },
        com(t) {
           this.t = t;
           this.show2 = true;
        },
        comment() {
            if(!this.name) {
                 this.$dialog.toast({
                    mes: '您还未登陆，请先登录',
                    timeout: 1500,
                    icon: 'error'
                });
                return false;
            }
            let data = {t_id:this.id,from:this.name,to:this.t,content:this.content};
            // console.log(data);
            // return false;
            if(this.content.length == 0) {
                this.$dialog.toast({
                    mes: '评论内容不能为空',
                    timeout: 1500,
                    icon: 'error'
                });
                return false;
            }
            let url = host+'api/commentTravel';
        
            this.$http.get(url,{params:data}).then(res=>{
                if(res.status == 200) {
                    // console.log(res.body)
                    if(res.body.code == 1) {
                        this.$dialog.toast({
                            mes: '评论成功',
                            timeout: 1500,
                            icon: 'success'
                        });
                         let url = host+'api/selOneTravel';
                        let data = {id:this.id};
                        this.getData(url,data);
                        this.content = "";
                        this.t = "";
                    }else {
                        this.$dialog.toast({
                            mes: '评论失败',
                            timeout: 1500,
                            icon: 'error'
                        });
                    }
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.app{
    margin-bottom:80px;
    width: 100%;
    padding:0 20px;
    .title{
        font-size:0.4rem;
    }
    img{
        width: 100%;
    }
    .con1{
        // width: 100%;
        text-align: left;
    }
    .fill{
        margin-top: 5px;
        width: 100%;
        // height: 2px;
        display: flex;
        justify-content: flex-end;
        background-color:#f7f7f7;
    }
    .com{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        background: #fff1f0;
        padding-top: 5px;
    }
    .span{
        color:#ff4d4f;
    }
    
}
</style>
