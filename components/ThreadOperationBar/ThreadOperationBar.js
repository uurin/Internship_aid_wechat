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
import { uploadImage } from '../../api/discuss.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //输入框的内容
    inputValue: {
      type: String
    },
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
    panelShow: false,
    //完整信息的图片列表
    fileList: [],
    //输入框的内容
    // inputValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //改变输入内容时调用
    bindChangeInput: function(e) {
      this.setData({
        inputValue: e.detail
      })
      //向外调用父页面或组件的函数
      this.triggerEvent("onChangeInput", {inputValue: e.detail});
    },

    //读取图片后
    afterReadImage: function (e) {
      console.log(e.detail.file);
      this.uploadPic(e.detail.file);
    },

    //删除图片
    deleteImage: function (e) {
      let fileList = this.data.fileList;
      fileList.splice(e.detail.index, 1);
      this.setData({ fileList });
    },

    //上传图片
    uploadPic: function (file) {
      let that = this;
      uploadImage(file.path).then(resStr => {
        let res = JSON.parse(resStr); //将返回的字符串转换成json对象
        if (res.code == 1) {
          console.log(res.result)
          let url = res.result;
          //将图片url丢进图片选择器组件里
          let fileList = that.data.fileList;
          fileList.push({ path: url });
          that.setData({ fileList });
        }
      }).catch(error => {
        console.error('上传文件或图片出现异常,', error);
      })
    },

    //点击图片按钮
    bindTapPhoto: function() {
      this.setData({
        panelShow: ! this.data.panelShow
      })
    },

    //点击发送按钮
    bindSendTap: function () {
      let formFilesList = [];
      this.data.fileList.forEach((item, index) => {
        formFilesList.push(item.path)
      });
      let data = {
        inputValue: this.data.inputValue,
        imagesList: formFilesList
      }
      //向外调用父页面或组件的函数
      this.triggerEvent("tapSend", data);
    },

    //清空所有内容
    clearAll: function() {
      this.setData({
        inputValue: '',
        fileList: []
      })
    },






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
