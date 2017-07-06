//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    title:"便民生活快乐你我",
    currclick:0,
    arr:[
      { name: "美食", imglist: "../../images/list1.png", bgcolor: "#ff9c01", condition: true, url:"../foods/foods",opentype:"0",index:0},
      { name: "学习", imglist: "../../images/list6.png", bgcolor: "#0ec0aa", condition: true, index: "1", url: "../dushu/dushu", opentype: "0", index: 1},
      { name: "电影", imglist: "../../images/list2.png", bgcolor: "#1d7e22", condition: true, index: 2, url: "../jiazai/jiazai", opentype:0,index:2},
      { name: "KTV", imglist: "../../images/list4.png", bgcolor: "#dd66c2", condition: false,index:3},
      // { name: "火锅", imglist: "../../images/list5.png", bgcolor: "#f75b5b", condition: false,index:4},
      // { name: "自助餐", imglist: "../../images/list6.png", bgcolor: "#ff771a", condition: false,index:5},
      { name: "购物", imglist: "../../images/list7.png", bgcolor: "#79a5fe", condition: false,index:6},
      { name: "更多", imglist: "../../images/list8.png", bgcolor: "#ff4978", condition: true, url: "../more/more", opentype: "1",index:7},
    ],
    shangjialist:[
         {
        shangjia: [
                       
                        { sjimg: "../../images/goods4.jpg", sjname: "KFC", loc: "500m", desc: "本店新开张，欢迎各位顾客莅临，开张三天。酒水减半，副食八折", peisong: "免费配送", sale: "130" },
                        { sjimg: "../../images/goods3.jpg", sjname: "ccc", loc: "2500m", desc: "本店新开张，欢迎各位顾客莅临，开张三天。酒水减半，副食八折", peisong: "免费配送", sale: "180" }

        ],
        id:0
      },
      {
        shangjia: [
          { sjimg: "../../images/goods1.jpg", sjname: "肯德基", loc: "500m", desc: "本店新开张，欢迎各位顾客莅临，开张三天。酒水减半，副食八折", peisong: "免费配送", sale: "30" },
          { sjimg: "../../images/goods4.jpg", sjname: "DDD", loc: "500m", desc: "本店新开张，欢迎各位顾客莅临，开张三天。酒水减半，副食八折", peisong: "免费配送", sale: "130" }

        ],
        id: 1
      },
     {
        shangjia: [

          { sjimg: "../../images/goods2.jpg", sjname: "油焖虾皇", loc: "100m", desc: "本店新开张，欢迎各位顾客莅临，开张三天。酒水减半，副食八折", peisong: "免费配送", sale: "1130" },
          { sjimg: "../../images/goods5.jpg", sjname: "FFF", loc: "110m", desc: "本店新开张，欢迎各位顾客莅临，开张三天。酒水减半，副食八折", peisong: "免费配送", sale: "6130" }

        ],
        id: 2
      }
 
    ],

    title2:[
      { mess: "商家分类", bgimage:"http://ceshi.whabl.com/hazs/xgnza/Arr_down.png",id:0} ,
      { mess: "综合排序", bgimage: "http://ceshi.whabl.com/hazs/xgnza/Arr_down.png",id:1 },
      { mess: "优惠活动", bgimage: "http://ceshi.whabl.com/hazs/xgnza/Arr_down.png",id:2},
    ],
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },


  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
         userInfo: userInfo
      })
    })
  },
  switchta: function (e) {
    var index = e.target.dataset.index;
     this.setData({
       currclick:index
     })
  },
  tz:function(e){
    var arr2 =[];
    var dataimage = e.currentTarget.dataset.image;
    var dataname = e.currentTarget.dataset.name;
    arr2.push(dataimage, dataname)
    console.log(dataimage);
    wx.navigateTo({
      url: '../info/info?arr2=' +arr2,
    })
  },
  showtoatst:function(){
    wx.showModal({
        title: '暂未开放，敬请期待',
       
      })
  },
  goto:function(e){
    var index = e.currentTarget.dataset.index;
    var url = e.currentTarget.dataset.url;
    var openTyep = this.data.arr[index].opentype;
    // console.log(openTyep)
    // switch (openTyep){
    //   case 0:;
    //   console.log(111);
    //     wx.navigateTo({
    //       url: url,
    //     });
    //     break;
    //     case 1:
    //     console.log(2222);
    //     wx.switchTab({
    //       url: url,
    //     });

    //     break;
    // }
    if (openTyep==1){
      wx.switchTab({
          url: url,
        });
    }else{
      wx.navigateTo({
          url: url,
        });
    }

  }


})