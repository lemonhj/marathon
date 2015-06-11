/**
 * Created by maple on 15/6/1.
 */
var express = require('express');
var router = express.Router();
var WPay = require("../service/wpay");
var payScean = require("../models/payScean");
var alipaycb = require("../models/alipaycb");
var httpHelper = require("../service/httpHelper");
var wxpay = require('weixin-pay');
var Order = require("../models/signupOrder");
var Alipay = require('alipay').Alipay;
var qs = require('querystring');
/**
 * 支付宝发起扫码支付
 */



/* 订单状态变更接口提供给支付宝回调 */
/* 通过订单id 获取订单 */
//router.post('/alipay/cb',wxpay.useWXCallback(function(msg, req, res, next){
//    // msg: 微信回调发送的数据
//}));

/* 支付宝支付结果异步回调 */
router.post('/alipay/cb', function(req,res){

    var dataVerify = {
        service:'notify_verify'
        ,partner:'2088911446896602'
        ,notify_id:''
    };
    dataVerify.notify_id = req.query.notify_id;
    alipay.notifyVerify(dataVerify,function(data){
        if(data == true){
            var orderNum = req.query.out_trade_no;
            var athleteNum = 0;
            Order.findOne({orderNum: orderNum}, function (err, orderdb) {
                if (err) {
                    return res.send('fail')
                }
                console.log(orderdb);
                Order.find({},'athleteNum', function(err,docs){
                    if (err) {
                        return res.send(fail);
                    }
                    console.log(docs);
                    if(docs[0].athleteNum < 111){
                        athleteNum = 111;
                    }else{
                        athleteNum = docs[0].athleteNum + 1;
                    }
                    orderdb.orderStatus = 1;
                    orderdb.athleteNum = athleteNum;
                    // save the order
                    orderdb.save(function (err) {
                        if (err) {
                            return res.send(err);
                        }
                        res.send('success');
                    });
                }).sort({'athleteNum':-1}).limit(1);
            });
        }
    });
    res.send('success');
});
//    function(req,res) {
//
//    alipay.create_direct_pay_by_user_notify(req,res);
//
//    alipaycb.paynotify(req,res);
//    var orderNum = req.query.buyer_id;
//    var o = req.params.buyer_id;
//    var o2 = req.query.buyer_id;
//    console.log('query='+orderNum);
//    console.log('params='+o);
//    // console.log('require='+o2);
//    var orderNum = req.body.buyer_id;
//    console.log(orderNum);
//    var url = 'https://mapi.alipay.com/gateway.do?service=notify_verify&partner=1239335902&notify_id=' + notify_id;
//    httpHelper.get(url, 10000, function (data) {
//        console.log(data);
//        if (data == 'true') {
//            Order.findOne({orderNum: orderNum}, function (err, orderdb) {
//                if (err) {
//                    return res.send(err);
//                }
//                orderdb.orderStatus = 1;
//
//                // save the order
//                orderdb.save(function (err) {
//                    if (err) {
//                        return res.send(err);
//                    }
//                });
//            });
//        }
//    }, 'utf8');
//    Order.findOne({orderNum: orderNum}, function (err, orderdb) {
//        if (err) {
//            return res.send(err);
//        }
//        orderdb['orderStatus'] = 1;
//
//        // update the order
//        orderdb.save(function (err) {
//            if (err) {
//                return res.send(err);
//            }
//        });
//    });
//    res.send('success');
//});

/* 支付宝return url */
router.post('/alipay/returnUrl',function(req,res){

});



/* 微信支付回调 -- 网页端扫码支付*/
router.post('/wxpay/cb', WPay.useWXCallback(function(msg, req, res, next){
    // 处理商户业务逻辑

    // 向微信返回处理成功信息，res.fail()返回失败信息。
   if(req.wxmessage.return_code == 'SUCCESS') {
        var orderNum = req.wxmessage.out_trade_no;
        var athleteNum = 0;
       Order.findOne({orderNum: orderNum}, function (err, orderdb) {
           if (err) {
               return res.fail();
           }
           console.log(orderdb);
           Order.find({},'athleteNum', function(err,docs){
               if (err) {
                   return res.fail();
               }
               console.log(docs);
               if(docs[0].athleteNum < 111){
                   athleteNum = 111;
               }else{
                   athleteNum = docs[0].athleteNum + 1;
               }
               orderdb.orderStatus = 1;
               orderdb.athleteNum = athleteNum;
               // save the order
               orderdb.save(function (err) {
                   if (err) {
                       return res.send(err);
                   }

                  res.success();
               });
           }).sort({'athleteNum':-1}).limit(1);

       });
   }
}));

// function(req,res) {
//
//
//    WXPay.useWXCallback(function(data){
//        console.log(data);
//    });
//
//    WXPay.parseXML(req.body,function(err,result){
//        if(result.return_code == 'SUCCESS'){
//            var orderNum = result.out_trade_no;
//            Order.findOne({ orderNum: orderNum }, function(err, orderdb) {
//                if (err) {
//                    return res.send(err);
//                }
//                orderdb.orderStatus = 1;
//
//                // save the order
//                orderdb.save(function(err) {
//                    if (err) {
//                        return res.send(err);
//                    }
//                    res.json({return_code:'SUCCESS',return_msg:'OK'});
//                });
//            });
//        }
//
//    });
//
//    var notify_id = req.body.notify_id;
//    console.log(notify_id);
//    var orderNum = req.body.out_trade_no;
//    console.log(orderNum);
//    var url = 'https://mapi.alipay.com/gateway.do?service=notify_verify&partner=1239335902&notify_id=' + notify_id;
//    httpHelper.get(url, 10000, function (data) {
//        console.log(data);
//        if (data == 'true') {
//            Order.findOne({orderNum: orderNum}, function (err, orderdb) {
//                if (err) {
//                    return res.send(err);
//                }
//                orderdb['orderStatus'] = 1;
//
//                // save the order
//                orderdb.save(function (err) {
//                    if (err) {
//                        return res.send(err);
//                    }
//                });
//            });
//        }
//    }, 'utf8');
//    res.send('success');
//});

module.exports = router;