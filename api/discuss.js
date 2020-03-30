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
  return api._post('/forum/selectPost', data)
}

//获取热门讨论帖列表
export function hotThreads(data) {
  return api._get('/forum/selectHotPost', data)
}

//发新帖
export function createThread(data) {
  return api._post('/forum/createPostByPic', data)
}

//获取某条帖子的详细信息
export function threadDetail(data) {
  return api._get('/forum/postDetail', data)
}

//获取某条评论的详细信息
export function commentDetail(data) {
  return api._get('/forum/replyDetail', data)
}

//点赞帖子
export function likeThread(data) {
  return api._get('/forum/likePost', data)
} 

//点赞评论
export function likeComment(data) {
  return api._get('/forum/likeReply', data)
} 

//收藏帖子
export function starThread(data) {
  return api._get('/forum/collectPost', data)
} 

//取消收藏帖子
export function unstarThread(data) {
  return api._get('/forum/cancelCollectPost', data)
} 


//评论
export function sendComment(data) {
  return api._post('/forum/reply', data)
}

//回复某条评论
export function replyComment(data) {
  return api._post('/forum/reply', data)
}