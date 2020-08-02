// const home_Path = "../yelong";
const home_Path = "https://cdn.jsdelivr.net/gh/mizhiyugan529/resource/live2d3/yelong";

// 封装异步加载资源的方法
function loadExternalResource(url, type) {
    return new Promise((resolve, reject) => {
        let tag;

        if (type === "css") {
            tag = document.createElement("link");
            tag.rel = "stylesheet";
            tag.href = url;
        } else if (type === "js") {
            tag = document.createElement("script");
            tag.src = url;
        }
        if (tag) {
            tag.onload = () => resolve(url);
            tag.onerror = () => reject(url);
            document.head.appendChild(tag);
        }
    });
}

var judge12 = window.location.href;
if ((judge12.indexOf("bilibilipy") != -1 && judge12.indexOf("http") != -1) || judge12.indexOf("nmmnm") != -1) {
    Promise.all([
        loadExternalResource("https://cdn.jsdelivr.net/gh/wangstong/live2dm3/live2d/js/live2dcubismcore.min.js","js"),
        loadExternalResource("https://cdn.jsdelivr.net/gh/mizhiyugan529/live2d3/Samples/TypeScript/Demo/dist/bundle.js", "js"),
        loadExternalResource("https://cdn.jsdelivr.net/gh/mizhiyugan529/resource/flavr/css/animate.css", "css"),
        loadExternalResource("https://cdn.jsdelivr.net/gh/mizhiyugan529/resource/flavr/css/flavr.css", "css"),
        loadExternalResource("https://cdn.jsdelivr.net/gh/mizhiyugan529/resource/flavr/js/flavr.min.js", "js")
        ,
        loadExternalResource(home_Path + "/live2d.css", "css")
        // ,
        // loadExternalResource(home_Path + "message.js", "js")

    ]).then(() => {
        allthescript()
    });
} else {
// 加载 css js
    Promise.all([
        loadExternalResource("https://cdn.bootcss.com/jquery/3.4.1/jquery.js", "js")
    ]).then(() => {
        Promise.all([
            loadExternalResource("https://cdn.jsdelivr.net/gh/wangstong/live2dm3/live2d/js/live2dcubismcore.min.js","js"),
            loadExternalResource("https://cdn.jsdelivr.net/gh/mizhiyugan529/live2d3/Samples/TypeScript/Demo/dist/bundle.js", "js"),
            loadExternalResource("https://cdn.jsdelivr.net/gh/mizhiyugan529/resource/flavr/css/animate.css", "css"),
            loadExternalResource("https://cdn.jsdelivr.net/gh/mizhiyugan529/resource/flavr/css/flavr.css", "css"),
            loadExternalResource("https://cdn.jsdelivr.net/gh/mizhiyugan529/resource/flavr/js/flavr.min.js", "js")
            ,
            loadExternalResource(home_Path + "/live2d.css", "css")
        ]).then(() => {
            allthescript()
        });
    });

}


