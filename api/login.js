/*
    登录相关
 */
const api = require("./request.js")

//用户登陆接口
export function login(data) {
    // return api._post('loginNoVerify', data)
    // return api._post('login', data)
    return api._post('loginToken', data)
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
