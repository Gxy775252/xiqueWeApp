// pages/personDetail/personDetail.js
const config = require('../../utils/config');
const { imgUrl } = config;
const URL = require('../../utils/URL.js');
const { requestAppid, loginOut} = URL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    phoneNumber: "--"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData)
    this.setData({
      phoneNumber: getApp().globalData.loginInfo ? getApp().globalData.loginInfo.mobile : "--"
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

  },










  //点击退出
  signOut: function () {
    this.setData({
      signOutMask: true
    })
  },
  //弹框上的‘取消’
  signOutFail: function () {
    this.setData({
      signOutMask: false
    })
  },
  //弹框上的‘退出登录’
  signOutSuccess: function () {
    this.setData({
      signOutMask: false
    })
    var that = this;
    requestAppid({
      URL: loginOut,
    },()=>{
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2];
      if (prevPage.route == "pages/personalCenter/personalCenter"){
        //关闭登陆状态
        prevPage.setData({
          isLogin: true
        });
      }
      
      wx.redirectTo({
        url: '../login/login?phoneLogin=true',
        success: function (res) {},
        fail: function (res) {},
        complete: function (res) {},
      })
    })
  },
})