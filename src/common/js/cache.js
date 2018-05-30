import store from 'store2'

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 15;

const PLAY_KEY = '__play__';
const PLAY_MAX_LENGTH = 200;

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
    insertArray(searchData, value, item => item === value, SEARCH_MAX_LENGTH);
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

export function loadPlay() {
    return store.get(PLAY_KEY, []);
}

export function savePlay(value) {
    let play = store.get(PLAY_KEY, []);
    insertArray(play, value, item => item === value, PLAY_MAX_LENGTH);
    store.set(PLAY_KEY, play);
    return play;
}
