//向服务器发起请求
/***
**  如果没有data参数，则为null
**  url：请求地址
**  type：请求类型
**  success：成功执行回调函数
**  error：错误执行回调函数
**  引用时放在jQuery后
***/
function ajaxRequest(url, type, success, error, data,datatype) {
    $.ajax({
        type: type,
        dataType: datatype,
        url: url,
        data: data,
        success: function (data, status) {
            success(data);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            error(XMLHttpRequest);
        }
    });
}