/**
 * Created by maple on 15/5/26.
 */
var express = require('express');
var router = express.Router();
var Banner = require("../models/banner");

/* 获取横幅信息 */
router.get('/', function(req, res) {
    if(req.param('count')){
        Banner.find({},[],{limit:5},function(err,banners){
            if(err){
                return res.send(err);
            }
            res.json(banners);
        });
    }
    Banner.find(function(err,banners){
        if(err){
            return res.send(err);
        }
        res.json(banners);
    });
});

/* 创建横幅 */
router.post('/', function(req, res) {
    var banner = new Banner(req.body);

    banner.save(function(err){
        if(err){
            return res.send(err);
        }
        res.send({msg:'banner add success'});
    });
});

/* 更新横幅信息 */
router.put('/:id',function(req,res){
    Banner.findOne({ _id: req.params.id }, function(err, banner) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            banner[prop] = req.body[prop];
        }

        // save the banner
        banner.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ msg: 'banner updated!' });
        });
    });
});

/* 获取指定横幅 */
router.get('/:id',function(req,res){
    Banner.findOne({'_id':req.params.id},function(err,banner){
        if(err){
            return res.send(err);
        }
        res.json(banner);
    });
});

/* 删除横幅 */
router.delete('/:id',function(req,res){
    Banner.remove({
        _id:req.param.id
    },function(err,banner){
        if(err){
            res.send(err);
        }
        res.json({msg:'Successfully deleted'});
    });
});
module.exports = router;