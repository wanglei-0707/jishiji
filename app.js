//app.js
const initPaymentMethod = ["支付宝", "微信", "现金", "银行卡", "信用卡"]
const initDirectionObj = {
  "美食": ["早餐", "午餐", "晚餐", "零食", "聚餐"],
  "服饰": ["上衣", "裤子", "饰品"]
}

App({
  globalData: {},
  onLaunch: function () {
    // wx.setStorageSync('my-accounts-record-arr', [{
    //   date: "2018-04-02",
    //   time: "09:00",
    //   money: '1.50',
    //   paymentMethod: "微信",
    //   directionFirst: "美食",
    //   directionSecond: "早餐"
    // }, {
    //   date: "2018-04-04",
    //   time: "12:00",
    //   money: '9.50',
    //   paymentMethod: "微信",
    //   directionFirst: "美食",
    //   directionSecond: "午餐"
    // }, {
    //   date: "2018-04-20",
    //   time: "12:00",
    //   money: '9.50',
    //   paymentMethod: "支付宝",
    //   directionFirst: "服饰",
    //   directionSecond: "上衣"
    // }, {
    //   date: "2018-03-04",
    //   time: "12:00",
    //   money: '9.50',
    //   paymentMethod: "现金",
    //   directionFirst: "服饰",
    //   directionSecond: "裤子"
    // }])
    const recordArr = wx.getStorageSync('my-accounts-record-arr')
    const paymentMethod = wx.getStorageSync('my-accounts-payment-method')
    const directionObj = wx.getStorageSync('my-accounts-direction')
    this.globalData.recordArr = recordArr || []
    this.globalData.paymentMethod = paymentMethod || initPaymentMethod
    this.globalData.directionObj = directionObj || initDirectionObj
    !recordArr && wx.setStorageSync('my-accounts-payment-method', initPaymentMethod)
    !directionObj && wx.setStorageSync('my-accounts-direction', initDirectionObj)
  }
})