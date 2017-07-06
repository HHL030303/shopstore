
var app = getApp()
Page({
  data: {
    userInfo: {},
    projectSource: 'https://github.com/liuxuanqiang/wechat-weapp-mall',
    usermoreInfo: [{
      icon:"../../images/dw.png",
      text: '自动定位',
      
    }, {
        icon: "../../images/tel.png",
      text: '客服热线',
    
    }, {
        icon: "../../images/mail.png",
        text: '意见反馈'
    }, {
        icon: "../../images/tz.png",
        text: '消息中心'
    }, {
        icon: "../../images/check.png",
        text: '检查更新'
    }]
  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
     
    })
  }
})

