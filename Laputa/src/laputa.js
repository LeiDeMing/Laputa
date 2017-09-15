
function $(arg){
    return new Laputa(arg);
}

function Laputa(arg){
    this.elements=[];
    this.checkDom(arg);
}

Laputa.prototype.checkDom=function(arg){
    switch(typeof(arg)){
        case 'function':
            addEvent(window,'load',arg);
            break;
        case 'string':
            switch(arg.charAt(0)){
                case '#':
                    var oDom=document.getElementById(arg.substring(1));
                    this.elements.push(oDom);
                    break;
                case '.':
                    this.elements=document.getElementsByClassName(arg.substring(1));
                    break;
                default:
                    this.elements=document.getElementsByTagName(arg);
                    break;
            }
            break;
        case 'object':
            this.elements.push(arg);
    }
};

Laputa.prototype.show=function(){
    for(var x=0;x<this.elements.length;x++){
        this.elements[x].style.display='block';
    }
    return this;
};

Laputa.prototype.hide=function(){
    for(var x=0;x<this.elements.length;x++){
        this.elements[x].style.display='none';
    }
    return this;
};

Laputa.prototype.css=function(attr,value){
    for(var x=0;x<this.elements.length;x++){
        if(arguments.length===1 && typeof(arguments[0])==='object'){
            for(var o in arguments[0]){
                setCss(this.elements[x],o,arguments[0][o]);
            }
        }else{
            if(arguments.length===1){
                console.log(getStyle(this.elements[x],arguments[0]));
            }else{
                setCss(this.elements[x],attr,value);
            }
        }
    }
    return this;
};

Laputa.prototype.click=function(fn){
  for(var x=0;x<this.elements.length;x++){
      addEvent(this.elements[x],'click',fn);
  }
  return this;
};

Laputa.prototype.mouseover=function(fn){
  for(var x=0;x<this.elements.length;x++){
      addEvent(this.elements[x],'mouseover',fn);
  }
};



function setCss(obj,oS,oV){
    obj.style[oS]=oV;
}

function addEvent(obj,event,fn){
    if(obj.addEventListener){
        obj.addEventListener(event,fn,false);
    }else if(obj.attachEvent){
        obj.attachEvent('on'+event,fn);
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

function getStyle(obj,attr){
    if(getComputedStyle){
        return getComputedStyle(obj,'')[attr];
    }else if(obj.currentStyle){
        return obj.currentStyle[attr];
    }
}


