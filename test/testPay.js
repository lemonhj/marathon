///**
// * Created by maple on 15/5/28.
// */
//var mongoose = require('mongoose');
//
//var dbName = 'malathon';
//var connectionString = 'mongodb://120.24.156.177:27017/'+dbName;
//
//mongoose.connect(connectionString,function(err){
//    if(err){
//        console.log('db connect error!')
//    }else{
//        console.log('db connect success!')
//    }
//});
//var Order = require("../models/signupOrder");
////require('crypto').randomBytes(16, function(ex, buf) {
////    var token = buf.toString('hex');
////    console.log(token);
////});
//
//var athleteNum = 111;
//Order.findOne({orderNum: '14332108156316977'}, function (err, orderdb) {
//    if (err) {
//        return res.fail();
//    }
//    console.log(orderdb);
//    Order.find({},'athleteNum', function(err,docs){
//        if (err) {
//            return res.fail();
//        }
//        console.log(docs);
//        if(docs[0].athleteNum < 111){
//           athleteNum = 111;
//        }else{
//            athleteNum = docs[0].athleteNum + 1;
//        }
//        orderdb.orderStatus = 1;
//        orderdb.athleteNum = athleteNum;
//        // save the order
//        orderdb.save(function (err) {
//            if (err) {
//                return res.send(err);
//            }
//
//            // res.success();
//        });
//    }).sort({'athleteNum':-1}).limit(1);
//
//});
//
//Order.find({},'athleteNum', function(err,docs){
//    console.log(docs);
//   // orderdb = docs.athleteNum + 1;
//}).sort({'athleteNum':-1}).limit(1);
var express = require('express');
var Alipay = require('alipay').Alipay;
var app = express();
var router = express.Router();
var crypto = require('crypto');
var qs = require('querystring');
/**
 * 签名字符串
 * @param prestr 需要签名的字符串
 * @param key 私钥
 * return 签名结果
 */
//扫码及时到账
var data2 = { service:'alipay.mobile.qrcode.manage'
            ,partner:'2088911446896602' //合作身份者id，以2088开头的16位纯数字
            ,_input_charset:'utf-8'
            ,sign_type:'MD5'
            ,sign:''
            ,timestamp:getNowFormatDate()
            ,method:'add'
            ,biz_type:10
            ,trade_type:1
            ,need_address:'T'
            ,goods_info:{
                id:'21312321',
                name:'马拉松报名',
                price:'0.01'
            }
            ,return_url:'120.24.156.177:3000/pay/alipay/returnUrl'
            ,notify_url:'120.24.156.177:3000/pay/alipay/cb'
};

//网页端及时到账
var data = {service:'create_direct_pay_by_user'
    ,partner:'2088911446896602' //合作身份者id，以2088开头的16位纯数字
    ,_input_charset:'utf-8'
    ,sign:''
    ,sign_type:'MD5'
    ,return_url:'http://120.24.156.177:3000/pay/alipay/returnUrl'
    ,notify_url:'http://120.24.156.177:3000/pay/alipay/cb'
    ,out_trade_no:'2135429839823'
    ,subject:'马拉松报名'
    ,payment_type:'1'
    ,total_fee:0.01
    //,seller_id:'2088911446896602'
    //,buyer_email:'21907603@qq.com'
    ,seller_email:'22668611@qq.com'
};

var alipay = new Alipay(data);

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

//var requestUrl = alipay.buildRequestPara(data);
//var requestString = alipay.buildRequestParaToString(data);
//var requestForm = alipay.buildRequestForm(data);
//
//var md5Sign = function(prestr, key){
//    prestr = prestr + key;
//
//    return crypto.createHash('md5').update(prestr, 'utf8').digest("hex"); //crypto.createHash('md5').update(prestr).digest("hex");
//}
//
//app.get('/test',function(req,res){
//    res.send(requestForm);
//});
//
//
//console.log(requestUrl);
//console.log(requestString);
//console.log(requestForm);
//console.log(qs.stringify(data));
//
//app.listen(4000);


/**
 *
 * 验证支付宝回调来源
 */
var dataVerify = {
    service:'notify_verify'
    ,partner:'2088911446896602'
    ,notify_id:'e48701ffd4e20a321fa1ca2704bd8bf32a'
};

alipay.notifyVerify(dataVerify,function(data){
    console.log(data);
})



//router.get('/users/:user', function(req, res, next) {
//    console.log(req.params.user);
//    router.count ++;
//    console.log(router.count);
//    res.send({count: router.count});
//});
//router.param('user', function(req, res, next,id) {
//    console.log('id=' + id);
//    router.count ++;
//    //res.send({count: router.count});
//    id = id + 'param';
//    next();
//});

//
//router.get('/mgen/:id', function (req, res, next) {
//    console.log('mgen: ' + req.params.id);
//
//    //为空或者不存在会等于0
//    if (req.query.age <= 0)
//        next('route');
//    else if (req.query.age < 18)
//        next();
//    else
//        res.send('成年');
//}, function (req, res, next) {
//    res.send('未成年');
//});
//
//router.get('/ss/:id', function (req, res,next) {
//    console.log('ss--'+req.params.id);
//    res.send('参数错误');
//});
//
//router.param('id',function(req,res,next,id){
//   console.log('params:'+id);
//    next();
//});
//
//app.locals.title = 'My App';
//app.locals.email = 'me@myapp.com';
//app.set('title','My');
//console.log(app.locals.title);
//
//app.use(router);
//app.listen(4000);
//server.on('error', onError);
//server.on('listening', onListening);