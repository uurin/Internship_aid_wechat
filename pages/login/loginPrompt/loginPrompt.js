// pages/login/loginPrompt/loginPrompt.js
import { loginWX } from '../../../api/login.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowDialog: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  checkAuthorize() {
    let that = this;
    wx.getSetting({
      success: function(res) {
        if (! res.authSetting['scope.userInfo']) {
          //用户没有授权
          console.log("用户没有授权");
          wx.authorize({
            scope: 'scope.userInfo',
            success () {
              that.loginByWeChat();
            },
            fail() {
              that.setData({
                isShowDialog: true
              })
            }
          })
        } else {
          that.loginByWeChat();
        }
      }
    })
  },

  loginByWeChat() {
    wx.login({
      success (res) {
        if (res.code) {
          loginWX({code: res.code}).then(res => {
            if (res.code == 1) {
              wx.setStorageSync('token', res.result)
              wx.showToast({
                title: '登陆成功',
                icon: 'success',
                duration: 2000, 
                success: function () {
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 2,
                    })
                  }, 1000);
                }
              })
            } else {
              return Promise.reject('登录失败')
            }
          }).catch(err => {
            console.error(err)
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 1000
            })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  toLoginById() {
    wx.navigateTo({
      url: '../login/login',
    })
  },

  cancel() {
    wx.navigateBack({
      delta: 1,
    })
  },
  
  onCancelDialog() {
    this.setData({
      isShowDialog: false
    })
  }
})