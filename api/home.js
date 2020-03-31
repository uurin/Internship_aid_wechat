/*
    签到相关
 */
const api = require("./request.js")

//获取热门讨论帖列表
export function hotThreads(data) {
  return api._get('/forum/selectHotPost', data)
}

//获取公告列表
export function announcement(data) {
  return api._get('/forum/announcement', data)
}

//获取招聘列表
export function recruitment(data) {
  return api._get('/forum/recruitment', data)
}

//获取行业列表
export function industryList(data) {
  return api._get('/forum/industry', data)
}