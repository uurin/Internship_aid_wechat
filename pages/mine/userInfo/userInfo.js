// pages/mine/userInfo/userInfo.js
import { userInfo } from '../../../api/mine.js';
import Dialog from '/@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.userInfo == null ) {
      this.getUserInfo();
    }
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
    this.getUserInfo(true);
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

  //获取用户信息
  getUserInfo: function (isShowToast = false) {
    userInfo().then(res => {
      if(res.code == 1) {
        this.setData({
          userInfo: res.result
        });
        if (isShowToast) {
          wx.showToast({
            title: '刷新成功',
            icon: 'none',
            duration: 1000
          })
        }
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }else {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none',
          duration: 1000
        });
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '获取信息失败，服务器异常',
        icon: 'none',
        duration: 1000
      });
    })
  },

  //退出登录
  bindTapLogout: function() {
    Dialog.confirm({
      title: '提示',
      message: '是否退出并重新登录？'
    }).then(() => {
      wx.setStorageSync("token", null);
      wx.setStorageSync('userName', null);
      wx.setStorageSync('id', null);
      wx.setStorageSync('avatar', null);
      wx.showToast({
        title: '已退出登录',
        icon: 'none',
        duration: 1500,
        success: function() {
          setTimeout(() => {
            //直接关闭当前页面,跳转到新页面
            wx.redirectTo({
              url: '/pages/login/login/login',
            })
          }, 1000);
        }
      });

    }).catch(() => {
      // on cancel
    });
  }
})