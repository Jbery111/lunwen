<template>
    <div class="app">
         <yd-navbar style="border-bottom:1px solid #e9e9e9;" title="景点推荐">
       
        <router-link to="#" slot="right" @click.native="logout">
            <yd-icon  name="home-outline" size="25px" color="#777"></yd-icon>
        </router-link>
        
         </yd-navbar>
         <yd-radio-group v-model="radio4" class="group">
            <yd-radio class="item1" v-for="(item,index) in list" :key="index"  :val="item.con">{{item.con}}</yd-radio>
        </yd-radio-group>
        <hr>
        {{ss}}
        <div v-for="(item,i) in data" :key="i" style="margin-top:10px;">
            <yd-badge>{{i+1}}</yd-badge> 
            <yd-step theme="2">
                
                <yd-step-item  v-for="(it,inx) in item.a" :key="inx">
                    <span slot="top" v-if="inx%2==0">{{it[0]}}</span>
                    <span slot="bottom" v-else>{{it[0]}}</span>
                </yd-step-item>
                <!-- <yd-step-item v-else>
                    <span slot="top">{{it[0]}}</span>
                </yd-step-item> -->
            </yd-step>
        </div>
    </div>
</template>
<script>
import host from '../router/host.js';
export default {
    data() {
        return {
            list:[],
            radio4:'',
            data:[],
            host:host
        }
    },
    computed: {
        ss:function(){
           console.log(this.radio4)
          let tag = this.radio4;
          let url = host+'selOnePath';
          this.$http.get(url,{params:{cid:tag}}).then(res=>{
              console.log(res.body)
                if(res.body.length > 0) {
                     res.body.forEach((item,index)=>{
                        let a = [];
                        let array = item.route_detail.split(',');
                        array.forEach((it,i)=>{
                            let arr = it.split('|');
                            a.push(arr);
                        })
                        res.body[index].a = a;
                    })
                    // that.list = res;
                    this.data = res.body;
                    console.log(this.data);
                }else {
                    this.data = [];
                }
          }) 
          
        
        }
    },
    mounted() {
        let url = host+'api/selClass';
        this.$http.get(url).then(res=>{
            console.log(res);
            this.list = res.body;
        })
    },
    methods:{
        logout() {
            localStorage.clear();
            this.$router.push('login');
        }
    }
}
</script>
<style lang="scss" scoped>
.app{
   
    .group{
         padding:0 20px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
       .item1{
            margin-top: 10px;
            margin-bottom: 10px;
       }
    }
    .item{
    height:2rem;
    width:100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom:1px solid #fff1f0;
    background: #fff;
   
    .right{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        box-sizing:border-box;
        padding-left:0.5rem;
    }
}
 img{
        width: 1rem;
        height: 0.8rem;
    }
}
</style>

