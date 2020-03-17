// pages/mine/index/index.js
let util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    id: '',
    avatar: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setUserFromCache();  //从缓存读取当前的用户
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //从缓存读取当前的用户
  setUserFromCache: function() {
    this.setData({
      userName: '某用户A',
      id: 1313121222,
      avatar: ''
    });
  },

  //点击用户面板
  bindTapUserPanel: function () {
    if (util.getCache('token') == null) {
      wx.navigateTo({
        url: '/pages/login/login/login'
      })
    } else {
      wx.navigateTo({
        url: '../userInfo/userInfo'
      })
    }

  }
})