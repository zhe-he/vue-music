<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <span class="dot" v-for="(item, index) in dots" :class="{'active': currentPageIndex === index}"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import {addClass} from '@/common/js/dom'

    export default {
        data() {
            return {
                // slider: null,
                // children: [],
                dots: [],
                currentPageIndex: 0
            }
        },
        props: {
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            interval: {
                type: Number,
                default: 3000
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.setSildeWidth();
                this.initDots();
                this.initSlider();

                if (this.autoPlay) {
                    this.play();
                }
            });
            // const resize = 'onorientationchange' in window ? 'orientationchange' : 'resize';
            window.addEventListener('resize', () => {
                this.setSildeWidth(true);
                this.slider.refresh();
            });
        },
        methods: {
            setSildeWidth(isResize) {
                this.children = this.$refs.sliderGroup.children;
                let width = 0;
                let sliderWidth = this.$refs.slider.clientWidth;
                for (var i = 0; i < this.children.length; i++) {
                    addClass(this.children[i], 'slider-item');
                    this.children[i].style.width = sliderWidth + 'px';
                    width += sliderWidth;
                }
                if (this.loop && !isResize) {
                    width += 2 * sliderWidth;
                }
                this.$refs.sliderGroup.style.width = width + 'px';
            },
            initDots(){
                this.dots = new Array(this.children.length);
            },
            initSlider() {
                this.slider = new BScroll(this.$refs.slider, {
                    scrollX: true,
                    scrollY: false,
                    snap: {
                        loop: this.loop,
                        threshold: 0.3
                    },
                    snapSpeed: 400,
                    momentum: false
                });
                this.slider.on('scrollEnd', () => {
                    this.currentPageIndex = this.slider.getCurrentPage().pageX;
                    if (this.loop) {
                        this.currentPageIndex--;
                    }
                    if (this.autoPlay) {
                        this.play();
                    }
                });
            },
            play(){
                clearTimeout(this.sliderTimer);
                this.sliderTimer = setTimeout(() => {
                    let index = this.currentPageIndex + 1;
                    if (this.loop) {
                        index++;
                    }
                    this.slider.goToPage(index, 0, 400);
                }, 3000);
            }
        },
        destroyed() {
            clearTimeout(this.sliderTimer);
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@/common/stylus/variable"

    .slider
        min-height: 1px
        .slider-group
            position: relative
            overflow: hidden
            white-space: nowrap
            .slider-item
                float: left
                box-sizing: border-box
                overflow: hidden
                text-align: center
                a
                    display: block
                    width: 100%
                    overflow: hidden
                    text-decoration: none
                img
                    display: block
                    width: 100%
        .dots
            position: absolute
            right: 0
            left: 0
            bottom: 12px
            text-align: center
            font-size: 0
            .dot
                display: inline-block
                margin: 0 4px
                width: 8px
                height: 8px
                border-radius: 50%
                background: $color-text-l
                &.active
                    width: 20px
                    border-radius: 5px
                    background: $color-text-ll
</style>
