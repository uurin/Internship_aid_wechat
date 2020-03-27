// pages/discuss/editNewThread/editNewThread.js
import { createThread, uploadImage, threadTypes} from '../../../api/discuss.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //提交的表单
    formData: {
      title: '',
      content: '',
      category: 1,
      files: ''
    },
    //标记内容长度
    markContentSize: '0/400',
    //完整信息的图片列表
    fileList: [],
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

  //获取帖子类型列表
  getThreadTypes: function () {
    threadTypes().then(res => {
      if (res.code == 1) {
        let options = res.result;
        options.forEach((item, index) => {
          item.value = item.id
          item.text = item.type
        });
        this.setData({
          menuOption: options,
          'formData.category': options[0].value,
          menuValue: options[0].value
        })
      }
    })
  },

  //切换分类时调用
  onChangeType: function ({ detail }) {
    this.setData({
      'formData.category': detail
    })
  },

  //监听输入标题
  onChangeTitle: function (e) {
    this.setData({
      "formData.title": e.detail
    });
  },

  //监听输入内容
  onChangeContent: function(e) {
    this.setData({
      "formData.content": e.detail.value,
      markContentSize: e.detail.value.length + '/400'
    });
  },

  //读取图片后
  afterReadImage: function(e) {
    console.log(e.detail.file);
    this.uploadPic(e.detail.file);
  },

  //删除图片
  deleteImage: function(e) {
    let fileList = this.data.fileList;
    fileList.splice(e.detail.index, 1);
    this.setData({ fileList });
  },

  //上传图片
  uploadPic: function(file) {
    let that = this;
    uploadImage(file.path).then(resStr => {
      let res = JSON.parse(resStr); //将返回的字符串转换成json对象
      if(res.code == 1) {
        console.log(res.result)
        let url = res.result;
        //将图片url丢进图片选择器组件里
        let fileList = that.data.fileList;
        fileList.push({path: url});
        that.setData({ fileList });
      }
    }).catch(error => {
      console.error('上传文件或图片出现异常,', error);
    })
  },

  //提交
  submitForm: function (e) {
    //先将图片选择组件里的图片array转换格式，并格式化成字符串形式，再存入表单
    let cacheFilelist = [];
    this.data.fileList.forEach((item, index) => {
      cacheFilelist.push(item.path)
    });
    this.setData({
      'formData.files': JSON.stringify(cacheFilelist)
    });
    //提交表单
    let data = this.data.formData;
    console.log(data)
    createThread(data).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: '提交成功',
          duration: 1000,
          success: function () {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1,
              })
            }, 1000);
          }
        })
      } else {
        wx.showToast({
          title: '提交失败',
          icon: 'none',
          duration: 1000
        })
      }
    }).catch(error => {
      console.error('提交新帖出现异常,', error);
    })
  }
})