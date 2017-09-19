
// fnAjax({
//     type:'get',
//     url:'',
//     data:{},
//     asycn:true,
//     success:function(){
//         console.log();
//     },
//     error:function(){
//         console.log();
//     }
// });

function ajax(obj){
    if(obj.url===undefined){
        return false;
    }
    var xhr=createXHR();
    obj.type=obj.type || 'get';
    obj.asycn= obj.asycn === undefined ? true : obj.asycn;

    if(obj.type.toLowerCase()==='get'){
        if(obj.url.indexOf("?")!==-1){
            obj.url=obj.data? obj.url+="&"+urlData(obj.data) : obj.url;
        }else{
            obj.url=obj.data? obj.url+="?"+urlData(obj.data) : obj.url;
        }
    }
    xhr.open(obj.type,obj.url,obj.asycn);
    if(obj.type.toLowerCase()==='get'){
        xhr.send();
    }else{
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(obj.data);
    }

    if(obj.asycn){
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4){
                if(xhr.status===200){
                    obj.success(JSON.parse(xhr.responseText));
                }else{
                    console.log("asycn BUG");
                    return false;
                }
            }
        }
    }else{
        if(xhr.status===200){

        }
    }
}

function urlData(obj){
    var arr=[];
    for(var key in obj){
        arr.push(key+"="+obj[key]);
    }
    arr=arr.join('&');
    return arr;
}

function createXHR(){
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }else if(ActiveObject){
        return new ActiveObject('Microsoft.XMLHTTP');
    }
}
