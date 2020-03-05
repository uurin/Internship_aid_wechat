const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 返回时间 2018年8月8日
 */
const fromDate = date => {
  if (typeof date !== 'number') {
    return 'NAN'
  }
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  return year + '年' + month + '月' + day + '日'
}

/**
 * 返回时间 2018/8/8
 */
const fromDates = date => {
  if (typeof date !== 'number') {
    return 'NAN'
  }
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()
  return year + '/' + month + '/' + day
}

/**
 * 返回格式 11：11：11
 */
const MDS = date => {
  const newDate = new Date(date)
  let hour = newDate.getHours() + "";
  let minute = newDate.getMinutes() + "";
  let seconds = newDate.getSeconds() + "";
  return hour + ':' + minute + ':' + seconds
}

/**
 * 返回格式 2018/8/8 11:11:11
 */
const fromDatesDay = date => {
  let year = fromDates(date)
  let times = MDS(date)
  return year + ' ' + times

}

/***
 * 返回格式 12月1日
 */
const mDay = (date) => {
  const dates = new Date(Number(date))
  const month = dates.getMonth() + 1
  const day = dates.getDate()
  return month + '月' + day + '日'
}

/***
 * 返回格式 12/1
 */
const mDays = (date) => {
  const dates = new Date(Number(date))
  const month = dates.getMonth() + 1
  const day = dates.getDate()
  return month + '/' + day
}

/**
 * 返回格式 周三
 */
const week = (date) => {
  const wekArray = ['日', '一', '二', '三', '四', '五', '六'];
  const dates = new Date(Number(date))
  const weeks = dates.getDay()
  return '周' + wekArray[weeks]
}

/**
 * 判断是否整数
 * **/
const isInters = (value) => {
  return value % 1 === 0
}

/**
 * 返回格式 2018-11-11 23：00：00
 */
const formatDateStr = (time) => {
  var date;
  if (time) {
    if (typeof time === 'object') {
      date = time;
    } else {
      date = new Date(time).getTime();
    }
  } else {
    return null;
  }
  // var newDate = date;
  var newDate = new Date(date);
  var year = newDate.getFullYear();
  if (year.length == 1) {
    year = "0" + year;
  }
  var month = (newDate.getMonth() + 1) + "";

  if (month.length == 1) {
    month = "0" + month;
  }
  var day = newDate.getDate() + "";
  if (day.length == 1) {
    day = "0" + day;
  }
  var hour = newDate.getHours() + "";
  var minute = newDate.getMinutes() + "";
  var seconds = newDate.getSeconds() + "";
  if (hour.length == 1) {
    hour = "0" + hour;
  }
  if (minute.length == 1) {
    minute = "0" + minute;
  }
  if (seconds.length == 1) {
    seconds = "0" + seconds;
  }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds;
}

//取缓存
function getCache(key) {
  return wx.getStorageSync(key)
}
//设置缓存
function setCache(key, value) {
  wx.setStorageSync(key, value)
}
//删除缓存
function removeCache(key) {
  wx.removeStorageSync(key)
}

/**
 * 字符串转json
 */
function stringToJson(data) {
  return JSON.parse(data);
}
/**
 *json转字符串
 */
function jsonToString(data) {
  return JSON.stringify(data);
}
/**
 *map转换为json
 */
function mapToJson(map) {
  return JSON.stringify(strMapToObj(map));
}
/**
 *json转换为map
 */
function jsonToMap(jsonStr) {
  return objToStrMap(JSON.parse(jsonStr));
}

/** 非空验证 */
function isNotNull(source) {
  if (source != null && source != undefined && source != 'undefined' && source != "")
    return true;
  return false;
}
/**去空格后非空验证*/
function isNotNullTrim(source) {
  if (source != null && source != undefined && source != 'undefined' && source.replace(/\s/g, '') != "")
    return true;
  return false;
}

//随机生成任意长度的名字
function random_string(len) {
  len = len || 32;
  var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var maxPos = chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}
//获取文件后缀名
function get_suffix(filename) {
  var pos = filename.lastIndexOf('.')
  var suffix = ''
  if (pos != -1) {
    suffix = filename.substring(pos)
  }
  return suffix;
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

/**
 * 时间秒数格式化
 * @param s 时间戳（单位：秒）
 * @returns {*} 格式化后的时分秒
 */
const secToTime = function (s) {
  var t;
  if (s > -1) {
    var hour = Math.floor(s / 3600);
    var min = Math.floor(s / 60) % 60;
    var sec = s % 60;
    if (hour < 10) {
      t = '0' + hour + "时 ";
    } else {
      t = hour + "时 ";
    }

    if (min < 10) {
      t += "0";
    }
    t += min + "分 ";
    if (sec < 10) {
      t += "0";
    }
    t += sec + "秒 "
  }
  return t;
}

/**
 * 字节智能转换
 */
const byteFormat = function (bytes) {
  var s = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  var e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, Math.floor(e))).toFixed(0) + " " + s[e];
}

const debounce = function debounce(fn, delay) {
  var timer = null;
  console.log(fn)
  return function () {
    console.log(231)
    var context = this, args = '';
    console.log(context)
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.call(context, args);
    }, delay);
  };
}

module.exports = {
  formatTime,
  isInters,
  fromDate,
  mDay,
  week,
  formatDateStr,
  fromDates,
  fromDatesDay,
  mDays,
  getCache: getCache,
  setCache: setCache,
  removeCache: removeCache,
  stringToJson: stringToJson,
  jsonToString: jsonToString,
  mapToJson: mapToJson,
  jsonToMap: jsonToMap,
  isNotNull: isNotNull,
  isNotNullTrim: isNotNullTrim,
  random_string: random_string,
  get_suffix: get_suffix,
  json2Form: json2Form,
  secToTime,
  byteFormat,
  debounce
}