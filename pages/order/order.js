//Page Object
const app = getApp()
Page({
  data: {
      userInfo:{},
      show:false,
      id: [],
      name: "",
      price: "",
      ep: "",
      date: {
        visible: false,
        value: "",
        options: [],
      },
      cur:'',
      children:[
        {
          value: "09:00-11:00",
          label: "09:00-11:00",
        },
        {
          value: "11:00-13:00",
          label: "11:00-13:00",
        },
        {
          value: "13:00-15:00",
          label: "13:00-15:00",
        },
        {
          value: "15:00-17:00",
          label: "15:00-17:00",
        },
      ],
      now:'',
      day:'',
      days:'',
      goods_id:[]
  },
  //options(Object)
  onLoad: function(options){

    
    const _that = this;
    const week = new Array(
      "周日",
      "周一",
      "周二",
      "周三",
      "周四",
      "周五",
      "周六"
    );
    const day = new Date();
    const day2 = new Date(new Date().setDate(new Date().getDate() + 1));
    const day3 = new Date(new Date().setDate(new Date().getDate() + 2));
    const day4 = new Date(new Date().setDate(new Date().getDate() + 3));
    const now = _that.getTimeObj(day);
    wx.getStorage({
      key: "goods_id",
      success (res) {
        _that.setData({
          goods_id:res.data
        })
      }
    })
    _that.setData({
      "date.options": [
        {
          value: _that.formatTime(day),
          label:"(今日)",
          isLeaf: false,
          children: [
            {
              value: "09:00-11:00",
              label: "09:00-11:00",
              disabled: now.h > 11 ? true : false,
            },
            {
              value: "11:00-13:00",
              label: "11:00-13:00",
              disabled: now.h > 13 ? true : false,
            },
            {
              value: "13:00-15:00",
              label: "13:00-15:00",
              disabled: now.h > 15 ? true : false,
            },
            {
              value: "15:00-17:00",
              label: "15:00-17:00",
              disabled: now.h > 17 ? true : false,
            },
          ],
        },
        {
          value: _that.formatTime(day2),
          label: '('+ week[day2.getDay()]+')',
          isLeaf: false,
          children: [
            {
              value: "09:00-11:00",
              label: "09:00-11:00",
            },
            {
              value: "11:00-13:00",
              label: "11:00-13:00",
            },
            {
              value: "13:00-15:00",
              label: "13:00-15:00",
            },
            {
              value: "15:00-17:00",
              label: "15:00-17:00",
            },
          ],
        },
        {
          value: _that.formatTime(day3),
          label:'('+ week[day3.getDay()]+')',
          isLeaf: false,
          children: [
            {
              value: "09:00-11:00",
              label: "09:00-11:00",
            },
            {
              value: "11:00-13:00",
              label: "11:00-13:00",
            },
            {
              value: "13:00-15:00",
              label: "13:00-15:00",
            },
            {
              value: "15:00-17:00",
              label: "15:00-17:00",
            },
          ],
        },
        {
          value: _that.formatTime(day4),
          label: '('+ week[day4.getDay()]+')',
          isLeaf: false,
          children: [
            {
              value: "09:00-11:00",
              label: "09:00-11:00",
            },
            {
              value: "11:00-13:00",
              label: "11:00-13:00",
            },
            {
              value: "13:00-15:00",
              label: "13:00-15:00",
            },
            {
              value: "15:00-17:00",
              label: "15:00-17:00",
            },
          ],
        },
      ],
    });
    this.data.date.options.map(v=>{
      v.label= v.label.substr(-3,2)
    })
    
    
    app
      .ajax("logistics/receiving")
      .then((res) => {
        _that.setData({
          address2: res.data.list[0],
        });
      })
      .catch((res) => {
        console.log(res);
      });

    app
      .ajax("logistics/company")
      .then((res) => {
        _that.setData({
          company: res.data.list,
        });
        // console.log(this.data.company);
      })
      .catch((res) => {
        console.log(res);
      });

    app
      .ajax("explain/recoveryrule")
      .then((res) => {
        _that.setData({
          rules: res.data,
        });
      })
      .catch((res) => {
        console.log(res);
      });
    //  console.log(this.data.date.options); 
  



    // const _that = this
    app.ajax('explain/couponrule').then(res => {
      // console.log(res.data.list);
      _that.setData({
        list: res.data.list
      })
    }).catch(res => {
      console.log(res)
    })
    
  },

  goAddress(){
    wx.navigateTo({
      url:"./address"
    })
  },
  checkTime(){
    this.setData({
      'date.visible':!this.data.date.visible
    })
    // console.log(this.data.date.visible);
  },
  getTimeObj(time) {
    let s = new Date(time);
    let year = s.getFullYear();
    let month = s.getMonth();
    let day = s.getDate();
    let hour = s.getHours();
    let minute = s.getMinutes();
    let second = s.getSeconds();
    // console.log(year,month,day,hour,minute,second)
    // return day + '天 ' + hour + ':' + minute + ':' + second;
    return {
      y: year,
      m: month,
      d: day,
      h: hour,
    };
  },
  formatTime(date) {
    const formatNumber = (n) => {
      n = n.toString();
      return n[1] ? n : "0" + n;
    };
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    // return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    return [month, day].map(formatNumber).join("-");
  },
  dateClose() {
    this.setData({
      ["date.visible"]: false,
    });
  },
  getdate(e){
    this.setData({
      cur:e.target.dataset.key,
      children:e.target.dataset.time,
      day:e.target.dataset.value.split('-').join('月')+'日' + e.target.dataset.key,
      days:e.target.dataset.value
    })
    console.log(this.data.day);
  },
  selectTime(e){
    // console.log(e.currentTarget.dataset.disabled);
    if (!e.currentTarget.dataset.disabled) {
      this.setData({
        now:e.currentTarget.dataset.label
      })
      // console.log(this.data.now);
    }else{
      return
    }
   
  },
  closePop(){
    this.setData({
      'date.visible':false
    })
    // console.log(this.data.date.visible);
  },
  submitRecycle(){
    app.ajax('order/recovery',{
      addr_id:this.data.userInfo.id,
      goods_id:this.data.goods_id.join(','),
      time:'2020-'+this.data.days+' '+this.data.now,
      rec_type:10
    }).then(res=>{
      console.log(res);
      wx.setStorage({
        key:"goods_id",
        data:[]
      })
      wx.setStorage({
        key:"datalist",
        data:[]
      })
      wx.navigateTo({
        url:'../detail/yuyue'
      })
    })
  },
  onReady: function(){
    
  },
  onShow: function(){
    app.ajax('address/details').then(res=>{
      
      this.setData({
        userInfo:res.data,
        show:!this.data.show
      })
      // console.log(this.data.userInfo);
    })
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