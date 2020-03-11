/*
    登录相关
 */
const api = require("./request.js")

/*
// 获取unionId
export function getUnion(data) {
    return api._post('wx/user/unionid', data)
}

// unionId登录
export function unionLogin(data) {
    return api._post(`wxx/user/login/${data}`)
}
*/

//用户登陆接口
export function login(data) {
    // return api._post('loginNoVerify', data)
    // return api._post('login', data)
    return api._post('loginToken', data)
}

//获取验证码图片的链接
export function getVerifyCodeSrc() {
    return api.baseUrl + 'defaultKaptcha'
}

