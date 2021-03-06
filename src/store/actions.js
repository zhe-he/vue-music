import * as types from './mutation-types'
import { playMode } from '@/common/js/config'
import { shuffle, findIndex } from '@/common/js/util'
import { saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite } from '@/common/js/cache'

export const selectSong = ({commit, state}, {list, index}) => {
    if (state.mode === playMode.random) {
        let playlist = shuffle(list);
        index = findIndex(playlist, list[index]);
        commit(types.SET_PLAYLIST, playlist);
    } else {
        commit(types.SET_PLAYLIST, list);
    }
    commit(types.SET_SEQUENCE_LIST, list);
    commit(types.SET_CURRENT_INDEX, index);
    commit(types.SET_PLAYING_STATE, true);
    commit(types.SET_FULL_SCREEN, true);
}

export const randomPlay = ({commit}, {list}) => {
    let playlist = shuffle(list);

    commit(types.SET_PLAY_MODE, playMode.random);
    commit(types.SET_PLAYLIST, playlist);
    commit(types.SET_SEQUENCE_LIST, list);
    commit(types.SET_CURRENT_INDEX, 0);
    commit(types.SET_PLAYING_STATE, true);
    commit(types.SET_FULL_SCREEN, true);
}

export const insertSong = ({commit, state}, song) => {
    let playlist = state.playlist.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    let currentSong = playlist[currentIndex]

    let fpIndex = findIndex(playlist, song);
    currentIndex++;
    playlist.splice(currentIndex, 0, song);
    if (fpIndex > -1) {
        if (fpIndex < currentIndex) {
            playlist.splice(fpIndex, 1);
            currentIndex--;
        } else {
            playlist.splice(fpIndex + 1, 1)
        }
    }

    let currentSIndex = currentSong ? findIndex(sequenceList, currentSong) + 1 : 0;
    let fsIndex = findIndex(sequenceList, song);
    sequenceList.splice(currentSIndex, 0, song);
    if (fsIndex > -1) {
        if (fsIndex < currentSIndex) {
            sequenceList.splice(fsIndex, 1);
        } else {
            sequenceList.splice(fsIndex + 1, 1)
        }
    }

    commit(types.SET_PLAYLIST, playlist);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    commit(types.SET_PLAYING_STATE, true);
    commit(types.SET_FULL_SCREEN, true);
}

export const deleteSong = ({commit, state}, song) => {
    let playlist = state.playlist.slice();
    let sequenceList = state.sequenceList.slice();
    let currentIndex = state.currentIndex;
    let fpIndex = findIndex(playlist, song);
    let fsIndex = findIndex(sequenceList, song);
    playlist.splice(fpIndex, 1);
    sequenceList.splice(fsIndex, 1);
    if (currentIndex > fpIndex || currentIndex === playlist.length) {
        currentIndex--;
    }
    commit(types.SET_PLAYLIST, playlist);
    commit(types.SET_SEQUENCE_LIST, sequenceList);
    commit(types.SET_CURRENT_INDEX, currentIndex);
    commit(types.SET_PLAYING_STATE, playlist.length > 0);
}

export const deleteSongList = ({commit}) => {
    commit(types.SET_PLAYLIST, []);
    commit(types.SET_SEQUENCE_LIST, []);
    commit(types.SET_CURRENT_INDEX, -1);
    commit(types.SET_PLAYING_STATE, false);
}

export const saveSearchHistory = ({commit}, song) => {
    commit(types.SET_SEARCH_HISTORY, saveSearch(song));
}

export const deleteSearchHistory = ({commit}, song) => {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(song));
}

export const clearSearchHistory = ({commit}) => {
    commit(types.SET_SEARCH_HISTORY, clearSearch());
}

export const savePlayHistory = ({commit}, song) => {
    commit(types.SET_PLAY_HISTORY, savePlay(song));
}

export const saveFavoriteList = ({commit}, song) => {
    commit(types.SET_FAVORITE_LIST, saveFavorite(song));
}

export const deleteFavoriteList = ({commit}, song) => {
    commit(types.SET_FAVORITE_LIST, deleteFavorite(song));
}
