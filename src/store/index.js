import Vue from 'vue'
import Vuex from 'vuex'
import fingerprint2 from "fingerprintjs2"
import service from "@/api/index";
import util from '@/libs/util'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        fingerprint: '',
        userInfo: {},
        isPhone: false
    },
    mutations: {
        setFingerprint (state, payload) {
            state.fingerprint = payload
        },
        setUserInfo (state, payload) {
            state.userInfo = payload
        }
    },
    actions: {
        getFingerprint ({commit}) {
            fingerprint2.getV18({}, function (result) {
                commit('setFingerprint', result)
            })
        },
        getUserInfo ({commit}) {
            let sessionKey = util.cookies.get('sessionKey')
            if (sessionKey) {
                service.getUserInfo().then(data => {
                    commit('setUserInfo', data)
                }).catch()
            }
        },
        logout ({commit}) {
            util.cookies.remove('sessionKey')
            commit('setUserInfo', {})
        },
        isPhone ({state}) {
            if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //移动端
                state.isPhone = true
            }
        }
    },
    modules: {}
})
