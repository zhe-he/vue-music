<template>
    <scroll :data="data" :listen-scroll="listenScroll" :probe-type="probeType" @scroll="scroll" class="listview" ref="listview">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <uL>
                    <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </uL>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="shortcutStart" @touchmove.stop.prevent="shortcurMove">
            <ul>
                <li v-for="(item, index) in shortcutList" :data-index="index" class="item" :class="{'current':currentIndex==index}">{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <p class="fixed-title">{{fixedTitle}}</p>
        </div>
        <div class="loading-container" v-show="!data.length">
            <loading></loading>
        </div>
    </scroll>
</template>

<script type="text/ecmascript-6">
    import Scroll from '@/base/scroll'
    import { getData } from '@/common/js/dom'
    import Loading from '@/base/loading'

    const ANCHOR_HEIGHT = 18;
    const TITLE_HEIGHT = 30;

    export default {
        props: {
            data: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                scrollY: -1,
                currentIndex: 0,
                diff: -1
            }
        },
        created() {
            this.touch = {};
            this.listenScroll = true;
            this.probeType = 3;
            this.listHeight = [];
        },
        watch: {
            data() {
                this.$nextTick(() => {
                    this.calculateHeight();
                })
            },
            scrollY(cur) {
                // 顶部滚动
                if (cur > 0) {
                    this.currentIndex = 0;
                    return
                }
                // 中间滚动
                for (var i = 0; i < this.listHeight.length - 1; i++) {
                    var h1 = this.listHeight[i];
                    var h2 = this.listHeight[i + 1];
                    if (-cur >= h1 && -cur < h2) {
                        this.currentIndex = i;
                        this.diff = cur + h2;
                        return
                    }
                }
                // 底部滚动
                this.currentIndex = this.listHeight.length - 2;
            },
            diff(cur) {
                let fixedTop = (cur < TITLE_HEIGHT && cur > 0) ? cur - TITLE_HEIGHT : 0;
                if (this.fixedTop === fixedTop) { return }
                this.fixedTop = fixedTop;
                this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
            }
        },
        computed: {
            shortcutList() {
                return this.data.map(a => a.title.charAt(0))
            },
            fixedTitle() {
                if (this.scrollY > 0) {
                    return ''
                }
                return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
            }
        },
        methods: {
            selectItem(item) {
                this.$emit('select', item);
            },
            shortcutStart(e) {
                let touch = e.touches[0];
                let anchorIndex = getData(e.target, 'index');
                if (anchorIndex == null) { return }
                anchorIndex = parseInt(anchorIndex, 10);
                this.touch.startY = touch.pageY;
                this.touch.anchorIndex = anchorIndex;
                this.scrollTo(anchorIndex);
            },
            shortcurMove(e) {
                let touch = e.targetTouches[0];
                let disY = touch.pageY - this.touch.startY;
                let delta = (disY / ANCHOR_HEIGHT) | 0;
                let anchorIndex = this.touch.anchorIndex + delta;
                let max = this.shortcutList.length - 1;
                if (anchorIndex < 0) { anchorIndex = 0 }
                if (anchorIndex > max) { anchorIndex = max }
                this.scrollTo(anchorIndex);
            },
            scroll(pos) {
                this.scrollY = pos.y;
            },
            scrollTo(index) {
                this.currentIndex = index;
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
            },
            calculateHeight() {
                let listHeight = [0];
                let H = 0;
                let listGroup = this.$refs.listGroup;
                for (var i = 0; i < listGroup.length; i++) {
                    H += listGroup[i].clientHeight;
                    listHeight.push(H);
                }
                this.listHeight = listHeight;
            }
        },
        components: {
            Scroll,
            Loading
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@/common/stylus/variable"

    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium
        .list-shortcut
            position: absolute
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>