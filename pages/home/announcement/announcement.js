// pages/home/announcement/announcement.js
import { announcement } from '../../../api/home.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //上拉加载更多的文字信息
    loadingText: '加载中...',
    listQuery: {
      pageIndex: 1,
      pageSize: 10,
    },
    dataList: [
      { title: '关于2020年校园招聘会于近期举办的通知', content: '我校决定，2020年的校园招聘会将在6月6日举办，招聘内容资料已经上线实习辅助软件，届时希望各位未着落实习工作的学生们踊跃参与。', image: 'http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg', date: '2020-04-02 15:11:11' },
      { title: '关于2020年校园招聘会于近期举办的通知', content: '我校决定，2020年的校园招聘会将在6月6日举办，招聘内容资料已经上线实习辅助软件，届时希望各位未着落实习工作的学生们踊跃参与。', image: 'http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg', date: '2020-04-01 15:11:11' },
      { title: '关于2020年校园招聘会于近期举办的通知', content: '我校决定，2020年的校园招聘会将在6月6日举办，招聘内容资料已经上线实习辅助软件，届时希望各位未着落实习工作的学生们踊跃参与。', image: 'http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg', date: '2020-03-27 15:11:11' }
    ]
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
    this.setData({
      'listQuery.pageIndex': 1,
      'listQuery.pageSize': 10,
      loadingText: '加载中...'
    })
    this.getData(true);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      'listQuery.pageSize': this.data.listQuery.pageSize + 10
    });
    this.getData(false);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取数据
  getData: function (ifShowToast = false) {
    announcement(this.data.listQuery).then(res => {
      if (res.code == 1) {
        if (res.result.length < 10 || res.result.length === this.data.dataList.length) {
          this.setData({
            loadingText: '没有更多了'
          })
        }
        this.setData({
          dataList: res.result
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
        wx.showToast({
          title: '获取信息失败',
          icon: 'none',
          duration: 1000
        })
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '获取信息失败，服务异常',
        icon: 'none',
        duration: 1000
      })
    })
  }
})