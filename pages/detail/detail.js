// pages/detail/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    detail: {},
    price: '',
    num: '',
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    // console.log(options.id);
    
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
    console.log( _that.data.id);
    
    app.ajax('order/details', {
      order_id: _that.data.id
    }).then(res => {
      let date = res.data.create_time_txt.slice(5,10).split('-').join('月')+'日';
      let time = res.data.time_txt.slice(5,10).split('-').join('月')+'日';
      res.data.create_time_txt =date + res.data.create_time_txt.slice(10)
      res.data.time_txt=time+res.data.time_txt.slice(10)
      _that.setData({
        detail: res.data,
        price: Number(res.data.rec_price)
      })
      console.log(res.data);
    }).catch(res => {
      console.log(res)
    })
  },
  cancel(){
    this.setData({
      show:!this.data.show
    })
    
  },
  cls(){
    this.setData({
      show:!this.data.show
    })
  },
  sub(){
    this.setData({
      show:!this.data.show
    })
    app.ajax('order/cancel',{order_id:this.data.detail.order_id}).then(res=>{
      console.log(res);
      if(res.code==0){
        wx.showToast({
          title: '取消成功！',
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '../../pages/index/index',
          });
        }, 3000);
      }
      
      
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
//   formChange(e) {
//     const _that = this
//     const key = e.target.dataset.name
//     _that.setData({
//       [key]: e.detail.value
//     })
//     console.log(_that.data)
//   },
//   goTo(e) {
//     wx.navigateTo({
//       url: '../../pages/logistics/logistics?code=' + e.target.dataset.code + '&num=' + e.target.dataset.num + '&name=' + e.target.dataset.name
//     })
//   },
//   goTo2(e) {
//     wx.redirectTo({
//       url: '../../pages/user/user'
//     })
//   },
//   postNum() {
//     const _that = this
//     if (!_that.data.num) {
//       wx.showToast({
//         title: '请填写快递单号',
//         icon: 'none'
//       })
//       return false
//     }
//     app.ajax('order/numsetting', {
//       order_id: _that.data.id,
//       express_num: _that.data.num
//     }, 'POST').then(res => {
//       _that.setData({
//         'detail.logistic_num': _that.data.num
//       })
//     }).catch(res => {
//       console.log(res)
//     })
//   }
})