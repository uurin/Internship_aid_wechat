// pages/home/recruitmentDetail/recruitmentDetail.js
import { recruitmentDetail } from '../../../api/home.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    recruitmentInfo: {
      id: 1, 
      title: 'web前端开发', 
      content:  [
        '【任职要求】：',
        '1、熟悉HTML/CSS，能够独立完成前端页面开发工作，准确地进行代码构建；' ,
        '2、精通javascript，熟练运用ES6语法；' ,
        '3、至少熟悉react、vue等一种框架，有使用经验；' ,
        '4、有使用过nodejs、webpack、less、git、gulp等一种或者多种技术的优先；' ,
        '5、有移动端H5开发经验的优先；' ,
        '6、具备良好的分析解决问题能力，能独立承担任务，有系统进度把控能力；' ,
        '7、良好的沟通、协调能力，有高度责任感和敬业精神，具有团队合作精神。' 
      ],
      benefits: '员工旅游，零食下午茶，带薪年假，年终奖，全勤奖。', 
      contact: '张某某，电话:1xxxxxxxxxx',
      wage: '2-3K', 
      area: '广东广州', 
      company: '某某公司', 
      industry: '计算机软件' 
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    this.setData({
      id: options.id
    }, function () {
      that.getData();
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
  getData: function (ifShowToast = false) {
    recruitmentDetail({ id: this.data.id }).then(res => {
      if (res.code == 1) {
        this.setData({
          recruitmentInfo: res.result
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
  }

})