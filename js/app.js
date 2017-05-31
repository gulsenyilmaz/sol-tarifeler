// var webos3Models = ["SM5C", "SM5KC", "SM3C", "75XF3C", "XS2C", "XE3C", "LS75C", "LS73C", "UH5C"];
// var _ = window.top._;
// new window.top.DeviceInfo().getPlatformInfo(function(deviceInfo) {
//     var modelName = deviceInfo['modelName'].replace(/-.*$/, '');
//     var exactMatch = _.find(webos3Models, function(model) { return modelName == model; });
//     var weakMatch = _.find(webos3Models, function(model) { return modelName.indexOf(model) != -1; });
//     var match = exactMatch || weakMatch || '';
//
//     var webosIs3 = match != '';
//     if (webosIs3) {
//         console.log('This device is WebOS 3');
//         document.body.classList.remove('webOS');
//         document.body.classList.add('webOS3');
//     } else {
//         console.log('This device is WebOS 1&2');
//         document.body.classList.add('webOS');
//         document.body.classList.remove('webOS3');
//     }
//
// }, function(err) {
//     console.log('Could not get platform info');
// });

$( function() {

    $("#accordion").accordion({
        active: false,
        collapsible: true,
        heightStyle: "content"
    });

    $( "#detail_page" ).hide();
    $(".main_container").hide();

    var sliding = false;
    var currentSlide = 1;
    var currentSlider_id = "#slider_01";
    var waitForIdleMode;

    // startSetTimeOut();

    $( ".sub_button" ).on( "click", goToDetailPage);
    $( "#back_button" ).on( "click", goToMainPage);
    $( "#prev_button" ).click(function( event ) {

        console.log("prev_button");

        event.stopPropagation();

        moveSlider(1);

    });
    $( "#next_button" ).click(function( event ) {
        console.log("next_button");

        event.stopPropagation();

        moveSlider(-1);

    });


    $( "#main_01" ).attr("active", "false");
    $( "#main_02" ).attr("active", "false");
    $( "#main_03" ).attr("active", "false");

    var main_01_button_initial_pos = "-70px -49px";
    var main_01_button_active_pos = "-950px -51px";
    var main_02_button_initial_pos = "-70px -286px";
    var main_02_button_active_pos = "-950px -288px";
    var main_03_button_initial_pos = "-70px -530px ";
    var main_03_button_active_pos = "-950px -532px";

    // var main_01_button_initial_pos = "-20px -148px";
    // var main_01_button_active_pos = "-20px -886px";
    // var main_02_button_initial_pos = "-20px -382px";
    // var main_02_button_active_pos = "-20px -1120px";
    // var main_03_button_initial_pos = "-20px -626px";
    // var main_03_button_active_pos = "-20px -1364px";

    $("#main_01").click(function (e){


        $("#main_02").css({"background-position" : main_02_button_initial_pos});
        $("#main_03").css({"background-position" : main_03_button_initial_pos});

        $("#main_02").attr("active", "false");
        $("#main_03").attr("active", "false");

        if($(this).attr("active") === "false"){

            $(this).attr("active", "true");

            $(this).css({"background-position" : main_01_button_active_pos});

        }
        else{

            $(this).attr("active", "false");

            $(this).css({"background-position" : main_01_button_initial_pos});

        }

        startSetTimeOut();

    });

    $("#main_02").click(function (e){

        $("#main_01").css({"background-position" : main_01_button_initial_pos});
        $("#main_03").css({"background-position" : main_03_button_initial_pos});
        $("#main_01").attr("active", "false");
        $("#main_03").attr("active", "false");

        if($(this).attr("active") === "false"){

            $(this).attr("active", "true");

            $(this).css({"background-position" :main_02_button_active_pos});

        }
        else{

            $(this).attr("active", "false");

            $(this).css({"background-position" : main_02_button_initial_pos});

        }

        startSetTimeOut();

    });

    $("#main_03").click(function (e){

        $("#main_01").css({"background-position" : main_01_button_initial_pos});
        $("#main_02").css({"background-position" : main_02_button_initial_pos});
        $("#main_01").attr("active", "false");
        $("#main_02").attr("active", "false");

        if($(this).attr("active") === "false"){

            $(this).attr("active", "true");

            $(this).css({"background-position" : main_03_button_active_pos});

        }
        else{

            $(this).attr("active", "false");

            $(this).css({"background-position" : main_03_button_initial_pos});

        }

        startSetTimeOut();

    });

    $("#bgvid").click(function (event) {

        var vid = document.getElementById("bgvid");
        vid.pause();


        $(".main_container").show();
        $(this).hide();
    });

    function restartVideo(){

        console.log("restartVideo");

        $("#main_01").css({"background-position" : main_01_button_initial_pos});
        $("#main_02").css({"background-position" : main_02_button_initial_pos});
        $("#main_03").css({"background-position" : main_03_button_initial_pos});
        $("#main_01").attr("active", "false");
        $("#main_02").attr("active", "false");
        $("#main_03").attr("active", "false");

        $( "#accordion" ).accordion( "option", "active", false );
        goToMainPage();

        var vid = document.getElementById("bgvid");
        vid.play();


        $(".main_container").hide();
        $("#bgvid").show();

    }

    function startSetTimeOut(){
        console.log("startSetTimeOut");
        // if(waitForIdleMode){
        clearTimeout(waitForIdleMode);
        // }
        waitForIdleMode = setTimeout(function() {
            restartVideo()

        }, 30000 );
    }

    function hideSliders(){
        $( ".slider" ).hide();
    }

    function initSlider(slider_id, index){

        console.log("-----------------initSlider----------------");
        currentSlider_id = slider_id;

        hideSliders();

        $( "#prev_button" ).removeAttr("disabled");
        $( "#next_button" ).removeAttr("disabled");
        $( "#back_button" ).removeAttr("disabled");

        $( currentSlider_id ).show();
       // $( currentSlider_id ).css({ opacity: 1 });


        var slideCount = $(slider_id+' ul li').length;
        var slideWidth = $(slider_id+' ul li').width();
        var slideHeight = $(slider_id+' ul li').height();
        var sliderUlWidth = slideCount * slideWidth;
        sliding = false;
        currentSlide = index;

        $(slider_id).css({ width: slideWidth, height: slideHeight });

        $(slider_id+' ul').css({ width: sliderUlWidth, marginLeft: -slideWidth});
        // $(slider_id+' ul li:last-child').prependTo(slider_id+' ul');


        reArrangeSlides();

        // var pos = $(slider_id+' ul').position();
        // console.log("pos.left: " +pos.left);
        //
        console.log("currentSlider_id: " +currentSlider_id);
        console.log("currentSlide: " +currentSlide);
        // console.log("sliding: " +sliding);
        // console.log("slideCount: " +slideCount);
        // console.log("slideWidth: " +slideWidth);
        // console.log("slideHeight: " +slideHeight);
        // console.log("sliderUlWidth: " +sliderUlWidth);
        console.log("-----------------initSlider Ends----------------");

    }

    function reArrangeSlides() {



        console.log($(currentSlider_id+' ul li:nth-child(2)').attr("id"));
        console.log(currentSlider_id+"_0"+currentSlide);

        if(currentSlider_id+"_0"+currentSlide !== "#"+$(currentSlider_id+' ul li:nth-child(2)').attr("id")){
            $(currentSlider_id+' ul li:last-child').prependTo(currentSlider_id+' ul');
            reArrangeSlides();
        }


        $(currentSlider_id+' ul li:first-child').css({ opacity: 0 });
        $( "#detail_page" ).show();



        setTimeout(function() {
            $(".main_container").css({
                '-webkit-transform': 'translate3d(-1080px,0px, 0px)'
                , '-moz-transform': 'translate3d(-1080px, 0px, 0px)'
                , 'transform': 'translate3d(-1080px, 0px, 0px)'
            });
        }, 100 );

        startSetTimeOut();

        return;

    }

    function moveSlider(direction) {

        console.log("------------------moveSlider----------------");
        console.log("direction: " +direction);
        console.log("currentSlide: " +currentSlide);
        console.log("sliding: " +sliding);

        var slider_id = currentSlider_id;

        $(currentSlider_id+' ul li:first-child').css({ opacity: 1 });

        $(slider_id+' ul').css("transform", "all 1.0s ease-in-out");
        $(slider_id+' ul').css("-webkit-transition", "all 1.0s ease-in-out");
        $(slider_id+' ul').css("-moz-transition", "all 1.0s ease-in-out");
        $(slider_id+' ul').css("-o-transition", "all 1.0s ease-in-out");
        $(slider_id+' ul').css("transition", "");



        var slideCount = $(slider_id+' ul li').length;
        var slideWidth = $(slider_id+' ul li').width();

        currentSlide +=(direction*(-1));
        if(currentSlide === 0){
            currentSlide = slideCount;
        }
        if(currentSlide > slideCount){
            currentSlide = 1;
        }
        console.log("currentSlide: " +currentSlide);

        if(!sliding) {

            sliding = true;
            $( "#prev_button" ).attr("disabled", true);
            $( "#next_button" ).attr("disabled", true);
            $( "#back_button" ).attr("disabled", true);

            var pos = $(slider_id+' ul').position();
            var new_pos = pos.left+(direction*slideWidth);

            setTimeout(function() {
                $(slider_id+' ul').css({
                    '-webkit-transform': 'translate3d(' +String(new_pos)+ 'px,0px, 0px)'
                    , '-moz-transform': 'translate3d(' +String(new_pos)+ 'px, 0px, 0px)'
                    , 'transform': 'translate3d(' +String(new_pos)+ 'px, 0px, 0px)'
                });
            }, 50 );

            setTimeout(function() {
                slidePageCallback(direction, slider_id);
             }, 1050 );


            console.log("sliding: " +sliding);
            console.log("new_pos: " +new_pos);
        }


        console.log("-----------------moveSlider Ends------------");
    }

    function slidePageCallback(direction, slider_id) {

        console.log("-----------------slidePageCallback----------------");
        console.log("sliding: " + sliding );


        if(sliding){

            if(direction === 1){

                $(slider_id+' ul li:last-child').prependTo(slider_id+' ul');

                console.log("Appended Left: " );
            }
            else{

                $(slider_id+' ul li:first-child').appendTo(slider_id+' ul');

                console.log("Appended Right: ");
            }
            sliding = false;

            console.log("sliding: " + sliding );

            $(slider_id+' ul').css({
                '-webkit-transform': "none"
                , '-moz-transform': "none"
                , 'transform': "none"
            });

            $(slider_id+' ul').css("transform", "none");
            $(slider_id+' ul').css("-webkit-transition", "none");
            $(slider_id+' ul').css("-moz-transition", "none");
            $(slider_id+' ul').css("-o-transition", "none");
            $(slider_id+' ul').css("transition", "none");

        }

        $( "#back_button" ).removeAttr("disabled");
        $( "#prev_button" ).removeAttr("disabled");
        $( "#next_button" ).removeAttr("disabled");
        console.log("-----------------slidePageCallback Ends----------------");


        startSetTimeOut();


    }

    function goToMainPage() {
        console.log("goToMainPage");

        $(currentSlider_id+' ul li:first-child').css({ opacity: 0 });

        $(".main_container").css({
            '-webkit-transform': 'translate3d(0px,0px, 0px)'
            , '-moz-transform': 'translate3d(0px, 0px, 0px)'
            , 'transform': 'translate3d(0px, 0px, 0px)'
        });
        detailPageCallback();


        // event.stopPropagation();

        return false;
    }

    function goToDetailPage() {

        console.log("-----------------goToDetailPage----------------");
        var id = $(this).attr("id");
        var index = parseInt(id.charAt(id.length-1));
        console.log("index : "+ index);
        var slide_id = "#slider_"+id.split("_")[2];

        initSlider(slide_id, index);


        console.log("-----------------goToDetailPage Ends----------------");
        return false;
    }

    function mainPageCallback() {
        console.log("mainPageCallback");
        setTimeout(function() {
            $( "#accordion" ).accordion( "option", "active", false );

        }, 1000 );
    }

    function detailPageCallback() {
        console.log("detailPageCallback");
        setTimeout(function() {

            $( "#detail_page" ).hide();
            $(currentSlider_id+' ul li:first-child').css({ opacity: 1 });

            startSetTimeOut();

        }, 1000 );
    }

} );
