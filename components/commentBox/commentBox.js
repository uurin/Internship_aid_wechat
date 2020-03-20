// components/commentBox/commentBox.js
/**
 * 对外的参数：
 * commentValue：输入框的内容
 * placeholder：输入框的占位内容
 * 
 * 对外的方法: 
 * tapSend：发送按钮的点击事件
 * 
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //输入框的内容
    value: {
      type: String
    },
    placeholder: {
      type: String
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
    bindSendTap: function () {
      //向外调用父页面或组件的函数
      this.triggerEvent("tapSend");
    }
  }
})
