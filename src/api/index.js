import request from '@/plugin/axios'
import store from '@/store'


const api = {
    index (query) {
        return request.get('eft/index', {params:query})
    },
    verify (mail) {
        return request.post('eft/getVerify', {mail}, {timeout: 0})
    },
    async captcha (fingerprint) {
        await store.dispatch('getFingerprint')
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
    },
    mistake (id) {
        return request.get('eft/mistake/' + id)
    },
    config () {
        return request.get('eft/config')
    }
}

export default api
