<template>
    <transition name="slide">
        <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script type="text/ecmascript-6">
    import MusicList from '@/components/music-list'
    import { mapGetters } from 'vuex'
    import { getMusicList } from '@/api/rank'
    import { ERR_OK } from '@/api/config'
    import { createSong } from '@/common/js/song'

    export default {
        computed: {
            title() {
                return this.topList.topTitle
            },
            bgImage() {
                if (this.songs.length) {
                    return this.songs[0].image
                }
                return '';
            },
            ...mapGetters(['topList'])
        },
        created() {
            this.getMusicList();
        },
        data() {
            return {
                songs: [],
                rank: true
            }
        },
        methods: {
            getMusicList() {
                let id = this.topList.id;
                if (!id) {
                    this.$router.push('/rank');
                    return
                }
                getMusicList(id).then(res => {
                    if (ERR_OK === res.code) {
                        this.songs = this.normalizeSongs(res.songlist);
                    }
                })
            },
            normalizeSongs(list) {
                let arr = [];
                list.forEach(item => {
                    let musicData = item.data
                    if (musicData.songid && musicData.albummid) {
                        arr.push(createSong(musicData))
                    }
                });
                return arr;
            }
        },
        components: {
            MusicList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s ease

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>