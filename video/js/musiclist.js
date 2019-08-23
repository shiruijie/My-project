/*var musiclist = {
    data: [
        {
            "name": "人として軸がぶれている(テレビサイズ)",
            "type": "track",
            "albumName": "さよなら絶望先生 オリジナルサウンドトラック 『絶望劇伴撰集』",
            "albumId": 2389562,
            "albumArtistId": 159887,
            "albumArtistName": "長谷川智樹",
            "coverUrl": "http://p1.music.126.net/HGf_8tGemw3-zCGQaKWEYw==/109951163351695798.jpg",
            "mvId": 0,
            "duration": 92866,
            "canPlay": true,
            "id": "559EC22EE4E0C01ABD0C293FF19FBEB6",
            "url": "http://m10.music.126.net/20190807161819/f573d216c5d8f5fc785a51c94b8a5adc/ymusic/89ee/77eb/b35d/534b1b38dd6ad81ba02c6678b90ce6c9.mp3",
            "collect": false
        },
    ]
}*/
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
