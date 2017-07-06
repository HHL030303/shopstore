var app = getApp()
Page({
  data:{
    init:0,
    init4:[],
    hidden:true,
    num:0,
    arr:[
      {
        img: "../../images/goods_list1.jpg", sjname: "芝士披萨", loc: '300m', desc: "35.00", peisong:"免费配送|",sale:300,initvalue:0,xiaoji:0
      },
      {
        img: "../../images/goods_list2.jpg", sjname: "清凉饮品", loc: '500m', desc: "75.00", peisong: "免费配送|", sale: 30,initvalue:0,xiaoji:0
      },
      {
        img: "../../images/goods_list3.jpg", sjname: "水果沙拉", loc: '510m', desc: "455.00", peisong: "免费配送|", sale: 13, initvalue: 0, xiaoji: 0
      },
      {
        img: "../../images/goods_list4.jpg", sjname: "大排档", loc: '250m', desc: "175.00", peisong: "免费配送|", sale: 320, initvalue: 0, xiaoji: 0
      },
      {
        img: "../../images/goods_list5.jpg", sjname: "木须肉", loc: '114m', desc: "35.00", peisong: "免费配送|", sale: 3100, initvalue: 0, xiaoji: 0
      },
      {
        img: "../../images/goods_list6.jpg", sjname: "蚂蚁上树", loc: '1.5km', desc: "75.00", peisong: "免费配送|", sale: 70, initvalue: 0, xiaoji: 0
      },
      {
        img: "../../images/goods_list7.jpg", sjname: "香辣汉堡", loc: '258m', desc: "455.00", peisong: "免费配送|", sale: 93, initvalue: 0, xiaoji: 0
      },
      {
        img: "../../images/goods_list8.jpg", sjname: "大排档", loc: '1.98km', desc: "175.00", peisong: "免费配送|", sale: 320, initvalue: 0, xiaoji: 0
      },
      {
        img: "../../images/goods_list9.jpg", sjname: "农家小炒肉", loc: '30m', desc: "35.00", peisong: "免费配送|", sale: 300, initvalue: 0, xiaoji: 0
      },
      {
        img: "../../images/goods_list10.jpg", sjname: "红烧武昌鱼", loc: '1.33km', desc: "75.00", peisong: "免费配送|", sale: 30, initvalue: 0, xiaoji: 0
      },
      {
        img: "../../images/goods_list11.jpg", sjname: "佛跳墙", loc: '1.2km', desc: "455.00", peisong: "免费配送|", sale: 13, initvalue: 0, xiaoji: 0
      },
      {
        img: "../../images/goods_list12.jpg", sjname: "大排档", loc: '1.99km', desc: "175.00", peisong: "免费配送|", sale: 320, initvalue: 0, xiaoji: 0
      }

    ]
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo);
      that.setData({
        userInfo: userInfo
      })
    })
  },
  onPullDownRefresh: function () {
    console.log("onPullDownRefresh");
    wx.request({
      url: 'https://gp.90cxkj.com/index.php/home/api/modules',
      success:function(res){
          console.log(res.data)
      },
      fail:function(){
        wx.showToast({
          title: '暂无数据',
        })
      }
    })
    wx.stopPullDownRefresh()
  },
  onReachBottom:function(){

  },
  add:function(e){
    var index = e.currentTarget.dataset.index;
     var price = Number(e.currentTarget.dataset.price);
     var length = this.data.arr.length;
      var init2 =this.data.init;
      var temp =0;
      wx.setStorageSync("price" + index, price * (this.data.arr[index].initvalue + 1));  
      this.data.arr[index].initvalue++;
      this.data.arr[index].xiaoji = (this.data.arr[index].initvalue) * (price);
      for (var i = 0; i < length;i++){
        temp = this.data.arr[i].xiaoji+temp
      }
      init2++; 
      this.setData({     
        arr:this.data.arr,
        init:init2,  
        total: temp,
        hidden:false,
        num:134,
      })
    },
  remove:function(e){
    var index = e.currentTarget.dataset.index;
    var init2 = this.data.init;
    var temp =0;
    wx.setStorageSync("price" + index, price * (this.data.arr[index].initvalue + 1));  
    var length = this.data.arr.length;
    var price = Number(e.currentTarget.dataset.price);
    
    this.data.arr[index].initvalue--;
   
    this.data.arr[index].xiaoji = (this.data.arr[index].initvalue) * (price);
    console.log(this.data.arr[index].xiaoji)
    for (var i = 0; i < length; i++) {
      temp = this.data.arr[i].xiaoji + temp
    }
    init2--;
   
    this.setData({
      arr: this.data.arr,
      init:init2,
      total: temp,
      
    })
    if (init2<1){
      this.setData({
        hidden:true,
        num: 0,
      })
    }
  }
     

})

