//index.js
//获取应用实例
const app = getApp()
const isTel = (value) => !/^1[34578]\d{9}$/.test(value)

Page({
  data: {
    pop: false,
    popRules: false,
    rules: '',
    btn: {
      text: '获取验证码',
      cls: 'disabled'
    },
    loginBtn: false,
    form: {
      mobile: '',
      code: ''
    },
    vaild: {
      mobile: false,
      code: false
    }
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getMobileCode(e) {
    const _that = this
    // console.log(e)
    if (e.target.dataset.cls == 'disabled') return false
    app.ajax('reglogin/sendmobilecode', {
      mobile: _that.data.form.mobile
    }, 'POST').then(res => {
      wx.showToast({
        title: '已发送',
        icon: 'success',
        duration: 2000
      })
      let n = 60
      let timer = setInterval(function () {
        n--;
        if (n >= 0) {
          _that.setData({
            'btn.text': n + 's',
            'btn.cls': 'disabled'
          })
        } else {
          _that.setData({
            'btn.text': '重新发送',
            'btn.cls': ''
          })
          clearInterval(timer);
        }
      }, 1000)
    }).catch(res => {
      console.log(res)
    })
  },
  loginIn() {
    const _that = this
    if (!_that.data.loginBtn) return false
    app.ajax('reglogin/codelogin', {
      mobile: _that.data.form.mobile,
      code: _that.data.form.code
    }, 'POST').then(res => {
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/index/index',
          success: (res) => {
          }
        })
      }, 1500)
    }).catch(res => {
      console.log(res)
    })
  },
  popClose() {
    this.setData({
      pop: false,
    })
  },
  popClosed() {
    // console.log(233)
  },
  popUp() {
    this.setData({
      pop: true,
    })
  },
  formChange(e) {
    let _that = this
    const key = 'form.' + e.target.dataset.name
    const error = 'vaild.' + e.target.dataset.name
    let val
    if (e.target.dataset.name == 'mobile') {
      val = isTel(e.detail.value)
      _that.setData({
        'btn.cls': val ? 'disabled': ''
      })
    }else{
      val = e.detail.value.length < 4
      _that.setData({
        loginBtn: !val
      })
    }
    _that.setData({
      [key]: e.detail.value,
      [error]: val
    })
    // console.log(_that.data)
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
    }else{
      msg = '请输入正确的验证码'
    }
    wx.showModal({
      title: msg,
      showCancel: !1,
    })
  },
  rulesUp(e) {
    const _that = this
    app.ajax('explain/protocol', {
      keyname: e.target.dataset.name
    }).then(res => {
      _that.setData({
        rules: res.data.content
      })
      _that.rulesToggle()
    }).catch(res => {
      console.log(res)
    })
  },
  getInfoCallback(e) {
    const _that = this
    if (e.detail.errMsg == 'getPhoneNumber:ok') {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // console.log(res.code)
          app.ajax('reglogin/gettoken', {
            code: res.code
          }).then(res => {
            wx.setStorageSync('token_' + app.globalData.v, res.data.token)
            app.globalData.token = res.data.token
            if (res.data.login_code == 200) {
              app.globalData.isLogin = true
            }
            app.ajax('reglogin/weminmobilelogin', {
              iv: e.detail.iv,
              encrypted_data: e.detail.encryptedData
            }, 'POST').then(res => {
              wx.showToast({
                title: '授权成功',
                icon: 'success'
              })
              console.log(res);
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/index/index'
                })
              }, 1500)
            }).catch(res => {
              console.log(res)
            })
          }).catch(res => {
            console.log(res)
          })
        }
      })
    } else {
      wx.showToast({
        title: '授权失败，请重新授权',
        icon: 'none'
      })
    }
  },
  rulesToggle() {
    this.setData({
      popRules: !this.data.popRules
    })
  },
  goTo(e) {
    wx.redirectTo({
      url: '../../pages/guide/guide'
    })
  },
  onLoad: function () {
    
  }
})
