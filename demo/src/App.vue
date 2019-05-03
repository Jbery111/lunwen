<template>
  <div id="app">
  
  <router-view></router-view>
   <yd-tabbar v-if="tag" class="bottom" active-color="#ff7875">
        <yd-tabbar-item link="/index/attr" title="首页"  :active="i==1"  @click.native="change(1)">
            <yd-icon name="home"  slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="游记" link="/topic" :active="i==2" @click.native="change(2)">
            <yd-icon name="discount" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item link="/personal" title="推荐"  :active="i==3" @click.native="change(3)">
            <yd-icon name="footmark" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      i:1,
      msg: 'Welcome to Your Vue.js App',
      tag:false
    }
  },
  methods:{
    change(index) {
      console.log(index);
      this.i = index;
    },
    submitHandler(value) {
        this.$dialog.toast({mes: `搜索：${value}`});
    },
    getUid() {
      return new Promise((resolve,reject)=>{
        resolve(localStorage.getItem('uid'));
      })
    }
  },
  mounted() {
    this.getUid().then(res=>{
     return res;
   }).then(uid=>{
       if(uid == undefined){
          this.tag = false;
          // this.$router.push('/login');
        }else {
          this.tag = true;
        }
        console.log(this.tag)
   })
  //  console.log(uid)
    
  },
  updated() {
     this.getUid().then(res=>{
       console.log(res);
     return res;
   }).then(uid=>{
     console.log(uid);
       if(uid == undefined){
          this.tag = false;
          // this.$router.push('/login');
        }else {
          this.tag = true;
        }
        console.log(this.tag)
   })
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
.bottom{
  position: fixed;
  bottom: 0;
}

</style>
