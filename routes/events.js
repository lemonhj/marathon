var express = require('express');
var router = express.Router();
var Event = require("../models/event");

/* 获取所有的用户信息 */
router.get('/', function(req, res) {
    //根据传输的count参数条件查询
    Event.find(function(err,events){
            if(err){
                return res.send(err);
            }
            res.json({code:200,msg:'success',data:events});
        });
});

/* 创建用户 */
router.post('/', function(req, res) {
    var event = new Event(req.body);
    event.save(function(err){
        if(err){
            return res.send(err);
        }
        res.send({code:200,msg:'event add success',data:{}});
    });
});

/* 更新用户信息 */
router.put('/:id',function(req,res){
    Event.findOne({ _id: req.params.id }, function(err, event) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            event[prop] = req.body[prop];
        }

        // save the event
        event.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({code:200,msg: 'event updated!',data:{}});
        });
    });
});

/* 获取指定用户 */
router.get('/:id',function(req,res){
    Event.findOne({'_id':req.params.id},function(err,event){
        if(err){
            return res.send(err);
        }
        res.json(event);
    });
});

/* 删除用户 */
router.delete('/:id',function(req,res){
    Event.remove({
        _id:req.param.id
    },function(err,event){
        if(err){
            res.send(err);
        }
        res.json({code:200,msg:'Successfully deleted',data:{}});
    });
});
module.exports = router;