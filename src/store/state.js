import { playMode } from '@/common/js/config'

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: 0,
    disc: {},
    topList: {}
}

export default state;
