var url ="https://m.maoyan.com/comments.json";
var url2 ="https://m.maoyan.com/movie";
var offset;
var limit;
var firstCount =0;

var offset;
var loadmoreComment = function (that) {
  var arr = [];
  console.log("id"+that.data.id)
  if (that.data.isfreshing) {
    return false
  }else{
    wx.request({
      data: {
        movieid: that.data.id,
        limit: limit,
        offset: offset,
      },
      url: url,
      success: function (res) {
        console.log(res.data);
        console.log(res.data.data.CommentResponseModel.cmts.length);
        var list = res.data.data.CommentResponseModel.cmts;
        for (var i = 0; i < res.data.data.CommentResponseModel.cmts.length; i++) {
          var userImg = res.data.data.CommentResponseModel.cmts[i].avatarurl;
          var nickName = res.data.data.CommentResponseModel.cmts[i].nick;
          var content = res.data.data.CommentResponseModel.cmts[i].content;
          var commentTime = res.data.data.CommentResponseModel.cmts[i].time;
          arr.push(res.data.data.CommentResponseModel.cmts[i])
        }
        console.log();
        that.setData({
          title: that.data.nm,
          img: that.data.img,
          arr: arr,
          isfreshing: true,
          list: list,
          hidden3: true,
          more: "加载更多评论"
        });
        console.log(that.data.arr)
        // offset += res.data.data.CommentResponseModel.cmts.length;
        limit = limit+5 ;
        
      },
      fail:function(res){
          wx.showModal({
            title: '数据加载失败',
            content: '',
          });
        

      },
      complete:function(){

      }

    })
  }

};
Page({

  /**
   * 页面的初始数据
   */
  data: {
    more:"加载更多评论",
    hidde2:false,
    hidden3:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that =this;
    offset = 0;
    limit = 5;
    console.log(options.arr3);
    var arr3 = options.arr3;
    console.log(arr3)
    arr3=arr3.split(",");
    console.log(arr3.length);
    var id =arr3[0];
    var nm = arr3[1];
    var img =arr3[2];
    that.setData({
      id: id,
      nm:nm,
      img:img
    })
    loadmoreComment(that);
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
  onPullDownRefresh: function (e) {
      console.log("xoala")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
      var that = this;
      if(that.data.arr.length>=95){
          that.setData({
            more: "没有更多评论了",
            hidden3: true,
          })
      }else{
        setTimeout(function () {
          that.setData({
            more: "加载中",
            hidden3: false,
            isfreshing: false,
          });
          setTimeout(function () {
            loadmoreComment(that)
          }, 2000)
        }, 500)
      }
    
  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  more:function(e){
    var that =this
    that.setData({
      more:"加载中",
      hidden3:false
    });
      // setTimeout(,2000)
      setTimeout(function(){
        loadmoreComment(that)
      },2000)
    
    
  }
  
})