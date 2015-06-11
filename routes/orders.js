var express = require('express');
var router = express.Router();
var Order = require("../models/signupOrder");
var WPay = require("../service/wpay");
var payScean = require("../models/payScean");
var httpHelper = require("../service/httpHelper");

/* 获取所有的订单信息 */
router.get('/', function(req, res) {
    //根据传输的count参数条件查询
    Order.findAllItems(function(err,orders){
        if(err){
            return res.send(err);
        }
        res.json(orders);
    });
});

/* 创建订单 */
router.post('/', function(req, res) {
    var order = new Order(req.body);
    Order.find({},'athleteNum', function(err,docs){
        if (err) {
            return res.fail();
        }
        console.log(docs[0].athleteNum);
       if(docs[0].athleteNum < 300){
           Order.findOrderByCardID(order.cardID,function(err,orderdb){
               if(err){
                   return res.send(err);
               }
               if(!orderdb){
                   order.orderNum = new Date().getTime() + rndNum(4);
                   order.orderStatus = 0;
                   order.athleteNum = 0;
                   order.save(function(err){
                       if(err){
                           return res.send(err);
                       }
                       Order.findOrderByCardID(order.cardID,function(err,order){
                           if(err){
                               return res.send(err);
                           }
                           res.send({code:200,msg:'order add success',data:order});
                       });
                   });
               }else{
                   res.send({code:400,msg:'此身份证号码已注册',data:{}});
               }
           })
       }else{
           res.send({code:401,msg:'报名已满，请关注下次比赛',data:{}});
       }
    }).sort({'athleteNum':-1}).limit(1);

});


/* 更新订单信息 */
router.get('/paid',function(req,res){
    Order.find({ orderStatus: 1 }, function(err, orders) {
        if (err) {
            return res.send(err);
        }
        res.send({code:200,msg:'success',data:orders});
    }).sort({'athleteNum':1});
});

///* 更新订单信息 */
//router.post('/import',function(req,res){
//    var importData = [{"athleteNum":"92","realName":"吉正权","cardID":"522428199401241810","tel":"15285538767","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"","emergencyTel":""},
//        {"athleteNum":"93","realName":"陈阳","cardID":"430204198210252031","tel":"18611951025","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"","emergencyTel":""},
//        {"athleteNum":"94","realName":"赵雄","cardID":"520102199011031613","tel":"13312240928","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"赵立品","emergencyTel":"15086017198"},
//        {"athleteNum":"95","realName":"犹伟","cardID":"510216198309050419","tel":"18580865124","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"刘敏毅","emergencyTel":"18685126363"},
//        {"athleteNum":"96","realName":"徐皓坤","cardID":"520102198802112431 ","tel":"18096053091","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"李萍","emergencyTel":"18785009683"},
//        {"athleteNum":"97","realName":"张云舒","cardID":"520102197903160411","tel":"13809483131","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"","emergencyTel":""},
//        {"athleteNum":"98","realName":"张玉","cardID":"522427199010107087","tel":"18083320586","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"曾维维","emergencyTel":"15185040980"},
//        {"athleteNum":"99","realName":"汤虹","cardID":"520113198311110027  ","tel":"18985158515","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"汤凯茜","emergencyTel":"18984330001"},
//        {"athleteNum":"100","realName":"娄歆","cardID":"520103198011094827","tel":"18984330277","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"侯琼","emergencyTel":"13985188090"},
//        {"athleteNum":"101","realName":"刘喜斌","cardID":"520113198308280412 ","tel":"13765828168","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"冯娜","emergencyTel":"18984361228"},
//        {"athleteNum":"102","realName":"张严","cardID":"520103198310046710","tel":"13984838678","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"李韵","emergencyTel":"13985129099"},
//        {"athleteNum":"103","realName":"蔡俊","cardID":"520111198612235410","tel":"15185181822","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"韩燕 ","emergencyTel":"15885013506"},
//        {"athleteNum":"104","realName":"肖思伟","cardID":"520103199205056014","tel":"15185191585","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"刘星","emergencyTel":"18690731966"},
//        {"athleteNum":"105","realName":"吴雅茹","cardID":" 52272419860717316X","tel":"15286010202","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"牟童","emergencyTel":"18685026915"},
//        {"athleteNum":"106","realName":"李璐璐","cardID":"520102199211258126","tel":"13985147488","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"","emergencyTel":""},
//        {"athleteNum":"107","realName":"田劲松","cardID":"520112198406220011","tel":"15608505666","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"","emergencyTel":""},
//        {"athleteNum":"108","realName":"毕然","cardID":"520103198810120817  ","tel":"15308510888","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"杨玲","emergencyTel":"15985194999"},
//        {"athleteNum":"109","realName":"龚平","cardID":"520181198704102630 ","tel":"18285100683","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"杨林","emergencyTel":"18275176032"},
//        {"athleteNum":"110","realName":"黄俊","cardID":"520181198704102633","tel":"13985026800","orderStatus":"1","eventNum":"5565e62b313739dd091115e6","emergencyContactPerson":"","emergencyTel":""}]
//        for(var i in importData){
//            var order = new Order(importData[i]);
//            order.save(function(err){
//                if(err){
//                    return res.send(err);
//                }
//                console.log(importData[i].athleteNum + "success");
//            });
//        }
//        return res.send('success');
//});


