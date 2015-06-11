// JavaScript Document


   
   
    function getUrlParam(string) {  
    var obj = {};  
    if (string.indexOf("?") != -1) {  
        var string = string.substr(string.indexOf("?") + 1);  
        var strs = string.split("&");  
        for(var i = 0; i < strs.length; i ++) {  
            var tempArr = strs[i].split("=");  
            
			if(tempArr.length>2){
				   obj[tempArr[0]] = unescape(tempArr[1]+"="+tempArr[2]);
				} else{
					obj[tempArr[0]] = unescape(tempArr[1]); 
					}
        }  
    }  
    return obj;  
}
   
   	   function showLoader() {  
    $.mobile.loading('show', {  
        text: '加载中...', //加载器中显示的文字  
        textVisible: true, //是否显示文字  
        theme: 'a',        //加载器主题样式a-e  
        textonly: false,   //是否只显示文字  
        html: ""           //要显示的html内容，如图片等  
    });  
}  
  

function hideLoader()  
{  
    //隐藏加载器  
    $.mobile.loading('hide');  
} 