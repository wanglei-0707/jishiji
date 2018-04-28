const app = getApp()
let { recordArr, paymentMethod, directionObj } = app.globalData
const util = require('../../utils/util.js')

const today = util.formatDate(new Date())

Page({
  data: {
    recordArr,
    paymentMethodIndex: 0,
    directionIndex: 0,
    startDate: util.getFirstDayOfMonth(new Date()),
    endDate: today,    
    endDay: today,

  },
  onShow: function () {
    this.setData({
      recordArr,
      paymentMethod: ['全部'].concat(paymentMethod),
      directionKeys: ['全部'].concat(Object.keys(directionObj)),
      sum: this.getSumMoney(recordArr)
    }, this.setSelectedRecordsAndSum)
  },
  getSelectedRecords: function () {
    const { recordArr, startDate, endDate, paymentMethodIndex, directionIndex, paymentMethod, directionKeys } = this.data
    return recordArr.filter(item => {
      return item.date >= startDate && item.date <= endDate && (+paymentMethodIndex === 0 || item.paymentMethod === paymentMethod[paymentMethodIndex]) && (+directionIndex === 0 || item.directionFirst === directionKeys[directionIndex])
    })
  },
  getSumMoney: function (records) {
    return util.formatMoney(records.reduce((total, item) => {
      return total + parseFloat(item.money)
    }, 0))
  },
  setSelectedRecordsAndSum: function () {
    let selectedRecords = this.getSelectedRecords()
    selectedRecords = selectedRecords.sort((a, b) => {
      if (a.date < b.date) {
        return -1
      } else if (a.date > b.date) {
        return 1
      } else if (a.time <= b.time) {
        return -1
      } else {
        return 1
      }
    })
    this.setData({
      selectedRecords,
      sum: this.getSumMoney(selectedRecords)
    })
  },
  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value,
    }, this.setSelectedRecordsAndSum)
  },
  bindEndDateChange: function (e) {
    this.setData({
      endDate: e.detail.value,
    }, this.setSelectedRecordsAndSum)
  },
  bindPaymentMethodChange: function (e) {
    this.setData({
      paymentMethodIndex: e.detail.value,
    }, this.setSelectedRecordsAndSum)
  },
  bindDirectionChange: function (e) {
    this.setData({
      directionIndex: e.detail.value,
    }, this.setSelectedRecordsAndSum)
  }
})