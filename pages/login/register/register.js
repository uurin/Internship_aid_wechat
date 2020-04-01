// pages/login/register/register.js
import { register, getVerifyCodeSrc } from '../../../api/login.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      id: '',
      name: '',
      password: '',
      passwordAgain: '',
      code: ''
    },
    //验证码图片链接
    codeSrc: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.refreshCode();
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

  //学号的输入监听
  onChangeId(event) {
    this.data.formData.id = event.detail;
  },

  //姓名的输入监听
  onChangeName(event) {
    this.data.formData.name = event.detail;
  },

  //密码的输入监听
  onChangePassword(event) {
    this.data.formData.password = event.detail;
  },

  //第二次密码的输入监听
  onChangePasswordAgain(event) {
    this.data.formData.passwordAgain = event.detail;
  },
  
  //密码的输入监听
  onChangeCode(event) {
    this.data.formData.code = event.detail;
  },

  //检查输入的数据格式
  checkInput() {
    if (this.data.formData.id == '') {
      wx.showToast({
        title: '学号不能为空',
        icon: 'none',
        duration: 1500
      });
      return false;
    } else if (this.data.formData.name == '') {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1500
      });
      return false;
    } else if (this.data.formData.password == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1500
      });
      return false;
    } else if (this.data.formData.passwordAgain == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 1500
      });
      return false;
    } else if (this.data.formData.passwordAgain != this.data.formData.password) {
      wx.showToast({
        title: '两次密码不一致',
        icon: 'none',
        duration: 1500
      });
      return false;
    } else if (this.data.formData.code == '') {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1500
      });
      return false;
    }
    return true;
  },

  //刷新验证码
  refreshCode: function () {
    this.setData({
      //利用时间戳使得刷新后的src不会重复
      codeSrc: getVerifyCodeSrc() + '?timestamp=' + Date.parse(new Date())
    });
    console.log(this.data.codeSrc)
  },

  //提交注册
  tapRegister: function() {
    if ( ! this.checkInput()) {
      return;
    }
    let data= {
      username: this.data.formData.id,
      nameString: this.data.formData.name,
      password: this.data.formData.password
    }
    register(data).then(res => {
      if (res.code == 1) {
        //
        wx.showToast({
          title: '注册成功',
          icon: 'success',
          duration: 1500,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
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