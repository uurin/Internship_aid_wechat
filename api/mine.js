/*
    “我的”相关
 */
const api = require("./request.js")


//获取用户信息
export function userInfo(data) {
  return api._get('/student/datum', data)
}

//更新用户信息
export function updateUserInfo(data) {
  return api._post('/student/updateDatum', data)
}

//获取我发出的讨论帖列表
export function myThreadsSent(data) {
  return api._get('/forum/selectPost', data)
}

//获取收藏的讨论帖列表
export function myThreadsCollection(data) {
  return api._get('/forum/selectCollectPost', data)
  // return api._get('/forum/selectPost', data)
}