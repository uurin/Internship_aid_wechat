// pages/discuss/editNewThread/editNewThread.js
import { getPostThreadUrl } from '../../../api/discuss.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: {
      title: '',
      content: '',
      category: 1,
      files: null
    },
    //标记内容长度
    markContentSize: '0/400',
    fileList: []
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
    let fileList = this.data.fileList;
    fileList.push(e.detail.file);
    this.setData({ fileList });
  },

  //删除图片
  deleteImage: function(e) {
    let fileList = this.data.fileList;
    fileList.splice(e.detail.index, 1);
    this.setData({ fileList });
  },

  //提交
  submitForm: function (e) {
    wx.uploadFile({
      url: "接口地址",
      filePath: tempFilePaths[0],//chooseImage上传的图片
      name: 'file',//需要传给后台的图片字段名称
      formData: data,//需要传给后台的其他表单数据
      header: {
        "Content-Type": "multipart/form-data", //form-data格式
        'Accept': 'application/json',
      },
      success(res) {
        var jsonObj = JSON.parse(res.data);//返回的数据需要转为json格式
        if (jsonObj.code == 200) {
          //接口请求成功后在这一块处理
          //utils.navigateto("orderconfirm?orderId="+jsonObj.data.order_id);
        } else {
          utils.toast(jsonObj.message);
        }
      }
    })

  }
})