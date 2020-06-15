/*
    登录相关
 */
const api = require("./request.js")

//学号登陆接口
export function login(data) {
    // return api._post('loginNoVerify', data)
    // return api._post('login', data)
    return api._post('/loginToken', data)
}

//微信登陆接口
export function loginWX(data) {
    return api._post('/loginWX', data)
}

//用户注册接口
export function register(data) {
  return api._post('/register', data)
}

//获取验证码图片的链接
export function getVerifyCodeSrc() {
    return api.baseUrl + '/defaultKaptcha'
}

//更换密码
export function changePassword(data) {
    return api._post('/changePassword', data)
}
