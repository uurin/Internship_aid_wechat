// pages/mine/addWeeklyReport/addWeeklyReport.js
import { addWeeklyReport } from '../../../api/weeklyReport.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //提交的表单
    formData: {
      title: '',
      content: ''
    },
    //标记内容长度
    markContentSize: '0/1000'
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

  //监听输入标题
  onChangeTitle: function (e) {
    this.setData({
      "formData.title": e.detail
    });
  },

  //监听输入内容
  onChangeContent: function (e) {
    this.setData({
      "formData.content": e.detail.value,
      markContentSize: e.detail.value.length + '/1000'
    });
  },

  //提交
  submitForm: function (e) {
    if (this.data.formData.title == '' || this.data.formData.content == '') {
      wx.showToast({
        title: '请输入文字！',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    //提交表单
    let data = this.data.formData;
    addWeeklyReport(data).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: '添加成功',
          duration: 1000,
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
          title: '提交失败',
          icon: 'none',
          duration: 1000
        })
      }
    }).catch(error => {
      console.error('提交失败，服务器异常', error);
      wx.showToast({
        title: '提交失败，服务器异常',
        icon: 'none',
        duration: 1000
      })
    })
  }
})