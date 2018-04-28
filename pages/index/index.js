//index.js
//获取应用实例
const app = getApp()
let { recordArr, paymentMethod, directionObj, newDirectionIndex } = app.globalData
const util = require('../../utils/util.js')

const today = util.formatDate(new Date())
const nowTime = util.formatTime(new Date())

Page({
  data: {
    date: util.formatDate(new Date()),
    // endDate: today,
    time: util.formatTime(new Date()),
    money: '',
    // endTime: nowTime,
    paymentMethodIndex: 0,
    addPaymentMethod: false,
    newPaymentMethod: "",
    directionIndex: [0, 0],
    errorMoney: {
      show: false,
      msg: ''
    }
  },
  onShow: function () {
    const directionKeys = Object.keys(directionObj)
    const newDirectionIndex = app.globalData.newDirectionIndex
    const directionIndex = newDirectionIndex ? newDirectionIndex : this.data.directionIndex
    this.setData({ 
      endDate: util.formatDate(new Date()),
      endTime: util.formatTime(new Date()),           
      money: '',
      paymentMethod,
      directionKeys,
      directionIndex,
      direction: [directionKeys, directionObj[directionKeys[directionIndex[0]]]],
      remark: '',        
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindMoneyInput: function (e) {
    const { value } = e.detail
    let moneyArr = value.split('.')
    if (moneyArr.length > 2) {
      return value.slice(0, -1)
    }
    if (moneyArr[1] && parseInt(moneyArr[1]) > 99) {
      return `${moneyArr[0]}.${moneyArr[1].slice(0,2)}`
    }
    this.setData({
      money: e.detail.value
    })
  },
  bindMoneyBlur: function (e) {
    const { money } = this.data
    const index = money && money.indexOf('.')
    let errorMoney = { show: false, msg: '' }
    if (!money) {
      console.log('请输入金额！')
      errorMoney.show = true
      errorMoney.msg = '请输入金额！'
    } else if (index === 0 || index === money.length - 1) {
      console.log('请输入正确的金额！')
      errorMoney.show = true
      errorMoney.msg = '请输入正确的金额！'
    }
    this.setData({
      errorMoney
    })
  },
  bindPaymentMethodChange: function (e) {
    this.setData({
      paymentMethodIndex: e.detail.value
    })
  },
  addPaymentMethod: function (e) {
    this.setData({
      addPaymentMethod: true
    })
  },
  bindPaymentMethodInput: function (e) {
    this.setData({
      newPaymentMethod: e.detail.value
    })
  },
  cancelAddPaymentMethod: function (e) {
    this.setData({
      addPaymentMethod: false,
      newPaymentMethod: ''
    })
  },
  submitPaymentMethod: function (e) {
    const newMethod = this.data.newPaymentMethod
    if (newMethod) {
      paymentMethod.push(newMethod)
      wx.setStorageSync('my-accounts-payment-method', paymentMethod)
      this.setData({
        paymentMethod: this.data.paymentMethod.concat([newMethod]),
        paymentMethodIndex: this.data.paymentMethod.length,
        addPaymentMethod: false,
        newPaymentNethod: ''
      })
    }
  },
  bindDirectionChange: function (e) {
    this.setData({
      directionIndex: e.detail.value
    })
    app.globalData.newDirectionIndex = undefined
  },
  bindDirectionColumnChange: function (e) {
    const { column, value } = e.detail
    const { direction, directionIndex, directionKeys } = this.data
    var data = {
      direction: direction,
      directionIndex: directionIndex
    }
    data.directionIndex[column] = value
    if (column === 0) {
      data.direction[1] = directionObj[directionKeys[value]]
    }
    this.setData(data)
  },
  addDirection: function (e) {
    wx.navigateTo({
      url: "../newDirection/newDirection"
    })
  },
  bindRemarkInput: function (e) {
    this.setData({
      remark: e.detail.value
    })
  },
  bindSubmit: function (e) {
    var { date, time, money, paymentMethodIndex, directionIndex, remark } = e.detail.value
    recordArr.push({
      date,
      time,
      money: util.formatMoney(money),
      paymentMethod: this.data.paymentMethod[paymentMethodIndex],
      directionFirst: this.data.direction[0][directionIndex[0]],
      directionSecond: this.data.direction[1][directionIndex[1]],
      remark
    })
    wx.setStorageSync('my-accounts-record-arr', recordArr)
    this.setData({
      date: util.formatDate(new Date()),
      time: util.formatTime(new Date()),
      money: '',
      paymentMethodIndex: 0,
      directionIndex: [0, 0]
    })
    wx.switchTab({
      url: "../check/check"
    })
  }
})
