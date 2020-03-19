// pages/discuss/index/index.js
import { allThreads } from '../../../api/discuss.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    //帖子列表数据
    threadListData: [],
    listQuery: {
      pageIndex: 0,
      pageSize: 10,
      searchText: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getThreads();
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
    //当帖子列表数据为空时重新获取数据
    if (this.data.threadListData.length == 0) {
      this.getThreads();
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

  //编辑新主题
  editNewThread: function () {
    wx.navigateTo({
      // url: '../checkIn/checkIn'
      url: '../editNewThread/editNewThread'
    })
  },

  //获取多个讨论帖信息
  getThreads: function () {
    let data = this.data.listQuery;
    allThreads(data).then(res => {
      if(res.code == 1) {
        this.setData({
          threadListData: res.result
        });
      } else {
        //
        console.error("获取讨论帖失败，" + res.describe)
      }
    }).catch(error => {
      console.error("获取讨论帖错误，" + error)
    });
  }
})