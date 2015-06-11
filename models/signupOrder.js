/**
 * Created by maple on 15/5/26.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var OrderSchema = new Schema({
    realName:String,
    nikeName:String,
    tel:String,
    birthday:{type:Date},
    cardID:String,
    userID:{type:Schema.Types.ObjectId,ref:'base_users'},
    eventNum:{type:Schema.Types.ObjectId,ref:'busi_events'},
    emergencyContactPerson:String,
    emergencyTel:String,
    orderNum:String,
    orderStatus:Number,
    athleteNum:Number
});

OrderSchema.statics = {
    findAllItems:function(callback){  //获取所有的订单
        return this.find().populate('eventNum')
            .exec(callback);
    },
    findOrdersByUser:function(userID,callback){    //获取指定用户的订单
        return this.find({'userID' : userID}).populate('eventNum')
            .exec(callback);
    },
    findOrderByCardID:function(cardID,callback){  //获取指定身份证的订单
        return this.findOne({'cardID':cardID}).populate('eventNum')
            .exec(callback);
    },
    findOrderByOrderNum:function(orderNum,callback){  //获取指定身份证的订单
        return this.findOne({'orderNum':orderNum}).populate('eventNum')
            .exec(callback);
    }
};

module.exports = mongoose.model('busi_signupOrders', OrderSchema);