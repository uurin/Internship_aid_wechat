// pages/mine/userInfo/userInfo.js
import { userInfo, updateUserInfo } from '../../../api/mine.js';
import Dialog from '/@vant/weapp/dialog/dialog';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    // //是否显示通用的输入弹框
    // isShowGenericInputDialog: false,
    // //将要更改的属性字段名
    // fieldNameToBeChanged: null,
    // //通用输入弹框的输入内容
    // inputValue: '',
    //通用版的输入弹框配置
    genericDialogOption: {
      isShow: false,  //是否显示弹框
      title: '修改',
      fieldName: '',  //待提交的字段名
      inputValue: '', //输入的文字
      maxlength: 10, //最大输入长度
      placeholder: '',  //占位文字
      isShowConfirm: false  //是否显示确定按钮
    },
    //修改性别的弹框
    sexDialogOption: {
      isShow: false,  //是否显示弹框
      title: '修改性别',
      radioValue: '男'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (this.data.userInfo == null ) {
      this.getUserInfo();
    }
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
    this.getUserInfo(true);
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

  //获取用户信息
  getUserInfo: function (isShowToast = false) {
    userInfo().then(res => {
      if(res.code == 1) {
        this.setData({
          userInfo: res.result
        });
        if (isShowToast) {
          wx.showToast({
            title: '刷新成功',
            icon: 'none',
            duration: 1000
          })
        }
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }else {
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

  //退出登录
  bindTapLogout: function() {
    Dialog.confirm({
      title: '提示',
      message: '是否退出并重新登录？'
    }).then(() => {
      wx.setStorageSync("token", null);
      wx.setStorageSync('userName', null);
      wx.setStorageSync('id', null);
      wx.setStorageSync('avatar', null);
      wx.showToast({
        title: '已退出登录',
        icon: 'none',
        duration: 1500,
        success: function() {
          setTimeout(() => {
            //直接关闭当前页面,跳转到新页面
            wx.redirectTo({
              url: '/pages/login/login/login',
            })
          }, 1000);
        }
      });

    }).catch(() => {
      // on cancel
    });
  },

  //点击性别单元格
  bindclickSexCell: function(e) {
    this.setData({
      'sexDialogOption.isShow': true,
      'sexDialogOption.radioValue': this.data.userInfo.sexString
    })
  },

  // 改变性别单选框时
  onChangeSexRadio(event) {
    this.setData({
      'sexDialogOption.radioValue': event.detail
    });
  },

  // 点击性别单选框时
  onClickSexRadio(event) {
    let name = 
    this.setData({
        'sexDialogOption.radioValue': event.currentTarget.dataset.name
    });
  },

  //点击性别弹框的确定按钮
  onComfirmSexDialog: function(e) {
    let data = {
      username: this.data.userInfo.username,
      sexString: this.data.sexDialogOption.radioValue
    };
    //请求
    updateUserInfo(data).then(res => {
      if (res.code == 1) {
        this.getUserInfo();
        this.setData({
          'sexDialogOption.isShow': false
        })
        wx.showToast({
          title: '修改信息成功',
          icon: 'none',
          duration: 1000
        });
      } else {
        wx.showToast({
          title: '修改失败',
          icon: 'none',
          duration: 1000
        });
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '修改失败，服务器异常',
        icon: 'none',
        duration: 1000
      });
    })
  },

  //点击性别弹框的取消按钮
  onCancelSexDialog: function(e) {
    this.setData({
      'sexDialogOption.isShow': false
    })
  },

  //点击通用单元格信息(指容易通用更改的信息)
  bindclickGenericCell(e) {
    this.setData({
      'genericDialogOption.title': '修改' + e.currentTarget.dataset.field
    });
    switch (e.currentTarget.dataset.mark) {
      case 'userName':
        this.setData({
          'genericDialogOption.fieldName': 'nameString',
          'genericDialogOption.inputValue': this.data.userInfo.nameString,
          'genericDialogOption.maxlength': 12,
          'genericDialogOption.placeholder': '最长12个字符'
        })
        break;
      case 'major':
        this.setData({
          'genericDialogOption.fieldName': 'majorString',
          'genericDialogOption.inputValue': this.data.userInfo.majorString,
          'genericDialogOption.maxlength': 16,
          'genericDialogOption.placeholder': '最长16个字符'
        })
        break;
      case 'grade':
        this.setData({
          'genericDialogOption.fieldName': 'gradeString',
          'genericDialogOption.inputValue': this.data.userInfo.gradeString,
          'genericDialogOption.maxlength': 12,
          'genericDialogOption.placeholder': '最长12个字符'
        })
        break;
      case 'class':
        this.setData({
          'genericDialogOption.fieldName': 'classString',
          'genericDialogOption.inputValue': this.data.userInfo.classString,
          'genericDialogOption.maxlength': 12,
          'genericDialogOption.placeholder': '最长12个字符'
        })
        break;
      case 'signature':
        this.setData({
          'genericDialogOption.fieldName': 'personality',
          'genericDialogOption.inputValue': this.data.userInfo.personality,
          'genericDialogOption.maxlength': 50,
          'genericDialogOption.placeholder': '最长50个字符'
        })
        break;
      case 'company':
        this.setData({
          'genericDialogOption.fieldName': 'company',
          'genericDialogOption.inputValue': this.data.userInfo.company,
          'genericDialogOption.maxlength': 20,
          'genericDialogOption.placeholder': '最长20个字符'
        })
        break;
      case 'companyAddress':
        this.setData({
          'genericDialogOption.fieldName': 'companyPosition',
          'genericDialogOption.inputValue': this.data.userInfo.companyPosition,
          'genericDialogOption.maxlength': 40,
          'genericDialogOption.placeholder': '最长40个字符'
        })
        break;
    }
    this.setData({
      'genericDialogOption.isShow': true
    })
  },
  
  //改变输入内容时
  onChangeInputGenericDialog: function(e) {
    if (e.detail != null && e.detail != '') {
      this.setData({
        'genericDialogOption.inputValue': e.detail,
        'genericDialogOption.isShowConfirm': true
      })
    } else {
      this.setData({
        'genericDialogOption.inputValue': e.detail,
        'genericDialogOption.isShowConfirm': false
      })
    }
  },

  //点击确定，通用输入弹框
  onComfirmGenericDialog: function(e) {
    //防止某些不可留空的参数留空
    if (this.data.genericDialogOption.fieldName == 'nameString' 
        && (this.data.genericDialogOption.inputValue == ''
            || this.data.genericDialogOption.inputValue == null)
      ) {
      wx.showToast({
        title: '请勿留空！',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    let data = {};
    //传参
    data[this.data.genericDialogOption.fieldName] = this.data.genericDialogOption.inputValue;
    //设置用户id
    data.username = this.data.userInfo.username;
    //请求
    updateUserInfo(data).then(res => {
      if (res.code == 1) {
        this.getUserInfo();
        this.setData({
          'genericDialogOption.isShow': false,
          'genericDialogOption.inputValue': ''
        })
        wx.showToast({
          title: '修改信息成功',
          icon: 'none',
          duration: 1000
        });
        //改名了就要清除本地存储的用户名
        if (this.data.genericDialogOption.fieldName == 'nameString') {
          wx.setStorageSync('userName', null)
        }
      } else {
        wx.showToast({
          title: '修改失败',
          icon: 'none',
          duration: 1000
        });
      }
    }).catch(err => {
      console.error(err);
      wx.showToast({
        title: '修改失败，服务器异常',
        icon: 'none',
        duration: 1000
      });
    })
  },

  //点击取消，通用输入弹框
  onCancelGenericDialog: function(e) {
    this.setData({
      'genericDialogOption.isShow': false
    })
  },

  //通用输入弹框关闭时调用
  onCloseGenericDialog: function (e) {
    this.setData({
      'genericDialogOption.isShowConfirm': false
    })
  }
})