/*
    讨论相关
 */
const api = require("./request.js")


//用户登陆接口
export function allThreads(data) {
    return api._post('forum/allPost', data)
}

export function getPostThreadUrl() {
  return baseUrl + "/forum/createPost";
}