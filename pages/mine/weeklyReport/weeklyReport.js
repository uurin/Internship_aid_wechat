// pages/mine/weeklyReport/weeklyReport.js
import { weeklyReportList } from '../../../api/weeklyReport.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //查询条件
    listQuery: {
      pageIndex: 1,
      pageSize: 20
    },
    //数据
    dataList: [],
    //上拉加载更多的文字信息
    loadingText: '加载中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData(false);
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
      'listQuery.pageSize': 20,
      loadingText: '加载中...'
    });
    this.getData(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      'listQuery.pageIndex': 1,
      'listQuery.pageSize': this.data.listQuery.pageSize + 15
    });
    this.getData(false)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取数据
  getData(isShowToast = false) {
    weeklyReportList(this.data.listQuery).then(res => {
      if (res.code == 1) {
        if (res.result.length < 20 || res.result.length === this.data.dataList.length) {
          this.setData({
            loadingText: '没有更多了',
            dataList: res.result
          })
        } else {
          this.setData({ dataList: res.result });
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
        wx.showToast({
          title: '获取信息失败',
          icon: 'none',
          duration: 1000
        });
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '获取信息失败，服务器异常',
        icon: 'none',
        duration: 1000
      });
    })
  },

  //点击卡片
  bindtapCard(e) {
    let id = e.currentTarget.dataset.item_id;
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