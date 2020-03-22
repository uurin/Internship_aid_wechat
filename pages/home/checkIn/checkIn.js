// pages/home/checkIn/checkIn.js
import { doCheckIn, isCheckedIn } from '../../../api/checkIn.js';
var bmap = require('../../../api/bmap-wx.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCheckedIn: null,  //是否今天已经签到过
    ak: "nRTQOASQB9MQ2eGWVnCuRDXIIkwg4DOH", 
    location: "未知"  //位置信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.checkPermissions();
    this.getIsCheckedIn();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.checkPermissions();
    this.getIsCheckedIn();
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

  //检查授权地理位置
  checkPermissions: function () {
    let that = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // undefined    表示 初始化进入该页面
        // false    表示 非初始化进入该页面,且未授权
        // true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                });
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //获取当前位置信息
                      this.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          wx.getLocation({
            success: res => {
              console.log(res);
              // console.log(app.globalData.location);
            },
          })
        }
        else {
          this.getLocation();
        }
      }
    })
  },

  //获取定位; isRefresh:是否为刷新定位
  getLocation: function(isRefresh = false) {
    let that = this;
    let BMap = new bmap.BMapWX({
      ak: that.data.ak,
    });
    console.log(BMap)
    let fail = function (data) {
      console.log(data);
    };
    let success = function (data) {
      // console.log(data);
      //使用wxMarkerData获取数据  
      //  = data.wxMarkerData;  
      let province = data.originalData.result.addressComponent.province
      let city = data.originalData.result.addressComponent.city
      // let district = data.originalData.result.addressComponent.district
      //把所有数据放在初始化data内  
      console.log("当前地理位置: " + province + city)
      that.setData({
        location: province + city
      });
      if (isRefresh) {
        wx.showToast({
          title: '刷新定位成功',
          icon: 'none',
          duration: 1000
        })
      }
    }
    // 发起regeocoding检索请求   
    BMap.regeocoding({
      fail: fail,
      success: success
    });
  },

  //刷新定位
  refreshLocation: function () {
    this.getLocation(true);
  },

  //手动选择位置
  chooseLocation: function() {
    //
  },

  //判断今天是否已经签到过
  getIsCheckedIn: function() {
    isCheckedIn().then(res => {
      if(res.result == 'true') {
        this.setData({
          isCheckedIn: true
        });
      } else if (res.result == 'false') {
        this.setData({
          isCheckedIn: false
        });
      }else {
        console.log("获取今天的签到情况失败," + res.describe);
      }
    }).catch(error => {
      console.error(error);
    });
  },

  //按下签到
  tapCheckIn: function(e) {
    if(this.data.isCheckedIn) {
      return;
    }
    let data = {
      location: this.data.location
    };
    doCheckIn(data).then(res => {
      console.log(res)
      this.getIsCheckedIn();
    }).catch(error => {
      console.error(error);
    });
  }
})