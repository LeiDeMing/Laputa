function setCss(obj, oS, oV) {
    obj.style[oS] = oV;
}

function addEvent(obj, event, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(event, fn, false);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + event, fn);
    }
}

// function getClass(oParent,oClass){
//     var all=oParent.getElementsByClassName('oLi');
//     console.log(all[1]);
//     var targetClass=[];
//     for(var x=0;x<all.length;x++){
//         if(all[x]===oClass){
//             targetClass.push(all[x])
//         }
//     }
//
//     return targetClass;
// }

function getStyle(obj, attr) {
    if (getComputedStyle) {
        return parseInt(getComputedStyle(obj, '')[attr]);
    } else if (obj.currentStyle) {
        return parseInt(obj.currentStyle[attr]);
    }
}

function hasClass(ele, clName) {
    var allName = ele.className,
        reg = new RegExp('(\\s|^)' + clName + '(\\s|$)');
    if (allName.match(reg)) {
        return true;
    }
    return false;
}

function getPageSize(){
    return {
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    };
}