$(function () {
    var obj = {};
    var href = decodeURIComponent(window.location.href);
    function getParams(sHref) {
        var args = sHref.split('?');
        if(args[0] == sHref){
            return ""
        }
        var arr = args[1].split('&');
        for(var i = 0; i <arr.length;i++){
            var arg = arr[i].split('=');
            obj[arg[0]] = arg[1];
        }
        return obj;
    }
    getParams(href);
    $('#title').text(obj.title)
    $('#picture').attr('src',obj.picture);
    $('#heat').text('热度：'+obj.heat+'万人听过')
    $('#intro').text('简介：'+obj.intro)
    var str = 'timestamp:'+ new Date().Format('yyyy-MM-ddhh:mm:ss')+',deviceCode:'+ obj.deviceCode +',ver:'+ obj.ver +',unilife';
    var sign = md5(str);
    var timeConvert = function (timestamp) {
        var minutes = Math.floor(timestamp / 60);
        var seconds = Math.floor(timestamp - (minutes * 60));

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        timestamp = minutes + ':' + seconds;
        return timestamp;
    };
    function getMessage(){
        $.ajax({
            type:'POST',
            url:' http://fridge.unilifemedia.com:8100/service/wangymusic/tracks',
            async:false,
            data:{
                requestData:JSON.stringify({
                    "data":{
                        "sheetId":obj.sheetId
                    },
                    "header":{
                        "deviceCode":obj.deviceCode,
                        "sign":sign,
                        "timestamp":new Date().Format('yyyy-MM-ddhh:mm:ss'),
                        "ver":obj.ver,
                    },
                    "offset":obj.offset,
                    "pageSize":obj.pageSize
                })
            },
            success:function (res) {
                var html = [];
                for(var i = 0; i < res.data.length; i++){
                    if(i < 9){
                        html.push('<li>')
                        html.push('<a href="index.html?url='+ encodeURI(JSON.stringify(res.data[i])) +'">')
                        html.push('<div class="left"><b>'+ 0+(i+1)+'</b><span>'+ res.data[i].name +'</span></div>')
                        html.push('<div class="right">'+timeConvert(res.data[i].duration/1000)+'</div>')
                        html.push('</a>')
                        html.push('</li>')
                    }else if(res.data.length >=9){
                        html.push('<li>')
                        html.push('<a href="index.html?url='+ encodeURI(JSON.stringify(res.data[i])) +'">')
                        html.push('<div class="left"><b>'+ (i+1)+'</b><span>'+ res.data[i].name +'</span></div>')
                        html.push('<div class="right">'+timeConvert(res.data[i].duration/1000)+'</div>')
                        html.push('</a>')
                        html.push('</li>')
                    }
                }
                $('#musicList').html(html.join(""))
            },
            error:function (err) {
                console.log(err)
            }
        })
    }
    getMessage()
    // $('#musicList li').click(function (data) {
    //     console.log(data)
    //     // window.location.href='http://www.baidu.com?url='+data
    // })
});