/* 更新订单信息 */
router.put('/:id',function(req,res){
    Order.findOne({ _id: req.params.id }, function(err, order) {
        if (err) {
            return res.send(err);
        }

        for (prop in req.body) {
            order[prop] = req.body[prop];
        }

        // save the order
        order.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.json({ msg: 'order updated!' });
        });
    });
});



/* 获取指定用户 */
router.get('/users/:id',function(req,res){
    Order.findOrdersByUser(req.params.id,function(err,orders){
        if(err){
            return res.send(err);
        }
        res.json(orders);
    });
});

/*通过身份证号码获取订单详情*/
router.get('/cardIDs/:id',function(req,res){
    Order.findOrderByCardID(req.params.id,function(err,order){
        if(err){
            return res.send(err);
        }
        res.json({code:200,msg:'success',data:order});
    });
});

/* 通过订单id 获取订单 */
router.get('/:id',function(req,res){
    console.log(req.session);
    //console.log(req.session.get(req.session.id));
    //console.log(req.session.get(req.sessionID));

    Order.findOrderByOrderNum(req.params.id,function(err,order){
        if(err){
            return res.send(err);
        }
        res.json({code:200,msg:'success',data:order});
    });
});


/* 删除用户 */
router.delete('/:id',function(req,res){
    Order.remove({
        _id:req.param.id
    },function(err,order){
        if(err){
            res.send(err);
        }
        res.json({msg:'Successfully deleted'});
    });
});

function rndNum(n){
    var rnd="";
    for(var i=0;i<n;i++)
        rnd+=Math.floor(Math.random()*10);
    return rnd;
}

/* 支付订单 */
router.post('/wpay',function(req,res){
    var orderNum = req.body.orderNum;
    var ip = req.body.ip;
    if(!orderNum || !ip){
        return res.json({code:400,msg:"param miss",data:{}});
    }

    Order.find({},'athleteNum', function(err,docs){
        if (err) {
            return res.fail();
        }
        console.log(docs[0].athleteNum);
        if(docs[0].athleteNum < 200) {
            Order.findOrderByOrderNum(orderNum,function(err,orderdb){
                if(err){
                    res.send(err);
                }
                if(orderdb){
                    //payScean.total_fee = orderdb.eventNum.registrationFees * 100;
                    payScean.total_fee = 1;
                    payScean.spbill_create_ip = req.body.ip;
                    payScean.out_trade_no = orderdb.orderNum;
                    payScean.product_id = orderdb.eventNum._id.toString();
                    var result = WPay.fetchSceanUrl(payScean,res);

                    //wxpay.createUnifiedOrder({
                    //	body: '扫码支付测试',
                    //	detail: '这是模式二',
                    //	out_trade_no: otn,
                    //	total_fee: 1,
                    //	spbill_create_ip: '192.168.2.210',
                    //	trade_type: 'NATIVE',
                    //	notify_url: 'http://weixin.5usport.com/wxpay/notify',
                    //	product_id: '1234567890',
                    //}, function(err, result){
                    //	console.log(result);
                    //});
                }else{
                    return res.json({code:400,msg:"order err",data:{}});
                }
            });
            }else{
                 res.send({code:401,msg:'报名已满，请关注下次比赛',data:{}});
        }

        }).sort({'athleteNum':-1}).limit(1);

});

/* 订单状态变更接口提供给支付宝回调 */
/* 通过订单id 获取订单 */
router.post('/alipay/cb',function(req,res) {
    var orderNum = req.query.toString();
    var o = req.params.toString();
    //var o2 = req.require.out_trade_no;
    console.log('query='+orderNum);
    console.log('params='+o);
   // console.log('require='+o2);
    var orderNum = req.body;
    console.log(orderNum);
    //var url = 'https://mapi.alipay.com/gateway.do?service=notify_verify&partner=1239335902&notify_id=' + notify_id;
    //httpHelper.get(url, 10000, function (data) {
    //    console.log(data);
    //    if (data == 'true') {
    //        Order.findOne({orderNum: orderNum}, function (err, orderdb) {
    //            if (err) {
    //                return res.send(err);
    //            }
    //            orderdb.orderStatus = 1;
    //
    //            // save the order
    //            orderdb.save(function (err) {
    //                if (err) {
    //                    return res.send(err);
    //                }
    //            });
    //        });
    //    }
    //}, 'utf8');
    //Order.findOne({orderNum: orderNum}, function (err, orderdb) {
    //    if (err) {
    //        return res.send(err);
    //    }
    //    orderdb['orderStatus'] = 1;
    //
    //    // update the order
    //    orderdb.save(function (err) {
    //        if (err) {
    //            return res.send(err);
    //        }
    //    });
    //});
    res.send('success');
});

/* 订单状态变更接口提供给微信回调 */
router.post('/wxpay/cb',function(req,res) {
    var notify_id = req.body.notify_id;
    console.log(notify_id);
    var orderNum = req.body.out_trade_no;
    console.log(orderNum);
    var url = 'https://mapi.alipay.com/gateway.do?service=notify_verify&partner=1239335902&notify_id=' + notify_id;
    httpHelper.get(url, 10000, function (data) {
        console.log(data);
        if (data == 'true') {
            Order.findOne({orderNum: orderNum}, function (err, orderdb) {
                if (err) {
                    return res.send(err);
                }
                orderdb['orderStatus'] = 1;

                // save the order
                orderdb.save(function (err) {
                    if (err) {
                        return res.send(err);
                    }
                });
            });
        }
    }, 'utf8');
    res.send('success');
});

module.exports = router;