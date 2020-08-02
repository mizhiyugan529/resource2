// 封装异步加载资源的方法
function loadExternalResource(url, type) {
    return new Promise((resolve, reject) => {
        let tag;

        if (type === "css") {
            tag = document.createElement("link");
            tag.rel = "stylesheet";
            tag.href = url;
        }
        else if (type === "js") {
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
var l2dlist=["yelong","yehu","junmoxiao","yetu","yemiao1","yemiao2","yeshu"]
var l2dselect=l2dlist[Math.floor(Math.random()*l2dlist.length)]
loadExternalResource("https://cdn.jsdelivr.net/gh/mizhiyugan529/resource2/live2d3/"+l2dselect+"/"+l2dselect+".js","js")