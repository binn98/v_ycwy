//Page Object
const app = getApp()
Page({
  data: {
    
  },
  //options(Object)
  onLoad: function(options){
    const _that = this
    app.ajax('explain/couponrule').then(res => {
      // console.log(res.data.list);
      _that.setData({
        list: res.data.list
      })
    }).catch(res => {
      console.log(res)
    })
    app.ajax('address/details').then(res=>{
      console.log(res);
    })
  },

  goAddress(){
    wx.navigateTo({
      url:"./address"
    })
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});