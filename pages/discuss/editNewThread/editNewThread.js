// pages/discuss/editNewThread/editNewThread.js
import { createThread, uploadImage} from '../../../api/discuss.js';

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
    //用于中转图片列表，array形式，之后要转字符串的形式给表单
    formFiles: []
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
    // let fileList = this.data.fileList;
    // fileList.push(e.detail.file);
    // this.setData({ fileList });
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
    uploadImage(file.path).then(res => {
      if(res.code == 1) {
        let url = res.result;
        //将获得的图片链接丢进中转array里
        let formFiles = that.data.formFiles;
        formFiles.push(url);
        that.setData({ formFiles });
        //
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
    this.setData({
      'formData.files': JSON.stringify(this.data.formFiles)
    });
    let data = this.data.formData;
    console.log(data)
    createThread(data).then(res => {
      //
      console.log(res);
    }).catch(error => {
      console.error('提交新帖出现异常,', error);
    })
  }
})