<template>
    <scroll class="suggest" :data="result" :pullup="pullup" :beforeScroll="beforeScroll" @beforeScroll="listScroll" @scrollToEnd="searchMore">
        <ul class="suggest-list">
            <li @click="selectItem(item)" class="suggest-item" v-for="item in result">
                <div class="icon">
                    <i :class="getIconClass(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getDisplayName(item)"></p>
                </div>
            </li>
        </ul>
        <div v-show="!hasMore && !result.length" class="no-result-wrapper">
            <no-result title="抱歉，暂无搜索结果"></no-result>
        </div>
        <loading v-show="hasMore"></loading>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import { mapMutations, mapActions } from 'vuex'
    import { search } from '@/api/search'
    import { ERR_OK } from '@/api/config'
    import { createSong } from '@/common/js/song'
    import Singer from '@/common/js/singer'
    import Scroll from '@/base/scroll'
    import Loading from '@/base/loading'
    import NoResult from '@/base/no-result'

    const TYPE_SINGER = 'singer';
    const perpage = 20;

    export default {
        props: {
            query: {
                type: String,
                default: ''
            },
            zhida: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                page: 1,
                result: [],
                pullup: true,
                beforeScroll: true,
                hasMore: true
            }
        },
        methods: {
            search(query) {
                this.hasMore = true;
                this.page = 1;
                search(query, this.page, this.zhida, perpage).then(res => {
                    if (res.code === ERR_OK) {
                        this.result = this.genResult(res.data);
                        this.checkMore(res.data.song);
                    }
                });
            },
            searchMore() {
                if (!this.hasMore) { return }
                this.page++;
                search(this.query, this.page, this.zhida, perpage).then(res => {
                    if (res.code === ERR_OK) {
                        this.result = this.result.concat(this.genResult(res.data));
                        this.checkMore(res.data.song);
                    }
                });
            },
            checkMore(song) {
                this.hasMore = song.curpage < Math.ceil(song.totalnum / perpage);
            },
            selectItem(item) {
                if (item.type === TYPE_SINGER) {
                    let singer = new Singer({
                        id: item.singermid,
                        name: item.singername
                    })
                    this.$router.push('/search/' + singer.id);
                    this.setSinger(singer);
                } else {
                    this.insertSong(item);
                }
            },
            getIconClass(item) {
                return item.type === TYPE_SINGER ? 'icon-mine' : 'icon-music';
            },
            getDisplayName(item) {
                return item.type === TYPE_SINGER ? item.singername : `${item.name}-${item.singer}`;
            },
            genResult(data) {
                let arr = [];
                if (data.zhida && data.zhida.singerid) {
                    arr.push({ ...data.zhida, type: TYPE_SINGER });
                }
                if (data.song) {
                    arr = arr.concat(this.normalizeSongs(data.song.list));
                }
                return arr;
            },
            normalizeSongs(list) {
                let arr = [];
                list.forEach(musicData => {
                    if (musicData.songid && musicData.albummid) {
                        arr.push(createSong(musicData))
                    }
                });
                return arr;
            },
            listScroll() {
                this.$emit('listScroll');
            },
            ...mapMutations({
               setSinger: 'SET_SINGER'
            }),
            ...mapActions(['insertSong'])
        },
        watch: {
            query(newVal) {
                this.search(newVal)
            }
        },
        components: {
            Scroll,
            Loading,
            NoResult
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@/common/stylus/variable"
    @import "~@/common/stylus/mixin"

    .suggest
        height: 100%
        overflow: hidden
        .suggest-list
            padding: 0 30px
            .suggest-item
                display: flex
                align-items: center
                padding-bottom: 20px
            .icon
                flex: 0 0 30px
                width: 30px
                [class^="icon-"]
                  font-size: 14px
                  color: $color-text-d
            .name
                flex: 1
                font-size: $font-size-medium
                color: $color-text-d
                overflow: hidden
                .text
                  no-wrap()
    .no-result-wrapper
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>