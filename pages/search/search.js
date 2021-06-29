import { request } from "../request/index.js";
// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        weightInfo:[], //获取到的称重信息
        inter:"", //定时任务标识
        isScroll:true,//是否滚动标识
    },
    pageTotal:1, //将总页数默认设置为1
    //接口需要的参数(分页)
    QueryParams:{
        pageNum:1,    //页码
        pageSize:10   //页面容量
    },


    //获取所有的称重信息
    getWeightInfo(){
        let that = this;
        request({url:"/weight/weightInfoList",data:this.QueryParams})
        .then(res=>{
            // console.log(res);
            const total = Math.ceil(res.data.pageTotal / this.QueryParams.pagesize)
            this.pageTotal = total
            wx.setStorageSync('weightInfo', res.data.pageData)
            that.setData({
                //将请求到的数据和原来的数据进行解构重组
                weightInfo:[...this.data.weightInfo,...res.data.pageData]
            })
        })
        //关闭下拉加载
        wx.stopPullDownRefresh();
    },

    //开启计时器任务
    startTimer(){
        var that = this
        that.data.inter = setInterval(function(){
            that.getWeightInfo();
        },30000)
    },

    //关闭计时器任务
    endTimer(){
        var that = this
        clearInterval(that.data.inter);
    },

    //点击按钮回到顶部
    goTop(){
        wx.pageScrollTo({
          duration: 300,
          scrollTop:0
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getWeightInfo();
        console.log(getApp().globalData.version);  //使用获取到globalData的值
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
        //页面显示时开启定时任务
        this.startTimer();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        //页面隐藏时关闭定时任务
        this.endTimer()
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
        /* 下拉刷新事件 
            1.重置数据
            2.重置页码
            3.重新发起请求
        */
       //1.重置数据
       this.setData({
        weightInfo:[]
        })
        //2.重置页码
        this.QueryParams.pageNum=1
        //3.重新发起请求
        this.getWeightInfo();
        },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // wx.showToast({
        //   title: '到底啦',
        //   mask:true
        // })

        /*
    **商品列表到底后的逻辑处理方式
        当用户上划页面触底后，开始加载下一页数据
        1.找到滚动条触底事件
        2.判断有无下一页数据
            - 获取总页数  = Math.ceil(总条数 / 页面容量)
            - totalPages 总页数
            - QueryParams.pagenum 当前的页码
        3.如果没有则弹出一个提示
        4.如果有就进行加载数据
            - 当前的页码++
            - 重新发送请求
            - 数据请求回来了 要对data中的数组进行拼接，而不是全部替换！！！
    */
        if(this.QueryParams.pageNum >= this.pageTotal){
            wx.showToast({
              title: '到底啦',
            })
        }else{
            this.QueryParams.pageNum++;   //到底了如果还有数据，当前页码数++
            this.getWeightInfo();          //再次发起请求进行获取数据   
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    //当页面发生了滚动
    onPageScroll: function(e){
        let that = this
        if(e.scrollTop > 300){
            that.setData({
                isScroll:false
            })
        }else{
            that.setData({
                isScroll:true
            })
        }
    }

})