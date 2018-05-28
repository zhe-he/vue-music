export function pad(num, n = 2) {
    let len = num.toString().length;
    while (len < n) {
        num = '0' + num;
        len++;
    }
    return num;
}

export function rnd(m, n) {
    return Math.floor(Math.random() * (n - m + 1) + m);
}

export function shuffle (arr) {
    let arr2 = arr.slice();
    for (var i = 1; i < arr2.length; i++) {
        let index = rnd(0, i);
        let temp = arr2[index];
        arr2[index] = arr2[i];
        arr2[i] = temp;
    }
    return arr2;
}

export function findIndex(parent, child, id = 'id') {
    return parent.findIndex(item => item[id] === child[id]);
}

export function debounce(func, delay) {
    let timer;
    return function (...args) {
        if (timer) { clearTimeout(timer) }
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    }
}
