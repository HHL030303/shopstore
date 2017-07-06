Page({
  data:{
      img:{},
      name:{},
      location:[
        "商家地址：某某商场2楼A区32号",
        "配送信息：由某某管理配送",
       "支付信息：该商家支持在线支付"
      ]
  },
  onLoad: function (options) {
    var imgdata = options.arr2.split(",");
   
    this.setData({
      img: imgdata[0],
      name: imgdata[1]
      })
   
  }
})