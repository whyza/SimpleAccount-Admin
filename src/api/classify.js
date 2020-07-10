
import request from '@/utils/request'


export function getClassifyInfo(url, params) {
    return request({
        url: url,
        method: 'get',
        params
    })
}

export function queryBigBillClassfy(url, params) {
    return request({
        url: url,
        method: 'get',
        params
    })
}

export function updateBillClassify(url, data) {
    return request({
        url: url,
        method: 'post',
        data:data
    })
}