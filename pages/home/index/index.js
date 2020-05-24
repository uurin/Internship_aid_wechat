//index.js
import { hotThreads, announcement, announcementImages } from '../../../api/home.js';

//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    active: 'home',
    //网格按钮的配置
    gridBtnList: [
      {
        text: "签到",
        backgroundColor: "#87c38f",
        src: "/images/icons/check_in_light.png",
        url: "../checkIn/checkIn"
      },
      {
        text: "公告",
        backgroundColor: "#c78a8a",
        src: "/images/icons/announcement_light.png",
        url: "/pages/home/announcement/announcement"
      },
      {
        text: "周记",
        backgroundColor: "#8aa4c7",
        src: "/images/icons/weekNode_light.png",
        url: "/pages/mine/weeklyReport/weeklyReport"
      }, 
      {
        text: "招聘",
        backgroundColor: "#d1ac84",
        src: "/images/icons/recruitment_light.png",
        url: "/pages/home/recruitment/recruitment"
      }
    ],
    //热门帖的查询条件
    listQueryHotThread: {
      pageIndex: 1,
      pageSize: 4
    },
    //公告轮播图的图片列表
    announcementImages: [
      'https://recomi.site/bg1.jpg',
      'https://recomi.site/usr/uploads/2019/08/4047826182.png',
      'https://recomi.site/bg1.jpg'
    ],
    //热门讨论帖列表
    hotThreadList: [],
    //最近公告列表
    announcementList: [
      { title: '关于2020年校园招聘会于近期举办的通知', content: '我校决定，2020年的校园招聘会将在6月6日举办，招聘内容资料已经上线实习辅助软件，届时希望各位未着落实习工作的学生们踊跃参与。', image: 'http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg', date: '2020-04-02 15:11:23' },
      { title: '关于2020年校园招聘会于近期举办的通知', content: '我校决定，2020年的校园招聘会将在6月6日举办，招聘内容资料已经上线实习辅助软件，届时希望各位未着落实习工作的学生们踊跃参与。', image: 'http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg', date: '2020-04-01 15:11:23' },
      { title: '关于2020年校园招聘会于近期举办的通知', content: '我校决定，2020年的校园招聘会将在6月6日举办，招聘内容资料已经上线实习辅助软件，届时希望各位未着落实习工作的学生们踊跃参与。', image: 'http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg', date: '2020-03-27 15:11:23' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    //获取数据
    this.getData();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('token') != null) {
      if (this.data.hotThreadList.length == 0) {
        this.getData();
      }
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getData(true);
  },

  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../../logs/logs'
    })
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onChange(event) {
    this.setData({ active: event.detail });
  },

  //........

  //网格按钮点击事件
  bindGridBtnTap: function(event) {
    wx.navigateTo({
      // url: '../checkIn/checkIn'
      url: event.currentTarget.dataset.url
    })
  },

  //获取各个数据
  getData(isShowToast = false) {
    //获取热门帖
    hotThreads(this.data.listQueryHotThread).then(res => {
      if (res.code == 1) {
        this.setData({
          hotThreadList: res.result
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
      });
    });
    //获取公告图片列表
    announcementImages().then(res => {
      if (res.code == 1) {
        this.setData({
          announcementImages: res.result
        })
      } else {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none',
          duration: 1000
        });
      }
    }).catch(err => {
      console.error(err)
    })
    //获取公告信息列表
    announcement().then(res => {
      if (res.code == 1) {
        this.setData({
          announcementList: res.result
        })
      } else {
        wx.showToast({
          title: '获取信息失败',
          icon: 'none',
          duration: 1000
        });
      }
    }).catch(err => {
      console.error(err)
    })
  },

  tapMoreHotThreads: function() {
    wx.navigateTo({
      url: '/pages/discuss/hotThreads/hotThreads',
    })
  },

  tapMoreAnnouncement: function () {
    wx.navigateTo({
      url: '../announcement/announcement',
    })
  },
})
