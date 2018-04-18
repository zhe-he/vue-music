<template>
    <div class="singer">
        <listview @select="selectSinger" :data="singers"></listview>
        <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">
    import { getSingerList } from '@/api/singer'
    import { ERR_OK } from '@/api/config'
    import Singer from '@/common/js/singer'
    import Listview from '@/base/listview'
    import { mapMutations } from 'vuex'

    const HOT_NAME = '热门';
    const HOT_SINGER_LEN = 10;

    export default {
        data() {
            return {
                singers: []
            }
        },
        mounted() {
            this.getSingerList();
        },
        methods: {
            selectSinger(singer) {
                this.$router.push({
                    path: '/singer/' + singer.id
                });
                this.setSinger(singer);
            },
            getSingerList() {
                getSingerList().then(res => {
                    if (res.code === ERR_OK) {
                        this.singers = this.normalizeSinger(res.data.list);
                    }
                })
            },
            normalizeSinger(list) {
                var json = {
                    hot: {
                        title: HOT_NAME,
                        items: []
                    }
                };
                var arr = [];
                list.forEach((item, index) => {
                    var cell = new Singer({ name: item.Fsinger_name, id: item.Fsinger_mid });
                    if (index < HOT_SINGER_LEN) {
                        json.hot.items.push(cell)
                    }
                    let key = item.Findex;
                    if (!json[key]) {
                        json[key] = {
                            title: key,
                            items: []
                        }
                    }
                    json[key].items.push(cell);
                });
                for (var name in json) {
                    var val = json[name];
                    if (/[a-zA-Z]/g.test(val.title)) {
                        arr.push(val);
                    }
                }
                arr.sort((a, b) => (a.title.charCodeAt(0) - b.title.charCodeAt(0)));
                arr.unshift(json.hot);
                return arr;
            },
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        components: {
            Listview
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>