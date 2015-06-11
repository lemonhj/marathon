/**
 * Created by maple on 15/5/26.
 * 横幅模型
 */
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bannerSchema = new Schema({
    banner_url:String,
    banner_pic:String,
    article_id:String,
    banner_order:String,
    banner_title:String
});
module.exports = mongoose.model('busi_banners', bannerSchema);