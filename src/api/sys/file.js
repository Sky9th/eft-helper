import request from '@/plugin/axios'

const api = {}

api.read = function (id) {
    if (typeof id === 'number') {
        return request.get('admin/getFile/' + id)
    } else {
        return request.post('admin/getFile', { ids: id })
    }
}

export default api
