<template>

<div>
     <yd-navbar title="发布游记">
        <router-link to="/topic" slot="left">
            <yd-navbar-back-icon>返回</yd-navbar-back-icon>
        </router-link>

      
    </yd-navbar>
    <yd-cell-group>
    <yd-cell-item>
        <span slot="left">标题</span>
        <yd-input slot="right" style="padding-left:10px;" required v-model="input1" max="20" placeholder="请输入用户名"></yd-input>
    </yd-cell-item>
    </yd-cell-group>

     <yd-cell-group title="内容">
        <yd-cell-item>
            <yd-textarea v-model="input2"  slot="right" placeholder="请输入您的游记内容" maxlength="500"></yd-textarea>
        </yd-cell-item>
    </yd-cell-group>
    
     <div class="form-group">
      <label class="control-label">上传图片</label>
      <div class="control-form">
        <p class="help-block">(建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M)</p>
        <ul class="upload-imgs">
          <li v-if="imgLen>=1 ? false : true">
            <input type="file" name="img" class="upload" @change="addImg" ref="inputer" multiple accept="image/png,image/jpeg,image/gif,image/jpg"/>
            <a class="add"><i class="iconfont icon-plus"></i><p>点击上传</p></a>
          </li>
          <li v-for='(value, key) in imgs' :key="key">
            <p class="img"><img :src="getObjectURL(value)"><a class="close" @click="delImg(key)">×</a></p>
          </li>
        </ul>
      </div>
    </div>
    <yd-button type="danger" @click.native="submit">上传</yd-button>
    <yd-button type="warning" @click.native="add">提交</yd-button>
   
</div>
</template>
<style>
.con{
    height: 300px;
}
.upload{
  /* visibility: hidden; */
  /* display: none; */
  opacity: 0;
}
.upload-imgs{margin: 10px 0 30px 0;overflow: hidden;font-size: 0;}
.upload-imgs li{position: relative;width: 118px;height: 118px;font-size: 14px;display: inline-block;padding: 10px;margin-right: 25px;border: 2px dashed #ccc;text-align: center;vertical-align: middle;}
.upload-imgs li:hover{border-color: gray;}
.upload-imgs .add{display: block;background-color: #ccc;color: #ffffff;height: 94px;padding: 8px 0;}
.upload-imgs .add .iconfont{padding: 10px 0;font-size: 40px;}
.upload-imgs li:hover .add{background-color: gray;}
.upload-imgs li .upload{position: absolute;top: 0;bottom: 0;left: 0;right: 0;width: 118px;height: 118px;}
.upload-imgs .img{position: relative;width: 94px;height: 94px;line-height: 94px;}
.upload-imgs .img img{vertical-align: middle;}
.upload-imgs .img .close{display: none;}
.upload-imgs li:hover .img .close{display: block;position: absolute;right: -6px;top: -10px;line-height: 1;font-size: 22px;color: #aaa;}
.img img{
  width:94px;
  height: 94px;
}
</style>

<script>
import host from "../router/host.js";
export default {
    data() {
        return {
            input1:'',
            input2:'',
            formData:new FormData(),
            imgs: {},
            imgLen:0,
            src:'',
        }
    },
    methods: {
      addImg(event){
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.fil = inputDOM.files;
        let oldLen=this.imgLen;
        let len=this.fil.length+oldLen;
        if(len>1){
          alert('最多可上传1张，您还可以上传'+(1-oldLen)+'张');
          return false;
        }
        for (let i=0; i < this.fil.length; i++) {
          let size = Math.floor(this.fil[i].size / 1024);
          if (size > 5*1024*1024) {
            alert('请选择5M以内的图片！');
            return false
          }
          this.imgLen++;
          this.$set(this.imgs,this.fil[i].name+'?'+new Date().getTime()+i,this.fil[i]);
        }
      },
      getObjectURL(file) {
        var url = null ;
        if (window.createObjectURL!=undefined) { // basic
          url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file) ;
        }
        return url ;
      },
      delImg(key){
        this.$delete(this.imgs,key);
        this.imgLen--;
      },
      submit(){
        console.log(1);
        for(let key in this.imgs){
          let name=key.split('?')[0];
          this.formData.append('multipartFiles',this.imgs[key],name);
        }
        console.log(this.formData);
        // return false;
        let url = host+'api/uploadImg';
        this.$http.post(url, this.formData,{
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
          this.alertShow=true;
         this.$dialog.toast({
              mes: '图片上传成功',
              timeout: 1500,
              icon: 'success'
          });
          this.src=res.body.src;
        });
      },
      add() {
        if(this.input1.length == 0) {
          this.$dialog.toast({
              mes: '标题必填',
              timeout: 1500,
              icon: 'error'
          });
          return false;
        }
        if(this.input2.length == 0) {
          this.$dialog.toast({
              mes: '内容必填',
              timeout: 1500,
              icon: 'error'
          });
          return false;
        }
        if(this.src.length == 0) {
          this.$dialog.toast({
              mes: '请上传一张图片',
              timeout: 1500,
              icon: 'error'
          });
          return false;
        }
        let uid = localStorage.getItem('uid');
        // alert(uid);
        // return false;
        let data = {img:this.src,title:this.input1,content:this.input2,uid:uid};
        let url = host+'api/releaseTravel';
        this.$http.get(url,{params:data}).then(res=>{
          if(res.status == 200) {
                    // console.log(res.body)
                    if(res.body.code == 1) {
                        this.$dialog.toast({
                            mes: '发布成功',
                            timeout: 1500,
                            icon: 'success'
                        });
                    }else {
                        this.$dialog.toast({
                            mes: '发布失败',
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
