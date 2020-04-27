//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // this.wxLogin()
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },
  onShow() {
    this.wxLogin()
  },
  wxLogin() {
    const _that = this
    let location_token = wx.getStorageSync('token_' + _that.globalData.v)
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    if (location_token) {
      _that.ajax('reglogin/gettoken').then(res => {
        wx.setStorageSync('token_' + _that.globalData.v, res.data.token)
        _that.globalData.token = res.data.token
        if (res.data.login_code == 200) {	
          _that.globalData.isLogin = true
        }
        _that.readyCallback && _that.readyCallback(1)
      }).catch(res => {
        console.log(res)
      })
      return false
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // console.log(res.code)
        _that.ajax('reglogin/gettoken',{
          code: res.code
        }).then(res => {
          wx.setStorageSync('token_' + _that.globalData.v, res.data.token)
          _that.globalData.token = res.data.token
          if (res.data.login_code == 200) {
            _that.globalData.isLogin = true
          }
          _that.readyCallback && _that.readyCallback(1)
        }).catch(res => {
          console.log(res)
        })
      }
    })
  },
  ajax(url, data, myset) {
    let promise = new Promise((resolve, reject) => {
      const _that = this
      let postData = data || ''
      let location_token = wx.getStorageSync('token_' + _that.globalData.v)
      wx.request({
        url: _that.globalData.api + url,
        data: postData,
        header: {
          token: location_token
        },
        method: myset || 'GET',
        success: res => {
          // console.log(res.data.code)
          if (res.data.code == 0) {
            resolve(res.data)
          } else if (res.data.code == -200) {
            wx.showToast({
              title: '登录已过期，请重新登录',
              icon: 'none'
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/login'
              })
            }, 1500)
          } else if (res.data.code == -444) {
            wx.showToast({
              title: '没有访问权限',
              icon: 'none'
            })
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/guide/guide'
              })
            }, 1500)
          } else {
            reject(res.data)
            wx.showToast({
              title: res.data.message || '网络错误，请稍后重试',
              icon: 'none'
            })
          }
        },
        error: res => {
          reject(res);
        }
      })
    })
    return promise;
  },
  readyCallback: null,
  globalData: {
    v: 'v1.1.4', //token版本号，修改后清除token缓存
    isLogin: false,
    address_cur: '',
    api: 'https://devapi.yichuwuyou.com/wmrecovery/1.1.0/', //API接口公共前缀
    token: '',
    userInfo: null
  }
})