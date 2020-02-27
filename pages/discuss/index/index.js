// pages/discuss/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    threadsData: [
      {
        userName: '莫有感情的菜鸟',
        headiconUrl: 'https://recomi.site/logo.png',
        time: '2020-02-13 13:22',
        thumbsUps: 0,
        comments: 2,
        title: '谁能帮我整一个内推？',
        content: '先帝创业未半而中道崩殂，今天下三分，益州疲弊，此诚危急存亡之秋也。然侍卫之臣不懈于内，忠志之士忘身于外者，盖追先帝之殊遇，欲报之于陛下也。...',
        images: ['https://recomi.site/logo.png','https://recomi.site/logo.png','https://recomi.site/logo.png']
      },
      {
        userName: '虚鲲蔡蔡子',
        headiconUrl: 'https://recomi.site/logo.png',
        time: '2020-02-06 09:11',
        thumbsUps: 16,
        comments: 23,
        title: '今儿天气甚好',
        content: '八月湖水平，涵虚混太清。气蒸云梦泽，波撼岳阳城。欲济无舟楫，端居耻圣明。坐观垂钓者，空有羡鱼情',
        images: ['https://recomi.site/logo.png','https://recomi.site/logo.png','https://recomi.site/logo.png']
      }
    ]
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

  //编辑新主题
  editNewThread: function () {
    wx.navigateTo({
      // url: '../checkIn/checkIn'
      url: '../editNewThread/editNewThread'
    })
  }
})