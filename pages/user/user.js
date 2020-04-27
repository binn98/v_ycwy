// pages/user/user.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    tab: 10,
    info: {},
    total: {},
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _that = this
    app.ajax('user/info').then(res => {
      _that.setData({
        info: res.data,
        isLogin: res.data.login_code == 200
      })
      app.globalData.isLogin = res.data.login_code == 200
    }).catch(res => {
      console.log(res)
    })

    _that.getList()
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
    this.setData({
      isLogin: app.globalData.isLogin
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
  getList() {
    const _that = this
    _that.setData({
      loading: true
    })
    app.ajax('coupon/list', {
      status: _that.data.tab
    }).then(res => {
      _that.setData({
        loading: false,
        list: res.data.list,
        total: res.data.usable_new
      })
    }).catch(res => {
      console.log(res)
    })
  },
  tabChange(e) {
    const key = e.target.dataset.tab
    this.setData({
      [key]: e.detail.key
    })
    this.getList()
  },
  getInfoCallback(e) {
    const _that = this
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // console.log(res.code)
          app.ajax('reglogin/gettoken', {
            code: res.code
          }).then(res => {
            wx.setStorageSync('token_' + app.globalData.v, res.data.token)
            app.globalData.token = res.data.token
            if (res.data.login_code == 200) {
              app.globalData.isLogin = true
            }
            app.ajax('reglogin/weminmobilelogin', {
              iv: e.detail.iv,
              encrypted_data: e.detail.encryptedData
            }, 'POST').then(res => {
              app.globalData.isLogin = true
              _that.setData({
                isLogin: true
              })
              _that.onLoad()
            }).catch(res => {
              console.log(res)
            })
          }).catch(res => {
            console.log(res)
          })
        }
      })
    } else {
      wx.showToast({
        title: '授权失败，请重新授权',
        icon: 'none'
      })
    }
  },
  goTo(e) {
    wx.navigateTo({
      url: '../../pages/rules/rules'
    })
  }
})