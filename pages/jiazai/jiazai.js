var limt =5;
var arr2 = [];
var offset=0;
var n =0;
// loadMore(that);
var loadmore = function (that) {
  that.setData({
    hidden:false
  });
  if(that.data.isFreshing) {
    return
  } else {
    that.setData({
      isFreshing: true,
    })
  };

  wx.request({
    url: 'https://m.maoyan.com/movie/list.json?type=hot',
    data: {
      limit: limt,
      offset: offset
    },
    success: function (res) {
      var datalist = res.data.data.movies;
      console.log(datalist.length);
      that.setData({
        hasNext: res.data.data.hasNext,
      })
      // console.log("是否有下一次"+res.data.data.hasNext);
      if (res.data.data.hasNext){
        for (var i = 0; i < datalist.length; i++) {
          arr2.push(datalist[i])
        }
        that.setData({
          arr2: arr2,
          scrollHeight: res.windowHeight,
          hidden:true,
          isFreshing: false,
         
        })
        // console.log(arr)
        offset += datalist.length;
        console.log("offset" + offset)
      }else{
        offset = 0;
        that.setData({
          hidden:true,
          more: "没有更多了",
        })
      }
   

    },
    fail:function(res){
      console.log(res.data)
    },
    complete:function(){
      console.log("第"+n+"次加载");
      n++
    }

  })
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFreshing:false,
    hidden3:false,
    more:"查看更多",
    scrollHeight: 0,
    hidden:true
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    that.setData({
      hidden: false
    });
    loadmore(that);
  },
  openDetail: function (e) {
    var id = e.currentTarget.dataset.id;
    var nm = e.currentTarget.dataset.name;
    var img = e.currentTarget.dataset.img;
    console.log(nm)
    var arr3 = [];
    arr3.push(id, nm, img);
    wx.navigateTo({
      url: '../detail/detail?arr3=' + arr3,

    })
  },
  bindDownLoad: function (e) {
    var that =this;
    console.log(that.data.hasNext)
    if (that.data.hasNext){
      loadmore(that);
    }else{
      
      that.setData({
       
        hidden:true,
        offset: 0,
      })
      return false
    }
  
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})
