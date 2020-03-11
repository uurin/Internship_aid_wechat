// pages/login/login/login.js
import { login, getVerifyCodeSrc } from '../../../api/login.js';
let util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      id: '',
      pass: '',
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

  //id账号的输入监听
  onChangeId(event) {
    this.data.formData.id = event.detail;
  },

  //密码的输入监听
  onChangePassword(event) {
    this.data.formData.pass = event.detail;
  },

  //密码的输入监听
  onChangeCode(event) {
    this.data.formData.code = event.detail;
  },

  //检查输入的数据格式
  checkInput() {
    if (this.data.formData.id == '') {
      wx.showToast({
        title: '用户名不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    } else if (this.data.formData.pass == '') {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    } else if (this.data.formData.code == '') {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 2000
      });
      return false;
    }
    return true;
  },

  //登陆
  login: function () {
    //检查输入信息的格式
    if ( ! this.checkInput() ) {
      return;
    }
    let data = {
      username: this.data.formData.id,
      password: this.data.formData.pass,
      vrifyCode: this.data.formData.code,
    };
    login(data).then(res => {
      console.log(res)
      if (res.code == 1) {
        //保存token
        util.setCache('token', res.result);
        wx.showToast({
          title: '登陆成功',
          icon: 'success',
          duration: 2000
        })
      } else if (res.code == -1) {
        wx.showToast({
          title: '密码错误',
          icon: 'none',
          duration: 2000
        })
      } else if (res.code == -2) {
        wx.showToast({
          title: '账号不存在',
          icon: 'none',
          duration: 2000
        })
      }
    }).catch(e => {
      console.log(e)
    })
  },

  //刷新验证码
  refreshCode: function () {
    this.setData({
      //利用时间戳使得刷新后的src不会重复
      codeSrc : getVerifyCodeSrc() + '?timestamp=' + Date.parse(new Date())
    });
    console.log(this.data.codeSrc)
  }
})