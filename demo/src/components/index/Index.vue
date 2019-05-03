<template>
    <div class="box">
        <yd-tab  v-model="tab2"  :prevent-default="false" :item-click="itemClick">
          <yd-tab-panel v-for="(item,index) in items" :key="index" :label="item.label" class="top">
             <!-- {{item.content}} -->
            <router-view class="con"></router-view>

          </yd-tab-panel>
        </yd-tab>
         <yd-backtop></yd-backtop>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tab2: 0,
                items: [
                    {label: '景点', content: 'aaaaaaaaaaa'},
                    {label: '餐饮', content: 'bbbbbbbbbbb'},
                    {label: '娱乐', content: 'ccccccccccc'},
                    {label: '住宿', content: 'ddddddddddd'}
                ]
        }
    },
    methods:{
        itemClick(key) {
            this.tab2 = key;
            switch(key) {
                case 0:
                    this.$router.push('/index/attr');
                    break;
                case 1:
                    this.$router.push('/index/food');
                    break;
                case 2:
                    this.$router.push('/index/recreation');
                    break;
                case 3:
                    this.$router.push('/index/accommodation');
                    break;
            }

        }
    }
}
</script>
<style lang="scss" scoped>
.box{
    margin-bottom: 50px;
}

</style>

