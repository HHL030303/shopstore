var page =0;
var list2 =[];
var list3 =[];
var count1;
var url = "https://www.imooc.com/course/ajaxlist";
var opts ={};
Page({
  data: {
    id: 0,
    list: [],
    title: "",
    img: "",
    time: "",
    description: "",
    precondition: "",
    purpose: "",
    media_total: "",
    hidden: false,
   
  },

  onLoad: function (opt) {
    console.log("onload")
    var that = this;
    that.setData({
      id: opt.id,
      url:opt.url,
      count:opt.count
    });
   
    for (var j = 0; j < opt.count;j++){
          count1 =0;
         
        wx.request({
          url: url,
            data: {
              page: j,
              id: that.data.id
            },
            
              success: function (res) {
                // console.log(count1);
              
                  list2 = list2.concat(res.data.list);
                  that.setData({
                      list: list2
                  })
                  list3.push(list2);
                  console.log(list3);
                  if (list3.length == opt.count){
                      var list4 =that.data.list;
                      console.log(list4);
                      for(var k=0;k<list4.length;k++){
                        if (list4[k].id ==that.data.id){
                          console.log(list4[k].name)
                          that.setData({
                            // list: list,
                            title: list4[k].name,
                            img: list4[k].pic_url,
                            name: list4[k].short_description,
                            time: list4[k].time,
                            description: list4[k].description,
                            precondition: list4[k].precondition,
                            purpose: list4[k].purpose,
                            media_total: list4[k].media_total,
                            hidden: true
                          })
                          }
                      }
                  }
                 
                  // for (var i = 0; i < that.data.list.length; i++) {
                  //       console.log(111)
                  // }
               
               
                // for (var i = 0; i < res.data.list.length; i++) {
                //   console.log(that.data.id)
                //   console.log(res.data.list[i]);
                //   if (res.data.list[i].id == that.data.id) {
                //     console.log(111)
                //     that.setData({
                //       list: list,
                //       title: res.data.list[i].name,
                //       img: res.data.list[i].pic_url,
                //       name: res.data.list[i].short_description,
                //       time: res.data.list[i].time,
                //       description: res.data.list[i].description,
                //       precondition: res.data.list[i].precondition,
                //       purpose: res.data.list[i].purpose,
                //       media_total: res.data.list[i].media_total,
                //       hidden: true
                //     })
                //   }

                // };
                count1++;
              },
          fail: function (res) {
            console.log(res)
            wx.showModal({
              title: '数据加载失败',
              content: '',
            })
          },
       
        })
       
    }
    list3 = [];
    list2 =[];
  },

  
});


 