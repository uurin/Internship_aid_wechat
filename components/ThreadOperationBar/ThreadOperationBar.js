// components/ThreadOperationBar/ThreadOperationBar.js
/**
 ** 对外的参数：options
 * 
 ** 对外的方法（triggerEvent）:
 * 1、tapInput：点击伪输入框按钮时调用
 * 2、tapButtons：点击按钮组时调用，带参数： e.detail（点击的按钮bindtap属性值，用于区分点击了哪个按钮）
 * 
 * 
 * 完整示例：
  properties绑定参数：
    options: {
      buttons: [
        { icon: 'comment-o', highLight: false, number: 0, bindtap: 'comment' },
        { icon: 'good-job-o', iconHighLight: 'good-job', highLight: true, number: 0, bindtap: 'like' },
        { icon: 'star-o', iconHighLight: 'star', highLight: false, number: '', bindtap: 'star' },
        { icon: 'arrow-up', highLight: false, number: '', bindtap: 'arrowUp' }
      ],
      placeholder: '写评论...'
    }
  
 */

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String
    },
    //配置参数
    option: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //控制伸缩面板的显示
    panelShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击伪输入框的按钮
    bindtapInputButton: function(e) {
      this.triggerEvent("tapInput");
    },

    //点击按钮组触发
    bindtapButtons: function(e) {
      // console.log('按下：' + e.currentTarget.dataset.ontap)
      this.triggerEvent('tapButtons', e.currentTarget.dataset.ontap);
    },

    //updateData
    updateData: function(data) {
      console.log('子组件更新数据，')
      this.setData({
        option: data
      })
    }
  }
})
