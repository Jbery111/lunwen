const Koa = require('Koa');
const Router = require('koa-router');
const staticServer = require('koa-static');
const app = new Koa();
const router = new Router();
const fs = require('fs'); 
const sql = require('./db/sql.js');
const api = require('./db/api.js');

const views = require('koa-views');
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors');
// const cors = require('koa-cors');

var moment = require('moment');

app.use(cors());
//静态文件引入
app.use(staticServer(__dirname , 'public'));


//使用ejs
app.use(views('views', { map: {html: 'ejs' }})); 
//post参数获取
app.use(bodyParser())

//后台首页
router.get('/',async (ctx)=>{
    let title = 'hello koa2';
    await ctx.render('index',{
        title
    })  
});

//后台登陆
router.get('/login',async(ctx)=>{
    let title = 'hello koa2';

    await ctx.render('login',{
        title
    });
});
router.get('/loginin',async(ctx)=>{
    let queryJson = ctx.query;
    console.log(queryJson);
    let adminname = queryJson.adminname;
    let password = queryJson.password;
    let obj = {
        code:1,
        msg:'登陆成功'
    }
    // let msg = "";
    // let result = {};
    console.log(typeof adminname)
    if(typeof adminname == 'undefined' || typeof password == 'undefined') {
        obj.code = 0;
        obj.msg = "用户名和密码必填";
        ctx.body = obj;
        return false;
    }
   
    await sql.findUserData(adminname,password).then((res)=>{
        // console.log(res[0]);
        if(!res[0]) {
           obj.code = 0;
           obj.msg = "用户名或密码错误";
          
        }
    });
    ctx.body = obj; 
})

/**
 * 景点管理
 */
//添加景点
router.get('/addAttractions',async(ctx)=>{
    await api.selClass().then((res)=>{
        data = res;
    })
    // data.tip = 0;
    await ctx.render('addAttractions',{data:data,tip:0});
})
router.post('/addAttr',async(ctx)=>{
    let data = ctx.request.body;
    const file = ctx.request.files.img; // 获取上传文件
    let res = uploadImg(file);
    let affect = 0;
    console.log(1);
    await sql.addAttr(data,res).then((re)=>{
        affect = re.affectedRows;
    });
    if(affect == 1) {
        await api.selClass().then((res)=>{
            data = res;
        })
       await ctx.render('addAttractions',{data:data,tip:1});
    }

})
//查询景点
router.get('/selAttractions',async (ctx)=>{
    let data;
    await sql.selAttr().then((res)=>{
        data = res;
    })
    // console.log(data);
    await ctx.render('selAttr',{data});
})
//删除景点
router.get('/delAttr',async(ctx)=>{
    let id = ctx.request.query.id;
    let affect = 0;
    await sql.delAttr(id).then((res)=>{
        affect = res.affectedRows;
    })
    if(affect == 1) {
        ctx.body = {
            code:1,
            msg:'删除成功'
        }
    }else {
        ctx.body = {
            code:0,
            msg:'删除失败'
        }
    }
})

/**
 * 住宿管理
 */
//添加住宿
router.get('/addAccommodation',async(ctx)=>{
    await ctx.render('addAccommodation',{tip:0});
 })
 router.post('/addAccommodations',async(ctx)=>{
     let data = ctx.request.body;
     const file = ctx.request.files.img; // 获取上传文件
     let res = uploadImg(file);
     let affect = 0;
     await sql.addAccommodation(data,res).then((re)=>{
         affect = re.affectedRows;
     });
     if(affect == 1) {
         // console.log(1);
        await ctx.render('addAccommodation',{tip:1});
     }
 })
 //查询所有住宿
 router.get('/selAccommodation',async(ctx)=>{
     let data;
     await sql.selAccommodation().then((res)=>{
         data = res;
     })
     // console.log(data);
     await ctx.render('selAccommodation',{data});
 })
 //删除住宿
 router.get('/delAccommodation',async(ctx)=>{
     let id = ctx.request.query.id;
     let affect = 0;
     await sql.delAccommodation(id).then((res)=>{
         affect = res.affectedRows;
     })
     if(affect == 1) {
         ctx.body = {
             code:1,
             msg:'删除成功'
         }
     }else {
         ctx.body = {
             code:0,
             msg:'删除失败'
         }
     }
 })

