// component/successPage/successPage.js
Component({

  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: '成功',
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    towhere: ''//当是从checkmodifyinfo.wxml页面过来的，值为back
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var towhere = options.towhere
    this.setData({
      towhere: towhere
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
  // onShareAppMessage: function () {

  // },
  toOrder: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    if (this.data.towhere === 'back') {
      wx.navigateBack({
        delta: 3,//跳转到订单列表页
        success: function () {
          wx.hideLoading();
        }
      })
    } else {
      wx.redirectTo({
        url: '../order/order',
        success: function () {
          wx.hideLoading();
        }
      })
    }


  }
})