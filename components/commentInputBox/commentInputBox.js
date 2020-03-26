// components/commentInputBox/commentInputBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    inputValue: {
      type: String
    },
    placeholder: {
      type: String,
      value: '请输入...'
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
    onClickHide: function(e) {
      this.setData({
        isShow: false
      })
    },

    tapRoot: {
      //
    }
  }
})
