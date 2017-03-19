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
addLoadEvent(preparePlaceholder);




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

// deal with onClick
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
            text="";
        }
        var description=document.getElementById("description");
        if (description.firstChild.nodeType == 3)
            description.firstChild.nodeValue=text;
    }
    return true;
}
//deal with img and p element
function preparePlaceholder() {
    if (!document.createElement) return false;
    if (!document.createTextNode) return false;
    if(!document.getElementById) return false;
    // if(!document.getElementById("imagegallery")) return false;
    var div_description=document.createElement("div");
    var placeholder=document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/placeholder.jpg");
    placeholder.setAttribute("alt","my image gallery");

    var description=document.createElement("p");
    description.setAttribute("id","description");
    var destxt= document.createTextNode("Choose an image");
    description.appendChild(destxt);

    div_description.appendChild(placeholder);
    div_description.appendChild(description);

   // document.getElementsByTagName("body")[0].appendChild(div_description);
    var gallery=document.getElementById("imagegallery");

    //description before gallery

    // gallery.parentNode.insertBefore(div_description,gallery);

    //description after gallery

    insertAfter(div_description,gallery);

}

function insertAfter(newElement,targetElement) {

    //parentElement
    var parent = targetElement.parentNode;
    // taget?=lastchild
    if (parent.lastChild == targetElement) {
        //inset to the next
        parent.appendChild((newElement));
    }else {
        //insert between targetElement and his brother
        parent.insertBefore(newElement,targetElement.nextSibling);
    }

}

