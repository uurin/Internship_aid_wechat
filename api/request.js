let util = require('../utils/util.js');

const baseUrl = 'http://118.89.203.30:9090/'
let apiData = {}

const http = ({ url = '', param = {}, loading=true, ...other } = {}) => {
    console.log("request信息：", url, param, other)
    const token = util.getCache('token')
    if(loading) {
        wx.showLoading({
            title: '请求数据中，请耐心等待..',
        })
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: getUrl(url),
            data: param,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'token': token
            },
            ...other,
            complete: (res) => {
                if (loading) {
                    wx.hideLoading();
                }
                if (res.data.code == 401) {
                    // reLogin();
                    clearTimeout(apiData.timeout);
                    apiData.timeout=setTimeout(()=>{
                        toLoginPage();
                    },1000);
                    wx.showToast({
                        title: '请先登录后再操作哦！',
                        icon:"none"
                    })
                    util.setCache("token",null);
                } else if (res.data.code == 403) {
                    resolve(res)
                } else if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data)
                } else {
                    reject(res);
                }
            }
        })
    })
}

const getUrl = (url) => {
    if (url.indexOf('://') == -1) {
        url = baseUrl + url;
    }
    return url
}

// get方法
const _get = (url, param = {}, loading=true) => {
    apiData = {
        url,
        param,
        loading,
        method: 'get'
    }
    return http(apiData)
}

const _post = (url, param = {}, loading = true) => {
    apiData = {
        url,
        param,
        loading,
        method: 'post'
    }
    return http(apiData)
}

const _put = (url, param = {}, loading = true) => {
    apiData = {
        url,
        param,
        loading,
        method: 'put'
    }
    return http(apiData)
}

const _delete = (url, param = {}, loading = true) => {
    apiData = {
        url,
        param,
        loading,
        method: 'delete'
    }
    return http(apiData)
}

//刷新token
function refreshToken() {
    wx.showLoading({
        title: '加载中...'
    })
    wx.request({
        // 请求地址拼接
        url: baseUrl + 'token/accessToken',
        data: {
            refreshTokenString: util.getCache('refreshToken')
        },
        // 获取请求头配置
        header: {
            'content-type': 'application/json;charset=UTF-8',
        },
        method: 'GET',
        // ...other,
        // 成功或失败处理
        complete: (res) => {
            // 关闭等待
            wx.hideLoading()
            console.log(res)
            // // 进行状态码判断并处理，退出登录
            if (res.data.code === 401) {
                // refreshtoken失效
                reLogin();
            }
            else if (res.data.code !== 200) {
                // 获取后台返回报错信息
                let title = res.data.msg
                console.log(title);
                // 调用全局toast方法
                showToast(title)
            } else if (res.data.code === 200) {
                util.setCache('token', res.data.data.token);
                util.setCache('refreshToken', res.data.data.refreshToken);
                util.setCache('isLogin', true);
                util.setCache('userId', res.data.data.userId);
                // util.setCache("userName", res.data.data.userName);
                console.log(apiData)
                http(apiData)
            }
        }
    })
}

//重新登录
function reLogin(url, data, method, resolve) {
    wx.showLoading({
        title: '加载中...'
    })
    var unionId = util.getCache('unionId');
    wx.request({
        // 请求地址拼接
        url: baseUrl + 'wxx/user/login/' + unionId,
        data: {},
        // 获取请求头配置
        header: {
            'content-type': 'application/json;charset=UTF-8',
        },
        method: 'POST',
        // ...other,
        // 成功或失败处理
        complete: (res) => {
            // 关闭等待
            wx.hideLoading()
            console.log(res)
            if (res.data.code !== 200) {
                // 获取后台返回报错信息
                let title = res.data.msg
                console.log(title);
                // 调用全局toast方法
                showToast(title)
            } else if (res.data.code === 200) {
                util.setCache('token', res.data.data.token);
                util.setCache('refreshToken', res.data.data.refreshToken);
                util.setCache('userId', res.data.data.userId);
                util.setCache('isLogin', true);
                // util.setCache("userName", res.data.data.userName);
                http(apiData);
            }
        }
    })
}

// 添加请求toast提示
const showToast = title => {
    wx.showToast({
        title: title,
        icon: 'none',
        duration: 1500,
        mask: true
    });
}

//跳转到登陆页面
const toLoginPage=()=>{
    wx.navigateTo({
        url: '/pages/login/login/login',
    })
}

module.exports = {
    baseUrl,
    _get,
    _post,
    _put,
    _delete
}
