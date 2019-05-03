const query = require('./query');
//发布游记
let releaseTravel = (data)=>{
    let create_time = (new Date()).getTime(); 
    data.u_id = 1;
    let _sql = `insert into topic (content,img,u_id,title,create_time) values ("${data.content}","${data.img}","${data.u_id}","${data.title}","${create_time}")`;
    return query(_sql);
}
//查询所有游记和我的游记
let selTravel = (id)=>{
    let _sql;
    if(id == 0) {
        _sql = `select * from topic where tag=1`;
    }else {
        _sql = `select * from topic where u_id=${id}`;
    }
    return query(_sql);
}
let selOneTravel = (id)=>{
   let  _sql = `select * from topic where id=${id}`;
   return query(_sql);
}
//评论游记
let commentTravel = (data)=>{
    let create_time = (new Date()).getTime(); 

    let _sql = `insert into comment (t_id,content,f,t,create_time) values(${data.t_id},"${data.content}",'${data.from}','${data.to}',"${create_time}")`;
    console.log(_sql);
    return query(_sql);
}
//查询对应游记的评论
let selCommnetTravel = (id)=>{
    let _sql =`select * from comment where t_id = ${id}`;
    console.log(_sql);
    return query(_sql);
}
//查询所有景点
let selAttr = function() {
    let _sql = "select * from attractions";
    return query(_sql);
}
//用户注册
let register =(data)=>{
    let _sql = `insert into user (username,password) values("${data.username}","${data.password}")`;
    return query(_sql);
}
//用户登录
let login = (data)=>{
    let _sql = `select * from user where username="${data.username}" and password="${data.password}"`;
    return query(_sql);
}
//查询兴趣分类
let  selClass = ()=>{
    let _sql = `select * from class`;
    return query(_sql);
}
//查询兴趣对应的景点
let attrInter = (data)=>{
    let _sql = `select * from attractions where interest = "${data}"`;
    return query(_sql);
}

module.exports = {releaseTravel,selTravel,selOneTravel,commentTravel,selCommnetTravel,selAttr,register,login,selClass,attrInter}