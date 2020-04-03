// pages/discuss/detailThread/detailThread.js
import { threadDetail, 
  sendComment, 
  replyComment, 
  likeThread, 
  likeComment, 
  starThread, 
  unstarThread
} from '../../../api/discuss.js';

//用于输入框的模式切换
const REPLY_COMMENT_MODE = 1;   //回复某条评论的模式
const COMMENT_THREAD_MODE = 2;  //评论帖子模式

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
    commentsData: [],
    //是否显示评论菜单
    showCommentMenu: false,
    //评论的操作菜单
    menuActions: [
      {
        name: '',
        className: 'menu-description',
        color: '#afafaf',
        disabled: true
      },
      {
        name: '回复',
        value: 'reply'
      },
      {
        name: '点赞',
        value: 'like'
      },
      {
        name: '查看详情',
        value: 'detail'
      }
    ],

    //当前(操作菜单)操作的评论的实例。
    commentBeingUsed: null,
    //输入框的输入模式，用于区分评论和回复
    inputMode: COMMENT_THREAD_MODE,

    //底部操作栏的配置参数
    operationBarOptions: {
      //按钮列表
      buttons: [
        { icon: 'comment-o', highLight: false, number: 0, bindtap: 'comment' },
        { icon: 'good-job-o', iconHighLight: 'good-job', highLight: false, number: 0, bindtap: 'like' },
        { icon: 'star-o', iconHighLight: 'star', highLight: false, number: '', bindtap: 'star' },
        { icon: 'arrow-up', highLight: false, number: '', bindtap: 'arrowUp' }
      ],
      placeholder: '写评论...'
    },
    //输入框待发送的内容
    inputValue: '',
    //是否显示弹出式输入框
    isShowInputBox: false,
    //上拉加载更多的文字信息
    loadingText: '加载中...',

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
    this.getData(false, true);
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
      'listQuery.pageIndex': 1,
      'listQuery.pageSize': this.data.listQuery.pageSize + 10
    });
    this.getData(false)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //获取或刷新数据
  getData: function (isShowToast = false, saveHistory = false) {
    threadDetail(this.data.listQuery).then(res => {
      if(res.code == 1) {
        if (res.result.reply.length < 10 || res.result.reply.length === this.data.commentsData.length) {
          this.setData({
            loadingText: '没有更多了'
          })
        }
        this.setData({
          mainData: res.result.post,
          commentsData: res.result.reply,
          'operationBarOptions.buttons[0].number': res.result.post.comment,
          'operationBarOptions.buttons[1].number': res.result.post.likeNum,
          'operationBarOptions.buttons[1].highLight': res.result.post.isLike,
          'operationBarOptions.buttons[2].highLight': res.result.post.isCollect
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
        this.saveHistory();
      }else{
        console.error('获取帖子详情失败，' + res.describe);
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

  //点击评论弹出操作菜单
  bindTapComment: function(e) {
    let item = e.currentTarget.dataset.comment_being_used;
    let name = e.currentTarget.dataset.username;
    let content = e.currentTarget.dataset.content;
    this.setData({
      commentBeingUsed: item,
      showCommentMenu: true,
      'menuActions[0].name': '@' + name + '：' + content
    })
  },

  //点击评论菜单的遮罩层
  onClickCommentMenuOverlay: function() {
    this.setData({
      showCommentMenu: false,
      commentBeingUsed: null
    })
  },

  //关闭评论菜单
  onCloseCommentMenu: function (e) {

  },

  //选择评论菜单
  onSelectCommentMenu: function (e) {
    console.log(e)
    switch (e.detail.value) {
      case 'reply':
        console.log('回复');
        this.switchInputMode(REPLY_COMMENT_MODE);
        break;
      case 'like':
        console.log('点赞');
        likeComment({ id: this.data.commentBeingUsed.id}).then(res => {
          if (res.code == 1) {
            wx.showToast({
              title: '点赞成功',
              icon: 'none',
              duration: 1500
            })
          } else if(res.code == '-2'){
            wx.showToast({
              title: '已点过赞',
              icon: 'none',
              duration: 1500
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
      case 'detail':
        let commentId = this.data.commentBeingUsed.id;
        wx.navigateTo({
          url: '/pages/discuss/detailComment/detailComment?commentId=' + commentId,
        })
        break;
    }
    this.setData({
      showCommentMenu: false
    })
  },

  //评论菜单点击取消按钮后触发
  onCancelCommentMenu: function() {
    this.setData({
      showCommentMenu: false,
      commentBeingUsed: null
    })
  },

  //点击评论的回复块时调用
  bindtapReplyBox: function(e) {
    let commentId = e.currentTarget.dataset.comment_id;
    wx.navigateTo({
      url: '/pages/discuss/detailComment/detailComment?commentId=' + commentId,
    })
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

  //点击伪输入框按钮时触发
  bindtapInput: function(e) {
    console.log('按下：' + '输入按钮');
    this.switchInputMode(COMMENT_THREAD_MODE);
    this.setData({
      isShowInputBox: true
    })
  },

  //点击操作栏的按钮组触发事件
  bindtapOperationBarButtons: function(e) {
    console.log('按下：', e.detail);
    let that = this;
    switch(e.detail) {
      case 'arrowUp':
        //滚动到顶部
        if (wx.pageScrollTo) {
          wx.pageScrollTo({
            scrollTop: 0,
            duration: 500
          })
        } else {
          wx.showModal({
            title: '提示',
            content: '当前微信版本过低，暂无法使用该功能，请升级后重试。'
          })
        }
        break;
      case 'star':
        if (this.data.operationBarOptions.buttons[2].highLight) {
          //请求取消收藏帖子
          unstarThread({ ids: this.data.mainData.id }).then(res => {
            if (res.code == 1) {
              wx.showToast({
                title: '取消收藏成功',
                icon: 'none',
                duration: '1000'
              });
              //界面渲染的收藏给高亮
              this.setData({
                'operationBarOptions.buttons[2].highLight': false
              })
              //更新子组件数据
              this.selectComponent("#threadBar").updateData(this.data.operationBarOptions);
            } else {
              wx.showToast({
                title: '取消收藏失败',
                icon: 'none',
                duration: '1000'
              })
            }
          }).catch(err => {
            console.error(err);
            wx.showToast({
              title: '取消收藏失败，后台异常',
              icon: 'none',
              duration: '1000'
            })
          })
        } else {
          //请求收藏帖子
          starThread({id: this.data.mainData.id}).then(res => {
            if(res.code == 1) {
              wx.showToast({
                title: '收藏成功',
                icon: 'none',
                duration: '1000'
              });
              //界面渲染的收藏给高亮
              this.setData({
                'operationBarOptions.buttons[2].highLight': true
              })
              //更新子组件数据
              this.selectComponent("#threadBar").updateData(this.data.operationBarOptions);
            } else {
              wx.showToast({
                title: '收藏失败',
                icon: 'none',
                duration: '1000'
              })
            }
          }).catch(err => {
            console.error(err)
            wx.showToast({
              title: '收藏失败，后台异常',
              icon: 'none',
              duration: '1000'
            })
          })
        }
        break;
      case 'like':
        likeThread({ id: this.data.mainData.id }).then(res => {
          if (res.code == 1) {
            wx.showToast({
              title: '点赞成功',
              icon: 'none',
              duration: 1000
            });
            //界面渲染的点赞数+1，并高亮
            this.setData({
              'operationBarOptions.buttons[1].number': Number(this.data.operationBarOptions.buttons[1].number) + 1,
              'operationBarOptions.buttons[1].highLight': true
            })
            //更新子组件数据
            this.selectComponent("#threadBar").updateData(this.data.operationBarOptions);
          } else if (res.code == '-2') {
            wx.showToast({
              title: '已点过赞',
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
  },

  //改变输入框内容时改变页面的参数，来自子组件
  onChangeInput: function(e) {
    this.setData({
      inputValue: e.detail.inputValue
    })
  },

  //发送评论或回复
  send: function(e) {
    if (this.data.inputValue == '') {
      wx.showToast({
        title: '请输入内容！',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    if (this.data.inputMode === COMMENT_THREAD_MODE) {
      //评论帖主
      let data = {
        postWho: this.data.listQuery.id,
        content: this.data.inputValue,
        files: JSON.stringify(e.detail.imagesList),
        postType: 0
      }
      sendComment(data).then(res => {
        if (res.code == 1) {
          this.selectComponent("#threadInputBox").clearALl();
          this.getData();
          this.setData({
            inputValue: '',
            isShowInputBox: false
          });
          wx.showToast({
            title: '评论成功',
            icon: 'none',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '评论失败',
            icon: 'none',
            duration: 1000
          })
        }
      }).catch(err => {
        console.error(err);
        wx.showToast({
          title: '评论失败，服务器异常',
          icon: 'none',
          duration: 1000
        })
      })
    } else if (this.data.inputMode === REPLY_COMMENT_MODE) {
      //回复某条评论
      let data = {
        postWho: this.data.commentBeingUsed.id,
        content: this.data.inputValue,
        files: JSON.stringify(e.detail.imagesList),
        postType: 1
      }
      replyComment(data).then(res => {
        if (res.code == 1) {
          this.selectComponent("#threadInputBox").clearALl();
          this.getData();
          this.setData({
            inputValue: '',
            isShowInputBox: false
          })
          wx.showToast({
            title: '回复成功',
            icon: 'none',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: '回复失败',
            icon: 'none',
            duration: 1000
          })
        }
      }).catch(err => {
        console.error(err);
        wx.showToast({
          title: '回复失败，服务器异常',
          icon: 'none',
          duration: 1000
        })
      })
    }
  },

  /**
   * 切换输入框的模式，‘评论帖主’or‘回复某条评论’两种模式
   * 
   */
  switchInputMode: function(mode) {
    switch(mode) {
      case COMMENT_THREAD_MODE:  //‘评论帖主’
        this.selectComponent("#threadInputBox").setPromptText('评论帖主：');
        this.setData({
          inputMode: COMMENT_THREAD_MODE
        })
        break;
      case REPLY_COMMENT_MODE: //‘回复某条评论’
        let promptText = '回复@' + this.data.commentBeingUsed.nameString + '：';
        this.selectComponent("#threadInputBox").setPromptText(promptText);
        this.setData({
          inputMode: REPLY_COMMENT_MODE,
          isShowInputBox: true
        })
        break;
    }
  },

  //保存浏览记录到本地
  saveHistory: function() {
    let historyViewThreads = wx.getStorageSync('historyViewThreads') || [];
    if (historyViewThreads.length > 50) {
      historyViewThreads.pop();   //删掉旧的时间最早的第一条
    } 
    //判断是否跟上次访问一样
    if (historyViewThreads.length > 0 && historyViewThreads[0].id == this.data.listQuery.id) {
      return;
    } else {
      //从数组第一项前插入数据
      historyViewThreads.unshift(
        {
          title: this.data.mainData.title,
          id: this.data.mainData.id,
          nameString: this.data.mainData.nameString,
          viewDate: Date.parse(new Date())
        }
      )
    }
    wx.setStorageSync('historyViewThreads', historyViewThreads)
  }

})