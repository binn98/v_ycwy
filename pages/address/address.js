// pages/address/address.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    cur: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    const _that = this
    app.ajax('address/list').then(res => {
      _that.setData({
        address: res.data.list,
        cur: app.globalData.address_cur
      })
    }).catch(res => {
      console.log(res)
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

  /**
   * 页面方法
   */
  editAddress(e) {
    wx.navigateTo({
      url: '../../pages/address/edit?id=' + e.currentTarget.dataset.id
    })
  },
  delAddress(e) {
    const _that = this
    app.ajax('address/del', {
      id: e.currentTarget.dataset.id
    }).then(res => {
      _that.setData({
        address: res.data.list,
        cur: app.globalData.address_cur
      })
    }).catch(res => {
      console.log(res)
    })
  },
  changeAddress(e) {
    app.globalData.address_cur = e.currentTarget.dataset.id
    console.log(e.currentTarget.dataset.id);
    
    // wx.navigateBack({
    //   delta: 1
    // })
  },
  addAddress() {
    wx.navigateTo({
      url: '../../pages/address/edit'
    })
  }
})