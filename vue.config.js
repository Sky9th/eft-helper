// 基础路径 注意发布之前要先修改这里
let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/'

module.exports = {
    // 根据你的实际情况更改这里
    publicPath,
    lintOnSave: true,
    /* devServer: {
        publicPath, // 和 publicPath 保持一致
        proxy: {
            '/eft': {
                // 要访问的跨域的域名
                target: 'http://sky-admin.sky9th.cn/eft/',
                ws: true,
                secure: false, // 使用的是http协议则设置为false，https协议则设置为true
                changOrigin: true,
                pathRewrite: {
                    '^/eft': ''
                }
            }
        }
    } */
}