/**
 * 餐饮管理
 */
//添加店铺
router.get('/addFood',async(ctx)=>{
   await ctx.render('addFood',{tip:0});
})
router.post('/addFoods',async(ctx)=>{
    let data = ctx.request.body;
    const file = ctx.request.files.img; // 获取上传文件
    let res = uploadImg(file);
    let affect = 0;
    await sql.addFood(data,res).then((re)=>{
        affect = re.affectedRows;
    });
    if(affect == 1) {
        // console.log(1);
       await ctx.render('addFood',{tip:1});
    }
})
//查询所有店铺
router.get('/selFood',async(ctx)=>{
    let data;
    await sql.selFood().then((res)=>{
        data = res;
    })
    // console.log(data);
    await ctx.render('selFood',{data});
})
//删除店铺
router.get('/delFood',async(ctx)=>{
    let id = ctx.request.query.id;
    let affect = 0;
    await sql.delFood(id).then((res)=>{
        affect = res.affectedRows;
    })
    if(affect == 1) {
        ctx.body = {
            code:1,
            msg:'删除成功'
        }
    }else {
        ctx.body = {
            code:0,
            msg:'删除失败'
        }
    }
})

//添加兴趣分类
router.get('/addInterest',async(ctx)=>{
    await ctx.render('addInterest',{tip:0});
 })
 router.get('/addInter',async(ctx)=>{
     let con = ctx.request.query.con;
     let affect = 0;
     await sql.addInter(con).then((re)=>{
         affect = re.affectedRows;
     });
     if(affect == 1) {
         // console.log(1);
        await ctx.render('addInterest',{tip:1});
     }
 })
 //查询所有兴趣分类
  router.get('/selInterest',async(ctx)=>{
    let data;
    await sql.selInterest().then((res)=>{
        data = res;
    })
    // console.log(data);
    await ctx.render('selInterest',{data});
})
//删除兴趣分类
router.get('/delInter',async(ctx)=>{
    let id = ctx.request.query.id;
    let affect = 0;
    await sql.delInter(id).then((res)=>{
        affect = res.affectedRows;
    })
    if(affect == 1) {
        ctx.body = {
            code:1,
            msg:'删除成功'
        }
    }else {
        ctx.body = {
            code:0,
            msg:'删除失败'
        }
    }
})
//查询所有待审核游记
router.get('/selAllTopic',async(ctx)=>{
    let data;
    await sql.selAllTopic().then((res)=>{
        data = res;
    })
    // console.log(data);
    await ctx.render('selAllTopic',{data,moment});
})
//通过审核
router.get('/allow',async(ctx)=>{
    let id = ctx.request.query.id;
    let affect = 0;
    await sql.allow(id).then((res)=>{
        affect = res.affectedRows;
    })
    if(affect == 1) {
        ctx.body = {
            code:1,
            msg:'通过'
        }
    }else {
        ctx.body = {
            code:0,
            msg:'通过失败'
        }
    }
})
//删除话题
router.get('/delTopic',async(ctx)=>{
    let id = ctx.request.query.id;
    let affect = 0;
    await sql.delTopic(id).then((res)=>{
        affect = res.affectedRows;
    })
    if(affect == 1) {
        ctx.body = {
            code:1,
            msg:'删除成功'
        }
    }else {
        ctx.body = {
            code:0,
            msg:'删除失败'
        }
    }
})
//查询所有已通过
router.get('/selTopic',async(ctx)=>{
    let data;
    await sql.selTopic().then((res)=>{
        data = res;
    })
    // console.log(data);
    await ctx.render('selTopic',{data,moment});
})
/**
 * 娱乐管理
 */
