// pages/home/recruitment/recruitment.js
import { recruitment, industryList } from '../../../api/home.js';

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
      industry: 0
    },
    option_industry: [
      { text: '所有行业', value: 0 },
      { text: '计算机软件', value: 1 },
      { text: '教育培训', value: 2 },
      { text: '供应链/物流', value: 3 },
      { text: '医疗健康', value: 4 },
      { text: '旅游', value: 5 },
      { text: '服务业', value: 6 },
      { text: '生产制造', value: 7 }
    ],
    dataList: [
      { id: 1, title: 'web前端开发', content: '员工旅游，零食下午茶，带薪年假，年终奖，全勤奖。', wage: '2-3K', area: '广东广州', company: '某某公司', industry: '计算机软件' },
      { id: 2, title: 'web前端开发', content: '员工旅游，零食下午茶，带薪年假，年终奖，全勤奖。', wage: '2-3K', area: '广东广州', company: '某某公司', industry: '计算机软件' },
      { id: 3, title: 'web前端开发', content: '员工旅游，零食下午茶，带薪年假，年终奖，全勤奖。', wage: '2-3K', area: '广东广州', company: '某某公司', industry: '计算机软件' }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndustryList();
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
    this.getIndustryList();
    this.setData({
      'listQuery.pageIndex': 1,
      'listQuery.pageSize': 10,
      loadingText: '加载中...'
    });
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

  //获取行业列表
  getIndustryList: function() {
    industryList().then(res => {
      if (res.code == 1) {
        this.setData({
          option_industry: res.result
        });
      } else {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none',
          duration: 1000
        })
      }
    }).catch(err => {
      console.error(err);
    })
  },

  //获取数据
  getData: function (ifShowToast = false) {
    recruitment(this.data.listQuery).then(res => {
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
    })
  },
  tapItem: function(e) {
    let id = e.currentTarget.dataset.recruitment_id;
    wx.navigateTo({
      url: '../recruitmentDetail/recruitmentDetail?id=' + id,
    })
  }
})