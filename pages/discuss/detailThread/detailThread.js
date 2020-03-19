// pages/discuss/detailThread/detailThread.js
import { threadDetail } from '../../../api/discuss.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listQuery: {
      id: 1,
      pageSize: 20,
      pageIndex: 1
    },
    //帖主的数据
    mainData: {},
    //评论的数据
    commentData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let threadId = options.threadId;
    console.log('threadId='+threadId)
    this.setData({
      'listQuery.id': threadId
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

  //获取或刷新数据
  getData: function() {
    threadDetail(this.data.listQuery).then(res => {
      if(res.code == 1) {
        this.setData({
          mainData: res.result.post,
          commentData: res.result.reply
        })
      }else{
        console.error('获取帖子详情失败，' + res.describe);
      }
    }).catch(err => {
      console.error(err);
    })
  },

  //前往查看评论详情的页面
  goDetailComment: function(event) {
    wx.navigateTo({
      url: '../detailComment/detailComment',
    })
  },

  //帖主的图片预览
  previewMainImg:function(e){
    var imgUrl = e.currentTarget.dataset.src; //获取当前点击的图片
    var imgArr = this.data.mainData.realFile;
    wx.previewImage({
      current: imgUrl, //当前图片地址
      urls: imgArr,  //所有图片集合
      // urls: [imgUrl], //单张图
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})