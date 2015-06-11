/**
 * Created by maple on 15/6/2.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var appVersionSchema = new Schema({
    app:String,
    eventOrganizers:String,
    registrationFees:Number
});
module.exports = mongoose.model('busi_app_versions', appVersionSchema);