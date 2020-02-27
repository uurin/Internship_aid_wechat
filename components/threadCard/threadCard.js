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
    headiconUrl:{
      type: String,
      value: '',
    },
    //时间
    time: {
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

  }
})
