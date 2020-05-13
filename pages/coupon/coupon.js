//Page Object
const app = getApp()
Page({
    data: {
        cur:10,
        status:10,
        list:[],
        loading:false
    },
    //options(Object)
    onLoad: function(options) {
        app.ajax('coupon/list',{status:this.data.status}).then(res=>{
            this.setData({
                list:res.data.list,
                loading:false
            })
            // console.log(res.data.list);
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
            cur:e.currentTarget.dataset.index,
            loading:true
        })
        app.ajax('coupon/list',{status:e.currentTarget.dataset.index}).then(res=>{
            this.setData({
                list:res.data.list,
                loading:false
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
  