// pages/prerec/prerec.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tab: 10,
    id: "",
    name: "",
    price: "",
    ep: "",
    addressList: [],
    address: {},
    address2: {},
    company: [],
    cVal: "",
    cName: "",
    logistic_num: "",
    pop: false,
    date: {
      visible: false,
      value: "",
      options: [],
    },
    popRules: false,
    rules: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    _that.setData({
      id: options.id,
      name: options.name,
      price: Number(options.num),
      ep: Number(options.ep),
      "date.options": [
        {
          value: _that.formatTime(day),
          label: _that.formatTime(day) + "（今日）",
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
          label: _that.formatTime(day2) + "（" + week[day2.getDay()] + "）",
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
          label: _that.formatTime(day3) + "（" + week[day3.getDay()] + "）",
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
          label: _that.formatTime(day4) + "（" + week[day4.getDay()] + "）",
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
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const _that = this;
    app
      .ajax("address/details", {
        id: app.globalData.address_cur || "",
      })
      .then((res) => {
        _that.setData({
          address: res.data,
        });
        app.globalData.address_cur = res.data.id;
      })
      .catch((res) => {
        console.log(res);
      });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  /**
   * 页面方法
   */
  subRec() {
    const _that = this;
   
    if(!_that.data.address){
      wx.showToast({
        title: "请添加地址",
        icon: "none",
      });
      return false;
    }
    else if (_that.data.tab == 10 && !_that.data.date.value) {
      wx.showToast({
        title: "请选择上门日期",
        icon: "none",
      });
    
      return false;
    } else if (!_that.data.cVal) {
      // console.log(_that.data.cVal);
      wx.showToast({
        title: "请选择快递公司",
        icon: "none",
      });
      return false;
    } else if (_that.data.tab == 20 && !_that.data.logistic_num) {
      wx.showToast({
        title: "请输入快递单号",
        icon: "none",
      });
      return false;
    }

    app
      .ajax(
        "order/recovery",
        {
          addr_id: _that.data.address.id,
          goods_id: _that.data.id,
          logistic_id: _that.data.cVal,
          logistic_num: _that.data.logistic_num,
          rec_id: _that.data.address2.id,
          time: _that.data.date.value,
          rec_type: _that.data.tab,
        },
        "POST"
      )
      .then((res) => {
        wx.showToast({
          title: "提交成功",
          icon: "success",
        });
        setTimeout(() => {
          wx.navigateTo({
            url: "../../pages/detail/detail?id=" + res.data.order_id,
          });
        }, 1500);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  rulesToggle() {
    this.setData({
      popRules: !this.data.popRules,
    });
  },
  tabChange(e) {
    const key = e.target.dataset.tab;
    // console.log(e.target.dataset);
    this.setData({
      [key]: e.detail.key,
    });
    console.log(this.data[key]);
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
  dateOpen() {
    this.setData({
      ["date.visible"]: true,
    });
  },
  dateClose() {
    this.setData({
      ["date.visible"]: false,
    });
  },
  dateChange(e) {
    this.setData({
      "date.value": e.detail.options.map((n) => n.value).join(" "),
    });
    // console.log(this.data.date.value)
    // console.log(e.detail.options);
  },
  popClose() {
    this.setData({
      pop: false,
    });
  },
  popClosed() {
    // console.log(233)
  },
  popUp() {
    this.setData({
      pop: true,
    });
  },
  radioChange(e) {
    this.setData({
      cVal: e.currentTarget.dataset.value,
      cName: e.currentTarget.dataset.name,
    });
    this.popClose();
  },
  toHanble(e) {
    wx.navigateTo({
      url: "../../pages/handle/handle",
    });
  },
  addAddress(e) {
    wx.navigateTo({
      url: "../../pages/address/edit",
    });
  },
  listAddress(e) {
    wx.navigateTo({
      url: "../../pages/address/address",
    });
  },
  formChange(e) {
    const _that = this;
    const key = e.target.dataset.name;
    _that.setData({
      [key]: e.detail.value,
    });
    console.log(_that.data);
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
    return [year, month, day].map(formatNumber).join("-");
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
});
