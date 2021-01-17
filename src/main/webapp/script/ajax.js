// GET, POST, PUT, DELETE 정의
// 하단 예시
define([
    'jquery'
], function ($){
    function ajax(params){
        var loop = "";
        $.ajax({
            type : 'POST',
            url : '/data/board',
            contentType : "application/x-www-form-urlencoded; charset=UTF-8",
            data : params,
            async : false,
            success: function (data) {
                //$('#table').html(template({maps: JSON.parse(data)}));
                loop = data;
            }
        });
        return loop;
    }
    return ajax;
})
