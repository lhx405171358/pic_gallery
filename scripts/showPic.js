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

//为 imagegallery 下的 <a> 标签添加 onclick 事件， 当点击时调用 showPic 函数
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
    }
}

function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    //创建 placeholder 和 description
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "my image gallery");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var desctext = document.createTextNode("choose an image");
    description.appendChild(desctext);
    //添加 placeholder 和 description 到body中
    var gallery = document.getElementById("imagegallery");
    insertAfter(placeholder, gallery);
    insertAfter(description, placeholder);
}

//在targetElement之后添加newElement
function insertAfter(newElement, targetElement ) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement){
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

//添加需要在页面加载之后执行的方法
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}

addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
