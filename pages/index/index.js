//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    open : false,
    mark: 0,
    newmark: 0,
    startmark: 0,
    endmark: 0,
    windowWidth:  wx.getSystemInfoSync().windowWidth,
    staus: 1,
    translate: '',
    index:0,
    inputShowed: false,
    inputVal: "",
    userInfo: {},
    imgUrls: [
        './../image/banner1.jpg',
        './../image/banner1.jpg',
        './../image/banner1.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  bindMy (e){
    var index = e.target.dataset.index;
    this.setData({
      index:index
    })
  },
  bindHall (e){
    var index = e.target.dataset.index;
    this.setData({
      index:index
    })
  },
  tap_ch: function(e){
    if(this.data.open){
      this.setData({
          translate: 'transform: translateX(0px)'
      })
      this.data.open = false;
    }else{
      this.setData({
          translate: 'transform: translateX('+this.data.windowWidth*0.75+'px)'
      })
      this.data.open = true;
    }
  },
  tap_start:function(e){
    this.data.mark = this.data.newmark = e.touches[0].pageX;
    if(this.data.staus == 1){
      // staus = 1指默认状态
      this.data.startmark = e.touches[0].pageX;
    }else{
      // staus = 2指屏幕滑动到右边的状态
      this.data.startmark = e.touches[0].pageX;
    }

  },
  tap_drag: function(e){
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if(this.data.mark < this.data.newmark ){
      if(this.data.staus == 1){
        if(this.data.windowWidth*0.75 > Math.abs(this.data.newmark - this.data.startmark)){
          this.setData({
            translate: 'transform: translateX('+(this.data.newmark - this.data.startmark)+'px)'
          })
        }
      }

    }
    console.log(this.data)
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if(this.data.mark > this.data.newmark  ){
        if(this.data.staus == 1 && (this.data.newmark - this.data.startmark) > 0){
          this.setData({
            translate: 'transform: translateX('+(this.data.newmark - this.data.startmark)+'px)'
          })
        }else if(this.data.staus == 2 && this.data.startmark - this.data.newmark < this.data.windowWidth*0.75){
          this.setData({
            translate: 'transform: translateX('+(this.data.newmark + this.data.windowWidth*0.75  - this.data.startmark)+'px)'
          })
        }

    }

    this.data.mark = this.data.newmark;

  },
  tap_end: function(e){
    if(this.data.staus == 1 && this.data.startmark < this.data.newmark){
      if(Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth*0.2)){
        this.setData({
            translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      }else{
        this.setData({
            translate: 'transform: translateX('+this.data.windowWidth*0.75+'px)'
        })
        this.data.staus = 2;
      }
    }else{
      if(Math.abs(this.data.newmark - this.data.startmark) < (this.data.windowWidth*0.2)){
        this.setData({
            translate: 'transform: translateX('+this.data.windowWidth*0.75+'px)'
        })
        this.data.staus = 2;
      }else{
        this.setData({
            translate: 'transform: translateX(0px)'
        })
        this.data.staus = 1;
      }
    }

    this.data.mark = 0;
    this.data.newmark = 0;
  }
})
