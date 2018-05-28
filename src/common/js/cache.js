import store from 'store2'

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LEN = 15;

function insertArray(arr, value, func, maxLen) {
    let index = arr.findIndex(func);
    if (index === 0) { return }
    if (index > 0) {
        arr.splice(index, 1);
    }
    arr.unshift(value);
    while (arr.length > maxLen) {
        arr.pop()
    }
}

function deleteFromArray(arr, func) {
    let index = arr.findIndex(func);
    if (index > -1) {
        arr.splice(index, 1);
    }
}

export function saveSearch(value) {
    let searchData = store.get(SEARCH_KEY, []);
    insertArray(searchData, value, item => item === value, SEARCH_MAX_LEN);
    store.set(SEARCH_KEY, searchData);
    return searchData;
}

export function loadSearch() {
    return store.get(SEARCH_KEY, []);
}

export function deleteSearch(value) {
    let searchData = store.get(SEARCH_KEY, []);
    deleteFromArray(searchData, item => item === value);
    store.set(SEARCH_KEY, searchData);
    return searchData;
}

export function clearSearch() {
    store.clear(SEARCH_KEY);
    return [];
}
