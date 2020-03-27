// components/commentInputBox/commentInputBox.js
import { uploadImage } from '../../api/discuss.js';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: false
    },
    //提示文字
    promptText: {
      type: String
    },
    //输入框的内容
    inputValue: {
      type: String
    },
    //文本框占位文字
    placeholder: {
      type: String,
      value: '请输入...'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //文本框高度
    heightClass: 'default-height',
    //是否显示图片上传
    isShowUploader: false,
    //图片列表
    imageList: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
    //设置提示文字
    setPromptText(text) {
      this.setData({
        promptText: text
      })
    },

    //清空一切
    clearALl: function (e) {
      this.setData({
        inputValue: '',
        imageList: []
      })
    },





    //点击遮罩层时
    onClickHide: function(e) {
      this.setData({
        isShow: false
      })
    },

    touchMove: function(e) {
      //
    },
    
    //点击图片图标
    tapImageIcon: function(e) {
      this.setData({
        isShowUploader: ! this.data.isShowUploader
      })
    },

    //点击发送按钮触发
    send: function (e) {
      let formFilesList = [];
      this.data.imageList.forEach((item, index) => {
        formFilesList.push(item.path)
      });
      let data = {
        inputValue: this.data.inputValue,
        imagesList: formFilesList
      }
      //向外调用父页面或组件的函数
      this.triggerEvent("tapSend", data);
    },

    //输入框行数变化时
    inputLinechange: function(e) {
      console.log(e)
      if (e.detail.lineCount <= 2) {
        this.setData({
          heightClass: 'default-height'
        })
      } else if (e.detail.lineCount > 6) {
        this.setData({
          heightClass: 'max-height'
        })
      } else {
        this.setData({
          heightClass: 'medium-height'
        })
      }
    },

    //输入内容时调用
    bindInput: function (e) {
      this.setData({
        inputValue: e.detail.value
      })
      //向外调用父页面或组件的函数
      this.triggerEvent("changeInput", { inputValue: e.detail.value });
    },

    //读取图片后
    afterReadImage: function (e) {
      console.log(e.detail.file);
      this.uploadPic(e.detail.file);
    },

    //删除图片
    deleteImage: function (e) {
      let imageList = this.data.imageList;
      imageList.splice(e.detail.index, 1);
      this.setData({ imageList });
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
          let imageList = that.data.imageList;
          imageList.push({ path: url });
          that.setData({ imageList });
        }
      }).catch(error => {
        console.error('上传文件或图片出现异常,', error);
      })
    },
  }
})
