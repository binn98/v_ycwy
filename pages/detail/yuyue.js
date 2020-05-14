//Page Object
Page({
  data: {},
  //options(Object)
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  gohome() {
    wx.redirectTo({
      url: "../../pages/index/index",
    });
  },
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
});
// Page({
//   onClick(e) {
//       console.log('onClick', e)
//       if (e.detail.type === 'right') {
//           wx.showModal({
//               title: 'Thank you for your support!',
//               showCancel: !1,
//           })
//       }
//   },
// })
