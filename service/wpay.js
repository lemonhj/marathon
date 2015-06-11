/**
 * Created by maple on 15/5/27.
 */
var WXPay = require('weixin-pay');
var fs = require('fs');

var wxpay = WXPay({
    appid: 'wxae304368006e4bd1',
    mch_id: '1239335902',
    partner_key: '74D758DFC760BEEEA4DED74C16724DA2'//微信商户平台API密钥
    // pfx: fs.readFileSync('../cert/wxpay_cert.p12') //微信商户平台证书
});

var WPay = {
    fetchSceanUrl : function(orderDetail,res){
        wxpay.createUnifiedOrder(orderDetail,function(err, result){
            res.json({code:200,msg:"success",data:result.code_url});
        });
    },
    useWXCallback:function(fn){
        return wxpay.useWXCallback(fn);
    }
}





/*
{
    body: '扫码支付测试',
    out_trade_no: (new Date()).getTime()+Math.random().toString().substr(2, 10),
    d: 1,
    spbill_create_ip: '192.168.2.210',
    notify_url: 'http://wxpay_notify_url',
    trade_type: 'NATIVE',
    product_id: '1234567890'
}
*/


exports = module.exports = WPay;