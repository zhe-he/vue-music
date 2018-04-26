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
