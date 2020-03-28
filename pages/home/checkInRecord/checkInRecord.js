// pages/home/checkInRecord/checkInRecord.js
import { checkInRecord } from '../../../api/checkIn.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listQuery: {
      page: 1,
      row: 20
    },
    recordData: [],
    //上拉加载更多的文字信息
    loadingText: '加载中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getCheckInRecord();
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
    if (this.data.recordData.length == 0) {
      this.getCheckInRecord();
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
    this.setData({
      'listQuery.page': 1,
      'listQuery.row': 20,
      loadingText: '加载中...'
    });
    this.getCheckInRecord(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      'listQuery.page': 1,
      'listQuery.row': this.data.listQuery.row + 20
    });
    this.getCheckInRecord(false)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取签到记录
  getCheckInRecord: function (isShowToast = false) {
    checkInRecord(this.data.listQuery).then(res => {
      if (res.code == 1) {
        if (res.result.length < 20 || res.result.length === this.data.recordData.length) {
          this.setData({
            loadingText: '没有更多了',
            recordData: res.result
          })
        } else {
          this.setData({ recordData: res.result });
        }
        if (isShowToast) {
          wx.showToast({
            title: '刷新成功',
            icon: 'none',
            duration: 1000
          })
        }
        // 停止下拉动作
        wx.stopPullDownRefresh();
      } else {
        console.log("获取签到记录失败");
        wx.showToast({
          title: '获取信息失败',
          icon: 'none',
          duration: 1000
        });
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    }).catch(error => {
      console.log("获取签到记录异常");
      wx.showToast({
        title: '获取信息失败，服务器异常',
        icon: 'none',
        duration: 1000
      });
    });
  }
})