// pages/discuss/detailComment/detailComment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //该条评论的所有数据，其中childComments数组为回复的数据
    commentData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = JSON.parse(options.item);
    console.log(data);
    this.setData({
      commentData: data
    })
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

  //主评论图片预览
  previewCommentImg: function (e) {
    var imgUrl = e.currentTarget.dataset.src; //获取当前点击的图片
    var imgArr = this.data.commentData.realFile;
    wx.previewImage({
      current: imgUrl, //当前图片地址
      urls: imgArr,  //所有图片集合
      // urls: [imgUrl], //单张图
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})