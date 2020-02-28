// pages/discuss/detailThread/detailThread.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //帖子详细数据
    threadDetailData: {
      //用户名
      userName: '莫有感情的菜鸟',
      //头像链接
      headiconUrl: 'https://recomi.site/logo.png',
      //时间
      time: '2020-02-02 09:11:23',
      //点赞数
      thumbsUps: 6,
      //评论数
      comments: 2,
      //标题
      title: '谁能帮我整一个内推？',
      //简要内容
      content: '先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。',
      //图片列表
      images: [
          'https://recomi.site/logo.png', 'https://recomi.site/logo.png', 'https://recomi.site/logo.png'
      ]
    }
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

  //图片预览
  previewImg:function(e){
    var imgUrl = e.currentTarget.dataset.src; //获取当前点击的图片
    var imgArr = this.data.threadDetailData.images;
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