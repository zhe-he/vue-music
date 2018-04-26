<template>
    <transition name="slide">
        <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'
    import {getSingerDetail} from '@/api/singer'
    import {createSong} from '@/common/js/song'
    import MusicList from '@/components/music-list'

    export default {
        data() {
            return {
                songs: []
            }
        },
        computed: {
            title() {
                return this.singer.name
            },
            bgImage() {
                return this.singer.avatar
            },
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
                    })
                }
            }
        },
        components: {
            MusicList
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
</style>