function allthescript() {
    // $("body").prepend('<div id="live2ddiv" style="-khtml-user-select: none; user-select: none;-moz-user-select:none;touch-action: none;position: fixed; opacity: 1; left: 0px; bottom: 0px; z-index: 99999; width:150px;height:150px;"><canvas id="live2d" width="300" height="300" class="live2d" style="width:150px;height:150px;pointer-events: none;"></canvas></div>')
    $("body").prepend('<div class="yeLive" id="live2ddiv"><div class="ye_sayings live2d" style="opacity:0"></div><canvas id="live2d" width="300" height="300" class="live2d"></canvas><span class="glyphicon glyphicon-comment" id=chatYe></span><span class="glyphicon glyphicon-registration-mark" id=chatYeRoll></span></div><div id=yechatdiv style="display: none;"><input id=yechatinput autocomplete="off"><button id=yechatsubmit>发送</button></div>')

    var div2 = document.getElementById("live2ddiv");
    var xydic = localStorage.getItem("yeyesetting")
    if (xydic != null) {
        xydic = JSON.parse(xydic)
        xydic = xydic["xydic"]

        var x = xydic["x"]
        var y = xydic["y"]
        x = x > 0 ? x : 0
        x = x < document.documentElement.clientWidth - div2.clientWidth ? x : document.documentElement.clientWidth - div2.clientWidth
        y = y > 0 ? y : 0
        y = y < document.documentElement.clientHeight - div2.clientHeight ? y : document.documentElement.clientHeight - div2.clientHeight
        div2.style.left = x + "px";
        div2.style.top = y + "px";
    }

    var resourcesPath = home_Path+"/"; // 指定资源文件（模型）保存的路径
    var backImageName = 'bg/touming.png'; // 指定背景图片
    // var backImageName = ''; // 指定背景图片
    var modelDir = ['yelong']; // 指定需要加载的模型
    initDefine(resourcesPath, backImageName, modelDir); // 初始化模型
    console.log("设置模型路径")
    initModel();
    console.log("初始化模型")




    setTimeout(function () {
        // playLive2dMotion("ye",0,3)
        $("#live2ddiv").click(function () {
                playLive2dMotion("ye", 0, 3)
            showMessage(["兵法有云：敌力不露，阴谋深沉，未可轻进，应遍探其锋。佯攻打草，引蛇出洞，懂不懂？","别闹","别闹..."])
            }
        );
    }, 1000)

//是否拖动
    var flag = false;
//
    var cur = {
        x: 0,
        y: 0
    }
    var nx, ny, dx, dy, x, y;

    function down() {


        flag = true;
        var touch;
        if (event.touches) {
            touch = event.touches[0];
        } else {
            touch = event;
        }
        cur.x = touch.clientX;
        cur.y = touch.clientY;
        dx = div2.offsetLeft;
        dy = div2.offsetTop;
    }

    function move() {
        if (flag) {
            showMessage(["你要带我去哪呀","低调行事。"])
            var touch;
            if (event.touches) {
                touch = event.touches[0];
            } else {
                touch = event;
            }
            nx = touch.clientX - cur.x;
            ny = touch.clientY - cur.y;
            x = dx + nx;
            y = dy + ny;
            x = x > 0 ? x : 0
            x = x < document.documentElement.clientWidth - div2.clientWidth ? x : document.documentElement.clientWidth - div2.clientWidth
            y = y > 0 ? y : 0
            y = y < document.documentElement.clientHeight - div2.clientHeight ? y : document.documentElement.clientHeight - div2.clientHeight
            div2.style.left = x + "px";
            div2.style.top = y + "px";
            var xydic = {"x": x, "y": y}
            var dic = JSON.stringify({"xydic": xydic});
            localStorage.setItem("yeyesetting", dic)
            //阻止页面的滑动默认事件
            document.addEventListener("touchmove", function (event) {
                event.preventDefault();
            }, false);
        }
    }

//鼠标释放时候的函数
    function end() {
        flag = false;
    }

    var div2 = document.getElementById("live2ddiv");
    div2.addEventListener("mousedown", function () {
        down();
    }, false);
    div2.addEventListener("touchstart", function () {
        down();
    }, false)
    div2.addEventListener("mousemove", function () {
        move();
    }, false);
    div2.addEventListener("touchmove", function () {
        move();
    }, false)
    document.body.addEventListener("mouseup", function () {
        end();
    }, false);
    div2.addEventListener("touchend", function () {
        end();
    }, false);
    roll()
}


// 对话系统和roll点系统

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    //console.log('showMessage', text);
    $('.ye_sayings').stop();
    $('.ye_sayings').html(text).fadeTo(200, 1);
    if (timeout == null) timeout = 5000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.ye_sayings').stop(true).css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.ye_sayings').delay(timeout).fadeTo(200, 0);
}

