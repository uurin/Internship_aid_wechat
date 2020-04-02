/*
    周记相关
 */
const api = require("./request.js")

//获取周记列表
export function weeklyReportList(data) {
  return api._get('/weeklyReport/select', data, false)
}

//添加周记
export function addWeeklyReport(data) {
  return api._post('/weeklyReport/add', data)
}

//获取单条周记详情
export function detailWeeklyReport(data) {
  return api._get('/weeklyReport/weeklyDetail', data)
}

//删除周记
export function deleteWeeklyReport(data) {
  return api._get('/weeklyReport/delete', data)
}

//编辑周记
export function editWeeklyReport(data) {
  return api._post('/weeklyReport/update', data)
}