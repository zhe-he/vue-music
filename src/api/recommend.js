import jsonp from '@/common/js/jsonp'
import {commonParams, options} from './config'

export function getRecommend(){
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    var params = Object.assign(commonParams, {
        'uin': '',
        'platform': 'h5',
        'needNewCode': 1
    })
    return jsonp(url, params, options)
}
