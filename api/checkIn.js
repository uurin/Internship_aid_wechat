/*
    签到相关
 */
const api = require("./request.js")

//是否今天已签到过
export function isCheckedIn(data) {
  return api._get('IsCheckIn', data)
}

//签到
export function doCheckIn(data) {
  return api._get('checkIn', data)
}

//当前用户的全部签到记录
export function checkInRecord(data) {
  return api._get('checkInRecord', data)
}
