//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 'home',
    gridBtnList: [
      {
        text: "签到",
        backgroundColor: "#87c38f",
        src: "/images/icons/check_in_light.png",
        url: "../checkIn/checkIn"
      },
      {
        text: "日记",
        backgroundColor: "#8aa4c7",
        src: "/images/icons/check_in_light.png",
        url: "/pages/mine/weeklyReport/weeklyReport"
      },
      {
        text: "更多",
        backgroundColor: "#c78a8a",
        src: "/images/icons/check_in_light.png",
        url: "/pages/discuss/index/index"
      }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },

  //........

  //网格按钮点击事件
  bindGridBtnTap: function(event) {
    wx.navigateTo({
      // url: '../checkIn/checkIn'
      url: event.currentTarget.dataset.url
    })
  },
})
