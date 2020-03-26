// pages/discuss/detailComment/detailComment.js
import { commentDetail, replyComment, likeComment} from '../../../api/discuss.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //该条评论的所有数据，其中childComments数组为回复的数据
    commentData: [],
    //该条评论的id，由上一级页面传入
    commentId: null,
    inputValue: '',
    placeholder: '写回复...',


    //底部操作栏的配置参数
    operationBarOptions: {
      //按钮列表
      buttons: [
        { icon: 'comment-o', highLight: false, number: 0, bindtap: 'comment' },
        { icon: 'good-job-o', highLight: true, number: 0, bindtap: 'like' },
        { icon: 'arrow-up', highLight: false, number: '', bindtap: 'arrowUp' }
      ],
      placeholder: '写评论...'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let commentId = JSON.parse(options.commentId);
    console.log("commentId=" + commentId);
    this.setData({
      commentId: commentId
    })
    this.getCommentData();
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

  //输入框内容改变时调用
  onChangeInput: function(e) {
    this.setData({
      inputValue: e.detail.inputValue
    })
  },

  //点击发送按钮时调用
  send: function (e) {
    if (this.data.inputValue == '') {
      wx.showToast({
        title: '请输入内容！',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    let data = {
      postWho: this.data.commentId,
      content: this.data.inputValue,
      files: JSON.stringify(e.detail.imagesList),
      postType: 1
    };
    let that = this;
    replyComment(data).then(res => {
      if (res.code == 1) {
        wx.showToast({
          title: '发送回复成功',
          icon: 'none',
          duration: 1000
        });
        setTimeout(() => {
          that.getCommentData();
        }, '1000')
      } else {
        wx.showToast({
          title: '发送回复失败',
          icon: 'none',
          duration: 1000
        })
      }
    }).catch(err => {
      console.error(err)
    })
  },

  //获取评论数据
  getCommentData: function() {
    commentDetail({ id: this.data.commentId }).then(res => {
      if (res.code == 1) {
        this.setData({
          commentData: res.result,
          'operationBarOptions.buttons[0].number': res.result.childComments.length,
          'operationBarOptions.buttons[1].number': res.result.likeNum
        })
      }
    }).catch(err => {
      console.error(err)
    })
  },

  //主评论图片预览
  previewCommentImg: function (e) {
    var imgUrl = e.currentTarget.dataset.src; //获取当前点击的图片
    var imgArr = this.data.commentData.realFile;
    wx.previewImage({
      current: imgUrl, //当前图片地址
      urls: imgArr,  //所有图片集合
      // urls: [imgUrl], //单张图
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  //子回复的图片预览
  previewReplyImg: function (e) {
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

  //清空输入框
  clearInput: function() {
    this.setData({
      inputValue: ''
    })
  },









  //点击伪输入框按钮时触发
  bindtapInput: function (e) {
    console.log('按下：' + '输入按钮');
  },
  //点击操作栏的按钮组触发事件
  bindtapOperationBarButtons: function (e) {
    console.log('按下：', e.detail);
    let that = this;
    switch (e.detail) {
      case 'arrowUp':
        break;
      case 'like':
        likeComment({ id: this.data.commentData.id }).then(res => {
          if (res.code == 1) {
            wx.showToast({
              title: '点赞成功',
              icon: 'none',
              duration: 1000
            });
            //界面渲染的点赞数+1
            this.setData({
              'operationBarOptions.buttons[1].number': Number(this.data.operationBarOptions.buttons[1].number) + 1
            })
            //更新子组件数据
            this.selectComponent("#thread-bar").updateData(this.data.operationBarOptions);
          } else if (res.code == '-2') {
            wx.showToast({
              title: '已赞过该条评论',
              icon: 'none',
              duration: 1000
            })
          } else {
            wx.showToast({
              title: '点赞失败',
              icon: 'none',
              duration: 1500
            })
          }
        }).catch(err => {
          console.error(err);
          wx.showToast({
            title: '点赞失败，服务异常',
            icon: none,
            duration: 1500
          })
        })
        break;
    }
  }
})