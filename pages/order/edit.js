// pages/address/edit.js
const app = getApp()
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)
import data from './data'
// 高德地图js
var amapFile = require("../../lib/amap-wx");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    alter:false,
    form: {
      link_name: '',
      mobile: '',
      province: '',
      city: '',
      area: '',
      address: '',
      is_default: 1
    },
    vaild: {
      mobile: false
    },
    btn: false,
    city: {
      visible: false,
      value: '',
      options: data
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _that = this
    _that.setData({
      id: options.id  
    })
    var myAmapFun = new amapFile.AMapWX({key:'400d5b5684c1cbe95c669e6e6f37988a'});
    
    // console.log(options.id)
    
    if (options.id) {
      app.ajax('address/details', {
        id: options.id
      }).then(res => {
        console.log(res);
        _that.setData({
          'form.id': options.id,
          'form.link_name': res.data.link_name,
          'form.mobile': res.data.mobile,
          'form.province': res.data.province,
          'form.city': res.data.city,
          'form.area': res.data.area,
          'form.address': res.data.address,
          'form.is_default': res.data.is_default,
          'city.value': res.data.province + ' ' + res.data.city + ' ' + res.data.area,
           btn: true,
           alter:true
        });
        if(res.data.is_default==2){
          // _that.isDefault(2)
        }
      }).catch(res => {
        console.log(res)
      })
    }else{
      myAmapFun.getRegeo({
        success: function(data){
          //成功回调
          const addres = data[0].regeocodeData
          // console.log(data);
          // console.log(addres.addressComponent);
          _that.setData({
            ['city.value']:addres.addressComponent.province +' '+ addres.addressComponent.city +' '+addres.addressComponent.district,
            ['form.province']:addres.addressComponent.province,
            ['form.city']:addres.addressComponent.city,
            ['form.area']:addres.addressComponent.district
          })
        }
      })
    }
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
  formChange(e) {
    let _that = this
    const key = 'form.' + e.target.dataset.name
    const error = 'vaild.' + e.target.dataset.name
    let val
    if (e.target.dataset.name == 'mobile') {
      val = isTel(e.detail.value)
      _that.setData({
        [key]: e.detail.value,
        [error]: val
      })
    } else {
      _that.setData({
        [key]: e.detail.value
      })
    }

    let vaild = true
    for (let key in _that.data.form) {
      if (_that.data.form[key] == '') {
        // console.log(key);
        vaild = false
      }
    }
    // console.log(_that.data.form);
    if (vaild) {
      _that.setData({
        btn: true
      })
      
    }
  },
  formClear(e) {
    const key = 'vaild.' + e.target.dataset.name

    this.setData({
      [key]: '',
    })
  },
  formError(e) {
    let msg
    if (e.target.dataset.name == 'mobile') {
      msg = '请输入正确的手机号码'
    }
    wx.showModal({
      title: msg,
      showCancel: !1,
    })
  },
  cityOpen() {
    this.setData({
      ['city.visible']: true
    })
  },
  cityClose() {
    this.setData({
      ['city.visible']: false
    })
  },
  cityChange(e) {
    this.setData({
      ['city.value']: e.detail.options.map((n) => n.label).join(' ')
    })
    // console.log(this.data.city.value);
    let all = this.data.city.value
    this.setData({
      ['form.province']: all.split(' ')[0],
      ['form.city']:all.split(' ')[1],
      ['form.area']:all.split(' ')[2]
    })
    // console.log(this.data.form);
  },
  radioChange(e) {
    this.setData({
      ['form.is_default']: this.data.form.is_default == 2 ? 1 : 2
    })
    // console.log(this.data.form.is_default)
  },
  subAddress() {
    console.log(this.data.btn);
    // if (!this.data.btn) return false
    app.ajax('address/setting', this.data.form).then(res => {
      console.log(res);
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      })
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 1500)
    }).catch(res => {
      console.log(res)
    })
  },
  isDefault(e){
    let no = e.detail.value;
    if(!no){
      this.setData({
        ['form.is_default']:1
      })
    }else{
      this.setData({
        ['form.is_default']:2
      })
    }
  },
  phoneRules(e){
    console.log(e.detail.value);
    let phone = e.detail.value
    let on = /^1[34578]\d{9}$/.test(phone)
    if(on){
      this.setData({
        ['form.mobile']:phone
      })
    }else{
      wx.showToast({
          title: '请输入正确的手机号码',
          icon: 'none',
          duration: 2000
      })
    }
    this.rule()
  },
  checkAdd(){
    this.setData({
      ["city.visible"]:!this.data.visible
    })
    this.rule()
  },
  Address(e){
    this.setData({
      ['form.address']:e.detail.value
    })
    this.rule()
  },
  name(e){
    this.setData({
      ['form.link_name']:e.detail.value
    })
    this.rule()
  },
  rule(){
    let arr = this.data.form
    if(arr.link_name!=''&&arr.mobile!=''&&arr.province!=''&&arr.city!=''&&arr.area!=''&&arr.address!=''){
      this.setData({
        btn:true
      })
      // console.log('进来了');
    }else{
      this.setData({
        btn:false
      })
    }
  }
})