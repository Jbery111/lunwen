<template>
    <div>
        
        <div class="release" @click="toRelease">
            <yd-icon name="feedback" size=".6rem" color="#fff"></yd-icon>
        </div>
        <yd-list theme="2">
            <yd-list-item  v-for="(item, key) in t" :key="key" @click.native="toDetail(item.id)">
                <img slot="img" :src="host+item.img">
                <span slot="title">{{item.content}}</span>
            </yd-list-item>
        </yd-list>
    </div>
</template>
<script>
import host from "../router/host.js";
    export default {
        mounted() {
            let url = host+'api/selTravel';
            console.log(url);
            this.$http.get(url).then(res=>{
                console.log(res.body)
                this.t = res.body;
            })
        },
        data() {
            return {
                t:[],
                host:host
            }
        },
        methods:{
            toRelease() {
                this.$router.push('/release');
            },
            toDetail(id) {
                this.$router.push('/TopicDetail?id='+id);
            }
        }
    }
</script>
<style lang="scss" scoped>
.release{
    width: 50px;
    height: 50px;
    background: #000;
    background: rgba(0,0,0,0.9);
    border-radius:50%;
    display:flex;
    justify-content: center;
    align-items: center;
    position:fixed;
    top:50px;
    right: 10px;
    z-index:999;
}
.item{
    height:100px;
    width:200px;
    background:red;
}
</style>

