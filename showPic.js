/**
 * Created by wangjing on 15/3/2017.
 */

function addLoadEvent(func) {
    var oldonload = window.onload;
    //没有绑定任何函数,把新函数添加给他
    if(typeof window.onload !='function') {
        window.onload = func;
        //已经绑定一些函数,把新函数追加到现有指令的末尾
    }else {
        window.onload=function () {
            oldonload();
            func();
        }
    }


}

addLoadEvent(prepareGallery);
//addLoadEvent(prepareLinks());




//
// function popUp(winURL) {
//     window.open(winURL,"popup","width=320,height=480");
//
// }

// function countBodyChildren() {
//     //文档的body元素
//     var body_elelment=document.getElementsByTagName("body")[0];
// //全体子元素
//     //包含所有类型的节点
//     var child_node=body_elelment.childNodes;
//     //节点属性: element--1, property---2, text----3
//     var node_type=body_elelment.nodeType;
// //子元素的个数
//     alert(child_node.length);
//
// }
//此处的执行需要DOM模型加载完整后马上执行
//document 对象是WINDOW对象的一个属性,当WINDOWS 触发Oclick事件的时候Docuemnt已经存在了
// window.onload=function () {
//     prepareLinks();
//     prepareGallery();
// }


//
// function prepareLinks() {
//     //向后兼容
//     //检测浏览器是否理解此方法
//     if(!document.getElementsByTagName()) return false
//     var links = document.getElementsByTagName("a");
//     for (var i = 0; i < links.length; i++) {
//         if (links[i].getAttribute("class") == "popup") {
//             links[i].onclick = function () {
//                 popUp(this.getAttribute("href"));
//                 return false;
//
//             }
//
//         }
//     }
// }
function prepareGallery() {
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    // if(!document.getElementById("imagegallery")) return false;
    var gallery=document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");

    for (var i = 0;i < links.length; i++){
        //按下键盘
      //  links[i].onkeydown=links.onclick;
        links[i].onclick=function () {
            // showPic(this);
            // return false;
            //是否返回一个FALSE以取消ONCLICK 的默认行为,应该由showPic决定
            //如果 showPic 返回TRUE ,结果返回FALSE
            return showPic(this)? false:true;

        }
    }
}

function showPic(whichpic) {

    if (!document.getElementById("placeholder")) return false;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");

    if(placeholder.nodeName!="IMG") return false;
    placeholder.setAttribute("src", source);


    if(document.getElementById("description")) {
        if(whichpic.getAttribute("title")) {
            var text = whichpic.getAttribute("title");
        }else {
            var text="";
        }
        var description=document.getElementById("description");
        if (description.firstChild.nodeType == 3)
            description.firstChild.nodeValue=text;
    }
    return true;
}
