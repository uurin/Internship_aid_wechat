// pages/mine/myThreadsSent/myThreadsSent.js
import { myThreadsSent } from '../../../api/mine.js';
import { threadTypes } from '../../../api/discuss.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listQuery: {
      pageIndex: 1,
      pageSize: 20,
      category: 0,
      scope: 1,
      postType: 0
    },
    threadsData: [],
    //下拉菜单配置
    menuOption: [],
    //下拉菜单选中值
    menuValue: 0,
    //上拉加载更多的文字信息
    loadingText: '加载中...'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
    this.getThreadTypes();
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
    if (this.data.menuOption.length == 0) {
      this.getThreadTypes();
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
      'listQuery.pageSize': this.data.listQuery.pageSize + 20
    });
    this.getData(false)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //切换分类时调用
  onChangeType: function ({ detail }) {
    this.setData({
      'listQuery.postType': detail
    });
    this.getData();
  },

  //获取帖子类型列表
  getThreadTypes: function () {
    threadTypes().then(res => {
      if (res.code == 1) {
        let options = res.result;
        options.forEach((item, index) => {
          item.value = item.id
          item.text = item.type
        });
        options.unshift({ value: 0, text: '所有分类' })
        this.setData({
          menuOption: options
        })
      }
    })
  },

  //
  getData: function (isShowToast = false) {
    let data = this.data.listQuery;
    myThreadsSent(data).then(res => {
      if (res.code == 1) {
        let result = res.result;
        //以空格为分隔，截取日期去除具体时间
        result.forEach((item, index) => {
          item.date = item.date.split(' ')[0]
        });
        if (result.length < 20 || res.result.length === this.data.threadsData.length) {
          this.setData({
            loadingText: '没有更多了',
            threadsData: result
          })
        } else {
          this.setData({ threadsData: result })
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

  //点击卡片跳转帖子详情页
  bindTapCard: function (e) {
    console.log(e)
    let threadId = e.currentTarget.dataset.threadid
    wx.navigateTo({
      url: '/pages/discuss/detailThread/detailThread?threadId=' + threadId
    })
  }
})