<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="touchstart" @touchmove.prevent="touchmove" @touchend="touchend">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { prefixStyle } from '@/common/js/dom'

    const progressBtnWidth = 16;
    const transform = prefixStyle('transform');

    export default {
        props: {
            percent: {
                type: Number,
                default: 0
            }
        },
        created() {
            this.touch = { initiated: false, x: 0, left: 0 };
        },
        methods: {
            progressClick(e) {
                let offsetWidth = e.pageX - this.$refs.progressBar.getBoundingClientRect().left - progressBtnWidth / 2;
                let max = this.$refs.progressBar.clientWidth - progressBtnWidth;
                if (offsetWidth <= 0) {
                    offsetWidth = 0;
                } else if (offsetWidth >= max) {
                    offsetWidth = max;
                }
                this.offset(offsetWidth);
                this.triggerPercent();
            },
            touchstart(e) {
                let touch = e.touches[0];
                this.touch.initiated = true;
                this.touch.x = touch.pageX;
                this.touch.left = this.$refs.progress.offsetWidth;
            },
            touchmove(e) {
                let touch = e.changedTouches[0];
                let disX = touch.pageX - this.touch.x;
                let offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + disX));
                this.offset(offsetWidth);
            },
            touchend(e) {
                this.touch.initiated = false;
                this.triggerPercent();
            },
            offset(offsetWidth) {
                offsetWidth = Math.round(offsetWidth);
                this.$refs.progress.style.width = offsetWidth + 'px';
                this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
            },
            triggerPercent() {
                let barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                let percent = this.$refs.progress.offsetWidth / barWidth;
                this.$emit('percentChange', percent);
            }
        },
        watch: {
            percent(newVal) {
            if (newVal >= 0 && !this.touch.initiated) {
                    const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
                    const offsetWidth = newVal * barWidth;
                    this.offset(offsetWidth);
                }
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~@/common/stylus/variable"

    .progress-bar
        height: 30px
        .bar-inner
            position: relative
            top: 13px
            height: 4px
            background: rgba(0, 0, 0, 0.3)
            border-radius: 2px
            .progress
                position: absolute
                height: 100%
                background: $color-theme
                border-radius: 2px
            .progress-btn-wrapper
                position: absolute
                left: -8px
                top: -13px
                width: 30px
                height: 30px
                .progress-btn
                    position: relative
                    top: 7px
                    left: 7px
                    box-sizing: border-box
                    width: 16px
                    height: 16px
                    border: 3px solid $color-text
                    border-radius: 50%
                    background: $color-theme
</style>