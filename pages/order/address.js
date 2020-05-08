//Page Object
const app = getApp()
Page({
  data: {
    list:[],
    is_default: 2
  },
  //options(Object)
  onLoad: function(options){
    app.ajax('address/list').then(res=>{
      this.setData({
        list:res.data.list
      })
      console.log(this.data.list);
    })
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  goedit(){
    wx.navigateTo({
      url:'./edit'
    })
  },
  def(e){
    let is_default = this.data.is_default
    let data = {is_default,...e.currentTarget.dataset}
    app.ajax('address/setting',data).then(res=>{
      app.ajax('address/list').then(res=>{
        this.setData({
          list:res.data.list
        })
      })
    })
  },
  del(e){
    app.ajax('address/del',{id:e.currentTarget.dataset.id}).then(res=>{
      console.log(res);
      
      app.ajax('address/list').then(res=>{
        this.setData({
          list:res.data.list
        })
      })
    })
  },
  revise(e){
    wx.navigateTo({
      url:'./edit?id=' + e.currentTarget.dataset.id
    })
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