<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'

    export default {
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                type: Array,
                default: null
            },
            listenScroll: {
                type: Boolean,
                default: false
            },
            pullup: {
                type: Boolean,
                default: false
            },
            beforeScroll: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.initScroll();
            })
        },
        methods: {
            initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click
                });
                if (this.listenScroll) {
                    this.scroll.on('scroll', pos => {
                        this.$emit('scroll', pos);
                    })
                }
                if (this.pullup) {
                    this.scroll.on('scrollEnd', () => {
                        if (this.scroll.y < this.scroll.maxScrollY + 20) {
                            this.$emit('scrollToEnd');
                        }
                    });
                }
                if (this.beforeScroll) {
                    this.scroll.on('beforeScrollStart', () => {
                        this.$emit('beforeScroll');
                    })
                }
            },
            refresh() {
                this.scroll && this.scroll.refresh();
            },
            scrollTo(x, y, time, easing) {
                this.scroll && this.scroll.scrollTo(x, y, time, easing);
            },
            scrollToElement(el, time, offsetX, offsetY, easing) {
                this.scroll && this.scroll.scrollToElement(el, time, offsetX, offsetY, easing)
            }
        },
        watch: {
            data() {
                this.$nextTick(() => {
                    this.refresh();
                })
            }
        }
    }
</script>
