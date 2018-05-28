import * as types from './mutation-types'
import { playMode } from '@/common/js/config'
import { shuffle, findIndex } from '@/common/js/util'

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
    let { playlist, sequenceList, currentIndex } = JSON.parse(JSON.stringify(state));
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
