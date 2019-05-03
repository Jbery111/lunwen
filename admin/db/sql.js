const query = require('./query')
//  console.log(query);
// 管理员登陆验证
let findUserData = function(adminName,password) {
  let _sql = `select * from admin where adminname="${adminName}" and password="${password}";`
  return query( _sql)
}
//添加景点
let addAttr = function(data,img) {
  let _sql = `insert into attractions (name,des,img,address,price,interest) values("${data.name}","${data.des}","${img}","${data.address}","${data.price}","${data.inter}")`;
  // console.log(_sql);
  return query(_sql);
}
//查询所有景点
let selAttr = function() {
  let _sql = "select * from attractions";
  return query(_sql);
}
//删除景点
let delAttr = function(id) {
  let _sql = `delete from attractions where id="${id}"`;
  return query(_sql);
}


//添加住宿信息
let addAccommodation = function(data,img) {
  let _sql = `insert into accommodation (name,des,img,address) values("${data.name}","${data.des}","${img}","${data.address}")`;
  return query(_sql);
}
//查询住宿信息
let selAccommodation = function() {
  let _sql = "select * from accommodation";
  return query(_sql);
}
//删除住宿信息
let delAccommodation = function(id) {
  let _sql = `delete from accommodation where id="${id}"`;
  return query(_sql);
}


//添加餐饮店铺
let addFood = function(data,img) {
  let _sql = `insert into food (name,des,img,price,address) values("${data.name}","${data.des}","${img}","${data.price}","${data.address}")`;
  return query(_sql);
}
//查询所有店铺
let selFood = function() {
  let _sql = "select * from food";
  return query(_sql);
}
//删除店铺
let delFood = function(id) {
  let _sql = `delete from food where id="${id}"`;
  return query(_sql);
}

//添加娱乐
let addRecreation = function(data,img) {
  let _sql = `insert into recreation (name,des,img) values("${data.name}","${data.des}","${img}")`;
  return query(_sql);
}
//查询所有娱乐
let selRecreation = function() {
  let _sql = "select * from recreation";
  return query(_sql);
}
//删除娱乐
let delRecreation = function(id) {
  let _sql = `delete from recreation  where id="${id}"`;
  return query(_sql);
}

//添加兴趣分类
let addInter = function(con) {
  let _sql = `insert into class (con) values ("${con}")`;
  console.log(_sql);
  return query(_sql);
}
//查询所有兴趣分类
let selInterest = function () {
  let _sql = `select * from class`;
  return query(_sql);
}
//删除兴趣分类
let delInter = function(id) {
  let _sql = `delete from class where id=${id}`;
  return query(_sql);
}
//查询所有用户
let selAllUser = function () {
  let _sql = `select * from user`;
  return query(_sql);
}
//删除用户
let delUser = function(id) {
  let _sql = `delete from user  where id="${id}"`;
  return query(_sql);
}
//查询所有待审核
let selAllTopic = function() {
  let _sql = `select * from topic where tag=0`;
  return query(_sql);
}
//查询所有已通过审核的游记
let selTopic = function() {
  let _sql = `select * from topic where tag=1`;
  return query(_sql);
}
let allow = function(id) {
  let _sql = `update topic set tag=1 where id=${id}`;
  return query(_sql);
}
let delTopic = function (id) {
  let _sql = `delete from topic where id=${id}`;
  return query(_sql);
}
//保存路径
let savePath = function(cid,rid,path) {
  let _sql = `insert into way (cls,route,route_detail) values("${cid}","${rid}","${path}")`;
  return query(_sql);
} 
//更新路径
let updatePath = function(id,rid,path) {
  let _sql = `update way set route='${rid}' , route_detail='${path}' where id = ${id}`;
  return query(_sql);
}
let selOnePath = function (cid) {
  let _sql = `select * from way where cls="${cid}"`;
  return query(_sql);
}
//删除路线
let delPath = function (id) {
  let _sql = `delete from way where id = ${id}`;
  return query(_sql);
}
module.exports = {findUserData,addAttr,selAttr,delAttr,addFood,selFood,delFood,addRecreation,delRecreation,selRecreation,addAccommodation,
  selAccommodation,delAccommodation,addInter,selInterest,delInter,selAllUser,delUser,selTopic,selAllTopic,allow,delTopic,savePath,selOnePath,delPath,updatePath}