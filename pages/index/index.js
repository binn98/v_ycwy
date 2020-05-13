// pages/index/index.js
const app = getApp();
// const { watch, computed } = require('../../assets/js/vuefy.js')
import {
  $startWuxRefresher,
  $stopWuxRefresher,
  $stopWuxLoader,
} from "../../component/index";

let timer;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    tab: 0,
    tab2: 0,
    tabs: "",
    popRules: false,
    rules: {},
    scrollTop: 0,
    list: [],
    page: 1,
    total_page: 1,
    timeList: [],
    // show:false,
    show: false,
    ative: false,
    info: {},
    number: 10,
    total: {},
    lists: [],
    totals: -1,
    dataList: [],
    Rmb: 0,
    active: [],
    goods_id: [],
    isLogin: false,
    pro:false,
    avatarUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _that = this;
    app
      .ajax("user/info")
      .then((res) => {
        _that.setData({
          info: res.data,
          isLogin: res.data.login_code == 200,
        });
        app.globalData.isLogin = res.data.login_code == 200;
        // console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
    _that.coupon()
    timer = setInterval(() => {
      if (!this.data.list) return false;
      let list = this.data.list.map((val) => {
        let time = this.getRemainderTime(Number(val.success_time));
        return time;
      });
      this.setData({
        timeList: list,
      });
    }, 1000);
    console.log(wx.getStorageSync("token_v1.1.5"));
    // 回收回收规则
    app
      .ajax("explain/recoveryrule")
      .then((res) => {
        _that.setData({
          rules: res.data,
        });
      })
      .catch((res) => {
        console.log(res);
      }),
      wx.getStorage({
        key: "datalist",
        success(res) {
          if (res.data.length > 0) {
            let moeny = 0;
            let ative = [];
            res.data.map((v) => {
              (moeny += +v.num), ative.push(v.id);
            });
            _that.setData({
              Rmb: moeny.toFixed(2),
              dataList: res.data,
              active: ative,
              goods_id:ative
            });
           
            setTimeout(() => {
              _that.ative();
            }, 1500);
          }
        },
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
    let _that = this;
    // console.log(app.globalData.token)
    if (!app.globalData.token) {
      app.readyCallback = _that.getList;
    } else {
      _that.getList(1);
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(timer);
  },

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

  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop,
    });
    // console.log(e.scrollTop);
    if (e.scrollTop > 600) {
      this.listLoadmore();
    }
  },

  /**
   * 页面方法
   */
  filterList() {
    const that = this;
    that.setData({
      ative: true,
      show: !that.data.show,
    });
  },
  dd() {
    wx.setStorage({
      key: "datalist",
      data: [],
    });
    console.log("成功");
  },
  getfilterList(e) {
    const that = this;
    // console.log(e.target.dataset.day);
    that.ative();

    that.setData({
      tab2: e.target.dataset.day,
      tabs: e.target.dataset.value,
      show: false,
    });
    //  console.log(that.data.tab2);
    that.getList(1);
  },
  getAllList() {
    const that = this;
    that.setData({
      ative: false,
      tabs: "",
      tab2: 0,
      show: false
    });
    that.getList(1);
  },
  onClose1() {
    const that = this;
    that.setData({
      show: false,
    });
  },
  tabChange(e) {
    const key = e.target.dataset.tab;
    // console.log(e.detail.key);
    // if(e.detail.key == 110){
    //   this.setData({
    //     show:!this.data.show
    //   })
    //   return
    // }
    this.setData({
      [key]: e.detail.key,
      show: false
    });
    this.getList(1);
    // console.log(this.data.tab)
    wx.pageScrollTo({
      scrollTop: 0,
    });
  },
  rulesToggle() {
    this.setData({
      popRules: !this.data.popRules,
    });
  },
  getList(page) {
    const _that = this;
    _that.setData({
      loading:true
    })
    app
      .ajax(
        "order/goods",
        {
          status: _that.data.tab,
          time: _that.data.tab2,
          page: page || 1,
        },
        "POST"
      )
      .then((res) => {
        // console.log(res);
        if (page <= res.data.total_page || !res.data.total_page) {
          let list;
          if (page == 1) {
            list = res.data.list;
          } else {
            list = [..._that.data.list, ...res.data.list];
          }
          if(list.length!=0){
            list.map((v) => {
              v.success_time_txt = v.success_time_txt
                .slice(0, 10)
                .split("-")
                .join(".");
            });
          }
          _that.setData({
            list: list,
            total_page: res.data.total_page,
            page: page,
            loading: false,
          });
          // console.log(_that.data.list);
          // console.log(_that.data.list);
          _that.ative();
          if (res.data.login_code == 200) {
            app.globalData.isLogin = true;
            _that.setData({
              isLogin: true,
            });
          } else {
            app.globalData.isLogin = false;
            _that.setData({
              isLogin: false,
            });
          }
          // this.cur = null
          // this.cTime()
          // console.log(_that.data)
        }
      })
      .catch((res) => {
        console.log(res);
      });
  },
  listPull() {
    $startWuxRefresher();
  },
  listRefresh() {
    setTimeout(() => {
      this.getList(1);
      $stopWuxRefresher();
    }, 1500);
  },
  listLoadmore() {
    // console.log('onLoadmore')
    // if (!this.data.list) return false
    setTimeout(() => {
      if (this.data.page < this.data.total_page) {
        // console.log(this.data.page)
        this.getList(++this.data.page);
        // $stopWuxLoader()
      } else {
        console.log("没有更多数据");
        // $stopWuxLoader('#wux-refresher', this, true)
      }
    }, 1500);
  },
  goCoupon() {
    wx.navigateTo({
      url: "../coupon/coupon",
    });
  },
  goTo(e) {
    // console.log(e);
    if (e.currentTarget.dataset.moeny == 0) {
      wx.showToast({
        title: "请先选择",
        icon: "none",
        duration: 2000,
      });
    } else {
      wx.navigateTo({
        url: "../../pages/order/order",
      });
    }
    // if (e.target.dataset.status == 10) {
    //   wx.navigateTo({
    //     url: '../../pages/detail/detail?id=' + e.target.dataset.rid
    //   })
    // } else {

    // }
  },
  godetilt(e) {
    // console.log(e.currentTarget.dataset);

    wx.navigateTo({
      url: "../detail/detail?id=" + e.currentTarget.dataset.id,
    });
  },
  ative() {
    const _that = this;
    let ative3 = _that.data.dataList;
    let ative2 = _that.data.list;
    if(ative2.length==0) return;
    let ative4 = ative2.map((v) => {
      return v.goods_id;
    });
    ative3.map((v) => {
      if (ative4.indexOf(v.id) > -1) {
        ative4[ative4.indexOf(v.id)] = true;
      }
    });
    _that.setData({
      active: ative4,
    });
    // console.log(_that.data.ative);

    // console.log(ative4.indexOf(ative6));
    // console.log(ative4);
  },
  Checked(e) {
    let arr = [];
    const that = this;
    let ative = that.data.active;
    let arr2 = true;
    let index = 0;
    let moeny = 0;
    let goods_id = [];
    arr = that.data.dataList;
    // console.log(e);
    arr.map((v, i) => {
      if (v.id == e.currentTarget.dataset.id) {
        arr2 = false;
        index = i;
      }
    });

    if (arr2) {
      arr.push(e.currentTarget.dataset);
      ative[e.currentTarget.dataset.index] = true;
      that.setData({
        dataList: arr,
        active: ative,
      });
      arr2 = true;
      // console.log(ative);
    } else {
      ative[e.currentTarget.dataset.index] = false;
      arr.splice(index, 1);
      that.setData({
        dataList: arr,
        active: ative,
      });
      // console.log(ative);
    }
    // console.log( that.data.dataList);
    that.data.dataList.map((v) => {
      (moeny += +v.num), goods_id.push(v.id);
    });
    // console.log(moeny.toFixed(2));
    // console.log(goods_id);
    that.setData({
      Rmb: moeny.toFixed(2),
      goods_id: goods_id,
    });
    wx.setStorage({
      key: "datalist",
      data: that.data.dataList,
    });
    wx.setStorage({
      key: "goods_id",
      data: that.data.goods_id,
    });
    // console.log(that.data.goods_id);
  },
  del(e) {
    // console.log(e.currentTarget.dataset.id);
    app.ajax("order/del", { order_id: e.currentTarget.dataset.id }).then((res) => {
      this.getList(1);
    });
  },
  goTo2(e) {
    wx.navigateTo({
      url: "../../pages/detail/detail?id=" + e.target.dataset.id,
    });
  },
  gorules() {
    wx.navigateTo({
      url: "../rules/rules",
    });
  },
  getInfoCallback(e) {
    const _that = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.login({
        success: (res) => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // console.log(res.code)
          app
            .ajax("reglogin/gettoken", {
              code: res.code,
            })
            .then((res) => {
              wx.setStorageSync("token_" + app.globalData.v, res.data.token);
              app.globalData.token = res.data.token;
              if (res.data.login_code == 200) {
                app.globalData.isLogin = true;
              }
              app
                .ajax(
                  "reglogin/weminmobilelogin",
                  {
                    iv: e.detail.iv,
                    encrypted_data: e.detail.encryptedData,
                  },
                  "POST"
                )
                .then((res) => {
                  _that.getList(1);
                  _that.coupon()
                  app
                  .ajax("user/info")
                  .then((res) => {
                    _that.setData({
                      info: res.data,
                      isLogin: res.data.login_code == 200,
                    });
                    app.globalData.isLogin = res.data.login_code == 200;
                    // console.log(res);
                  })
                  .catch((res) => {
                    console.log(res);
                  });
                })
                .catch((res) => {
                  console.log(res);
                });
            })
            .catch((res) => {
              console.log(res);
            });
        },
      });
    } else {
      wx.showToast({
        title: "授权失败，请重新授权",
        icon: "none",
      });
    }
  },
  getRemainderTime(startTime) {
    let s1 = new Date(startTime),
      s2 = new Date(),
      runTime = parseInt(s2.getTime() / 1000 - s1.getTime());
    let year = Math.floor(runTime / 86400 / 365);
    runTime = runTime % (86400 * 365);
    let month = year * 12 + Math.floor(runTime / 86400 / 30);
    runTime = runTime % (86400 * 30);
    let day = month * 30 + Math.floor(runTime / 86400);
    day = day < 10 ? "0" + day : day;
    runTime = runTime % 86400;
    let hour =
      Math.floor(runTime / 3600) < 10
        ? "0" + Math.floor(runTime / 3600)
        : Math.floor(runTime / 3600);
    runTime = runTime % 3600;
    let minute =
      Math.floor(runTime / 60) < 10
        ? "0" + Math.floor(runTime / 60)
        : Math.floor(runTime / 60);
    runTime = runTime % 60;
    let second = runTime < 10 ? "0" + runTime : runTime;
    // console.log(year,month,day,hour,minute,second)
    // return day + '天 ' + hour + ':' + minute + ':' + second;
    return {
      d: day,
      h: hour,
      m: minute,
      s: second,
    };
  },
  coupon(){
    app
      .ajax("coupon/list", {
        status: this.data.number,
      })
      .then((res) => {
        // console.log(res);
        this.setData({
          loading: false,
          lists: res.data.list,
          total: res.data.usable_new,
          totals: res.data.total,
        });
        // console.log(this.data.list);
      })
      .catch((res) => {
        console.log(res);
      });
  },
  goOther(){
    wx.navigateToMiniProgram({
      appId: 'wx369fe22d2a942bdc',
      path: 'pages/home/dashboard/index'
    })
  },
  offmask(){
    this.setData({
      pro:false
    })
  },
  masks(){
    this.setData({
      pro:true
    })
    console.log(this.data.pro);
  },
  forList(){
    let data = this.data.list;
    let arr;
    data.map(v=>{
      // arr =  v.sku_properties_name[1].v + ';'

    })
    console.log(data);
  }
});
