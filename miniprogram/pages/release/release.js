// pages/release/release.js
const app = getApp()
Page({
  data: {
    userInfo:'',
    switchChange: true,
    tempFilePaths:[],
  },
  switchType: function (e) {
    this.setData({
      switchChange: e.detail.value
    })
  },
  formSubmit: function (e) {
    //console.log(e.detail.value);
    if (e.detail.value.title.length == 0 || e.detail.value.title.length >= 20)     {
      wx.showToast({
        title: '标题不能为空或过长!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.sex.length == 0) {
      wx.showToast({
        title: '请选择性别!',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else if (e.detail.value.kind.length == 0) {
      wx.showToast({
        title: '请选择种类',
        icon: 'loading',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      if (e.detail.value.kind=='其他'){
        e.detail.value.kind = e.detail.value.kind_other
      }
        const db = wx.cloud.database()
        db.collection('counterList').add({
          data: {
            userInfo: this.data.userInfo,
            title: e.detail.value.title, 
            sex: e.detail.value.sex, 
            kind: e.detail.value.kind,
            desc: e.detail.value.desc, 
            switchChange: this.data.switchChange,
            tempFilePaths: this.data.tempFilePaths,
          },
          success: res => {
            // 在返回结果中会包含新创建的记录的 _id
            loading: !this.data.loading
            wx.navigateTo({
              url: '../userConsole/userConsole',
            })
            console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
          },
          fail: err => {
            wx.showToast({
              icon: 'none',
              title: '发布失败！'
            })
            console.error('[数据库] [新增记录] 失败：', err)
          }
        })
      }
    },

  // 上传图片
  upload: function () {
    let that = this;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: res => {
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 1000
        })
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let tempFilePaths = res.tempFilePaths;

        that.setData({
          tempFilePaths: tempFilePaths
        })
        /**
         * 上传完成后把文件上传到服务器
         */
        var count = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          //上传文件
          let cloudPath = 'my-image' + i + tempFilePaths[i].match(/\.[^.]+?$/)[0]
          wx.cloud.uploadFile({
            cloudPath: cloudPath,
              filePath: tempFilePaths[i],
              success: function (res) {
                count++;
                //如果是最后一张,则隐藏等待中  
                if (count == tempFilePaths.length) {
                  wx.hideToast();
                }
              },
              fail: function (res) {
                wx.hideToast();
                wx.showModal({
                  title: '错误提示',
                  content: '上传图片失败',
                  showCancel: false,
                  success: function (res) { }
                })
              }
            });
        }

      }
    })
  },
  listenerButtonPreviewImage: function (e) {
    let index = e.target.dataset.index;//预览图片的编号
    let that = this;
    wx.previewImage({
      current: that.data.tempFilePaths[index],//预览图片链接
      urls: that.data.tempFilePaths,//图片预览list列表
      success: function (res) {
        //console.log(res);
      },
      fail: function () {
        //console.log('fail')
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
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

  }
})