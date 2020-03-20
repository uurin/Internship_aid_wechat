// pages/mine/myThreadsSent/myThreadsSent.js
import { myThreadsSent } from '../../../api/mine.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listQuery: {
      pageIndex: 1,
      pageSize: 40,
      category: 0
    },
    threadsData: []
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
    if (this.data.threadsData.length == 0) {
      this.getData();
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

  //
  getData: function () {
    let data = this.data.listQuery;
    myThreadsSent(data).then(res => {
      if (res.code == 1) {
        let result = res.result;
        //以空格为分隔，截取日期去除具体时间
        result.forEach((item, index) => {
          item.date = item.date.split(' ')[0]
        });
        this.setData({
          threadsData: result
        })
      } else {
        wx.showToast({
          title: '获取信息失败',
        })
      }
    }).catch(err => {
      console.error(err)
    })
  },

  //点击卡片跳转帖子详情页
  bindTapCard: function (e) {
    console.log(e)
    let threadId = e.currentTarget.dataset.threadid
    wx.navigateTo({
      url: '/pages/discuss/detailThread/detailThread?threadId=' + threadId
    })
  }
})