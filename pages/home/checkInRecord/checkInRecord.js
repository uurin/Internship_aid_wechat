// pages/home/checkInRecord/checkInRecord.js
import { checkInRecord } from '../../../api/checkIn.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listQuery: {
      page: 1,
      row: 100
    },
    recordData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCheckInRecord();
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

  //获取签到记录
  getCheckInRecord: function() {
    checkInRecord(this.data.listQuery).then(res => {
      if(res.code == 1) {
        this.setData({
          recordData: res.result
        });
      } else {
        console.log("获取签到记录失败," + res);
      }
    }).catch(error => {
      console.log("获取签到记录异常," + error);
    });
  }
})