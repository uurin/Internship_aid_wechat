// pages/mine/index/index.js
import { userInfo } from '../../../api/mine.js';
let util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '未登录',
    id: '',
    avatar: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (wx.getStorageSync('token') != '') {
    //   this.setUserFromStorage();  //从缓存读取当前的用户
    // } else {
    //   this.setData({
    //     userName: '未登陆',
    //     id: '',
    //     avatar: ''
    //   })
    // }
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
    let token = wx.getStorageSync('token');
    //当token本地不存在时，界面显示未登录
    if (token == null || token == '') {
      this.setData({
        userName: '未登陆',
        id: '点击登录',
        avatar: ''
      })
    } else {
      //当token本地存在时，界面显示用户信息
      this.setUserFromStorage();  //从缓存读取当前的用户
    }
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
  setUserFromStorage: function() {
    let userName = wx.getStorageSync('userName');
    //当本地存储没有保存用户名时，从网络获取用户信息保存
    if (userName == null || userName == '') {
      this.setUserFromRequest();
    }
    let id = wx.getStorageSync('id');
    let avatar = wx.getStorageSync('avatar');
    this.setData({
      userName: userName,
      id: id,
      avatar: avatar
    });
  },

  //从网络获取用户信息并保存
  setUserFromRequest: function() {
    userInfo().then(res => {
      if (res.code == 1) {
        wx.setStorageSync('userName', res.result.nameString);
        wx.setStorageSync('id', res.result.username);
        wx.setStorageSync('avatar', res.result.headPortrait);
        this.setData({
          userName: res.result.nameString,
          id: res.result.username,
          avatar: res.result.headPortrait
        });
      } else {
        wx.showToast({
          title: '获取数据失败',
          icon: 'none',
          duration: 1000
        })
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '获取数据失败，服务异常',
        icon: 'none',
        duration: 1000
      })
    })
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