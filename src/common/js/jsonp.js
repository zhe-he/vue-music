import originJSONP from 'jsonp'

export default function jsonp(url, data, options){
    url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    return new Promise((resolve, reject) => {
        originJSONP(url, options, (err, data) => {
            if (!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

function param(data){
    let arr = []
    for (var k in data) {
        arr.push(`${k}=${data[k]}`)
    }
    return arr.join('&')
}
