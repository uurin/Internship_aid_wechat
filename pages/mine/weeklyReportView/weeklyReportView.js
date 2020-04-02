// pages/mine/weeklyReportView/weeklyReportView.js
import { detailWeeklyReport, deleteWeeklyReport } from '../../../api/weeklyReport.js';
import Dialog from '/@vant/weapp/dialog/dialog';

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
    }, function () {
      this.getData();
    });
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
    this.getData(true);
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
  getData(isShowToast = false) {
    detailWeeklyReport({ id: this.data.id }).then(res => {
      if (res.code == 1) {
        this.setData({
          detailData: res.result
        })
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
      })
    })
  },

  tapDelete: function(e) {
    Dialog.confirm({
      title: '警告',
      message: '确认删除该周记吗？'
    }).then(() => {
      deleteWeeklyReport({ id: this.data.id }).then(res => {
        if (res.code == 1) {
          wx.showToast({
            title: '删除成功',
            duration: 1000,
            success: function () {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1,
                })
              }, 1000);
            }
          });
          
        } else {
          wx.showToast({
            title: '删除失败',
            icon: 'none',
            duration: 1000
          })
        }
      })
    }).catch(() => {
      // on cancel
    });
  },

  tapEdit: function(e) {
    //
  }
})