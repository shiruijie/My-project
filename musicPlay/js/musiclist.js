 var musiclist = {
        data:[
            {

            }
        ]
    };
    var query = window.location.search;
    query = decodeURI(query);
    var obj = query.split('?')[1];
    var obj1 = obj.substr(4,obj.length)
    obj2 = JSON.parse(obj1)
    musiclist.data[0] = obj2
 console.log(musiclist)

