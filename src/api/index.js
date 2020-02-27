import request from '@/plugin/axios'

const api = {
    index (query) {
        return request.get('eft/index', {params:query})
    },
    verify (email) {
        return request.post('eft/getVerify', {email}, {timeout: 0})
    },
    register (data) {
        return request.post('eft/register', data)
    }
}

export default api
