var url = "https://www.imooc.com/course/ajaxlist";
var page = 0;
var page_size = 5;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;
var refreshHeight =0;
var count =0;
Page({
  data: {
    hidden: true,
    list: [],
    scrollTop: 0,
    scrollHeight: 0,
    isFreshing: false,
    more:"查看更多"
  },
  onLoad: function () {
    //   这里要注意，微信的scroll-view必须要设置高度才能监听滚动事件，所以，需要在页面的onLoad事件中给scroll-view的高度赋值
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
             scrollHeight: res.windowHeight
        });
      }
    });
    loadMore(that);
  },
  onPullDownRefresh:function(e){
      console.log("下拉")
  },
  //页面滑动到底部
  bindDownLoad: function () {
    var that = this;
    console.log(1111);
    this.setData({
      hidden3:false
    })
    if (this.data.count >=5) {
      console.log("暂无更多消息")
      this.setData({
        hidden3: false,
        more:"没有更多内容了"
        // count: 0
      });
      return false
    } else {
      loadMore(this);
    }

  },
  bindTop: function (e) {
    var that = this;
    // wx.showNavigationBarLoading();
    that.setData({
      hiddden1: false
    })
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  scroll: function (event) {
    //该方法绑定了页面滚动时的事件，我这里记录了当前的position.y的值,为了请求数据之后把页面定位到这里来。
    // console.log(event.detail.scrollTop)
    // this.setData({
    //   scrollTop: event.detail.scrollTop
    // });
  },
  topLoad: function (event) {
    //   该方法绑定了页面滑动到顶部的事件，然后做上拉刷新
    page = 0;
    this.setData({
      list: [],
      scrollTop: 0
    });
    // loadMore(this);

  },


  tz_artic: function (e) {
    var that = this;
    var url = "../article/article";
    console.log(e.currentTarget);
    var count = that.data.count;
    var id = e.currentTarget.dataset.id;
    console.log("id=" + id);
    wx.navigateTo({
      url: "../article/article?id=" + id + "&count=" + count
    })
  }
});


// 请求数据
var loadMore = function (that) {
  that.setData({
    hidden: false,
    hidden1: true,
    hidden2: true,
   
  });
  if (that.data.isFreshing){
       return 
  }else{
    that.setData({
      isFreshing:true
    })
  }
  wx.request({
    url: url,
    data: {
      page: page,
      page_size: page_size,
      sort: sort,
      is_easy: is_easy,
      lange_id: lange_id,
      pos_id: pos_id,
      unlearn: unlearn,
      refreshHeight: refreshHeight,
     
    },
    success: function (res) {
      var list = that.data.list;
      for (var i = 0; i < res.data.list.length; i++) {
        list.push(res.data.list[i]);
      }
      that.setData({
        list: list,
        isFreshing:false
      });
      page++;
      count++;
      that.setData({
        hidden: true,
        count:count,

      });
      console.log("这是第"+that.data.count+"次向下加载");
    },
    fail:function(res){
        wx.showModal({
          title: '数据加载忙，请稍候再试',
          content: '',
        })
    },
    complete:function(){
        
    }
  });
}


// 加载时候旋转
// function updateRefreshIcon() {
//   var deg = 0;
//   var _this = this;
//   console.log('旋转开始了.....')
//   var animation = wx.createAnimation({
//     duration: 1000
//   });

//   var timer = setInterval(function () {
//     if (!_this.data.refreshing)
//       clearInterval(timer);
//     animation.rotateZ(deg).step();//在Z轴旋转一个deg角度
//     deg += 360;
//     _this.setData({
//       refreshAnimation: animation.export()
//     })
//   }, 1000);
// }


