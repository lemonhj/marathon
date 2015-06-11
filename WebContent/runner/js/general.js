// JavaScript Document
  function datereturn(str){
    var str1 = str.substring(0,10); 
     return str1;
	  }
	  
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
  