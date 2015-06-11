var express = require('express');
var router = express.Router();
var User = require("../models/user");
var md5 = require('MD5');
var salt = 'marathon2015';
/* 获取所有的用户信息 */
router.get('/', function(req, res) {
    //根据传输的count参数条件查询
    var limit = req.query.count;
    if(limit){
        //fields不是数组而是字符串，多字段用空格分隔 model.find(query, fields, options, function(err, results){}
        User.find({},'_id tel',{skip:0,limit:limit},function(err,users){
            if(err){
                return res.send(err);
            }
            res.json(users);
        });
    }else{
        User.find(function(err,users){
            if(err){
                return res.send(err);
            }
            res.json(users);
        });
    }
});

/* 创建用户 */
router.post('/', function(req, res) {
    var user = new User(req.body);
    User.findOne({'tel':user.tel},function(err,userdb){
        if(err){
            return res.send(err);
        }
        if(userdb){
            return res.json({code:400,msg:'此电话号码已经注册',data:{}})
        }else{
            user.pwd = md5(user.pwd+salt).toUpperCase();
            user.save(function(err){
                if(err){
                    return res.send(err);
                }
                res.send({code:200,msg:'用户注册成功',data:{}});
            });
        }
    });
});

/* 更新用户信息 */
router.put('/:id',
    function(req,res,next){
        if(!req.session.user){
            return res.send({code:400,msg:'请登录后操作',data:{}});
        }else{
            next();
        }
    },
    function(req,res,next){
        if(!req.body.pwd || req.body.pwd && req.session.user.pwd == md5(req.body.pwd+salt).toUpperCase()){
            next();
        }else{
            return res.send({code:400,msg:'旧密码不正确',data:{}});
        }
    },
    function(req,res){
    User.findOne({ _id: req.params.id }, function(err, user) {
        if (err) {
            return res.send(err);
        }
        if(user){
            for (prop in req.body) {
                user[prop] = req.body[prop];
            }

            if(req.body.pwd){
                user.pwd = md5(req.body.newPwd+salt).toUpperCase();
            }
            // save the user
            user.save(function(err) {
                if (err) {
                    return res.send(err);
                }

                res.json({code:200,msg:'修改成功',data:user});
            });
        }else{
            res.json({code:401,msg:'无此用户',data:{}});
        }
    });
});

/* 获取指定用户 */
router.get('/:id',function(req,res){
    User.findOne({'_id':req.params.id},function(err,user){
        if(err){
            return res.send(err);
        }
        res.json(user);
    });
});

/* 通过电话获取指定用户 */
router.get('/user/:tel',function(req,res){
    User.findOne({'tel':req.params.tel},function(err,user){
        if(err){
            return res.send(err);
        }
        res.json(user);
    });
});

/* 获取制定俱乐部的人员 */
router.get('/clubs/:id',function(req,res){
    User.find({'clubID':req.params.id},function(err,users){
        if(err){
            return res.send(err);
        }
        res.json({code:401,msg:'success',data:users});
    });
});

/* 删除用户 */
//router.delete('/:id',function(req,res){
//    User.remove({
//        _id:req.param.id
//    },function(err,user){
//        if(err){
//            res.send(err);
//        }
//        res.json({msg:'Successfully deleted'});
//    });
//});
module.exports = router;