/**
 * Created by maple on 15/5/26.
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var eventSchema = new Schema({
    eventName:String,
    eventOrganizers:String,
    registrationFees:Number
});
module.exports = mongoose.model('busi_events', eventSchema);