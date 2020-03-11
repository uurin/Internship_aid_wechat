// components/threadCard/threadCard.js
Component({
  externalClasses: ['my-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    //用户名
    userName: {
      type: String
    },
    //头像链接
    avatar:{
      type: String,
      value: '',
    },
    //时间
    date: {
      type: String
    },
    //点赞数
    thumbsUps: {
      type: Number
    },
    //评论数
    comments: {
      type: Number
    },
    //标题
    title: {
      type: String
    },
    //简要内容
    content: {
      type: String
    },
    //图片列表
    images: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //卡片点击事件
    bindThreadCardTap: function () {
      wx.navigateTo({
        url: '/pages/discuss/detailThread/detailThread'
      })
    },
    //图片预览
    previewImg:function(e){
      var imgUrl = e.currentTarget.dataset.src; //获取当前点击的图片
      var imgArr = this.data.images;
      wx.previewImage({
        current: imgUrl, //当前图片地址
        urls: imgArr,  //所有图片集合
        // urls: [imgUrl], //单张图
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  }
})
