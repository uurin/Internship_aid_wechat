// pages/mine/weeklyReportView/weeklyReportView.js
import { detailWeeklyReport } from '../../../api/weeklyReport.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: null,
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.setData({
      id: id
    });
    this.getData();
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
    this.getData();
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

  //获取数据
  getData() {
    detailWeeklyReport().then(res => {
      if (res.code == 1) {
        this.setData({
          detailData: res.result
        })
      } else {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none',
          duration: 1000
        })
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '获取信息失败，服务器异常',
        icon: 'none',
        duration: 1000
      })
    })
  }
})