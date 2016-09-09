window.onload = prepareGallery;

function showPic(whichpic) {
    //placeholder存在检查
    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    //检查placeholder节点是否为图片
    if (placeholder.nodeName != "IMG") return false;
    placeholder.setAttribute("src",source);
    //descroption存在检查
    if (document.getElementById("descroption")){
        //title属性存在检查，不存在就把descroption内容设为空
        var text = whichpic.getAttribute("title") ? whichpic.getAttribute("title") : "";
        var description = document.getElementById("descroption");
        if (description.firstChild.nodeType == 3) {
            description.firstChild.nodeValue = text;
        }
    }
    return true;
}


function prepareGallery() {
    //支持检测
    if (!document.getElementsByTagName || !document.getElementById){
        return false;
    }
    if (!document.getElementById("imagegallery")){
        return false;
    }

    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");

    for (var i = 0; i < links.length; i++){
        links[i].onclick = function () {
            return !showPic(this); //如果图片切换成功，返回false，取消链接的默认跳转，反之返回true，使用默认跳转
        }
        //将onclick的功能复制给onkeydown，这样通过键盘输入也可以切换图片
    }

}
