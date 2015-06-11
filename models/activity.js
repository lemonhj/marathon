/**
 * Created by maple on 15/5/26.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var activitySchema = new Schema({
    title:String,
    collectiveTime:{type:Date},
    venue:String,
    linkman:String,
    linkTel:String,
    content:String,
    enrollmentsTime:{type:Date},
    enrollmenteTime:{type:Date},
    clubID:{type:Schema.Types.ObjectId,ref:'busi_club'},
    status:Number,
    publisher:{type:Schema.Types.ObjectId,ref:'base_users'},
    actPic:[]
});
module.exports = mongoose.model('activity', activitySchema);