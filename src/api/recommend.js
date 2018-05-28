import axios from 'axios'
import jsonp from '@/common/js/jsonp'
import {commonParams, options} from './config'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    var params = Object.assign({}, commonParams, {
        'uin': '',
        'platform': 'h5',
        'needNewCode': 1
    })
    return jsonp(url, params, options)
}

export function getDiscList() {
    const url = 'api/getDiscList';
    var params = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
    });
    return axios.get(url, { params }).then(res => res.data);
}

export function getSongList(disstid) {
    const url = '/api/disc';

    const params = Object.assign({}, commonParams, {
        disstid,
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        platform: 'yqq',
        hostUin: 0,
        needNewCode: 0,
        format: 'json'
    });

    return axios.get(url, { params }).then(res => res.data);
}
