// pages/login/changePassword/changePassword.js
import { changePassword } from '../../../api/login.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      oldPassword: '',
      newPassword: '',
      newPasswordAgain: ''
    }
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
  
  onChangeOldPassword(event) {
    this.data.formData.oldPassword = event.detail;
  },

  onChangeNewPassword(event) {
    this.data.formData.newPassword = event.detail;
  },

  onChangeNewPasswordAgain(event) {
    this.data.formData.newPasswordAgain = event.detail;
  },

  //检查输入的数据格式
  checkInput() {
    if (this.data.formData.oldPassword == '' || this.data.formData.newPassword == '' || this.data.formData.newPasswordAgain == '') {
      wx.showToast({
        title: '不能为空',
        icon: 'none',
        duration: 1500
      });
      return false;
    }
    if (this.data.formData.newPassword != this.data.formData.newPasswordAgain ) {
      wx.showToast({
        title: '两次输入的新密码不一致',
        icon: 'none',
        duration: 1500
      });
      return false;
    }
    return true;
  },

  tapOK: function(e) {
    if ( ! this.checkInput()) {
      return;
    }
    changePassword(this.data.formData).then(res => {
      if (res.code == 1) {
        wx.setStorageSync('token', null);
        wx.showToast({
          title: '更换密码成功，请重新登录',
          icon: 'success',
          duration: 1500,
          success: function () {
            setTimeout(function () {
              wx.redirectTo({
                url: '/pages/login/login/login',
              })
            }, 1000);
          }
        })
      } else {
        wx.showToast({
          title: '提交失败，' + res.describe,
          icon: 'none',
          duration: 1500
        })
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '提交失败，服务异常',
        icon: 'none',
        duration: 1500
      })
    })
  }
})