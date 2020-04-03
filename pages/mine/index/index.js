// pages/mine/index/index.js
import { userInfo, messageList } from '../../../api/mine.js';
let util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '未登录',
    id: '',
    avatar: '',
    //网格按钮的配置
    gridBtnList: [
      {
        text: "我的讨论",
        backgroundColor: "#87c38f",
        src: "/images/tabbar/discuss.png",
        url: "/pages/mine/myThreadsSent/myThreadsSent"
      },
      {
        text: "我的收藏",
        backgroundColor: "#8aa4c7",
        src: "/images/icons/star.png",
        url: "/pages/mine/threadCollection/threadCollection"
      },
      {
        text: "浏览记录",
        backgroundColor: "#c78a8a",
        src: "/images/icons/history.png",
        url: "/pages/mine/history/history"
      },
      {
        text: "我的周记",
        backgroundColor: "#c78a8a",
        src: "/images/icons/node.png",
        url: "/pages/mine/weeklyReport/weeklyReport"
      },
      {
        text: "签到记录",
        backgroundColor: "#c78a8a", 
        src: "/images/icons/check_in.png",
        url: "/pages/home/checkInRecord/checkInRecord"
      },
      {
        text: "反馈建议",
        backgroundColor: "#c78a8a",
        src: "/images/icons/feedback.png",
        url: "/pages/mine/feedback/feedback"
      }
    ],
    //消息列表
    messgeList: [
    ]
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
    this.getMessageList();
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

  },

  //网格按钮点击事件
  bindGridBtnTap: function (event) {
    wx.navigateTo({
      url: event.currentTarget.dataset.url
    })
  },

  getMessageList: function() {
    messageList().then(res => {
      if (res.code == 1) {
        this.setData({
          messageList: res.result
        })
      }
    }).catch(err => {
      console.error(err)
    })
  }
})