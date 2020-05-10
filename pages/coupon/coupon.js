//Page Object
const app = getApp()
Page({
    data: {
        cur:10,
        status:10,
        list:[]
    },
    //options(Object)
    onLoad: function(options) {
        app.ajax('coupon/list',{status:this.data.status}).then(res=>{
            this.setData({
                list:res.data.list
            })
        })
    },
    onReady: function() {
        
    },
    onShow: function() {
        
    },
    coupondata(){
        
    },
    ative(e){
        this.setData({
            cur:e.currentTarget.dataset.index
        })
        app.ajax('coupon/list',{status:e.currentTarget.dataset.index}).then(res=>{
            this.setData({
                list:res.data.list
            })
        })
    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap:function(item) {

    }
});
  