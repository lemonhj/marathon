var express = require('express');
var router = express.Router();
var User = require("../models/user");
var md5 = require('MD5');
var salt = 'marathon2015';


/* 用户登录操作 */
router.post('/user_login', function(req, res, next) {
    var user = new User(req.body);
    User.findOne({'tel':user.tel,'pwd':md5(user.pwd+salt).toUpperCase()},function(err,userdb){
        if(err){
            next(router);
        }
        if(userdb){
            req.session.user = userdb;
            res.json({code:200,msg:'success',data:user});
            next();
        }else{
            res.json({code:400,msg:'no this user or tel password err',data:{}});
        }
    });
});

/* 退出操作 */
router.use('/user_login',function(req, res){
    req.session.save();
});

/* 用户登出操作 */
router.get('/user_logout', function(req, res ,next) {

    if(!req.session.user){
        return res.send({code:400,msg:'尚未登录',data:{}});
    }else{
        req.session.destroy(function(data){
            console.log(data);
            res.send({code:200,msg:'退出成功',data:{}})
        });
    }
});

///* 登陆后更新 */
//router.use('/user_logout',function(req, res, next){
//    var user = req.user;
//    user.save();
//});

module.exports = router;
