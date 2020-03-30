/*
    签到相关
 */
const api = require("./request.js")

//获取热门讨论帖列表
export function hotThreads(data) {
  return api._get('/forum/selectHotPost', data)
}
