/**
 * Created by maple on 15/5/26.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var clubSchema = new Schema({
    clubName:String,
    personInCharge:{type:Schema.Types.ObjectId,ref:'base_users'},
    introduction:String,
    clubIcon:String
});
module.exports = mongoose.model('busi_club', clubSchema);