import request from '@/plugin/axios'

const api = {
    index (query) {
        return request.get('eft/index', {params:query})
    },
    verify (mail) {
        return request.post('eft/getVerify', {mail}, {timeout: 0})
    },
    captcha (fingerprint) {
        return request.post('eft/captcha', {fingerprint})
    },
    register (data) {
        return request.post('eft/register', data)
    },
    login (data) {
        return request.post('eft/login', data)
    },
    getUserInfo () {
        return request.get('eft/userInfo')
    },
    advise (data) {
        return request.post('eft/advise', data)
    }
}

export default api
