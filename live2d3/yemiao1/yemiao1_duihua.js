// const home_Path = "../yemiao1";
const home_Path = "https://cdn.jsdelivr.net/gh/mizhiyugan529/resource/live2d3/yemiao1";
//目前时间判定
var now = (new Date()).getHours();
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
        loadExternalResource(home_Path + "/live2d_duihua.css", "css")

    ]).then(() => {
        allthescript()
    });
} else {
// 加载 css js
    Promise.all([
        loadExternalResource("https://cdn.bootcss.com/jquery/3.4.1/jquery.js", "js")
    ]).then(() => {
        Promise.all([loadExternalResource("https://cdn.jsdelivr.net/gh/wangstong/live2dm3/live2d/js/live2dcubismcore.min.js","js"),
            loadExternalResource("https://cdn.jsdelivr.net/gh/mizhiyugan529/live2d3/Samples/TypeScript/Demo/dist/bundle.js", "js"),
            loadExternalResource(home_Path + "/live2d_duihua.css", "css")

        ]).then(() => {
            allthescript()
        });
    });

}

function allthescript() {
    $("body").prepend('<div class="yeLive" id="live2ddiv"><div class="ye_sayings live2d" style="opacity:0"></div><canvas id="live2d" width="300" height="300" class="live2d"></canvas></div>')

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
    var modelDir = ['yemiao1']; // 指定需要加载的模型
    initDefine(resourcesPath, backImageName, modelDir); // 初始化模型
    console.log("设置模型路径")
    initModel();
    console.log("初始化模型")




    setTimeout(function () {
        // playLive2dMotion("ye",0,3)
        $("#live2ddiv").click(function () {
                playLive2dMotion("ye", 0, 3);
            const list_click=["摸哪呢，没大没小的","别闹","哪来的小孩这么不知道尊重前辈","就这一次啊","打得好的继续努力，划水的继续自重"]
            if (now >= 21 || now <= 5){
                list_click.push("过会儿就去睡，你也别熬太晚了")
            }
                showMessage(list_click)
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
            var list_move=["快快快，我掩护你","不知道做什么的时候，跟着我"]
            if (now >= 21 || now <= 5){
                list_move.push("很晚了，要带我去睡了吗")
            }
            showMessage(list_move)
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


    (function (){
        var text;
        if (now > 23 || now <= 5) {
            text = '快睡吧';
        } else if (now > 5 && now <= 7) {
            text = '你也这么早？一起来几盘？';
        } else if (now > 7 && now <= 11) {
            text = '上午好';
        } else if (now > 11 && now <= 14) {
            text = '都中午了该吃饭了，吃完再继续打';
        } else if (now > 14 && now <= 17) {
            text = '下午到了';
        } else if (now > 17 && now <= 19) {
            text = '傍晚了';
        } else if (now > 19 && now <= 21) {
            text = '晚上好';
        } else if (now > 21 && now <= 23) {
            text = '早点睡吧，想当职业选手打比赛，没有好身体可不行';
        } else {
            text = '欢迎';
        }

        setTimeout(function (){showMessage(text, 12000)},1000);
    })();
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


