// pages/discuss/index/index.js
import { allThreads, threadTypes } from '../../../api/discuss.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchValue: '',
    //帖子列表数据
    threadListData: [],
    listQuery: {
      pageIndex: 0,
      pageSize: 10,
      searchText: '',
      postType: 0
    },
    //下拉菜单配置
    menuOption: [],
    //下拉菜单选中值
    menuValue: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getThreadTypes();
    this.getThreads();
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
    //当帖子列表数据为空时重新获取数据
    if (this.data.threadListData.length == 0) {
      this.getThreads();
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

  //改变搜索文字时调用
  onChangeSearchText: function (e) {
    this.setData({
      'listQuery.searchText': e.detail
    })
  },

  //搜索
  onSearch: function (e) {
    this.getThreads();
  },

  //切换分类时调用
  onChangeType: function ({ detail }) {
    this.setData({
      'listQuery.postType': detail
    });
    this.getThreads();
  },

  //获取帖子类型列表
  getThreadTypes: function() {
    threadTypes().then(res => {
      if(res.code == 1) {
        let options = res.result;
        options.forEach((item, index) => {
          item.value = item.id
          item.text = item.type
        });
        options.unshift({ value: 0, text:'所有分类' })
        this.setData({
          menuOption: options
        })
      }
    })
  },

  //获取多个讨论帖信息
  getThreads: function () {
    let data = this.data.listQuery;
    allThreads(data).then(res => {
      if(res.code == 1) {
        this.setData({
          threadListData: res.result
        });
      } else {
        //
        console.error("获取讨论帖失败，" + res.describe)
      }
    }).catch(error => {
      console.error("获取讨论帖错误，" + error)
    });
  },

  //编辑新主题
  editNewThread: function () {
    wx.navigateTo({
      // url: '../checkIn/checkIn'
      url: '../editNewThread/editNewThread'
    })
  }
})