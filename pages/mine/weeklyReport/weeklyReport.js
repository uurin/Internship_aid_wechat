// pages/mine/weeklyReport/weeklyReport.js
import { weeklyReportList } from '../../../api/weeklyReport.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listQuery: {
      pageIndex: 1,
      pageSize: 20
    },
    dataList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    weeklyReportList(this.data.listQuery).then(res => {
      if (res.code == 1) {
        this.setData({
          dataList: res.result
        })
      }
    }).catch(err => {
      console.error(err)
    })
  },

  //点击卡片
  bindtapCard(e) {
    let id = e.currentTarget.dataset.XXXid;
    wx.navigateTo({
      url: '/pages/mine/weeklyReportView/weeklyReportView?id=' + id
    })
  },

  //添加新周记
  addNew: function (e) {
    wx.navigateTo({
      url: '../addWeeklyReport/addWeeklyReport'
    })
  }
})