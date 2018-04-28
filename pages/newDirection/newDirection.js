const app = getApp()
let { directionObj, directionIndex } = app.globalData


Page({
  data: {
    value: [0],
    addFirst: false,
    firstCategory: "",
    secondCategory: "",
    error: {
      show: false,
      msg: ""
    }
  },
  onShow: function () {
    this.setData({
      directionFirst: Object.keys(directionObj)
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      value: e.detail.value
    })
  },
  bindAddFirsttap: function (e) {
    this.setData({
      addFirst: !this.data.addFirst,
      firstCategory: "",
      secondCategory: "",
      error: {
        show: false,
        msg: ""
      }
    })
  },
  bindSubmit: function (e) {
    let { firstCategory, newFirstCategory, newSecondCategory } = e.detail.value
    const { directionFirst } = this.data 
    if (!this.data.addFirst) {
      firstCategory = directionFirst[firstCategory[0]]
      if (!newSecondCategory) {
        console.log("请输入二级类别名称")
        this.setData({
          error: {
            show: true,
            msg: "请输入二级类别名称"
          }
        })
        return
      }
      if (directionObj[firstCategory].includes(newSecondCategory)) {
        console.log('该二级类别已存在')
        this.setData({
          error: {
            show: true,
            msg: "setSelectedRecordsAndSum"
          }
        })
        return
      }
      directionObj[firstCategory].push(newSecondCategory)
      app.globalData.newDirectionIndex = [Object.keys(directionObj).indexOf(firstCategory), directionObj[firstCategory].length - 1]
      console.log('添加成功：', directionObj)
      wx.setStorageSync('my-accounts-direction', directionObj)
      wx.navigateBack({
        delta: 1
      })
      return
    }
    if (!newFirstCategory) {
      console.log('请输入一级类别名称')
      this.setData({
        error: {
          show: true,
          msg: "请输入一级类别名称"
        }
      })
      return
    }
    if (!newSecondCategory) {
      console.log('请输入二级类别名称')
      this.setData({
        error: {
          show: true,
          msg: "请输入二级类别名称"
        }
      })
      return
    }
    if (directionFirst.includes(newFirstCategory)) {
      console.log('该一级类别已存在')
      this.setData({
        error: {
          show: true,
          msg: "该一级类别已存在"
        }
      })
      return
    }
    directionObj[newFirstCategory] = [newSecondCategory]
    app.globalData.newDirectionIndex = [Object.keys(directionObj).length - 1, 0]
    wx.setStorageSync('my-accounts-direction', directionObj)    
    console.log('一级类别添加成功', app.globalData)
    wx.navigateBack({
      delta: 1
    })
  } 
})