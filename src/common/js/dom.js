export function addClass(self, className) {
    if (hasClass(self, className)) {
        return
    }
    let aClass = self.className.split(' ');
    aClass.push(className);
    self.className = aClass.join(' ').trim();
}

export function hasClass(self, className) {
    var re = new RegExp('\\b' + className + '\\b');
    return re.test(self.className);
}

export function removeClass(self, className) {
    var re = new RegExp('\\b' + className + '\\b', 'g')
    self.className = self.className.replace(re, '');
}

export function getData(ele, name) {
    return ele.getAttribute('data-' + name);
}

export function setData(ele, name) {
    return ele.setAttribute('data-' + name);
}

let elementStyle = document.createElement('div').style;

let verdor = (() => {
    let transformNames = {
        standard: 'transform',
        webkit: 'webkitTransform',
        moz: 'MozTransform',
        o: 'OTransform',
        ms: 'msTransform'
    };
    for (var key in transformNames) {
        if (transformNames.hasOwnProperty(key) && transformNames[key] in elementStyle) {
            return key;
        }
    }
    return false;
})();

export function prefixStyle(style) {
    if (!verdor) { return false }
    if (verdor === 'standard') { return style }
    return verdor + style.charAt(0).toUpperCase() + style.substr(1);
}
