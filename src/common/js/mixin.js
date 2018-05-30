import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from '@/common/js/config'
import { shuffle, findIndex } from '@/common/js/util'

export const playlistMixin = {
    computed: mapGetters(['playlist']),
    mounted() {
        this.handlePlaylist(this.playlist);
    },
    activated() {
        this.handlePlaylist(this.playlist);
    },
    watch: {
        playlist(newVal) {
            this.handlePlaylist(newVal);
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method');
        }
    }
}

export const playerMixin = {
    computed: {
        modeClass() {
            return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
        },
        ...mapGetters(['mode', 'sequenceList', 'currentSong', 'playlist', 'favoriteList'])
    },
    methods: {
        changeMode() {
            let mode = (this.mode + 1) % 3;
            this.setPlayMode(mode);
            let playlist = mode === playMode.random ? shuffle(this.sequenceList) : this.sequenceList;
            let index = findIndex(playlist, this.currentSong);
            this.setCurrentIndex(index);
            this.setPlaylist(playlist);
        },
        getFavoriteIcon(song) {
            let index = findIndex(this.favoriteList, song);
            return index > -1 ? 'icon-favorite' : 'icon-not-favorite';
        },
        toggleFavorite(song) {
            let index = findIndex(this.favoriteList, song);
            if (index > -1) {
                this.deleteFavoriteList(song);
            } else {
                this.saveFavoriteList(song);
            }
        },
        ...mapMutations({
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlaylist: 'SET_PLAYLIST',
            setPlayingState: 'SET_PLAYING_STATE'
        }),
        ...mapActions(['deleteFavoriteList', 'saveFavoriteList'])
    }
}

export const searchMixin = {
    data() {
        return {
            query: ''
        }
    },
    computed: {
        ...mapGetters(['searchHistory'])
    },
    methods: {
        updateQuery(query) {
            this.query = query;
        },
        blurInput() {
            this.$refs.searchBox.blur();
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query);
        },
        saveSearch() {
            this.saveSearchHistory(this.query);
        },
        ...mapActions(['saveSearchHistory', 'deleteSearchHistory', 'clearSearchHistory'])
    }
}
