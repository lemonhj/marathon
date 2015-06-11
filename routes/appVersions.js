/**
 * Created by maple on 15/6/2.
 */
var express = require('express');
var router = express.Router();

/* 获取当前版本号 */
router.get('/', function(req, res) {
    res.json({code:200,msg:'success',data:{ios:{versionName:'1.0',downloadUrl:''},android:{versionName:'1.0',downloadUrl:'http://120.24.156.177:3000/WebContent/download/pz.apk'}}});
});

module.exports = router;