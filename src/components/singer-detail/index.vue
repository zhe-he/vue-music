<template>
    <transition name="slide">
        <div class="music-list"></div>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import {getSingerDetail} from '@/api/singer'
    import {createSong} from '@/common/js/song'

    export default {
        data() {
            return {
                songs: []
            }
        },
        computed: {
            ...mapGetters(['singer'])
        },
        created() {
            this.getDetail();
        },
        methods: {
            getDetail() {
                if (!this.singer || !this.singer.id) {
                    this.$router.push({path: '/singer'});
                } else {
                    getSingerDetail(this.singer.id).then(res => {
                        let list = res.data.list;
                        let songs = [];
                        list.forEach(item => {
                            let {musicData} = item;
                            if (musicData && musicData.songid && musicData.albummid) {
                                songs.push(createSong(musicData));
                            }
                        });
                        this.songs = songs;
                        console.log(songs);
                    })
                }
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@/common/stylus/variable"
    @import "~@/common/stylus/mixin"

    .slide-enter-active, .slide-leave-active
        transition: all 0.3s

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)

    .music-list
        position: fixed
        z-index: 100
        top: 0
        left: 0
        bottom: 0
        right: 0
        background: $color-background
</style>