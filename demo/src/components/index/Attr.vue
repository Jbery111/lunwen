<template>
<!--景点-->
    <div>
        <div class="item" v-for="(item,index) in arr" :key="index"> 
            <img :src="host+item.img" alt="">
            <div class="right">
                <p>{{item.name}}</p>
                <p>{{item.des}}</p>
                <p>地点：{{item.address}}</p>
                <p>门票：￥{{item.price}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import host from "../../router/host";
export default {
    data() {
        return{
            arr:[],
            host:host
        }
    },
    mounted() {
        console.log(host);
        let url = host+'api/selAttr';
        console.log(url);
        this.$http.get(url).then(res=>{
            console.log(res);
            if(res.status == 200) {
                 this.arr = res.body;
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
</script>
<style lang="scss" scoped>
.item{
    height:2rem;
    width:100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom:1px solid #fff1f0;
    background: #fff;
    img{
        width: 3.4rem;
        height: 1.9rem;
    }
    .right{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        box-sizing:border-box;
        padding-left:0.5rem;
    }
}
</style>

