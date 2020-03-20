/*
    讨论相关
 */
const api = require("./request.js")

//上传图片
export function uploadImage(filePatch) {
  return api.uploadFile(filePatch)
}

//获取帖子种类
export function threadTypes(data) {
  return api._get('/forum/postType', data)
}

//获取帖子列表
export function allThreads(data) {
    return api._post('forum/allPost', data)
}

//发新帖
export function createThread(data) {
  return api._get('/forum/createPostByPic', data)
}

//获取某条帖子的详细信息
export function threadDetail(data) {
  return api._get('/forum/postDetail', data)
}

//评论帖主
export function commentThread(data) {
  return api._post('/forum/replyPost', data)
}

//回复某条评论
export function replyComment(data) {
  return api._post('/forum/replyReply', data)
}