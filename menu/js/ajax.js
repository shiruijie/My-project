var ajaxPost = function(url, data, success, complete) { // ajax
    try {
        data = data || {};
        success = success || function() {
        };
        complete = complete || function(){};
        $.ajax({
            "url" : url,
            "type" : "POST",
            "data" : data,
            "contentType" : "application/json;charset=UTF-8",
            "success" : function(result) {
                success(result.data);
            },
            "complete": function(xhr, ts){
                complete();
            }
        });
    } catch (e) {
        console.log(e);
    }
}
