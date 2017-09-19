function $(arg) {
    return new Laputa(arg);
}

function Laputa(arg) {
    this.elements = [];
    if (typeof(arag) === 'object') {
        this.elements[0] = arg;
    } else {
        this.checkDom(arg);
    }

}

Laputa.prototype.checkDom = function (arg) {
    switch (typeof(arg)) {
        case 'function':
            addEvent(window, 'load', arg);
            break;
        case 'string':
            switch (arg.charAt(0)) {
                case '#':
                    var oDom = document.getElementById(arg.substring(1));
                    this.elements.push(oDom);
                    break;
                case '.':
                    this.elements = document.getElementsByClassName(arg.substring(1));
                    break;
                default:
                    this.elements = document.getElementsByTagName(arg);
                    break;
            }
            break;
        case 'object':
            this.elements.push(arg);
    }
};

Laputa.prototype.find = function (tar) {
    var arrTemp = [];
    for (var x = 0; x < this.elements.length; x++) {
        var domTemp = this.elements[x].querySelectorAll(tar);
        for (var y = 0; y < domTemp.length; y++) {
            arrTemp.push(domTemp[y])
        }
    }
    this.elements = arrTemp;
    return this;
};

Laputa.prototype.show = function () {
    for (var x = 0; x < this.elements.length; x++) {
        this.elements[x].style.display = 'block';
    }
    return this;
};

Laputa.prototype.hide = function () {
    for (var x = 0; x < this.elements.length; x++) {
        this.elements[x].style.display = 'none';
    }
    return this;
};

Laputa.prototype.css = function (attr, value) {
    for (var x = 0; x < this.elements.length; x++) {
        if (arguments.length === 1 && typeof(arguments[0]) === 'object') {
            for (var o in arguments[0]) {
                setCss(this.elements[x], o, arguments[0][o]);
            }
        } else {
            if (arguments.length === 1) {
            } else {
                setCss(this.elements[x], attr, value);
            }
        }
    }
    return this;
};

Laputa.prototype.click = function (fn) {
    for (var x = 0; x < this.elements.length; x++) {
        addEvent(this.elements[x], 'click', fn);
    }
    return this;
};

Laputa.prototype.html = function (oV) {

    for (var x = 0; x < this.elements.length; x++) {
        if (arguments.length === 0) {
            return this.elements[x].innerHTML;
        } else {
            this.elements[x].innerHTML = oV;
        }
    }
    return this;
};

Laputa.prototype.scrollTop = function (scro) {
    if (this.elements[0] === document) {
        if (arguments.length === 0) {
            return document.documentElement.scrollTop;
        } else {
            document.documentElement.scrollTop = scro;
        }
    } else {
        if (arguments === 0) {
            return this.elements[0].scrollTop;
        } else {
            this.scrollTop = scro;
        }
    }
};

Laputa.prototype.first = function () {
    var oThis = [];
    this.elements = this.elements[0];
    oThis.push(this.elements);
    this.elements = oThis;
    return this;
};

Laputa.prototype.last = function () {
    var oThis = [];
    this.elements = this.elements[this.elements.length - 1];
    oThis.push(this.elements);
    this.elements = oThis;
    return this;
};

Laputa.prototype.eq = function (num) {
    var oThis = [];
    this.elements = this.elements[num];
    oThis.push(this.elements);
    this.elements = oThis;
    return this;
};

Laputa.prototype.index = function () {
    var current = this.elements[0];
    var allChild = current.parentNode.children;
    for (var x = 0; x < allChild.length; x++) {
        if (current === allChild[x]) {
            return x;
        }
    }
    return null;
};

Laputa.prototype.hover = function (fn) {
    if (arguments.length === 2) {
        for (var x = 0; x < this.elements.length; x++) {
            addEvent(this.elements[x], 'mouseover', arguments[0]);
            addEvent(this.elements[x], 'mouseout', arguments[1]);
        }
    } else {
        return;
    }
    return this;
};

Laputa.prototype.addClass = function (name) {
    for (var x = 0; x < this.elements.length; x++) {
        if (!hasClass(this.elements[x], name)) {
            this.elements[x].className = this.elements[x].className + ' ' + name;
        }
    }
    return this;
};

Laputa.prototype.removeClass = function (name) {
    for (var x = 0; x < this.elements.length; x++) {
        if (hasClass(this.elements[x], name)) {
            var reg = new RegExp(name);
            this.elements[x].className = this.elements[x].className.replace(reg, '');
        }
    }
    return this;
};

Laputa.prototype.center = function () {
    for (var x = 0; x < this.elements.length; x++) {
        this.elements[x].style.position = 'absolute';
        this.elements[x].style.left = '50%';
        this.elements[x].style.top = '50%';
        this.elements[x].style.marginTop = -getStyle(this.elements[x], 'height') / 2 + 'px';
        this.elements[x].style.marginLeft = -getStyle(this.elements[x], 'width') / 2 + 'px';
    }
    return this;
};

Laputa.prototype.drag = function () {
    var flag = false,
        disX = 0,
        disY = 0;

    for (var x = 0; x < this.elements.length; x++) {
        this.elements[x].onmousedown = function (event) {
            event = event || window.event;
            var oThis = this;
            flag = true;
            disX = event.clientX - this.offsetLeft;
            disY = event.clientY - this.offsetTop;

            document.onmousemove = function (event) {
                if (!flag) return;
                event = event || window.event;
                var oL = event.clientX - disX,
                    oT = event.clientY - disY,
                    oMaxL = getPageSize().width - oThis.offsetWidth,
                    oMaxT = getPageSize().height - oThis.offsetHeight;

                oL = oL > 0 ? oL : 0;
                oL = oMaxL < oL ? oMaxL : oL;
                oT = oT > 0 ? oT : 0;
                oT = oMaxT < oT ? oMaxT : oT;


                oThis.style.marginLeft = oThis.style.marginTop = '0';
                oThis.style.left = oL + 'px';
                oThis.style.top = oT + 'px';
            };

            document.onmouseup = function () {
                flag = false;
            };
            return false;
        };

    }

};

