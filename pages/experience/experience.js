let util = require('../../utils/util.js');
let URL = require('../../utils/URL.js');
const { 
  requestAppid,
  getBuyDiscountCodeEventList
} = URL;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var that = this
    // wx.showLoading({
    //   title: '加载中',
    //   mask: true
    // })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    requestAppid({
      URL: getBuyDiscountCodeEventList,
      param: {
        pageNo: 1,
        pageSize: 999,
      },
    }, function (data) {
      console.log(data);
      that.setData({
        listData:data.list
      })
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

   
    
  },
  //开始*******************************************************************************************
  login:function(){

  },
  /**
   * 点击打开详情
   */
  showDetails:function(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/details/details?id=' + e.currentTarget.dataset.id
    })
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
  
  }

})