//添加娱乐
router.get('/addRecreation',async(ctx)=>{
    await ctx.render('addRecreation',{tip:0});
 })
 router.post('/addRecreations',async(ctx)=>{
     let data = ctx.request.body;
     const file = ctx.request.files.img; // 获取上传文件
     let res = uploadImg(file);
     let affect = 0;
     await sql.addRecreation(data,res).then((re)=>{
         affect = re.affectedRows;
     });
     if(affect == 1) {
         // console.log(1);
        await ctx.render('addRecreation',{tip:1});
     }
 })
 //查询所有娱乐
 router.get('/selRecreation',async(ctx)=>{
     let data;
     await sql.selRecreation().then((res)=>{
         data = res;
     })
     // console.log(data);
     await ctx.render('selRecreation',{data});
 })
 //删除娱乐
 router.get('/delRecreation',async(ctx)=>{
     let id = ctx.request.query.id;
     let affect = 0;
     await sql.delRecreation(id).then((res)=>{
         affect = res.affectedRows;
     })
     if(affect == 1) {
         ctx.body = {
             code:1,
             msg:'删除成功'
         }
     }else {
         ctx.body = {
             code:0,
             msg:'删除失败'
         }
     }
 })
//查看所有注册用户
router.get('/selAllUser',async(ctx)=>{
    let data;
     await sql.selAllUser().then((res)=>{
         data = res;
     })
     console.log(data);
     await ctx.render('selAllUser',{data});
})
//删除用户
router.get('/delUser',async(ctx)=>{
    let id = ctx.request.query.id;
    let affect = 0;
    await sql.delUser(id).then((res)=>{
        affect = res.affectedRows;
    })
    if(affect == 1) {
        ctx.body = {
            code:1,
            msg:'删除成功'
        }
    }else {
        ctx.body = {
            code:0,
            msg:'删除失败'
        }
    }
})


//添加路线
router.get('/addPath',async(ctx)=>{
    let data;
    await api.selClass().then((res)=>{
        data = res;
    })
    await ctx.render('addPath',{data});
})
//存储路线
router.get('/savePath',async(ctx)=>{
    let cid = ctx.request.query.cid;
    let rid = ctx.request.query.rid;
    let path = ctx.request.query.path;
    let obj = {code:0,msg:'添加失败'};
    await sql.savePath(cid,rid,path).then((res)=>{
        if(res.affectedRows == 1) {
            obj.code = 1;
            obj.msg = "添加成功";
        }
        ctx.body = obj;
    });
    
})
//编辑路线
router.get('/selPath',async(ctx)=>{
    let data;
    await api.selClass().then((res)=>{
        data = res;
    })
    await ctx.render('selPath',{data});
})
//查询指定分类的路线
router.get('/selOnePath',async(ctx)=>{
    let cid = ctx.request.query.cid;
    let obj = {};
	 await sql.selOnePath(cid).then((res)=>{
        obj = res;
    })
    console.log(obj);
    ctx.body = obj;
})

//删除路线
router.get('/delPath',async(ctx)=>{
    let id = ctx.request.query.id;
    let affect = 0;
    await sql.delPath(id).then((res)=>{
        affect = res.affectedRows;
    })
    if(affect == 1) {
        ctx.body = {
            code:1,
            msg:'删除成功'
        }
    }else {
        ctx.body = {
            code:0,
            msg:'删除失败'
        }
    }
})
//更新路线
router.get('/updatePath',async(ctx)=>{
    let id = ctx.request.query.id;
    let rid = ctx.request.query.rid;
    let path = ctx.request.query.path;
    let obj = {code:0,msg:'保存失败'};
    await sql.updatePath(id,rid,path).then((res)=>{
        if(res.affectedRows == 1) {
            obj.code = 1;
            obj.msg = "保存成功";
        }
        ctx.body = obj;
    });
})


/**
 * 接口
 */
