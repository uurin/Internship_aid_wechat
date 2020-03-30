// pages/discuss/hotThreads/hotThreads.js
import { hotThreads } from '../../../api/discuss.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //帖子列表数据
    threadListData: [],
    listQuery: {
      pageIndex: 1,
      pageSize: 10,
    },
    //上拉加载更多的文字信息
    loadingText: '加载中...'
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
    this.setData({
      'listQuery.pageIndex': 1,
      'listQuery.pageSize': 10,
      loadingText: '加载中...'
    })
    this.getThreads(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      'listQuery.pageSize': this.data.listQuery.pageSize + 10
    });
    this.getThreads(false);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取讨论帖列表信息
  getThreads: function (ifShowToast = false) {
    let data = this.data.listQuery;
    hotThreads(data).then(res => {
      if (res.code == 1) {
        if (res.result.length < 10 || res.result.length === this.data.threadListData.length) {
          this.setData({
            loadingText: '没有更多了'
          })
        }
        this.setData({
          threadListData: res.result
        });
        // 停止下拉动作
        wx.stopPullDownRefresh();
        if (ifShowToast) {
          wx.showToast({
            title: '刷新成功',
            icon: 'none',
            duration: 1000
          })
        }
      } else {
        //
        console.error("获取讨论帖失败，" + res.describe)
      }
    }).catch(error => {
      console.error("获取讨论帖错误，" + error)
    });
  },

})