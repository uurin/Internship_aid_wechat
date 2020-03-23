// components/commentBox/commentBox.js
/**
 ** 对外的参数：
 * commentValue：输入框的内容
 * placeholder：输入框的占位内容
 * 
 ** 对外的方法（triggerEvent）:
 * 1、tapSend：发送按钮的点击事件，带参数： {
              inputValue: 输入框的值
              imagesList: 图片列表
            }
 * 2、onChangeInput：改变输入内容时调用，带参数：{inputValue: 值}
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
    }
  }
})
