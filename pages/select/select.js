let URL = require('../../utils/URL.js');
let util = require('../../utils/util.js');
const config = require('../../utils/config');
const { imgUrl } = config;
const {
  requestAppid,
  getCustomerDiscountCodeList
} = URL;
const {
  isEmpty,
  formatTimeDay
} = util;

let timeEvent = undefined;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    noUseList: [],
    disabledList: [],
    noUsePage: 0,   //当前未使用第几页
    disabledPage: 0, //当前已失效第几页
    noUseTotalPages: 99,//当前未使用总共几页
    disabledTotalPages: 99,//当前已失效总共几页
    loading: true,
    type: 1, //1、未使用 2、已失效
    selectListLeft: 0,

    bottomLineLeft: 150,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const that = this;
    // that.customerDiscountCodeList(1,1);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // const that = this;
    // that.customerDiscountCodeList(1, 1);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this;
    const { type } = this.data;
    console.log("select");
    that.customerDiscountCodeList(1, type);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  changeSelect(e) {
    const that = this;
    const selectListLeft = that.data.selectListLeft;
    const bottomLineLeft = that.data.bottomLineLeft;
    const type = e.target.dataset.type;
    if (isEmpty(type)) {
      return false;
    }

    if (timeEvent) {
      clearInterval(timeEvent);
      timeEvent = undefined;
    }

    //点击未使用
    if (type == "1") {
      if (selectListLeft == 0 && bottomLineLeft == 150) {
        return false
      }
      that.customerDiscountCodeList(1, 1);
      this.setData({
        selectListLeft: 0,
        bottomLineLeft: 150,
        type
      })
    }

    //点击已失效
    if (type == "2") {
      that.customerDiscountCodeList(1, 2);
      this.setData({
        selectListLeft: -750,
        bottomLineLeft: 514,
        type
      })
    }
  },


  chancenouse: function (e) {
    const index = e.currentTarget.dataset.index;
    const discountCodeStatus = e.currentTarget.dataset.discountcodestatus;
    const tabType = e.currentTarget.dataset.tabtype;
    const that = this;
    const { noUseList, disabledList } = that.data;
    let selectItem = {}
    if (tabType == 1) {
      selectItem = noUseList[index];
    } else if (tabType == 2) {
      selectItem = disabledList[index];
    }

    //优惠码状态0未使用,1已过期,2已使用,3退款成功,4退款失败5退款中,6线下退款成功
    if (discountCodeStatus == 3 || discountCodeStatus == 4 || discountCodeStatus == 5 || discountCodeStatus == 6) {
      wx.navigateTo({
        url: '../refund/refund?item=' + JSON.stringify(selectItem),
      })
    } else {
      wx.navigateTo({
        url: '../chancenouse/chancenouse?item=' + JSON.stringify(selectItem),
      })
    }

  },

  customerDiscountCodeList: function (page, type = 1) {
    const that = this;
    let {
      noUseList,
      disabledList,
      noUsePage,
      disabledPage,
      noUseTotalPages,
      disabledTotalPages,
      
    } = that.data;
    if(page!=1){
      if (type == 1) {
        if ((noUsePage > page) || (page >= noUseTotalPages)) {
          return false;
        }
      } else if (type == 2) {
        if ((disabledPage > page) || (page >= disabledTotalPages)) {
          return false;
        }
      }
    }
    
    requestAppid(
      {
        URL: getCustomerDiscountCodeList,
        param: {
          pageNo: page || 1,
          pageSize: 20,
          tabType: type || 1
        },
      },
      function (data) {
        let {

        } = that.data;
        let newList = data.list;
        for (let i of newList) {
          i.endTime = formatTimeDay(new Date(i.discountCodeEndTime));
        }
        if (type == 1) {
          // if ((noUsePage > page) || (page >= noUseTotalPages)) {
          //   return false;
          // }
          if(page==1){
            noUseList = newList;
          }else{
            noUseList.push(...newList);
          }
          that.setData({
            noUseList: noUseList,
            noUseTotalPages: data.totalPages,
            loading: false,
            noUsePage: page
          })
        } else if (type == 2) {
          // if ((disabledPage > page) || (page >= disabledTotalPages)) {
          //   return false;
          // }
          if (page == 1) {
            disabledList = newList;
          }else{
            disabledList.push(...newList);
          }
          that.setData({
            disabledList: disabledList,
            disabledTotalPages: data.totalPages,
            loading: false,
            disabledPage: page
          })
        }

      }
    );
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // onPullDownRefresh: function () {
  //   const that = this;
  //   const {type} = this.data;
  //   that.customerDiscountCodeList(1, type);
  //   that.setData({
  //     page:1
  //   })
  //   wx.stopPullDownRefresh();
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

    const that = this;
    const {
      type,

      disabledList,
      noUseList,

      noUseTotalPages,
      disabledTotalPages,

      noUsePage,
      disabledPage,

    } = that.data;
    console.log("select触底", that.data);
    if (type == 1) {
      if (noUsePage < noUseTotalPages) {
        that.customerDiscountCodeList(noUsePage + 1, type);
      }
    } else if (type == 2) {
      if (disabledPage < disabledTotalPages) {
        that.customerDiscountCodeList(disabledPage + 1, type);
      }
    }
    //page = page+1;
    //that.customerDiscountCodeList(page);
    // that.setData({
    //   page
    // })
  },

  goToExperience() {
    wx.navigateTo({
      url: "../../index/index",
      success: function () {
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})