function roll() {
    $("#chatYeRoll").click(function(){
        //昵称
        var yetounn = localStorage.yetounn;
        if (yetounn==null||yetounn==""){
            yetounn="无昵称"
        };
        showMessage(["先发制人!","一鼓作气!","出来吧！100点","这磨磨蹭蹭的多耽误功夫，不如我们ROLL点决胜负，输的自己GG"],5000)
        var html = ' <div class="form-row" style="max-height:200px;overflow:auto">' +
            ' <div style="max-width:300px"><div class="input-group" style="width:100%"><span class="input-group-addon" style="background:#204d74;border:#204d74;color:white !important;" id="basic-addon1">昵称</span><input type="text" id="yetounninput" class="form-control" value='+yetounn+' placeholder='+yetounn+' aria-describedby="basic-addon1"></div>投掷:<div class="btn-group btn-group-justified" data-toggle="buttons" id=yetouzhi>'+
            '  <label class="btn btn-primary active" Onclick=$("#rollinput").hide();$("#zdytou").hide()>	<input type="radio" class="yeroll" checked name="yeroll" id="option1" value="1"> 默认</label>'+
            '   <label class="btn btn-primary" Onclick=$("#rollinput").hide();$("#zdytou").show()>	<input type="radio" class="yeroll" name="yeroll" id="option2" value="0"> 设定</label>'+
            ' <label class="btn btn-primary" Onclick=$("#rollinput").show();$("#zdytou").hide()>	<input type="radio" class="yeroll" name="yeroll" id="option3" value="2"> 自定义选项</label></div>'+
            '<input id= rollinput placeholder="请输入自定义选项,用/分开" style="display:none;color:#333"/>'+
            '<div id=zdytou style="display:none">骰子个数:'+
            '<input id="yetounum" placeholder="骰子数量(不填写则默认为1)" oninput = value=value.replace(/[^\\d]/g,"") style="color:#333"/>'+
            '最大点数:<input id="yetoumax" placeholder="骰子最大值(不填写则默认为100)" oninput = value=value.replace(/[^\\d]/g,"") style="color:#333"/>'+
            '最小点数:<input id="yetoumin" placeholder="骰子最小值(不填写则默认为1)" oninput = value=value.replace(/[^\\d]/g,"") style="color:#333"/></div>'+
            '投掷事件:<input id="yetouthing" placeholder="投掷事件(可不填写)" style="color:#333"/>默认则投掷1个1~100点的骰子,设定则自定义骰子数量与大小值,自定义则输入自定选项'+
            ' <div class="input-group" style="width:300px">' + ' </div>' + ' <div class="form-row">' + ' <input type="checkbox" name="fatie" ' + ' id="fatie"/>'

            + ' <label for="check">不发帖</label>' + ' </div>';

        new $.flavr({ title : '叶楼骰子', dialog : 'form', form : { content: html },
            buttons: {
                danger: {
                    text: '开始投掷',
                    style: 'danger',
                    action: function( $container, $form ){
//存昵称
                        yetounn=$('#yetounninput').val();
                        localStorage.yetounn=yetounn
//选择了哪个选项的骰子
                        var selectedTou = $('#yetouzhi .yeroll:checked').val();
                        var Tounum ="1";
                        var Toumax="100";
                        var Toumin="1";
                        var Touxx=""
                        var TouTings=""
                        if(selectedTou=="0"){
                            //自定义骰子
                            Tounum=$('#yetounum').val()==null|$('#yetounum').val()==""?"1":$('#yetounum').val();
                            Toumax=$('#yetoumax').val()==null|$('#yetoumax').val()==""?"100":$('#yetoumax').val();
                            Toumin=$('#yetoumin').val()==null|$('#yetoumin').val()==""?"1":$('#yetoumin').val();
                        }else if(selectedTou=="2"){
                            //自定义选项
                            Touxx=$('#rollinput').val()==null|$('#rollinput').val()==""?"无选项":$('#rollinput').val();
                        };
//投掷事件
                        TouTings=$('#yetouthing').val()==null|$('#yetouthing').val()==""?"":$('#yetouthing').val();
//处理数据
                        if(Toumax<Toumin){
                            showMessage(["骰子最大值小于最小值了","最大值小于最小值?赖皮啊！不行不行，这个不算！"],12000)
                            return false;
                        }
                        if(Tounum==0){
                            showMessage("0个骰子?你不会是来捣乱的吧",12000)
                            return false;
                        }
                        var rollarray=["roll",selectedTou,Tounum,Toumax,Toumin,Touxx,TouTings]
//是否发帖
                        var notneedfatie=$("#fatie").prop("checked");
                        sendmessageYe(rollarray,!notneedfatie)
                    }
                },
                cancel: {
                    text: '取消',
                    style: 'default'
                }
            }
        });});
    $("#chatYe").click(function(){
        showMessage(["副本ing，等下","来啦？"],5000);
        $("#yechatdiv").toggle();
    });
    $("#yechatsubmit").click(function(){
        var content = $("#yechatinput").val();
        if(content.length<1){alert('内容不得小于1个字符');return false;}
        else{
            content="@叶楼机器人"+content;
            $("#yechatsubmit").text("发送中");
            $("#yechatsubmit").attr("disabled","disabled");
            $("#yechatinput").attr("disabled","disabled");
            $("#yechatinput").val("")
            $.ajax({
                url : "https://www.yeallye.com/yerobot/api/comment/ye.php",
                type : "POST",
                dataType: "json",
                data:{content:content},
                success:function(json){
                    data=json;
                    if(data.needfatie!="1"){
                        showMessage(data.reply,5000);
                        $("#yechatsubmit").text("发送");
                        $("#yechatsubmit").removeAttr("disabled");
                        $("#yechatinput").removeAttr("disabled");
                        $("#yechatinput").focus();}
                    else if(data.needfatie=="1"){
                        showMessage(data.reply+",将发送结果到帖子中",5000);
                        $("#wenbenkuang").val(data.reply);
                        $("#replybtt").click();}else{
                        showMessage("出错了",5000);
                        $("#yechatsubmit").text("发送");
                        $("#yechatsubmit").removeAttr("disabled");
                        $("#yechatinput").removeAttr("disabled");
                        $("#yechatinput").focus();
                    };
                },
                error:function(jqXHR ,textStatus , errorThrown){
                    alert(jqXHR.responseText+textStatus+errorThrown);
                    $("#yechatsubmit").text("发送");
                    $("#yechatsubmit").removeAttr("disabled");
                    $("#yechatinput").removeAttr("disabled");
                    $("#yechatinput").focus();
                }
            });
        };
    });
    $('#yechatinput').bind('keypress',function(event){
        if(event.keyCode == 13){
            $("#yechatsubmit").click();
        }
    });
    (function (){
        var yetounn = localStorage.yetounn;
        if (yetounn==null||yetounn==""||yetounn=="无昵称"){
            yetounn=""
        }
        else{yetounn="，"+yetounn+""};
        var text;
        var now = (new Date()).getHours();
        if (now > 23 || now <= 5) {
            text = '快睡吧'+yetounn;
        } else if (now > 5 && now <= 7) {
            text = '早上好'+yetounn+'!一日之计在于晨';
        } else if (now > 7 && now <= 11) {
            text = '上午好'+yetounn;
        } else if (now > 11 && now <= 14) {
            text = '中午了'+yetounn+'，现在是午餐时间';
        } else if (now > 14 && now <= 17) {
            text = '下午到了'+yetounn;
        } else if (now > 17 && now <= 19) {
            text = '傍晚了'+yetounn;
        } else if (now > 19 && now <= 21) {
            text = '晚上好'+yetounn+'，今天过得怎么样？';
        } else if (now > 21 && now <= 23) {
            text = '已经这么晚了，早点休息吧'+yetounn;
        } else {
            text = '欢迎'+yetounn;
        }

        setTimeout(function (){showMessage(text, 12000)},2000)
    })();
}
//发送信息的类
function sendmessageYe(content,fatie){
    showMessage("发送中......",12000)
    $.ajax({
        url : "https://www.yeallye.com/yerobot/api/comment/yelive2d.php",
        type : "POST",
        dataType: "json",
        data:{content:JSON.stringify(content)},
        success:function(json){
            data=json.reply;
            if(content[0]=="roll"){
                //昵称
                var yetounn = localStorage.yetounn;
                if (yetounn!=null&&yetounn!=""&&yetounn!="无昵称"){
                    data="[<b>"+yetounn+"</b>]"+data
                };
            }
            showMessage(data,5000)
            if(content[0]=="gift"&&content[1]=="2"){
                data="有不具名叶粉赠送了叶叶"+content[3]
            }
            if(fatie==true){
                $("#wenbenkuang").val(data);
                $("#replybtt").click();
            };
        },
        error:function(jqXHR ,textStatus , errorThrown){
            alert(jqXHR.responseText+textStatus+errorThrown);
            showMessage(errorThrown,5000)
        }
    });
}

