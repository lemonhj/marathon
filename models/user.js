/**
 * Created by maple on 15/5/26.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema = new Schema({
    tel:String,
    pwd:String,
    nickName:String,
    sex:String,
    height:Number,
    weight:Number,
    birthday:{type:Date},
    location:String,
    belongTeam:String,
    headIcon:String,
    clubID:{type:Schema.Types.ObjectId,ref:'busi_club'}
});
module.exports = mongoose.model('base_users', userSchema);