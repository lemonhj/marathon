var express = require('express');
var router = express.Router();
var Club = require("../models/club");

/* 获取所有的活动信息 */
router.get('/', function(req, res) {
    //根据传输的count参数条件查询
    Club.find(function(err,clubs){
            if(err){
                return res.send(err);
            }
            res.json({code:200,msg:'success',data:clubs});
        });
});

/* 创建用户 */
router.post('/', function(req, res) {
    var club = new Club(req.body);
    club.save(function(err){
        if(err){
            return res.send(err);
        }
        res.send({code:200,msg:'club add success',data:{}});
    });
});

/* 更新用户信息 */
router.put('/:id',function(req,res){
    Club.findOne({ _id: req.params.id }, function(err, club) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            club[prop] = req.body[prop];
        }

        // save the event
        club.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({code:200,msg: 'club updated!',data:{}});
        });
    });
});

/* 获取指定用户 */
router.get('/:id',function(req,res){
    Club.findOne({'_id':req.params.id},function(err,club){
        if(err){
            return res.send(err);
        }
        res.json(club);
    });
});

/* 删除用户 */
router.delete('/:id',function(req,res){
    Club.remove({
        _id:req.param.id
    },function(err,club){
        if(err){
            res.send(err);
        }
        res.json({code:200,msg:'Successfully deleted',data:{}});
    });
});
module.exports = router;