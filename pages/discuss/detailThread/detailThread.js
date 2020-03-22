// pages/discuss/detailThread/detailThread.js
import { threadDetail, sendComment} from '../../../api/discuss.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    listQuery: {
      id: 1,
      pageSize: 20,
      pageIndex: 1
    },
    //帖主的数据
    mainData: [],
    //评论的数据
    commentData: [],
    //输入框待发送的内容，和占位内容
    inputValue: '',
    placeholder: '写评论...',
    //是否显示评论菜单
    showCommentMenu: false,
    //评论的操作菜单
    menuActions: [
      {
        name: '回复'
      },
      {
        name: '点赞'
      },
      {
        name: '查看详情'
      }
    ],
    //1.操作菜单的标识；2.输入框回复的标识；3.当值为null时标识为评论帖主；
    commentId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let threadId = options.threadId;
    console.log('threadId='+threadId)
    this.setData({
      'listQuery.id': threadId
    });
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

  //获取或刷新数据
  getData: function() {
    threadDetail(this.data.listQuery).then(res => {
      if(res.code == 1) {
        this.setData({
          mainData: res.result.post,
          commentData: res.result.reply
        })
      }else{
        console.error('获取帖子详情失败，' + res.describe);
      }
    }).catch(err => {
      console.error(err);
    })
  },

  //点击评论弹出操作菜单
  bindTapComment: function(e) {
    let id = e.currentTarget.dataset.commentid;
    this.setData({
      commentId: id,
      showCommentMenu: true
    })
  },

  //点击评论菜单的遮罩层
  onClickCommentMenuOverlay: function() {
    this.setData({
      showCommentMenu: false
    })
  },

  //关闭评论菜单
  onCloseCommentMenu: function (e) {
    this.setData({
      commentId: null
    })
  },

  //选择评论菜单
  onSelectCommentMenu: function (e) {
    this.setData({
      commentId: ''
    });
    switch (e.detail) {
      case '回复':
        break;
      case '点赞':
        break;
      case '查看详情':
        break;
    }
    this.setData({
      showCommentMenu: false
    })
  },

  //前往查看评论详情的页面
  goDetailComment: function(event) {
    wx.navigateTo({
      url: '../detailComment/detailComment',
    })
  },

  //改变输入框内容时改变页面的参数，来自子组件
  onChangeInput: function(e) {
    this.setData({
      inputValue: e.detail.inputValue
    })
  },

  //发送评论或回复
  send: function(e) {
    if (this.data.commentId == null) {
      //评论帖主
      let data = {
        postWho: this.data.listQuery.id,
        content: this.data.inputValue,
        files: JSON.stringify(e.detail.imagesList),
        postType: 0
      }
      sendComment(data).then(res => {
        console.log(res)
      }).catch(err => {
        console.error(err);
      })
    } else {
      //回复某条评论
    }
    // this.setData({
    //   commentId: null
    // })
  },

  //帖主的图片预览
  previewMainImg:function(e){
    var imgUrl = e.currentTarget.dataset.src; //获取当前点击的图片
    var imgArr = this.data.mainData.realFile;
    wx.previewImage({
      current: imgUrl, //当前图片地址
      urls: imgArr,  //所有图片集合
      // urls: [imgUrl], //单张图
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //评论里的图片预览
  previewCommentImg: function (e) {
    var imgUrl = e.currentTarget.dataset.src; //获取当前点击的图片
    var imgArr = e.currentTarget.dataset.images;
    wx.previewImage({
      current: imgUrl, //当前图片地址
      urls: imgArr,  //所有图片集合
      // urls: [imgUrl], //单张图
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
})