//上传图片
router.post('/api/uploadImg',async(ctx)=>{
    const file = ctx.request.files.multipartFiles[0]; // 获取上传文件
    let res = uploadImg(file);
    ctx.body = {'src':res};
})
//发布游记  发布前先上传图片
router.get('/api/releaseTravel',async(ctx)=>{
    // const file = ctx.request.files.img; // 获取上传文件
    // let img = uploadImg(file);
    let data = ctx.request.query;
    // data.img = img;
    let obj = {code:0,msg:'发布失败'};
    await api.releaseTravel(data).then((res)=>{
        if(res.affectedRows == 1) {
            obj.code = 1;
            obj.msg = "发布成功";
        }
    })
    ctx.body = obj;
})
//查询游记
router.get('/api/selTravel',async(ctx)=>{
    let u_id = ctx.request.query.u_id;
    // console.log(u_id);
    // return false;
    if(u_id == undefined) {
        u_id = 0;
    }
    let obj = {};
    await api.selTravel(u_id).then((res)=>{
        obj = res;
    })
    ctx.body = obj;
})
//查询指定的游记内容
router.get('/api/selOneTravel',async(ctx)=>{
	let id = ctx.request.query.id;
	let obj = {};
	console.log(id);
	 await api.selOneTravel(id).then((res)=>{
        obj = res;
    })
    ctx.body = obj;
})
//评论游记
router.get('/api/commentTravel',async(ctx)=>{
    let data = ctx.request.query;
    let obj = {code:0,msg:'评论失败'};
    console.log(data);
    await api.commentTravel(data).then(res=>{
        if(res.affectedRows == 1) {
            obj.code = 1;
            obj.msg = "评论成功";
        }
    })
    ctx.body = obj;
})
//查询对应游记的评论
router.get('/api/selTravelComment',async(ctx)=>{
    let id = ctx.request.query.id;
    let obj;
    await api.selCommnetTravel(id).then(res=>{
        // console.log(res);
        obj = res;
    })
    ctx.body = obj;
})

//查询景点信息
router.get('/api/selAttr',async(ctx)=>{
    let obj;
    await api.selAttr().then(res=>{
        obj = res;
    })
    ctx.body = obj;
})

//查询所有店铺
router.get('/api/selFood',async(ctx)=>{
    let data;
    await sql.selFood().then((res)=>{
        data = res;
    })
    // console.log(data);
   ctx.body = data;
})
 //查询所有住宿
 router.get('/api/selAccommodation',async(ctx)=>{
    let data;
    await sql.selAccommodation().then((res)=>{
        data = res;
    })
    // console.log(data);
   ctx.body = data;
})
 //查询所有娱乐
 router.get('/api/selRecreation',async(ctx)=>{
    let data;
    await sql.selRecreation().then((res)=>{
        data = res;
    })
    ctx.body = data;
  
})
 //查询兴趣爱好
  router.get('/api/selClass',async(ctx)=>{
    let data;
    await api.selClass().then((res)=>{
        data = res;
    })
    ctx.body = data;
  
})
  //查询兴趣爱好对应的景点
 router.get('/api/attrInter',async(ctx)=>{
    let tag = ctx.request.query.tag;
    console.log(tag);
    let data;
    await api.attrInter(tag).then((res)=>{
        data = res;
    })
    console.log(data);
    ctx.body = data;
  
})
//用户注册
router.get('/api/register',async(ctx)=>{
    let data = ctx.request.query;
    let obj = {code:0,msg:'注册失败'};
    await api.register(data).then(res=>{
        if(res.affectedRows == 1) {
            obj.code = 1;
            obj.msg = "注册成功";
        }
    })
    ctx.body = obj;
})
//用户登录
router.get('/api/login',async(ctx)=>{
    let data = ctx.request.query;
    let obj = {code:0,msg:'用户名或密码错误'};
    await api.login(data).then(res=>{
        console.log(res[0]);
        if(res[0] != undefined) {
            obj.code = 1;
            obj.msg = "登陆成功";
            obj.uid = res[0].id;
            obj.name = res[0].username;
        }
    })
    ctx.body = obj; 
})

const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));



const uploadImg = (file)=>{
     // 创建可读流
     const reader = fs.createReadStream(file.path);
     let filePath =  'public/uploads/' + `${file.name}`;
     // // 创建可写流
     const upStream = fs.createWriteStream(filePath);
     // // 可读流通过管道写入可写流
     reader.pipe(upStream);
     return  filePath;
}
router.post('/uploadfile', async (ctx, next) => {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    console.log(file.path);
    console.log(__dirname);
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath =  'public/uploads/' + `/${file.name}`;
    // // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // // 可读流通过管道写入可写流
    reader.pipe(upStream);
    return ctx.body = "上传成功！";
  });

app.use(router.routes()); //作用：启动路由
app.use(router.allowedMethods()); //作用： 当请求出错时的处理逻辑

app.listen(8090);
