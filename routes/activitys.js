var express = require('express');
var router = express.Router();
var Activity = require("../models/activity");

/* 获取所有的活动信息 */
router.get('/', function(req, res) {
    //根据传输的count参数条件查询
    Activity.find(function(err,activitys){
            if(err){
                return res.send(err);
            }
            res.json({code:200,msg:'success',data:activitys});
        });
});

/* 创建活动 */
router.post('/',
    function(req,res,next){
    if(!req.session.user){
        return res.send({code:400,msg:'请登录后操作',data:{}});
    }else if(!req.session.user.isManager){
        return res.send({code:400,msg:'你没有添加活动的权限',data:{}});
    }else{
        next();
    }
    },
    function(req, res) {
    var activity = new Activity(req.body);
    activity.clubID = req.session.user.clubID;
    activity.publisher = req.session.user.icon;
    activity.save(function(err){
        if(err){
            return res.send(err);
        }
        res.send({code:200,msg:'activity add success',data:{}});
    });
});

/* 更新活动信息 */
router.put('/:id',
    function(req,res,next){
        if(!req.session.user){
            return res.send({code:400,msg:'请登录后操作',data:{}});
        }else if(!req.session.user.isManager){
            return res.send({code:400,msg:'你没有添加活动的权限',data:{}});
        }else{
            next();
        }
    },
    function(req,res){
    Activity.findOne({ _id: req.params.id }, function(err, activity) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            activity[prop] = req.body[prop];
        }

        // save the event
        activity.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({code:200,msg: 'activity updated!',data:{}});
        });
    });
});

/* 获取指定用户 */
router.get('/:id',function(req,res){
    Activity.findOne({'_id':req.params.id},function(err,activity){
        if(err){
            return res.send(err);
        }
        res.json(activity);
    });
});

/* 发布活动 */
router.post('/publishActivity/:id',function(req,res){
    Activity.findOne({'_id':req.params.id},function(err,activity){
        if(err){
            return res.send(err);
        }
        if(!activity){
            return res.send({code:401,msg:'此活动不存在',data:{}});
        }
        if(activity.status = 1){
            res.send({code:401,msg:'此活动已经发布',data:{}});
        }else{
            activity.status = 1;
            activity.save(function(err) {
                if (err) {
                    return res.send(err);
                }
                res.json({code:200,msg: '发布成功',data:{}});
            });
        }
    });
});

/* 获取指定俱乐部下面所有的活动 */
router.get('/clubs/:id',function(req,res){
    Activity.find({'clubID':req.param.id},function(err,activitys){
        if(err){
            return res.send(err);
        }
        res.json({code:200,msg:'success',data:activitys});
    });
});

/* 删除用户 */
router.delete('/:id',function(req,res){
    Activity.remove({
        _id:req.param.id
    },function(err,activity){
        if(err){
            res.send(err);
        }
        res.json({code:200,msg:'Successfully deleted',data:{}});
    });
});
module.exports = router;