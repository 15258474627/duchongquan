// pages/userConsole/userConsole.js
Page({

  data: {
    dataList:[],
  },
  listenerButtonPreviewImage: function (e) {
    let index = e.target.dataset.index;//预览图片的编号
    let that = this;
    wx.previewImage({
      current: that.data.dataList[index].tempFilePaths[index],//预览图片链接
      urls: that.data.dataList[index].tempFilePaths,//图片预览list列表
      success: function (res) {
        //console.log(res);
      },
      fail: function () {
        //console.log('fail')
      }
    })
  },
  onLoad: function (options) {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('counterList').where({
    }).get({
      success: res => {
        this.setData({
          dataList: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('counterList').where({
    }).get({
      success: res => {
        this.setData({
          dataList: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('counterList').where({
    }).get({
      success: res => {
        this.setData({
          dataList: res.data
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
})