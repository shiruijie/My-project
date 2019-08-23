$(document).ready(function() {
    //当前播放器状态
    var playStatus = {
        currentTrackLen: musiclist.data.length,
        currentTrackIndex: 0,
        currentTime: 0,
        currentTotalTime: 0,
        playStatus: false,
    };

    //播放器控制方法
    var playerControls = {
        //歌曲基本信息
        trackInfo: function (args) {
            var obj = musiclist.data[playStatus.currentTrackIndex];

            args = args || {
                name: obj.name,//歌名
                artist: obj.albumArtistName,//歌手名字
                album: obj.albumName,//专辑名
                // albumPic:obj.album.picUrl + '?param=270y270',
                total: obj.duration,
                src: obj.url,
                img1v1Url: obj.coverUrl
            };

            $('.title h1').text(args.name);
            $('.title h2').text(args.artist);
            // $('.player .trackInfo .album').text(args.album);
            // $('.star').attr('background','url(' + args.albumPic + ')');
            $('.star img').attr('src', args.img1v1Url);
            $('.progress #totalTime').text(timeConvert(args.total / 1000));
            playStatus.currentTotalTime = Math.floor(args.total / 1000);
            $('#audio source').attr('src', args.src);
        },

        // //播放、暂停状态处理
        playStatus: function () {
            $('.operate  #start i').attr('class', 'icon iconfont icon-' + (playStatus.playStatus ? 'zanting' : 'kaishi'));
            $('.xuanzhuan').css('animation-play-state', playStatus.playStatus ? 'running' : 'paused')
            if (playStatus.playStatus) {
                $('.pointer').removeClass('taiqi').addClass('luoxia')
            } else {
                $('.pointer').removeClass('luoxia').addClass('taiqi')
            }
            if (playStatus.playStatus) {
                $('#audio')[0].play();
            } else {
                $('#audio')[0].pause();
            }
        },
        //
        //当前时间和进度处理
        playTime: function () {
            $('.progress #currentTime').text(timeConvert(playStatus.currentTime));
            $('.progress-bar .rdy').css('width', playStatus.currentTime / playStatus.currentTotalTime * 100 + '%');
        }

    };

    var timeConvert = function (timestamp) {
        var minutes = Math.floor(timestamp / 60);
        var seconds = Math.floor(timestamp - (minutes * 60));

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        timestamp = minutes + ':' + seconds;
        return timestamp;
    };

    $(function () {
        playerControls.playStatus();
        $('.operate #start').click(function(){
            playStatus.playStatus = !playStatus.playStatus;
            if(playStatus.playStatus){
                playerControls.trackInfo();
                playerControls.playTime();
                playerControls.playStatus();
            }else{
                playerControls.playStatus();
            }
        });

        $('.operate #previous').click(function(){
            if(playStatus.currentTrackIndex - 1 < 0){
                // alert('已经没有上一首了');
            }else{
                playStatus.currentTrackIndex --;
            }

            $('#audio').remove();
            $('.content').append('<audio id="audio"><source src=""></audio>');
            playerControls.trackInfo();
            playerControls.playStatus();
        });

        $('.operate #next').click(function(){
            if(playStatus.currentTrackIndex + 1 >= playStatus.currentTrackLen){
                // alert('已经没有下一首了');
            }else{
                playStatus.currentTrackIndex ++;
            }

            //换src的方法没法切换声音，试了好几种方法都不行，只能删了再重建了
            $('#audio').remove();
            $('.content').append('<audio id="audio"><source src=""></audio>');
            playerControls.trackInfo();
            playerControls.playStatus();
        });

        setInterval(function(){
            playStatus.currentTime = $('#audio')[0].currentTime;
            console.log(playStatus.currentTime)
            playerControls.playTime();
            if(playStatus.currentTime >= playStatus.currentTotalTime){
                $('.operate #next').click();
            }
        }, 300)
    });

    })
